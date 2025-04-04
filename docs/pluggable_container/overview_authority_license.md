---
title: 容器鉴权须知
date: 2024-04-17 15:43:00
---

# 容器鉴权须知

为了保障我们容器的稳定运行和知识产权的合法性，我们实施了容器鉴权机制。以下是关于鉴权的重要信息和须知：

## 鉴权机制简介

我们的容器基于安卓平台开发，并提供了丰富的功能 API 和硬件兼容性。为了确保容器的合法使用，我们采用了鉴权服务器来管理许可证。

## 开发调试许可证

在开发和调试阶段，我们提供了一个鉴权服务器供使用。每次打包后，您可以从该服务器获取一个有效期为 7 天的许可证。此许可证仅用于开发和调试，不可用于生产环境。

## 许可证到期提示

一旦许可证到期，容器将提示许可证已过期，需要重新打包获取新的许可证方可继续使用。我们建议您及时更新许可证，以确保容器的正常运行。

## 长期许可证

如需长期使用容器，您可以选择私有化部署授权服务器。通过私有化部署，您可以生成长期有效的许可证，以满足您的业务需求。

## 合规性和法律责任
请确保您使用容器的方式符合当地法律法规和相关规定。任何违反法律法规或侵犯他人权益的行为，都将由您个人或您所在组织承担法律责任。

## 技术支持
如您在鉴权过程中遇到任何问题或需要技术支持，请随时与我们联系。我们将竭诚为您提供帮助和支持。
