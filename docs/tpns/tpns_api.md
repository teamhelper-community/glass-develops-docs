---
title: TPNS 客户端SDK
date: 2025-04-01 09:30:52
---

## 1. 客户端 SDK 概述

客户端 SDK 主要负责以下功能：

- **用户登录与登出**：在 Launcher 登录成功后调用 `login` 接口连接 TPNS 服务器，在退出登录时调用 `logout` 以停止消息推送。
- **消息订阅管理**：当插件应用安装或卸载时，分别调用 `subscribeNotification` 和 `unsubscribeNotification`
  接口，动态更新已安装的应用包列表。
- **通知消息操作**：提供对接收到的通知消息进行数据存储、读取、分页查询及标记已读等操作，通过 `NotificationUseCase` 实现。
- **报文操作**：提供对 TPNS 协议报文的存储、重发与删除操作，主要面向 SDK 内部使用，用户一般无需直接调用，通过
  `ProtocolUseCase` 提供相关功能。
- **通知监听**：通过添加或移除通知监听器，实现对通知消息的实时监听与处理。

---

## 2. 客户端 SDK 集成方式

为了将 TPNS 客户端 SDK 集成到您的项目中，请按照以下步骤配置仓库和依赖：

### 2.1 添加 Maven 仓库

在项目的构建脚本中（如 Gradle 的 `build.gradle` 文件），添加以下 Maven 仓库配置：

```groovy
maven {
    url "http://maven.teamhelper.cn:8081/repository/MST/"
    isAllowInsecureProtocol = true
}
```

### 2.2 添加依赖

在您的依赖配置中加入以下实现依赖：

```groovy
implementation "com.teamhelper.xr:glass-bridge-host:0.0.11"
```

完成上述配置后，即可在项目中使用 TPNS 客户端 SDK 的相关接口。

---

## 3. TPNS 客户端 SDK 接口说明

客户端 SDK 对外暴露的主要接口位于 `TPNS.kt` 中，具体如下：

### 3.1 登录与登出

- **登录**
    - **方法**：`fun login(userId: Long, token: String, installedPkgsList: List<String>)`
    - **说明**：在 Launcher 登录成功后调用，用于连接 TPNS 服务器。参数包括用户 ID、用户 Token 以及设备上已安装应用的包名列表。

- **登出**
    - **方法**：`fun logout()`
    - **说明**：在 Launcher 退出登录时调用。登出后，TPNS 服务器将停止推送消息。

### 3.2 消息订阅管理

- **订阅消息**
    - **方法**：`fun subscribeNotification(installedPkgsList: List<String>)`
    - **说明**：在插件应用安装时调用，更新已安装的应用包名列表以接收相应推送消息。

- **取消订阅消息**
    - **方法**：`fun unsubscribeNotification(unInstalledPkgsList: List<String>)`
    - **说明**：在插件应用卸载时调用，取消对该应用包的消息订阅。

### 3.3 通知与协议操作

- **获取通知操作实例**
    - **方法**：`fun getNotificationOperation(): NotificationUseCase`
    - **说明**：返回 `NotificationUseCase` 实例，用于进行通知消息的插入、查询、分页、标记已读等操作。该接口为只读访问接口，Launcher
      外部不允许对内部数据进行写操作。

- **获取协议操作实例**
    - **方法**：`fun getProtocolOperation(): ProtocolUseCase`
    - **说明**：返回 `ProtocolUseCase` 实例，提供报文数据的插入、重发和删除功能。一般情况下，Launcher 外部无需调用此 API。

### 3.4 通知监听管理

- **添加通知监听器**
    - **方法**：`fun addNotificationListener(listener: TPNSNotificationListener)`
    - **说明**：新增一个通知监听器，用于实时接收 TPNS 服务器推送的消息。

- **移除通知监听器**
    - **方法**：`fun removeNotificationListener(listener: TPNSNotificationListener)`
    - **说明**：移除指定的通知监听器，停止对消息的监听。

---

## 4. NotificationUseCase 接口说明

`NotificationUseCase` 主要用于处理通知消息的持久化与查询，其功能包括：

### 4.1 消息插入

- **异步插入通知**
    - **方法**：`suspend fun insertNotification(event: TPNSProto.NotificationMessageSendEvent)`
    - **说明**：将收到的 Protobuf 通知消息转换为实体类后保存到数据库（异步执行）。

- **同步插入通知**
    - **方法**：`fun insertNotificationSync(event: TPNSProto.NotificationMessageSendEvent)`
    - **说明**：同步保存通知消息到数据库。

### 4.2 消息统计与查询

- **获取通知消息总数**
    - **方法**：
        - 异步版本：`suspend fun getNotificationsCount(read: Boolean): Int`
        - 同步版本：`fun getNotificationsCountSync(read: Boolean): Int`
    - **说明**：根据是否已读状态，返回符合条件的通知总数。

