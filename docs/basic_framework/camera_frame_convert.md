---
title: 相片帧格式转换          
date: 2024-04-15 01:25:00
---

## Image相关转换

### Image转I420 ByteArray

```kotlin
fun Image.toI420(): ByteArray
```

### Image转NV21 ByteArray

```kotlin
fun Image.toNV21(): ByteArray
```


### Image转RGBA ByteArray

```kotlin
fun Image.toRgba(): ByteArray
```

### Image转Bitmap

```kotlin
fun Image.toBitmap(): Bitmap
```

## ImageProxy相关转换


### ImageProxy转I420 ByteArray

```kotlin
fun ImageProxy.toI420(): ByteArray 
```

### ImageProxy转NV21 ByteArray

```kotlin
fun ImageProxy.toNV21(): ByteArray
```

### ImageProxy转RGBA ByteArray

```kotlin
fun ImageProxy.toRgba(): ByteArray
```

### ImageProxy转Bitmap

```kotlin
fun ImageProxy.toBitmapToolkit(): Bitmap
```

## Bitmap相关转换

### Bitmap转RGBA ByteArray

```kotlin
fun Bitmap.toRgba(): ByteArray
```

## ByteArray相关转换

### ByteArray转Bitmap

```
fun ByteArray.toBitmap(width: Int, height: Int): Bitmap
```