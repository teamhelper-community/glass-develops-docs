---
title: 相机权限申请          
date: 2024-04-15 01:25:00
---

## 申请拍照权限

```kotlin
PermissionUtil.requestCamera(this, object : IPermissionListener {
    override fun onAgree() {

    }

    override fun onRefuse() {
        toast("请允许相机权限")
    }
})
```
