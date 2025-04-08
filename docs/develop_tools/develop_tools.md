# 工具概述

<p align="center"><img src="https://ai-1258209752.cos.ap-shanghai.myqcloud.com/blog/banner.png" alt="image-20250408171943870" style="zoom:100%;"/></p>

**TeamhelperDeveloperTools （简称`TDT`）** 是一款内置 `ADB` 并基于其功能编写用户界面的桌面应用，支持安卓手机、安卓AR眼镜的设备调试。相比于原始的 `ADB`命令行输入，`TDT`安装简单，功能齐全，全图形化界面，一键操作，极大地提高用户效率。

:::info

最新版本：`ver 1.0.0`

下载地址：[`Windows x64`](https://ai-1258209752.cos.ap-shanghai.myqcloud.com/blog/TeamhelperDeveloperTools-1.0.0-win-x64.exe)，[`macOS ARM`](https://ai-1258209752.cos.ap-shanghai.myqcloud.com/blog/TeamhelperDeveloperTools-1.0.0-mac-arm64.dmg)，[`Linux`](https://ai-1258209752.cos.ap-shanghai.myqcloud.com/blog/TeamhelperDeveloperTools-1.0.0-linux-x86_64.AppImage) 

:::

<CoreVideoPlayer videoSrc="https://ai-1258209752.cos.ap-shanghai.myqcloud.com/blog/TeamhelperDeveloperTools.mp4" description="TeamhelperDeveloperTools：实机演示" width="80%"/>

通过阅读接下来的文档，你可以学习到如何通过 TeamhelperDeveloperTools 来对 Android 设备进行管理控制。

## 关于ADB

[ADB](https://developer.android.com/tools/adb?hl=zh-cn) 是 google 为 Android 系统开发的核心调试工具，伴随初代 Android
一同发布。通过 ADB，我们可以获取到 Android 设备的各种信息，也可以控制 Android 设备的诸多功能。无论是 Android
应用的开发、调试和性能分析，还是现有的各种云测真机调试平台，都离不开 ADB 的底层支持。

普通用户如果想要使用 ADB，首先要下载安装 Android的 [SDK 平台工具](https://developer.android.com/tools/releases/platform-tools?hl=zh-cn)，紧接着再通过 USB 或无线连接需要调试的Android 设备，最后再在终端里输入命令执行指定操作，比如执行 `adb install eruda-android.apk` 为设备安装指定应用。