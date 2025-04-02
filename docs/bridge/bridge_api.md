---
title: 客户端 SDK
date: 2025-04-01 09:30:52
---

## 1. 对外暴露的接口说明

SDK 通过 `RPC` 对象对外提供所有 IPC/RPC 通信接口。下文对各个接口进行详细说明：

### 1.1 事件监听接口

#### 1.1.1 Launcher 事件监听

用于监听子应用发送给 Launcher 的消息：

- **接口定义：** `interface LauncherEventListener`
    - `onTextEventReceived(event: Packet<RpcData>)`
      Json 协议消息体回调，参数为解析后的 JSON 消息对象。
    - `onBinaryEventReceived(event: RPCProto.Packet)`
      Protobuf 协议消息体回调，参数为解析后的二进制消息对象。

#### 1.1.2 Plugin 事件监听

用于监听子应用之间的消息传递，当设备离线时，Launcher 可缓存消息，待目标应用上线后再发送：

- **接口定义：** `interface PluginEventListener`
    - `onTextEventReceived(event: Packet<RpcData>, offline: Boolean)`
      Json 协议消息体回调，并附带离线状态标识。
    - `onBinaryEventReceived(event: RPCProto.Packet, offline: Boolean)`
      Protobuf 协议消息体回调，并附带离线状态标识。

#### 1.1.3 客户端连接监听

用于监听局域网内与 Launcher Socket Server 的设备上线、下线事件：

- **接口定义：** `interface ClientConnectionListener`
    - `online(ip: String, deviceId: String, platform: String, pkg: String, version: Int)`
      设备上线回调。
    - `offline(ip: String, deviceId: String, platform: String, pkg: String, version: Int)`
      设备下线回调。

#### 1.1.4 事件监听管理

SDK 提供添加和移除各类事件监听器的接口：

- **添加/移除 Launcher 事件监听：**
    - `fun addLauncherEventListener(listener: LauncherEventListener)`
    - `fun removeLauncherEventListener(listener: LauncherEventListener)`

- **添加/移除 Plugin 事件监听：**
    - `fun addPluginEventListener(listener: PluginEventListener)`
    - `fun removePluginEventListener(listener: PluginEventListener)`

- **添加/移除客户端连接监听：**
    - `fun addClientConnectionListener(listener: ClientConnectionListener)`
    - `fun removeClientConnectionListener(listener: ClientConnectionListener)`

### 1.2 消息发送接口

SDK 提供多种消息发送方式，支持 IPC 与 RPC 两种通信场景。

#### 1.2.1 RPC 消息发送

适用于 Launcher 发送消息给指定设备或应用（局域网内通信）。

- **Text 模式（JSON 格式）**
    - 方法：`fun sendRpcEvent(targetDeviceId: String, targetPkg: String, data: String)`
    - 说明：通过 native 方法发送 JSON 格式的 RPC 消息给指定设备。

- **Binary 模式（Protobuf 格式）**
    - 方法：`fun sendRpcEvent(_targetDeviceId: String, _targetPkg: String, _data: ByteArray)`
    - 说明：通过 native 方法发送 Protobuf 格式的 RPC 消息给指定设备。

#### 1.2.2 IPC 消息发送

适用于 Launcher 内部或本机进程间通信。

- **Text 模式（JSON 格式）**
    - 方法：`fun sendIpcEvent(targetPkg: String, data: String)`
    - 说明：发送 JSON 格式的 IPC 消息给指定应用，消息发送者为当前设备。

- **Binary 模式（Protobuf 格式）**
    - 方法：`fun sendIpcEvent(_targetPkg: String, _data: ByteArray)`
    - 说明：发送 Protobuf 格式的 IPC 消息给指定应用。

#### 1.2.3 消息转发接口

用于 Launcher 转发插件应用的消息给其他目标应用，支持 IPC 场景下的消息中继。

- **Text 模式（JSON 格式）**
    - 方法：`fun transferIpcEvent(sourcePkg: String, sourceDeviceId: String, targetPkg: String, data: String)`
    - 说明：转发 JSON 格式消息，包含源应用信息与目标应用信息。

- **Binary 模式（Protobuf 格式）**
    - 方法：`fun transferIpcEvent(sourcePkg: String, sourceDeviceId: String, _targetPkg: String, _data: ByteArray)`
    - 说明：转发 Protobuf 格式消息，包含源应用信息与目标应用信息。

### 1.3 系统信息接口

获取设备相关信息，便于业务逻辑中进行设备标识与应用识别。

- **获取自身设备 ID**
    - 方法：`fun getSelfDeviceId(): String`
- **获取当前包名**
    - 方法：`fun getSelfPackageName(): String`

### 1.4 内部消息分发

SDK 内部通过 native 方法接收来自底层的事件，并调用以下分发方法，将消息分发给相应的事件监听器：

- **执行 Launcher 文本/二进制事件：**  
  内部方法 `executeLauncherTextEvent(event: String)` 与 `executeLauncherBinaryEvent(event: ByteArray)`
- **执行 Plugin 文本/二进制事件：**  
  内部方法 `executePluginTextEvent(event: String, offline: Boolean)` 与
  `executePluginBinaryEvent(event: ByteArray, offline: Boolean)`
- **执行设备上线/下线事件：**  
  内部方法 `executeOnline(...)` 与 `executeOffline(...)`

这些方法由 native 层调用，开发者无需直接调用。

---

## 2. 使用示例

下面给出一个简单的示例，说明如何在 Launcher 中集成 Bridge SDK 并使用 RPC/IPC 接口进行消息通信：

```kotlin
import com.teamhelper.bridge.host.RPC
import com.teamhelper.bridge.host.RPC.LauncherEventListener
import com.teamhelper.bridge.host.RPC.PluginEventListener
import com.teamhelper.bridge.host.RPC.ClientConnectionListener

// 示例：添加 Launcher 级别的 RPC 事件监听
RPC.addLauncherEventListener(object : LauncherEventListener {
    override fun onTextEventReceived(event: Packet<RpcData>) {
        // 处理 JSON 消息
        println("Launcher 接收到文本消息: ${event.data}")
    }

    override fun onBinaryEventReceived(event: RPCProto.Packet) {
        // 处理 Protobuf 消息
        println("Launcher 接收到二进制消息, 长度: ${event.toByteArray().size}")
    }
})

// 示例：发送 RPC 文本消息给指定设备（局域网内通信）
fun sendRpcTextMessage() {
    val targetDeviceId = "device123"
    val targetPkg = "com.example.targetapp"
    val jsonData = "{\"command\": \"doSomething\"}"
    RPC.sendRpcEvent(targetDeviceId, targetPkg, jsonData)
}

// 示例：本机进程间 IPC 通信，发送 Protobuf 消息
fun sendIpcBinaryMessage(protobufData: ByteArray) {
    val targetPkg = "com.example.anotherapp"
    RPC.sendIpcEvent(targetPkg, protobufData)
}
```

---

## 3. 注意事项

- **协议模式选择**：根据业务需求选择 Text（JSON）或 Binary（Protobuf）模式；不同格式对应的接口调用略有区别。
- **事件监听管理**：请在合适的生命周期中添加并移除事件监听器，避免内存泄漏或重复处理消息。
- **设备信息获取**：通过 `getSelfDeviceId()` 与 `getSelfPackageName()` 获取当前设备标识，确保消息发送与接收时的准确匹配。
- **扩展预留**：Bridge SDK 的设计预留了未来扩展 RPC 通信及跨设备互联的能力，开发者可关注后续版本更新以获得更多功能支持。