- **获取通知消息列表**
    - **方法**：
        - 异步版本：`suspend fun getNotifications(read: Boolean, limit: Int, offset: Int): List<NotificationEntity>`
        - 同步版本：`fun getNotificationsSync(read: Boolean, limit: Int, offset: Int): List<NotificationEntity>`
    - **说明**：根据分页参数及是否已读状态，获取通知消息列表。

- **Paging3 分页查询**
    - **方法**：`fun getNotificationsPaging(read: Boolean): PagingSource<Int, NotificationEntity>`
    - **说明**：利用 Paging3 分页库获取通知消息数据源，适用于需要分页展示的场景。

### 4.3 消息状态更新

- **标记通知为已读**
    - **方法**：
        - 异步版本：`suspend fun markNotificationAsRead(fp: String)`
        - 同步版本：`fun markNotificationAsReadSync(fp: String)`
    - **说明**：根据通知的唯一标识（fp）更新状态，将其标记为已读。

### 4.4 单个通知实体操作

- **插入单个通知实体**
    - **方法**：
        - 异步版本：`suspend fun insertNotificationEntity(notificationEntity: NotificationEntity)`
        - 同步版本：`fun insertNotificationEntitySync(notificationEntity: NotificationEntity)`
    - **说明**：直接插入一个通知实体到数据库中。

---

## 5. ProtocolUseCase 接口说明

`ProtocolUseCase` 主要针对 TPNS 协议报文的管理，其核心功能包括：

### 5.1 插入报文

- **插入一条 Protobuf 报文**
    - **方法**：`suspend fun insertProtocol(fp: String, protocol: ByteArray, sendTime: Long, event: TPNSProto.EventType)`
    - **说明**：将报文的唯一标识、报文字节数据、发送时间和事件类型保存到数据库。适用于记录每次发送的推送报文。

### 5.2 重发未确认的报文

- **重发所有未确认的报文**
    - **方法**：
      `suspend fun resendAllUnconfirmed(retryActionMapper: Map<TPNSProto.EventType, suspend (ProtocolEntity) -> Unit>)`
    - **说明**：
        - 遍历所有报文记录，对包含在 `retryActionMapper` 中的事件类型进行重发操作。
        - 每次重发后会更新重试次数，并执行映射中对应的操作。
        - 此接口确保未确认的推送报文能够进行重试，提升消息可靠性。

### 5.3 删除报文

- **根据唯一标识删除报文**
    - **方法**：`suspend fun deleteProtocol(fp: String)`
    - **说明**：通过报文唯一标识删除相应记录。

- **通过 ACK 报文删除对应报文**
    - **方法**：`suspend fun deleteProtocol(event: ByteString)`
    - **说明**：解析 ACK 报文（TPNSProto.AckEvent），根据其中的 fp 删除对应的报文记录。

---

## 6. 使用示例

下面给出一个简单的使用示例，说明如何在 Launcher 中集成 TPNS 客户端 SDK：

```kotlin
// 引入 TPNS 客户端 SDK
import com.teamhelper.bridge.host.TPNS
import com.teamhelper.bridge.host.TPNSNotificationListener
import com.teamhelper.bridge.host.domain.usecase.NotificationUseCase

// 假设在 Launcher 登录成功后执行
fun onLauncherLoginSuccess(userId: Long, token: String, installedPkgsList: List<String>) {
    // 登录 TPNS 服务器
    TPNS.login(userId, token, installedPkgsList)
    
    // 订阅通知消息（插件安装时调用）
    TPNS.subscribeNotification(installedPkgsList)
    
    // 添加通知监听器
    TPNS.addNotificationListener(object : TPNSNotificationListener {
        override fun onNotificationReceived(message: String) {
            // 处理收到的通知消息
            println("收到通知: $message")
        }
    })
    
    // 示例：查询未读通知数量（异步调用）
    // 使用协程进行异步调用
    // CoroutineScope(Dispatchers.Main).launch {
    //     val count = TPNS.getNotificationOperation().getNotificationsCount(read = false)
    //     println("未读通知数: $count")
    // }
}

// 在退出登录时调用
fun onLauncherLogout() {
    // 移除所有通知监听器（示例）
    // TPNS.removeNotificationListener(listener)
    
    // 登出 TPNS
    TPNS.logout()
}
```

---

## 7. 注意事项

- **初始化顺序**：在 Launcher 登录成功后，必须首先调用 `login` 接口建立连接，再进行后续的消息订阅与监听操作。
- **线程与协程**：部分接口（例如插入通知、查询通知数量、标记已读等）提供了同步与异步版本，建议在主线程中调用异步接口，避免阻塞
  UI。
- **SDK 内部数据安全**：部分接口（如获取通知和协议操作实例）仅供内部数据只读访问，外部调用时请勿直接修改相关数据。
