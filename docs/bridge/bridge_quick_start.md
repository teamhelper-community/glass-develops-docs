---
title: 快速开始
date: 2025-04-01 09:30:52
---

# Teamhelper Bridge SDK 开发者文档

Teamhelper Bridge SDK 专注于 IPC/RPC 通信，用于插件化基座中 Launcher 与插件应用之间以及插件应用之间的互联互通。该 SDK
通过高效的通信协议支持 Text 与 Binary 模式，支持 JSON 与 Protobuf 多种报文格式，满足不同场景下的通信需求。未来，Bridge SDK
将扩展为同一虚拟子网内的 RPC 通信，并在协议设计上支持指环拓扑、中心化算力设施以及手机、平板、手表、车机 RTOS 等各类端侧设备的发现与互联。

## 1. SDK 集成方式

### 1.1 添加 Maven 仓库

在项目的构建脚本中（例如 Gradle 的 `build.gradle` 文件），添加以下 Maven 仓库配置：

```groovy
maven("http://maven.teamhelper.cn:8081/repository/MST/") {
    isAllowInsecureProtocol = true
}
```

### 1.2 添加依赖

在依赖配置中加入以下实现依赖：

```groovy
implementation("com.teamhelper.xr:glass-bridge:0.0.13")
```

完成上述配置后，即可在项目中使用 Bridge SDK 提供的 IPC/RPC 通信能力。

---

## 2. SDK 功能概述

Bridge SDK 的主要功能包括：

- **IPC 通信**：支持同一设备内不同进程之间的消息传递，适用于 Launcher 与插件应用之间的通信。
- **RPC 通信**：支持局域网内多设备间的消息交互，未来将扩展至同一虚拟子网内的高效 RPC 通信。
- **多协议支持**：协议设计支持 Text 模式与 Binary 模式，分别对应 JSON 与 Protobuf 等多种消息格式，满足不同开发需求。
- **事件监听**：提供 Launcher 与插件应用的事件监听接口，支持设备上线下线、消息接收等事件回调，便于开发者及时处理各类通信事件。

---

