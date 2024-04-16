import {defineUserConfig} from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
    title: "Glass Develops Tutorial",
    description: "Just playing around",
    plugins: [],
    theme: recoTheme({
        autoSetBlogCategories: true,
        style: "@vuepress-reco/style-default",
        logo: "/logo.png",
        author: "Teamhelper Community",
        authorAvatar: "/head.png",
        docsRepo: "https://github.com/teamhelper-community/glass-develops-docs",
        docsBranch: "master",
        docsDir: ".",
        lastUpdatedText: "",
        commentConfig: {
            // type: 'giscus',
            // options: {
            //     repo: 'teamhelper-community/glass-develops-docs',
            //     repoId: 'R_kgDOLuSjuA',
            //     category: 'Announcements',
            //     categoryId: 'DIC_kwDOLuSjuM4CeseX',
            //     mapping: 'title',
            //     hideComments: false,
            //     strict: '1',
            //     lang: 'zh-CN',
            //     crossorigin: 'anonymous'
            // },
            type: 'valine',
            options: {
                appId: 'qzM3DTGNPFxSCsg9VvkRZLHF-gzGzoHsz',
                appKey: 'c8NnfIQsmMHbexDPhTiDAwkv',
                placeholder: '填写邮箱可以收到回复提醒哦！',
                verify: true, // 验证码服务
                // notify: true,
                recordIP: true,
                hideComments: false, // 隐藏评论
            }
        },
        algolia: {
            appId: 'WELM0SJYVF',
            apiKey: '10eeaa215dd6fb9a79f89f9a552d0ce6',
            indexName: 'dev_teamhelper_glass_sdk',
            inputSelector: '### REPLACE ME ####',
            algoliaOptions: {'facetFilters': ["lang:$LANG"]},
            debug: false // Set debug to true if you want to inspect the dropdown
        },
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
                    text: '行业动态',
                    children: [
                        '/blogs/verdantix_llm_report'
                    ],
                },
            ],
            "/docs/basic_framework/": [
                {
                    text: "Glass Application SDK",
                    children: [
                        "overview_template_base_class"
                    ],
                },
                {
                    text: "模板基类",
                    children: [
                        "template_base_class_base_application",
                        "template_base_class_base_activity",
                        "template_base_class_base_fragment",
                    ],
                },
                {
                    text: "交互逻辑",
                    children: [
                        "overview_interaction_logic",
                        "interaction_logic_sign",
                        "interaction_logic_focus",
                        "interaction_logic_voice",
                        "interaction_logic_listen"
                    ],
                },
                {
                    text: "UI 组件",
                    children: [
                        "overview_ui_components",
                        "ui_button",
                        "ui_input",
                        "ui_list_item",
                        "ui_list",
                        "ui_list_picker",
                        "ui_dialog",
                        "ui_notification",
                        "ui_status_bar",
                        "ui_tool_bar",
                        "ui_card",
                        "ui_expand_layer",
                    ],
                },
                {
                    text: "相机API",
                    children: [
                        "overview_camera_microphone",
                        "camera_permission",
                        "camera_photo",
                        "camera_video",
                        "camera_capture_frame",
                        "camera_frame_convert",
                        "camera_frame_rotation"
                    ],
                },
                {
                    text: "设计资源",
                    children: ["overview_design_resources"],
                }
            ],
            "/docs/pluggable_container/": [
                {
                    text: "Glass Plugin Container",
                    children: [
                        "overview_pluggable_container"
                    ],
                },
                {
                    text: "用户空间",
                    children: ["overview_user_space"],
                },
                {
                    text: "插件管理",
                    children: ["overview_plugin_management"],
                },
                {
                    text: "通信机制",
                    children: ["overview_communication_mechanism"],
                },
                {
                    text: "消息推送",
                    children: ["overview_push_message"],
                },
                {
                    text: "插件镜像源",
                    children: ["overview_plugin_mirror_source"],
                }
            ],
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
                            {text: '框架概览', link: '/docs/basic_framework/overview_template_base_class'},
                            {text: '模版基类', link: '/docs/basic_framework/template_base_class_base_application'},
                            {text: '交互逻辑', link: '/docs/basic_framework/overview_interaction_logic'},
                            {text: 'UI 组件', link: '/docs/basic_framework/overview_ui_components'},
                            {text: '相机API', link: '/docs/basic_framework/overview_camera_microphone',},
                            {text: '设计资源', link: '/docs/basic_framework/overview_design_resources'},
                        ],
                    },
                    {
                        text: '插件化容器',
                        children: [
                            {text: '容器阐述', link: '/docs/pluggable_container/overview_pluggable_container'},
                            {text: '用户空间', link: '/docs/pluggable_container/overview_user_space'},
                            {text: '插件管理', link: '/docs/pluggable_container/overview_plugin_management'},
                            {text: '通信机制', link: '/docs/pluggable_container/overview_communication_mechanism'},
                            {text: '消息推送', link: '/docs/pluggable_container/overview_push_message'},
                            {text: '插件镜像源', link: '/docs/pluggable_container/overview_plugin_mirror_source'},
                        ],
                    },

                ],
            },
            {
                text: '扩展能力',
                icon: 'SubVolume',
                children: [
                    {text: '远程协助', link: ''},
                    {
                        text: 'LLM知识库',
                        link: ''
                    },
                    {text: '人脸识别', link: ''},
                    {text: 'OCR组件', link: ''},
                    {text: 'SOP组件', link: ''},
                ],
            },
            {
                text: '版本路线',
                icon: 'SubVolume',
                children: [
                    {text: '1.0.0(RC)', link: '/docs/roadmap'},
                ],
            },
            {
                text: '技术博客',
                icon: 'DocumentAttachment',
                children: [
                    {text: '博客列表', link: '/posts'},
                    {text: '博客时间轴', link: '/timeline'},
                ]
            },
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
            <li>XR行业交流群：615444691</li>
            <li>XR开发者交流群：815386788</li>
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
            <li><a href="https://github.com/teamhelper-community/glass-develops-docs/issues">Issues<a/></li>
            <li><a href="https://github.com/teamhelper-community/glass-develops-docs/discussions/1">Discussions<a/></li>
          </ul>`,
                    style: "font-size: 12px;",
                }
            ],
        },
    }),
    // debug: true,
});
