---
title: 获取已安装插件列表
date: 2024-04-17 15:43:00
---

## 获取ApplicationInfo列表

开发者可以通过`PluginEngine.getInstallPluginsAppInfo`获取当前容器内指定用户空间的所有安装插件应用的信息，便于开发者做容器`Launcher`时展示当前已安装插件应用的UI展示。

:::info

`ApplicationInfo`主要提供关于应用程序的信息，[ApplicationInfo  | Android Developers (google.cn)](https://developer.android.google.cn/reference/android/content/pm/ApplicationInfo?hl=en)，包括：

- 应用程序的名字（`name`）
- 应用程序的包名（`packageName`）
- 应用程序的图标（`icon`）
- 应用程序的描述信息（`description`）
- 应用程序的数据目录（`dataDir`）
- 应用程序的类名（`className`）
- 应用程序的主题（`theme`）
- 应用程序的权限（`permission`）
- 应用程序是否是系统应用（`flags`字段可以用于判断）

:::

```kotlin
/**
 * 获取已经安装的插件的ApplicationInfo列表
 * @param userId the virtual user namespace
 */
fun getInstallPluginsAppInfo(userId: Int): List<ApplicationInfo>
```

## 获取PackageInfo列表

开发者可以通过`PluginEngine.getInstallPluginsPkgInfo`获取当前容器内指定用户空间的所有安装插件应用的版本信息和安装信息，便于开发者管理插件应用的包信息。

:::info

`PackageInfo`主要提供关于应用程序包的信息，[PackageInfo  | Android Developers (google.cn)](https://developer.android.google.cn/reference/android/content/pm/PackageInfo)，包括：

- 包的版本名（`versionName`）
- 包的版本号（`versionCode`）
- 包的签名信息（`signatures`）
- 包的安装时间（`firstInstallTime`）
- 包的最后更新时间（`lastUpdateTime`）
- 包的权限信息（`requestedPermissions`）
- 包的活动信息（`activities`）
- 包的服务信息（`services`）
- 包的接收器信息（`receivers`）
- 包的提供者信息（`providers`）

:::

```kotlin
/**
 * 获取已经安装的插件的PackageInfo列表
 */
fun getInstallPluginsPkgInfo(userId: Int): List<PackageInfo>
```
