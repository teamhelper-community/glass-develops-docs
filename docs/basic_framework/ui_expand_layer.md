---
title: 弹出菜单/弹层(Expand Layer)          
date: 2024-04-15 01:25:00
---

## 预览OVERVIEW

![image-20240415021735585](./ui_expand_layer.assets/image-20240415021735585.png)

## 基础用法

### 通过DataBinding创建

```kotlin
/**
 * DataBinding E.G
 */
GlassExpandPopup(mContext, instructManager).apply {
    contentWidth = 640
    direction = GlassExpandPopup.Companion.Direction.RIGHT
    val expandPopupBinding = DataBindingUtil.inflate<LayoutExpandPopupBinding>(
        LayoutInflater.from(mContext),
        R.layout.layout_expand_popup,
        null, false
    ).apply {
        btnTest.text = "测试按钮"
    }
    tipsText = "您可以通过“语音”或者“物理按键”进行选择"
    show<LayoutExpandPopupBinding>(R.layout.layout_expand_popup).let {
        it.btnTest.focus()
    }
}
```

### 设置宽度

```kotlin
GlassExpandPopup DSL {
  ...
  contentWidth = 640
  ...
}
```

### 设置高度

```kotlin
GlassExpandPopup DSL {
  ...
  contentHeight = 640
  ...
}
```

### 设置弹出方向

```kotlin
GlassExpandPopup DSL {
  ...
  direction = GlassExpandPopup.Companion.Direction.CENTER
  ...
}
```

```kotlin
enum class Direction {
    LEFT,
    RIGHT,
    CENTER,
    TOP,
    BOTTOM
}
```

### 设置提示文本

```kotlin
GlassExpandPopup DSL {
  ...
  tipsText = "您可以通过“语音”或者“物理按键”进行选择"
  ...
}
```

### 处理弹层View

```kotlin
GlassExpandPopup DSL {
  ...
     val expandPopupBinding = DataBindingUtil.inflate<LayoutExpandPopupBinding>(
                    LayoutInflater.from(mContext),
                    R.layout.layout_expand_popup,
                    null, false
                ).apply {
                    btnTest.text = "测试按钮"
                }
  ...
}
```

### 弹出弹层并设置操作焦点

```kotlin
GlassExpandPopup DSL {
  ...
                show<LayoutExpandPopupBinding>(R.layout.layout_expand_popup).let {
                    it.btnTest.focus()
                }
}
```
