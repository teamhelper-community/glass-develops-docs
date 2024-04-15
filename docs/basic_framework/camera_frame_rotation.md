---
title: 相片帧旋转          
date: 2024-04-15 01:25:00
---

## Bitmap旋转

```kotlin
fun Bitmap.rotate(angle: Int): Bitmap
```

## ByteArray旋转

```kotlin
@IntDef(0, 90, 180, 270)
@Retention(AnnotationRetention.SOURCE)
annotation class RotationAngle

fun ByteArray.rotation(@RotationAngle angle: Int, width: Int, height: Int): ByteArray
```
