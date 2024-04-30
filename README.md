---
home: true
modules:
  - BannerBrand
  - Features
  - MdContent
  - Footer
bannerBrand:
  bgImage: '/bg.svg'
  title: AR-Glass Application Develops Tutorial
  description: 一套完整、标准的AR应用开发框架。
  tagline: 旨在为AR行业开发者提供统一的硬件交互接口、为用户在各厂商AR硬件上带来更一致使用体验、加速AR设备厂商构建更丰富的场景生态。框架底层拥有音视频远程协助、SOP、PNS、AI终端推理等核心服务，高效赋能三方开发者进行多场景下AR + AI应用的快速开发。
  buttons:
    - { text: 快速开始>_, link: '/docs/quick_start/introduce' }
    - { text: 探索下一代AR基座, link: '/docs/pluggable_container/overview_pluggable_container', type: 'plain' }
  socialLinks:
    - { icon: 'LogoGithub', link: 'https://github.com/teamhelper-community/glass-develops-docs' }
    - { icon: 'LogoWechat', link: '' }
    - { icon: 'LogoDiscord', link: '' }
    - { icon: 'Wikis', link: '' }
isShowTitleInHome: true
actionText: About
actionLink: /views/other/about
features:
  - title: 更一致的交互体验
    details: 统一市场上主流的AR眼镜各类触摸板、旋钮等操作交互，开发者只需关注业务本身，无需关注眼镜硬件底层人机交互。
  - title: 更成熟的硬件兼容
    details: 沉淀AR行业多年，已兼容适配多种主流AR眼镜的，包括Rokid、Vuzix、蜂巢Glass、Argooz、拜特尔等，后续将适配更多硬件。
  - title: 更现代的开发体验
    details: 提供Java/Kotlin等多种开发语言的SDK，拥有更丰富的DSL语法糖，紧跟现代Android应用开发趋势，提升开发者开发效率。
footer: # 底部模块的配置
  record: 苏ICP备2020070137号-1
  recordLink: https://beian.miit.gov.cn/
  startYear: 2024
---

## 快速开始

:::: code-group
::: code-group-item Gradle Groovy DSL

```gradle
dependencies {
    implementation 'com.teamhelper.xr:glass-sdk:<LatestVersion>'
    ...
}
```

:::
::: code-group-item Gradle Kotlin DSL

```kotlin
dependencies {
    implementation("com.teamhelper.xr:glass-sdk:<LatestVersion>")
    ...
}
```

:::
::::
