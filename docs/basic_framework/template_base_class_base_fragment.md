---
title: Fragment基类
date: 2024-03-19 09:00:00
---

Fragment用法基本与Activity保持一致。如果你掌握了[Activity基类](template_base_class_base_activity)的用法，那么`GlassBaseFragment`的用法将符合你的开发者直觉。

## 快速使用

创建一个新的`Fragment`继承自`GlassBaseFragment`，其中`GlassBaseFragment`继承时需要传入当前`Fragment`的`DataBinding`泛型类型和`ViewModel`类型，这样`GlassBaseFragment`的子类实例化时会根据类型信息通过反射自动创建`DataBinding`和`ViewModel`实例。以下是一个简易的代码示例。

:::: code-group
::: code-group-item TestFragment.kt

```kotlin
class MainActivity : GlassBaseFragment<FragmentTestBinding, EmptyViewModel>() {

    override fun initData() {

    }

    override fun initData() {

    }

    override fun initView() {
      	// v为FragmentTestBinding:ViewDataBinding的实例
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
::: code-group-item fragment_test.xml

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

### GlassBaseFragment基类结构

`GlassBaseFragment`继承自`BaseFragment`。它的主要结构如下：

```java
GlassBaseFragment
│
├── Methods
│   ├── onCreate(): Unit
│   ├── onResume(): Unit
│   └── onDestroy(): Unit
│
└── Parent
    └── BaseFragment
      └── androidx.fragment.app.Fragment
```

下面是每个部分的功能描述：

1. **Methods**: 类的方法，包括设生命周期事件处理（如`onResume`、`onPause`、`onDestroy`）等。

2. 最终父类为`androidx.fragment.app.Fragment`


### 获取当前的DataBinding实例

在`GlassBaseFragment`的子类中您可以通过v获取当前页面的`DataBinding`实例。

```kotlin
protected lateinit var v: DataBinding
```

### 获取当前的ViewModel实例

在`GlassBaseFragment`的子类中您可以通过vm获取当前页面的`ViewModel`实例。

```kotlin
protected lateinit var vm: ViewModel
```

#### EmptyViewModel

当开发者编写一些不需要`ViewModel`的简单页面时，可以在声明类的时候传入`EmptyViewModel`作为空`ViewModel`。例如：

```kotlin
class MainActivity : GlassBaseActivity<ActivityMainBinding, EmptyViewModel>() { }
```

### 快速获取所属Activity

开发者可以通过`baseActivity`字段获取当前`Fragment`所属的`GlassBaseActivity`，或者通过`activity`获取当前`Fragment`所属的`BaseActivity`(`GlassBaseActivity`的父类)。

```kotlin
lateinit var baseActivity: GlassBaseActivity<*, *>
protected var activity: BaseActivity<*, *>? = null
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

## 监听用户触发的各类操作交互

为了避免复杂的操作时间分发，我们推荐开发者从`GlassActivity`中重写相关事件回调方法，根据实际需求完成事件到`GlassBaseFragment`的分发传递。关于如何在`GlassActivity`中监听设备交互事件回调，详见[交互逻辑/监听手势操作](interaction_logic_listen.html#手势操作回调)

## 跳转页面

开发者可以通过`jumpPage`方法便捷的完成页面跳转并携带参数的操作，等效于`startActivity`等`Intent`传递操作。

```kotlin
open fun jumpPage(activity: Class<*>)

open fun jumpPage(activity: Class<*>, map: LinkedHashMap<String, String>)
```

