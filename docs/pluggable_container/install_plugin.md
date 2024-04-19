---
title: 安装插件
date: 2024-04-17 15:43:00
---

`Glass Plugin Container`提供基础的插件APK安装API，开发者需要自行维护插件APK的下载与保存（理解为应用市场），假设目前我们有插件应用包，下载保存在绝对路径`/sdcard/testplugin.apk`下，插件应用包名为`com.mst.testplugin`，那么我们可以通过以下四种方式将插件APK安装进`Glass Plugin Container`。

## 根据包名安装插件应用

在宿主应用克隆场景（较少），开发者可以将安卓系统上已安装的应用克隆安装进插件容器，仅需传入应用包名。

```kotlin
PluginEngine.installPlugin("com.mst.testplugin")
```

```kotlin
/**
 * 安装插件
 * @param source pkg or apk absolute path
 * @param userId virtual user namespace
 */
fun installPlugin(source: String, userId: Int = 0): InstallResult
```

## 根据Uri安装插件应用

:::warning

注意申请文件存储读写权限

:::

开发者可以通过文件`Uri`的方式传入需要安装进插件容器的插件APK路径。

```Kotlin
PluginEngine.installPlugin("file:///sdcard/testplugin.apk")
```

## 从文件安装插件应用

:::warning

注意申请文件存储读写权限

:::

开发者可以通过`File`对象的方式传入需要安装进插件容器的插件APK文件实例。

```kotlin
PluginEngine.installPlugin(File("/sdcard/testplugin.apk"))
```

```kotlin
/**
 * 安装插件
 * @param source pkg or apk absolute path
 * @param userId virtual user namespace
 */
fun installPlugin(source: File, userId: Int = 0): InstallResult
```

## 从assets资源目录安装插件应用

在交付B端定制化项目时（期望容器与交付应用以及依赖的基础服务捆绑打包），开发者需要先将`assets`目录当中的插件APK在容器首次启动时解压到内置存储，然后通过`Uri`或者`File`对象的方式安装插件应用。以下给出解压`assets`目录下文件的代码参考。

```kotlin
import android.content.Context
import java.io.File
import java.io.FileNotFoundException
import java.io.FileOutputStream
import java.io.IOException
import java.io.InputStream
import java.io.OutputStream


fun copyAssets(context: Context, assetDir: String, dir: String) {
    val files: Array<out String> = context.assets.list(assetDir) ?: return
    val mWorkingPath = File(dir)
    // 如果文件路径不存在
    if (!mWorkingPath.exists()) {
        // 创建文件夹
        if (!mWorkingPath.mkdirs()) {
            // 文件夹创建不成功时调用
        }
    }
    for (i in files.indices) {
        try {
            // 获得每个文件的名字
            val fileName = files[i]
            // 根据路径判断是文件夹还是文件
            if (!fileName.contains(".")) {
                if (assetDir.isEmpty()) {
                    copyAssets(context, fileName, "$dir$fileName/")
                } else {
                    copyAssets(
                        context,
                        "$assetDir/$fileName", dir + "/"
                                + fileName + "/"
                    )
                }
                continue
            }
            val outFile = File(mWorkingPath, fileName)
            if (outFile.exists()) outFile.delete()
            var `in`: InputStream? = null
            `in` = if (assetDir.isNotEmpty()) context.getAssets().open("$assetDir/$fileName") else context.assets
                .open(fileName)
            val out: OutputStream = FileOutputStream(outFile)
            // Transfer bytes from in to out
            val buf = ByteArray(1024)
            var len: Int
            while (`in`.read(buf).also { len = it } > 0) {
                out.write(buf, 0, len)
            }
            `in`.close()
            out.close()
        } catch (e: FileNotFoundException) {
            e.printStackTrace()
        } catch (e: IOException) {
            e.printStackTrace()
        }
    }
}
```

当然以下函数已经包含在`Glass Application SDK`中，可以直接通过以下方式使用。在下面的例子中，我们在`App`启动时在子线程中将`assets`目录当中的`plugins`文件夹解压到了`filesDir`当中，在后续你可以通过上述的插件安装API完成插件应用的安装操作。

```kotlin
class App : GlassBaseApplication() {
    override fun addApplications(appConfig: AppConfig) {
        super.addApplications(appConfig)
        appConfig.add(TTSApplication())
    }

    override fun onCreate() {
        super.onCreate()
        workerHandler.post {
            copyAssets(this@App, "video", filesDir.absolutePath + "/plugins/")
        }
    }
}
```
