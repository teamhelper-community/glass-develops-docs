---
title: 停止插件
date: 2024-04-17 15:43:00
---

开发者可以通过此API完成指定用户空间的指定插件应用的终止。

```kotlin
/**
 * 停止插件
 * @param pkgName the package name what you want to stop
 * @param userId virtual user namespace
 */
fun stopPlugin(pkgName: String, userId: Int)
```
