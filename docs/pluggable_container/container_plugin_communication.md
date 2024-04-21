---
title: 容器与插件通信
date: 2024-04-17 15:43:00
---

:::warning

⚠️**Experimental**：容器插件间通信API未来可能会有变更，目前处于快速开发阶段。

:::

## 基础原理

目前容器和插件间通信通过`Hook`机制完成，`Glass Plugin Container`会监听所有新`fork`的插件应用进程，并在`afterApplicationOnCreate`阶段完成插件应用中桥方法的`Hook`，使得插件应用在运行时对桥方法的调用会被`Hook`逻辑接管，动态获取请求参数并修改方法的返回值来实现容器与插件间通信。`Hook`采用[LSPosed/LSPosed: LSPosed Framework (github.com)](https://github.com/LSPosed/LSPosed)实现。

## 编写通信桥

### 定义通信桥模块

参照[插件容器标准项目结构](./docs/pluggable_container/standard_container_arch)，在`PluginEngine`模块下新建`PluginBridge`模块，在模块中定义`Bridge Method`，以下文为例，我们尝试构建一个`Bridge.test()`方法供给插件应用在运行时调用，并在`Bridge Method Hook`逻辑中`Hook`插件应用的运行时调用的返回值。

:::warning

`Bridge Method`需要被插件化容器加载并Hook，同时需要为插件应用在编译期提供符号表链接，因此`Bridge Method`所属的`class`和`method`必须反混淆。此外为了减少开发者在编写`Bridge Method Hook`的负担，建议`Bridge Method`采用`Java Lang`定义，因为`Kotlin`部分场景下会在编译期间生成额外的`class level`。

:::

```java
@Keep
public class Bridge extends TestClass {
    public static String testBridge() {
        return "STUB";
    }
}
```

### 编写Bridge Method Hook

`Bridge Method Hook`在插件化容器中完成，具体时机在产生新`fork`的插件应用进程的`afterApplicationOnCreate`阶段完成插件应用中桥方法的`Hook`。

因此我们需要监听插件应用的生命周期，在`afterApplicationOnCreate`阶段通过`application`的`classLoader`注入`Hook`。

```kotlin
BlackBoxCore.get().addAppLifecycleCallback(object : AppLifecycleCallback() {
    override fun afterApplicationOnCreate(
        packageName: String?,
        processName: String?,
        application: Application,
        userId: Int
    ) {
        Log.d(TAG, "beforeApplicationOnCreate: pkg $packageName, processName $processName")
        /**
         * Xposed Hook
         */
        initHooks(application, BridgeHook)
        super.afterApplicationOnCreate(packageName, processName, application, userId)
    }
})
```

:::warning

⚠️**Experimental**：现阶段可以参照实现`Hook`，后续版本会提供更简便的`Hook`方式。

:::

```kotlin
object BridgeHook : BaseHook() {

    override fun init(application: Application) {
        XposedBridge.hookAllMethods(
            application.classLoader?.loadClass("host.Bridge"), "testBridge",
            object : XC_MethodHook() {
                @Throws(Throwable::class)
                override fun beforeHookedMethod(param: MethodHookParam) {
                    param.setResult("test Result")
                    super.beforeHookedMethod(param)
                }
            })
    }
}
```

```kotlin
abstract class BaseHook {
    var isInit: Boolean = false
    abstract fun init(application: Application)

    companion object {
        fun initHooks(application: Application, vararg hook: BaseHook) {
            hook.forEach {
                runCatching {
                    if (it.isInit) return@forEach
                    it.init(application)
                    it.isInit = true
                    Log.i(EngineStartup.TAG, "Inited hook: ${it.javaClass.simpleName}")
                }
            }
        }
    }
}
```

## 插件应用中调用Bridge Method

### 添加Bridge模块符号表链接

在你开发的插件应用模块中使用`compileOnly`方式添加`PluginBridge`的运行时符号链接，真实的`PluginBridge`相关类将在插件容器初始化时统一加载并启动`Hook`。

```kotlin
dependencies {
    ...
    compileOnly(project(":PluginEngine:PluginBridge"))
}
```

### 调用Bridge Method

在插件应用开发时调用只需要像普通API一样调用即可。

```kotlin
...
import host.Bridge

class MainActivity : GlassBaseActivity<ActivityMainBinding, EmptyViewModel>() {

    override fun initParams() {

    }

    override fun initData() {

    }

    override fun initView() {
        v.btnConfirm.setInstruct(InstructSingle("que ding", "确定", "confirm"))
        v.btnConfirm.setOnClickListener {
            toast(Bridge.testBridge())
        }
        v.btnConfirm.focus()
    }

    override fun registerObserve() {

    }
}
```
