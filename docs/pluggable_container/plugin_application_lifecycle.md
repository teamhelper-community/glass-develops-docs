---
title: 监听插件应用的生命周期
date: 2024-04-17 15:43:00
---

## 生命周期

我们提供了和标准的安卓应用Application生命周期监听几乎一致的插件应用的生命周期监听方法，可以监听`Application`和`Activity`的全生命周期状态。以下是代码示例：

```kotlin
BlackBoxCore.get().addAppLifecycleCallback(object : AppLifecycleCallback() {
    override fun afterApplicationOnCreate(
        packageName: String?,
        processName: String?,
        application: Application,
        userId: Int
    ) {
        Log.d(TAG, "beforeApplicationOnCreate: pkg $packageName, processName $processName")
        super.afterApplicationOnCreate(packageName, processName, application, userId)
    }

    override fun onActivityResumed(activity: Activity) {
        super.onActivityResumed(activity)
    }


    override fun onActivityDestroyed(activity: Activity) {
        super.onActivityDestroyed(activity)
    }
    
    ...更多的监听回调
})
```

## 完整的生命周期监听API

```java
public class AppLifecycleCallback implements Application.ActivityLifecycleCallbacks {

    public void beforeCreateApplication(String packageName, String processName, Context context, int userId) {

    }

    public void beforeApplicationOnCreate(String packageName, String processName, Application application, int userId) {

    }

    public void afterApplicationOnCreate(String packageName, String processName, Application application, int userId) {

    }

    @Override
    public void onActivityCreated(Activity activity, Bundle savedInstanceState) {

    }

    @Override
    public void onActivityStarted(Activity activity) {

    }

    @Override
    public void onActivityResumed(Activity activity) {

    }

    @Override
    public void onActivityPaused(Activity activity) {

    }

    @Override
    public void onActivityStopped(Activity activity) {

    }

    @Override
    public void onActivitySaveInstanceState(Activity activity, Bundle outState) {

    }

    @Override
    public void onActivityDestroyed(Activity activity) {

    }
}
```
