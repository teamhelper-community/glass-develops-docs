---
title: Application基类
date: 2024-03-19 09:00:00
---

使用`Glass Applicaton SDK`必须要自定义`Application`并且将其继承自` GlassBaseApplication`，`GlassBaseApplication`中完成了语音指令的初始化、屏幕适配的初始化以及相机等初始化。

具体使用参见[快速开始](../quick_start/quick_start)

创建自定义`Application`类继承自`GlassBaseApplication`，并在`AndroidManifest.xml`中注册你自定义的`Application`
类，将`App`的`theme`继承改为`Glass SDK`中的`Theme.Base.Glass`

:::: code-group
::: code-group-item App.kt

```kotlin
import com.mst.basics.GlassBaseApplication

class App : GlassBaseApplication()
```

:::
::: code-group-item App.java

```java
import com.mst.basics.GlassBaseApplication;

public class App extends GlassBaseApplication { }
```

:::
::::

:::: code-group
::: code-group-item AndroidManifest.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <application
        ...
        android:name="<your_package>.App"
        android:theme="@style/Theme.TestPlugin">
        ...
    </application>

</manifest>
```

:::
::::

:::: code-group
::: code-group-item themes.xml

```xml
<resources>
    <style name="Theme.TestPlugin" parent="Theme.Base.Glass" />
</resources>
```

:::
::::