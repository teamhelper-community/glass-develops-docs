---
title: 客户端鉴权接入
date: 2024-04-17 15:43:00
---

## 设置容器OEM唯一标识

开发者在进行OEM容器的开发过程当中，需要主动通过`PluginEngine.setProjectCode(projectCode: String)`方法设置容器OEM实例的唯一项目标识，当容器启动时会读取`ProjectCode`和设备唯一标识作为容器鉴权的参数，鉴权通过后才可正常使用容器。建议在容器的`GlassBaseApplication`初始化时调用该方法初始化`ProjectCode`，以确保容器的正常鉴权运行。

```kotlin
PluginEngine.setProjectCode("OemProject1")
```

```kotlin
package com.teamhelper.basestation

import com.mst.basics.GlassBaseApplication
import com.plugincore.wrapper.PluginEngine
import com.plugincore.wrapper.application.PluginApplication
import com.teamhelper.base.application.AppConfig


class App : GlassBaseApplication() {
    override fun addApplications(appConfig: AppConfig) {
        super.addApplications(appConfig)
        PluginEngine.setProjectCode("OemProject1")
        appConfig.add(PluginApplication())
    }
}
```
