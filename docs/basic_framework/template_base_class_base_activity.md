---
title: Activity基类
date: 2024-03-19 09:00:00
---

## 快速使用

创建一个新的`Activity`继承自`GlassBaseActivity`，其中`GlassBaseActivity`继承时需要传入当前`Activity`的`DataBinding`泛型类型和`ViewModel`类型，这样`GlassBaseActivity`的子类实例化时会根据类型信息通过反射自动创建`DataBinding`和`ViewModel`实例。以下是一个简易的代码示例。

:::: code-group
::: code-group-item MainActivity.kt

```kotlin
class MainActivity : GlassBaseActivity<ActivityMainBinding, EmptyViewModel>() {

    override fun initParams() {

    }

    override fun initData() {

    }

    override fun initView() {
      	// v为ActivityMainBinding:ViewDataBinding的实例
        v.btnConfirm.setInstruct(InstructSingle("que ding", "确定", "confirm"))
        v.btnConfirm.setOnClickListener {
            toast("confirm")
        }
        v.btnConfirm.focus()
    }

    override fun registerObserve() {

    }
}
```

:::
::::

:::: code-group
::: code-group-item activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<layout>

    <androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

        <com.mst.basics.slide.widget.v2.GlassButton
            android:id="@+id/btn_confirm"
            app:sign="1"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintBottom_toBottomOf="parent"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="确定" />

    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

:::
::::

### GlassBaseActivity基类结构

`GlassBaseActivity`继承自`BaseActivity`，并实现了`ISlideEventListener`接口。它的主要结构如下：

```java
GlassBaseActivity
│
├── Fields
│   ├── hashCode: Int
│   ├── instructManager: InstructManager
│   ├── slideEventManager: SlideEventManager
│   ├── slideEventViewManager: SlideEventViewManager.Builder
│   ├── glassLoadingDialog: GlassLoadingDialog?
│   └── downloadDialog: GlassDownloadDialog?
│
├── Methods
│   ├── setInstruct(instructSingle: InstructSingle): Unit
│   ├── focus(): Unit
│   ├── setFocusView(view: ISlideEventViewListener): Unit
│   ├── beforeInitLayout(): Unit
│   ├── afterInitLayout(): Unit
│   ├── onResume(): Unit
│   ├── onKeyUp(keyCode: Int, event: KeyEvent): Boolean
│   ├── onKeyDown(keyCode: Int, event: KeyEvent): Boolean
│   ├── dispatchTouchEvent(event: MotionEvent): Boolean
│   ├── onSuperKeyTrigger(): Unit
│   ├── get slideEvenMode: Int
│   ├── setSlideEventMode(slideEventMode: Int): Unit
│   ├── showLoading(title: String): Unit
│   ├── dismissLoading(): Unit
│   ├── showDownload(): Unit
│   ├── setDownloadProgress(progress: Int): Unit
│   ├── dismissDownload(): Unit
│   ├── onEnter(): Unit
│   ├── onBack(): Unit
│   ├── onForward(): Unit
│   ├── onBackward(): Unit
│   ├── onForwardMove(): Unit
│   ├── onBackwardMove(): Unit
│   ├── onPause(): Unit
│   ├── onBackHome(): Unit
│   └── onDestroy(): Unit
│
└── Interfaces
│   └── ISlideEventListener
│
└── Parent
    └── BaseActivity
      └── androidx.appcompat.app.AppCompatActivity
```

下面是每个部分的功能描述：

1. **Fields**: 类的字段，包括`hashCode`、指令管理器、滑动事件管理器、滑动事件视图管理器、加载对话框和下载对话框。

2. **Methods**: 类的方法，包括设置指令、焦点、初始化布局前后的操作、生命周期事件处理（如`onResume`、`onPause`、`onDestroy`）、键盘和触摸事件处理、对话框的显示和隐藏、滑动事件的处理等。

3. **Interfaces**: `GlassBaseActivity`实现了`ISlideEventListener`接口，便于开发者做事件监听的扩展。

### 获取当前的DataBinding实例

在`GlassBaseActivity`的子类中您可以通过v获取当前页面的`DataBinding`实例。

```kotlin
protected lateinit var v: DataBinding
```

### 获取当前的ViewModel实例

在`GlassBaseActivity`的子类中您可以通过vm获取当前页面的`ViewModel`实例。

```kotlin
protected lateinit var vm: ViewModel
```

#### EmptyViewModel

当开发者编写一些不需要`ViewModel`的简单页面时，可以在声明类的时候传入`EmptyViewModel`作为空`ViewModel`。例如：

