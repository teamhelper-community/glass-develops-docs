---
title: 清除插件数据
date: 2024-04-17 15:43:00
---

开发者可以通过此API完成指定用户空间的指定插件应用数据的清理，插件APK安装本体将保留。

```kotlin
/**
 * 清除插件数据
 * @param pkgName the package name what you want to clear data
 * @param userId virtual user namespace
 */
fun clearPluginData(pkgName: String, userId: Int = 0)
```
