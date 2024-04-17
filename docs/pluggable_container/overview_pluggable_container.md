---
title: 容器阐述
date: 2024-04-16 15:02:00
---

## 插件化技术介绍

在Android开发中，插件化和容器技术是一种非常重要的技术策略，它们可以使我们的应用程序更加模块化，更容易扩展和维护，可以实现免安装运行APK的需求。插件化容器是基于对Android系统Framework层的虚拟化，是基于Framework虚拟化的沙盒系统，可以理解为轻量级的“Android虚拟机”。其形态为高可扩展，类似框架如`VirtualApp`目前被广泛应用于APP多开、程序移植、移动办公安全、军队政府数据隔离、手机模拟信息、脚本自动化、插件化开发、无感知热更新、云控等技术领域。

<p align="center"><img src="./overview_pluggable_container.assets/process.png" alt="img" width="600"/></p>

## 研发初衷

实现免安装运行APK，并将核心能力抽象为服务作为独立的APK插件加载独立维护，可以实现远程动态加载业务APK，并自由调用容器内的APK服务，这便是`Glass Plugin Container`的研发初衷。



