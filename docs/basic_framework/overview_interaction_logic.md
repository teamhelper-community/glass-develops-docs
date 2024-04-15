---
title: 交互逻辑阐述
date: 2024-03-19 09:00:00
---

`Glass Application SDK` 中的统一交互逻辑已经封装在UI组件内部，由SDK封装的UI组件隐式对外提供。在现有的XR眼镜中，操作交互有物理操作和语音指令两种，而物理操作主要又有`触摸板、旋钮和按键`三种操作方式，意味着用户可以进行`语音指令`和`单指点击、单指长按、后退、前滑、后滑`等人机交互。为了兼容各类物理操作事件，在安卓开发中，我们往往通过以下两个函数来自定义用户的操作行为。

```Kotlin
/**
 * 旋钮、按键
 */
override fun onKeyUp(keyCode: Int, event: KeyEvent): Boolean
```
```Kotlin
/**
 * 触摸板
 */
override fun dispatchTouchEvent(event: MotionEvent): Boolean
```

但是因为XR设备形态不一，通过各类旋钮、触摸板、按键产生的操作交互所触发的事件各有差异，参见下表。

| 设备型号             | 单击                  | 后退                             | 前滑                                        | 后滑                                     | 前滑移动                                           | 后滑移动                                           | 按键长按                  | 单指长按 | 双指点按            | 双指长按 |
| -------------------- | --------------------- | -------------------------------- | ------------------------------------------- | ---------------------------------------- | -------------------------------------------------- | -------------------------------------------------- | ------------------------- | -------- | ------------------- | -------- |
| *RokidGlass2*        | *KEYCODE_DPAD_CENTER* | *KEYCODE_BACK*                   | *FORWARD_OR_BACKWARD*                       | *KEYCODE_DPAD_UP*                        | *KEYCODE_DPAD_RIGHT*                               | *KEYCODE_DPAD_LEFT*                                | *任何按键*                | /        | /                   | /        |
| *RokidRGCrown*       | *KEYCODE_DPAD_CENTER* | *KEYCODE_BACK*                   | *KEYCODE_DPAD_RIGHT*                        | *KEYCODE_DPAD_LEFT*                      | *KEYCODE_DPAD_RIGHT*                               | *KEYCODE_DPAD_LEFT*                                | *任何按键*                | /        | /                   | /        |
| *Argooz（希姆通）*   | *500*                 | *KEYCODE_BACK*                   | *KEYCODE_VOLUME_UP*                         | *KEYCODE_VOLUME_DOWN*                    | *KEYCODE_VOLUME_UP*                                | *KEYCODE_VOLUME_DOWN*                              | *任何按键*                | /        | /                   | /        |
| *Vuzix（虹科）*      | *KEYCODE_DPAD_CENTER* | *KEYCODE_BACK*                   | *KEYCODE_DPAD_RIGHT*                        | *KEYCODE_DPAD_LEFT*                      | *KEYCODE_DPAD_RIGHT*                               | *KEYCODE_DPAD_LEFT*                                | *任何按键*                | /        | /                   | /        |
| *Alps（拜特尔）*     | *KEYCODE_ENTER*       | *KEYCODE_BACK*                   | *KEYCODE_DPAD_RIGHT \|\| KEYCODE_PAGE_DOWN* | *KEYCODE_DPAD_LEFT \|\| KEYCODE_PAGE_UP* | *KEYCODE_DPAD_RIGHT \|\| KEYCODE_PAGE_DOWN*        | *KEYCODE_DPAD_LEFT \|\| KEYCODE_PAGE_UP*           | *任何按键*                | /        | /                   | /        |
| *Epson（爱普生）*    | —                     | *KEYCODE_BACK*                   | —                                           | —                                        | —                                                  | —                                                  | *任何按键*                | /        | /                   | /        |
| *Chinvis（谦视）*    | *KEYCODE_DPAD_CENTER* | *KEYCODE_BACK*                   | *KEYCODE_DPAD_RIGHT*                        | *KEYCODE_DPAD_LEFT*                      | /                                                  | /                                                  | *任何按键*                | /        | /                   | /        |
| *Nibiru（谷东科技）* | *KEYCODE_ENTER*       | *KEYCODE_BACK*                   | *KEYCODE_DPAD_RIGHT*                        | *KEYCODE_DPAD_LEFT*                      | /                                                  | /                                                  | *任何按键*                | /        | /                   | /        |
| *Qti（蜂巢）*        | *onSingleFingerTap*   | *onSingleFingerPressAndDownSlip* | *onSingleFingerLongPressAndLeftMove*        | *onSingleFingerLongPressAndRightMove*    | *MotionEvent.ACTION_DOWN，MotionEvent.ACTION_MOVE* | *MotionEvent.ACTION_DOWN，MotionEvent.ACTION_MOVE* | *onSingleFingerLongPress* | √        | *onDoubleFingerTap* | *√*      |

**表：onKeyUp和dispatchTouchEvent解析出来的KeyCode* 

因此，我们在`Glass Application SDK`中对不同设备的交互事件做兼容和封装，并在`Glass Application SDK` 中，定义了`操作逻辑串`的概念，所有可被用户进行以上操作交互的`View`都拥有一个有序的唯一标识`sign`。除此之外，我们定义一个用户操作焦点的概念`focus`，`Activity`中所有所有可被操作交互的`View`都可被通过`View.focus()`聚焦为当前的操作焦点。
