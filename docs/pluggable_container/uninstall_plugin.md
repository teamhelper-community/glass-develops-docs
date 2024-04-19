---
title: 卸载插件
date: 2024-04-17 15:43:00
---

:::danger

卸载插件时，插件应用数据将会被一并删除，此操作不可逆。

:::

开发者可以传入包名和用户空间ID卸载指定用户的指定插件APK，注意插件APK之间可能的相互调用。

```kotlin
/**
 * 卸载插件
 * @param pkgName the package name what you want to uninstall
 * @param userId virtual user namespace
 */
fun uninstallPlugin(pkgName: String, userId: Int = 0)
```
