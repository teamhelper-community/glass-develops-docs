---
title: 设置语音指令
date: 2024-03-19 09:00:00
---

`Glass Application SDK`提供两种语音指令类型，一种是单条普通的语音指令`InstructSingle`，另一种是数字指令`InstructNumber`。设置语音指令时需要同时设置拼音、中文和英文。

```kotlin
open class InstructSingle(@JvmField val pinYin: String, @JvmField val zh: String, @JvmField val en: String)
```

```kotlin
open class InstructNumber(@JvmField val prefix: String, @JvmField val subfix: String)
```

## 设置View的单条语音指令

`Glass Application SDK`提供了简单的设置语音指令的方法，所有封装的UI组件都可以通过`setInstruct`方法快速设置语音指令，当用户说出语音指令`确定`时将自动触发View的`onClick`点击事件。

:::: code-group
::: code-group-item ExampleActivity.kt

```kotlin
v.btnConfirm.setInstruct(InstructSingle("que ding", "确定", "confirm"))
```

:::
::::

建议在实际开发实践当中将语音指令统一管理起来，例如上文的`确定`指令我们可以新建个管理类`LocalInstruct`重构以上代码。

:::: code-group
::: code-group-item LocalInstruct.kt

```kotlin
import com.mst.basics.instruct.base.InstructSingle

object LocalInstruct {
    val Next: InstructSingle = InstructSingle("que ding", "确定", "confirm")
}
```

:::
::: code-group-item ExampleActivity.kt

```kotlin
v.btnConfirm.setInstruct(LocalInstruct.Next)
```

:::
::::

## 设置不依赖View的语音指令

如果开发者想要在页面上添加一个不依赖于View的语音指令也可以通过`GlassBaseActivity`的`instructManager`对象设置语音指令。

:::: code-group
::: code-group-item ExampleActivity.kt


```kotlin
instructManager.addInstruct(
    LocalInstruct.ExitApp,
    object : IInstructSingleListener {
        override fun onInstructReceive(key: String) {
            toast("收到指令：$key")
            application.onTerminate()
            finish()
            android.os.Process.killProcess(android.os.Process.myPid())
        }
    })
```

:::
::::

:::info

#### **添加单一指令**
`addInstruct(InstructSingle instruct, IInstructSingleListener instructSingleListener)`

**参数**

- `instruct` - `InstructSingle` 类型，需要添加的指令。
- `instructSingleListener` - `IInstructSingleListener` 类型，添加指令的监听器。

:::

:::info

#### **添加数字范围指令**

 `addInstruct(InstructNumber instructNumber, int startNumber, int endNumber, IInstructNumberListener instructNumberListener)`

**参数**

- `instructNumber` - `InstructNumber` 类型，需要添加的指令。
- `startNumber` - `int` 类型，数字指令的起始值。
- `endNumber` - `int` 类型，数字指令的结束值。
- `instructNumberListener` - `IInstructNumberListener` 类型，添加指令的监听器。

:::

:::info

#### **移除单一指令**

`removeInstruct(InstructSingle instruct)`

**参数**

- `instruct` - `InstructSingle` 类型，需要移除的指令。

:::

:::info

#### **移除数字范围指令**


 `removeInstruct(InstructNumber instructNumber)`

**参数**

- `instructNumber` - `InstructNumber` 类型，需要移除的指令。

:::

## 设置数字语音指令

:::: code-group
::: code-group-item ExampleActivity.kt

```kotlin
instructManager.addInstruct(CommonNumberInstruct.ZOOM_LEVEL, 1, 5) { key: String?, number: Int ->
    setZoom(number)
}
```

:::

::::

```kotlin
package com.mst.basics.instruct.common

import com.mst.basics.device.Brand
import com.mst.basics.instruct.base.InstructNumber
import com.mst.basics.utils.StringUtil
import java.util.Locale

object CommonNumberInstruct {

    /**
     * 缩放级别
     */
    @JvmField
    var ZOOM_LEVEL = InstructNumber(
        prefix = prefixZoomLevel, subfix = subfixZoomLevel, similarity = 0.989
    )


    private val prefixZoomLevel: String
        get() {
            val language = Locale.getDefault().language
            val prefix = if (StringUtil.equals(language, "en")) {
                "Zoom level "
            } else {
                "缩放级别"
            }
            return prefix
        }
    private val subfixZoomLevel: String
        get() = ""
}

```

