---
title: 更新插件
date: 2024-04-17 15:43:00
---

更新插件和安装插件实际是同一API，更新操作只会更新插件APK的APK本体，不会影响数据。

```kotlin
/**
 * 更新插件
 * @param source pkg or apk absolute path
 * @param userId virtual user namespace
 */
fun updatePlugin(source: String, userId: Int = 0): InstallResult
```
