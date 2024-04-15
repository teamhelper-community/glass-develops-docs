---
title: 实时捕获相片帧          
date: 2024-04-15 01:25:00
---

## 获取实时相片帧

```java
/**
 * OCR SCAN RTC使用
 *
 * @param textureView
 * @param onImageAvailableListener
 */
public void openCamera(TextureView textureView, IOnImageAvailableListener onImageAvailableListener);
```

### Kotlin用法

```kotlin
PermissionUtil.requestCameraLocationStorage(this, object : IPermissionListener {
    override fun onAgree() {
        vm.mCamera.openCamera(v.textureView) { image ->
            
        }
    }

    override fun onRefuse() {
        toast("请允许相机权限")
    }
})
```
