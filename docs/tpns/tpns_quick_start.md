---
title: TPNS概述
date: 2025-04-01 09:30:52
---

# Teamhelper TPNS SDK 开发者文档

TPNS（Teamhelper Push Notification System）是统一离线推送信令通道，旨在为 AR 眼镜操作系统等特殊平台提供系统级别的推送能力。SDK
分为两部分：

- **客户端 SDK**：主要用于弥补 AR 眼镜操作系统上缺少系统级推送消息的能力，集成于插件化基座 Launcher
  中，负责管理设备端的登录、消息订阅、消息接收及数据存储等功能。
- **服务端 SDK**：提供 RESTful API，供第三方业务系统后端调用，实现推送消息到指定设备。

---