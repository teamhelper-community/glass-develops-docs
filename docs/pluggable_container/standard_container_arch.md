---
title: 标准项目结构
date: 2024-04-17 15:43:00
---



```Java
├── PluginEngine                         # 插件化引擎
│   ├── PluginBridge
│   └── PluginCore
├── BuiltInPlugins                       # 开发者自己开发的插件业务应用
│   ├── CowDetection                        # E.G 牛只识别插件应用
│   ├── LogisticsPicking                    # E.G 物流捡货插件应用
│   ├── [service]RTCService                 # [扩展服务] RTC服务
│   └── [service]FaceDetectService          # [扩展服务] 人脸识别服务
├── GlassApplicationSDK                   # 眼镜开发基础SDK
│   ├── UIComponent
│   └── XRCore
└── app                                   # OEM壳子工程
```
