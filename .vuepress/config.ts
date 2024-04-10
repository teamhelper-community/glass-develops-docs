import {defineUserConfig} from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
    title: "Glass Develops Tutorial",
    description: "Just playing around",
    theme: recoTheme({
        style: "@vuepress-reco/style-default",
        logo: "/logo.png",
        author: "Finger",
        authorAvatar: "/head.png",
        docsRepo: "https://github.com/vuepress-reco/vuepress-theme-reco-next",
        docsBranch: "main",
        docsDir: "example",
        lastUpdatedText: "",
        // series 为原 sidebar
        series: {
            "/docs/quick_start/": [
                {
                    text: "快速开始",
                    children: ["introduce", "supportive", "quick_start"],
                }
            ],
            '/blogs/': [
                {
                    text: 'blogs1',
                    children: [
                        '/blogs/deploy.md'
                    ],
                },
            ]
        },
        navbar: [
            {text: '快速开始', link: '/docs/quick_start/introduce', icon: 'Compass'},
            {
                text: 'API文档',
                icon: 'Document',
                children: [
                    {
                        text: '基础框架',
                        children: [
                            {text: '模版基类', link: '/docs/basic_framework/模版基类.html'},
                            {text: '交互逻辑', link: '/docs/basic_framework/模版基类.html'},
                            {text: 'UI 组件', link: '/docs/basic_framework/UI 组件.html'},
                            {text: '相机/麦克风', link: '/docs/basic_framework/相机_麦克风.html',},
                            {text: '设计资源', link: '/docs/basic_framework/设计资源.html'},
                        ],
                    },
                    {
                        text: '插件化容器',
                        children: [
                            {text: '用户空间', link: '/docs/pluggable_container/用户空间.html'},
                            {text: '插件管理', link: '/docs/pluggable_container/插件管理.html'},
                            {text: '通信机制', link: '/docs/pluggable_container/通信机制.html'},
                            {text: '消息推送', link: '/docs/pluggable_container/消息推送.html'},
                            {text: '插件镜像源', link: '/docs/pluggable_container/插件镜像源.html'},
                        ],
                    },

                ],
            },
            {
                text: '扩展能力',
                icon: 'SubVolume',
                children: [
                    {text: '远程协助', link: 'https://v2.vuepress.vuejs.org/zh/reference/docs/plugins/vue-previews'},
                    {
                        text: 'LLM知识库',
                        link: 'https://v2.vuepress.vuejs.org/zh/reference/docs/plugins/bulletin-popover'
                    },
                    {text: '人脸识别', link: 'https://v2.vuepress.vuejs.org/zh/reference/docs/plugins/page'},
                    {text: 'OCR组件', link: 'https://v2.vuepress.vuejs.org/zh/reference/docs/plugins/comments'},
                    {text: 'SOP组件', link: 'https://v2.vuepress.vuejs.org/zh/reference/docs/plugins/bulletin-popover'},
                ],
            },
            {
                text: '版本路线',
                icon: 'SubVolume',
                children: [
                    {text: '1.x(RC)', link: '/api/1.x/'},
                ],
            },
            {text: '技术博客', link: '/posts', icon: 'DocumentAttachment'},
            {text: '案例', link: '/docs/examples', icon: 'Fire'},
            {text: '留言板', link: '/docs/message-board', icon: 'Chat'},
        ],
        bulletin: {
            body: [
                {
                    type: "text",
                    content: `🎉🎉🎉 TH 太昊开发者平台正式发布，并且希望开发者们在 QQ 社群和 GitHub 踊跃反馈使用体验和开发需求，我们会第一时间响应。推出统一开发框架是为了补全XR眼镜的通用能力的同时将魔数团在B端业务上的核心服务沉淀下来共享给全行业，换而言之，你们只管开发，我们来搞定各厂商硬件适配。`,
                    style: "font-size: 12px;",
                },
                {
                    type: "hr",
                },
                {
                    type: "title",
                    content: "开发社群",
                },
                {
                    type: "text",
                    content: `
          <ul>
            <li>XR行业交流群：<_待_填_写_></li>
            <li>XR开发者交流群：<_待_填_写_></li>
          </ul>`,
                    style: "font-size: 12px;",
                },
                {
                    type: "hr",
                },
                {
                    type: "title",
                    content: "GitHub",
                },
                {
                    type: "text",
                    content: `
          <ul>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
          </ul>`,
                    style: "font-size: 12px;",
                }
            ],
        },
        commentConfig: {
            type: 'valine',
            // options 与 1.x 的 valineConfig 配置一致
            options: {
                // appId: 'xxx',
                // appKey: 'xxx',
                // placeholder: '填写邮箱可以收到回复提醒哦！',
                // verify: true, // 验证码服务
                // notify: true,
                // recordIP: true,
                // hideComments: true // 隐藏评论
            },
        },
    }),
    // debug: true,
});