```kotlin
class MainActivity : GlassBaseActivity<ActivityMainBinding, EmptyViewModel>() { }
```

### 快速获取Context

开发者可以通过`mContext`字段获取当前页面的Context，当然你也可以通过`Kotlin`语法下的`baseContext`获取`Context`，对应Java语法下的`getBaseContext()`。

```kotlin
protected lateinit var mContext: AppCompatActivity
```

### 快速获取Logcat TAG

开发者可以通过`TAG`字段获取当前`Activity`的`javaClass.simpleName`作为`Logcat`的日志标签

```kotlin
protected val TAG: String = this.javaClass.simpleName
```

### 快速打印堆栈调用

开发者可以通过调用`logE`、`logW`、`logD`快速打印`logcat`日志，并可选传入`depth`打印指定深度的堆栈信息，方便`Lambda`函数日志打印和Kotlin高阶函数日志打印。

```kotlin
fun logE(log: Any, depth: Int = 1)

fun logW(log: Any, depth: Int = 1)

fun logD(log: Any, depth: Int = 1)
```

#### Logcat扩展函数

我们也为Kotlin开发者提供了此类扩展函数，方便对任意对象做Logcat日志打印。

```kotlin
fun Any.logE(tag: String = "") {
    Log.e(TAG.format(tag), this.toString())
}

fun Any.logW(tag: String = "") ...

fun Any.logI(tag: String = "") ...

fun Any.logV(tag: String = "") ...

fun Any.logD(tag: String = "") ...
```

### 关闭当前页面

开发者可以通过`finish`函数结束当前页面，并可指定传入延迟关闭参数。

```kotlin
open fun finish(millisecond: Int = 0)
```

## 监听用户触发的各类操作交互

详见[交互逻辑/监听手势操作](interaction_logic_listen.html#手势操作回调)

## 全屏显示内置对话框

- 显示加载对话框

```kotlin
fun showLoading(title: String)
```

- 取消加载对话框

```kotlin
fun dismissLoading()
```

- 显示下载对话框

```kotlin
fun showDownload()
```

- 设置下载对话框进度

```kotlin
fun setDownloadProgress(progress: Int)
```

- 取消下载对话框

```kotlin
fun dismissDownload()
```

## 在初始化布局前设置window相关属性

开发者可以通过重写`beforeInitLayout`方法，在GlassPage初始化布局前设置`window`相关`flag`。如下例如全屏等：

```kotlin
override fun beforeInitLayout() {
    super.beforeInitLayout()
    window.decorView.systemUiVisibility =
        View.SYSTEM_UI_FLAG_LAYOUT_STABLE or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
    val lp = window.attributes
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
        lp.layoutInDisplayCutoutMode =
            WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_SHORT_EDGES
    }
    window.attributes = lp
    window.setFlags(
        WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN
    );
}
```

## 切换滑动/滚动模式

开发者可以通过`setSlideEventMode`切换重用当前触摸板或旋钮原先的`前滑`、`后滑`事件，使之切换为`前滑距离`或`后滑距离`，同时用户若进行前滑或后滑操作，则会持续在`GlassPage`中的`onForwardMove`或`onBackwardMove`回调，开发者可以基于此特性实现前后滑动变焦或缩放等人机交互，改善XR眼镜操作体验。

```kotlin
/**
 * 切换滑块 滑动模式
 *
 * @param slideEventMode [com.mst.basics.slide.event.SlideEvent.Mode]
 */
protected fun setSlideEventMode(slideEventMode: Int) {
    slideEventManager.slideEventMode = slideEventMode
}
```

```java
public interface SlideEvent {

    interface Mode {
        /**
         * 前滑或者后滑(默认)
         */
        int FORWARD_OR_BACKWARD = 1;
        /**
         * 前滑距离或者后滑距离
         */
        int FORWARD_DISTANCE_OR_BACKWARD_DISTANCE = 2;
    }
}
```

## 页面级超级按键

在Activity中重写`onSuperKeyTrigger`方法可以捕捉到用户进行`触摸板长按`或`旋钮长按`的事件，我们推荐开发者将此`长按`事件作为页面内最重要操作的触发逻辑，如页面内导航指示的Tips或高优先级菜单项等，我们称之为`超级按键`。

```kotlin
override fun onSuperKeyTrigger() {
    super.onSuperKeyTrigger()
}
```

## 跳转页面

开发者可以通过`jumpPage`方法便捷的完成页面跳转并携带参数的操作，等效于`startActivity`等`Intent`传递操作。

```kotlin
open fun jumpPage(activity: Class<*>)

open fun jumpPage(activity: Class<*>, map: LinkedHashMap<String, String>)
```

