---
title: 应用间通信
date: 2024-04-17 15:43:00
---

:::tip

`Glass Plugin Container`实现了同一用户空间下的应用间通信兼容。容器间同一用户空间下的插件App相互通信完全符合原生安卓应用间通信规则。

:::

## Intent

在Android中，Intent是一种运行时绑定（runtime binding）机制，它能够在独立的组件（如两个Activity）之间进行通信。例如，你可以使用Intent在两个Activity之间传递数据：

```kotlin
// 创建一个新的Intent来启动另一个Activity
val intent = Intent(this, AnotherActivity::class.java)
// 放入需要传递的数据
intent.putExtra("key", "value")
// 启动Activity
startActivity(intent)
```

## 共享文件

Android应用可以通过在设备存储上共享文件来进行通信。例如，一个应用可以创建一个文件，然后另一个应用可以读取这个文件：

```kotlin
// 写入文件
openFileOutput("file.txt", Context.MODE_PRIVATE).use {
    it.write("Hello, World!".toByteArray())
}

// 读取文件
openFileInput("file.txt").use {
    it.reader().forEachLine { line ->
        println(line)
    }
}
```

## Content Provider

Content Provider是一种数据共享机制，允许一个应用访问另一个应用的数据。例如，你可以通过Content Provider访问设备的联系人数据：

```kotlin
// 查询所有的联系人
contentResolver.query(ContactsContract.Contacts.CONTENT_URI, null, null, null, null)?.use { cursor ->
    while (cursor.moveToNext()) {
        val displayName = cursor.getString(cursor.getColumnIndex(ContactsContract.Data.DISPLAY_NAME))
        println("Name: $displayName")
    }
}
```

## AIDL

AIDL（Android Interface Definition Language）允许你在不同的进程中调用对象的方法，就像调用本地对象的方法一样。由于Kotlin不直接支持AIDL，这部分代码仍然需要使用Java。

## Messenger

Messenger是一种轻量级的IPC（Inter-Process Communication）方式，它内部实际上是使用了AIDL进行进程间通信。Messenger创建一个队列，按照顺序处理来自客户端的请求。服务端代码如下：

```kotlin
// MyService.kt
class MyService : Service() {
    private class MyHandler : Handler() {
        override fun handleMessage(msg: Message) {
            // 处理来自客户端的消息
        }
    }

    private val messenger = Messenger(MyHandler())

    override fun onBind(intent: Intent): IBinder {
        return messenger.binder
    }
}
```

客户端代码如下：

```kotlin
// MainActivity.kt
class MainActivity : AppCompatActivity() {
    private var messenger: Messenger? = null

    private val connection = object : ServiceConnection {
        override fun onServiceConnected(name: ComponentName, service: IBinder) {
            messenger = Messenger(service)
            val msg = Message.obtain(null, 0, 0, 0)
            try {
                messenger?.send(msg)
            } catch (e: RemoteException) {
                e.printStackTrace()
            }
        }

        override fun onServiceDisconnected(name: ComponentName) {
            messenger = null
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val intent = Intent(this, MyService::class.java)
        bindService(intent, connection, Context.BIND_AUTO_CREATE)
    }
}
```

## Broadcast Receiver

Broadcast Receiver是一种广泛使用的在Android应用间进行通信的方式。一个应用可以发送一个广播，然后任何对这个广播感兴趣的应用都可以接收到。发送广播的代码如下：

```kotlin
// 发送广播
val intent = Intent().apply {
    action = "com.example.broadcast.MY_NOTIFICATION"
    putExtra("data","Hello World!")
}
sendBroadcast(intent)
```

接收广播的代码如下：

```kotlin
// 创建一个BroadcastReceiver
val receiver = object : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val data = intent.getStringExtra("data")
        println("Data received: $data")
    }
}

// 在Activity中注册BroadcastReceiver
val filter = IntentFilter().apply {
    addAction("com.example.broadcast.MY_NOTIFICATION")
}
registerReceiver(receiver, filter)
```
