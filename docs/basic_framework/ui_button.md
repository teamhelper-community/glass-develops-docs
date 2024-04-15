---
title: 按钮(Button)
date: 2024-04-15 01:25:00
---

![image-20240415014940681](./ui_button.assets/image-20240415014940681.png)

## Filled Button填充按钮

### 预览OVERVIEW

![image-20240415015139044](./ui_button.assets/image-20240415015139044.png)

### 基础用法

```xml
<com.mst.basics.slide.widget.v2.GlassButton
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginEnd="@dimen/dp_10"
    app:sign="1"
    android:text="文字按钮" />
```

### 设置图标

```xml
<com.mst.basics.slide.widget.v2.GlassButton
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginEnd="@dimen/dp_10"
    app:sign="1"
    android:text="文字按钮"
    app:icon="@drawable/baseline_add"
    app:iconPosition="left" />
```

### 设置图标位置

```xml
<com.mst.basics.slide.widget.v2.GlassButton
    android:id="@+id/btn_9"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginEnd="@dimen/dp_10"
    app:sign="1"
    android:text="文字按钮"
    app:icon="@drawable/baseline_arrow_forward_ios"
    app:iconPosition="right" />
```

## Outlined Button边框按钮

![image-20240415015905785](./ui_button.assets/image-20240415015905785.png)

### 基础用法

```xml
<com.mst.basics.slide.widget.v2.GlassButton
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginEnd="@dimen/dp_10"
    app:sign="1"
    android:text="文字按钮"
		app:glassButtonStyle="outlined"/>
```

### 设置图标

```xml
<com.mst.basics.slide.widget.v2.GlassButton
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginEnd="@dimen/dp_10"
    app:sign="1"
    android:text="文字按钮"
    app:icon="@drawable/baseline_add"
    app:iconPosition="left"
		app:glassButtonStyle="outlined"/>
```

### 设置图标位置

```xml
<com.mst.basics.slide.widget.v2.GlassButton
    android:id="@+id/btn_9"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginEnd="@dimen/dp_10"
    app:sign="1"
    android:text="文字按钮"
    app:icon="@drawable/baseline_arrow_forward_ios"
    app:iconPosition="right"
		app:glassButtonStyle="outlined"/>
```
