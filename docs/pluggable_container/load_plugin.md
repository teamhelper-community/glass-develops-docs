---
title: 加载插件
date: 2024-04-17 15:43:00
---

开发者可以通过此API完成指定用户空间的指定插件应用的加载。

```kotlin
/**
 * 启动插件
 * @param pkgName the package name what you want to launch
 * @param userId virtual user namespace
 */
fun launchPlugin(pkgName: String, userId: Int = 0)
```
