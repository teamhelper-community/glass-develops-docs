import {defineUserConfig} from "vuepress";
import recoTheme from "vuepress-theme-reco";
import {viteBundler} from '@vuepress/bundler-vite'

export default defineUserConfig({
    bundler: viteBundler(),
    title: "Glass Develops Tutorial",
    description: "AR-Glass Application Develops Tutorial",
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
                notify: true,
                recordIP: true,
                hideComments: false, // 隐藏评论
            }
        },
        algolia: {
            appId: '2MCEBPKXXR',
            apiKey: '4c0972c42ec280548cd4e725d2028d4c',
            indexName: 'teamhelper',
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
                        "overview_pluggable_container",
                        "design_standards",
                        "key_tech_points",
                        "tech_design",
                        "core_architecture",
                    ],
                },
                {
                    text: "快速搭建",
                    children: [
                        "quick_start",
                        "standard_container_arch",
                        "glass_plugin_application_develop"
                    ],
                },
                {
                    text: "用户空间",
                    children: [
                        "overview_user_space",
                        "create_user_space",
                        "delete_user_space"
                    ],
                },
                {
                    text: "插件管理",
                    children: [
                        "install_plugin",
                        "uninstall_plugin",
                        "update_plugin",
                        "load_plugin",
                        "kill_plugin",
                        "clear_plugin_data",
                        "list_plugins",
                        "plugin_application_lifecycle"
                    ],
                },
                {
                    text: "消息推送",
                    children: ["overview_push_message"],
                },
                {
                    text: "插件镜像源",
                    children: ["overview_plugin_mirror_source"],
                },
                {
                    text: "授权许可",
                    children: [
                        "overview_authority_license",
                        "authority_client_side",
                        "authority_server_side"
                    ],
                },
            ],
            "/docs/bridge/": [
                {
                    text: "Bridge通信",
                    children: [
                        "bridge_quick_start",
                        "bridge_api",
                    ],
                },
            ],
            "/docs/tpns/": [
                {
                    text: "TPNS推送消息",
                    children: [
                        "tpns_quick_start",
                        "tpns_api",
                        "tpns_server_api"
                    ],
                },
            ],
            '/docs/develop_tools/': [
                {
                    text: '前言',
                    children: [
                        "develop_tools.md"
                    ]
                },
                {
                    text: '快速开始',
                    children: [
                        'quickstart'
                    ],
                },
                {
                    text: '功能列表',
                    children: [
                        'overview',
                        'file',
                        'application',
                        'process',
                        'performance',
                        'shell',
                        'screenshot',
                        'logcat',
                        'webview',
                        'screencast'
                    ],
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
                            {text: '快速搭建', link: '/docs/pluggable_container/quick_start'},
                            {text: '用户空间', link: '/docs/pluggable_container/overview_user_space'},
                            {text: '插件管理', link: '/docs/pluggable_container/overview_plugin_management'},
                            {text: '通信机制', link: '/docs/pluggable_container/inter_application_communication'},
                            {text: '消息推送', link: '/docs/pluggable_container/overview_push_message'},
                            {text: '插件镜像源', link: '/docs/pluggable_container/overview_plugin_mirror_source'},
                            {text: '授权许可', link: '/docs/pluggable_container/overview_authority_license'}
                        ],
                    },
                    {
                        text: 'Bridge通信',
                        children: [
                            {text: '快速开始', link: '/docs/bridge/bridge_quick_start'},
                            {text: '客户端SDK', link: '/docs/bridge/bridge_api'},
                        ],
                    },
                    {
                        text: 'TPNS推送消息',
                        children: [
                            {text: '快速开始', link: '/docs/tpns/tpns_quick_start'},
                            {text: '客户端SDK', link: '/docs/tpns/tpns_api'},
                            {text: '服务端SDK', link: '/docs/tpns/tpns_server_api'},
                        ],
                    },
                ],
            },
            {
                text: '开放平台',
                icon: 'SubVolume',
                children: [
                    {
                        text: '认证体系',
                        children: [
                            {text: '基本概念', link: '/serverDocs/certification_system/basic-concepts'},
                            {text: '接入流程', link: '/serverDocs/certification_system/integration-process'},
                        ],
                    },
                    {
                        text: '应用登录和授权',
                        children: [
                            {text: '眼镜应用登录', link: '/serverDocs/application_authorization/glass-application'},
                            {text: '网页应用登录', link: '/serverDocs/application_authorization/web-application'},
                        ],
                    },
                    {
                        text: 'API调用指南',
                        children: [
                            {text: '调用流程', link: '/serverDocs/api_call_guide/calling-process'},
                            {text: 'API列表', link: '/serverDocs/api_call_guide/api-list'},
                            {text: '通用参数', link: '/serverDocs/api_call_guide/common-parameters'},
                        ],
                    },
                    {
                        text: '事件订阅',
                        children: [
                            {text: '事件概述', link: '/serverDocs/event_subscription/event-overview'},
                            {text: '事件列表', link: '/serverDocs/event_subscription/event-list'},
                            {text: '通用事件体', link: '/serverDocs/event_subscription/common-event-body'},
                        ],
                    },
                ],
            },
            {
                text: '扩展能力',
                icon: 'SubVolume',
                children: [
                    {text: '远程协助', link: ''},
                    {text: 'LLM知识库', link: ''},
                    {text: '人脸识别', link: ''},
                    {text: 'OCR组件', link: ''},
                    {text: 'SOP组件', link: ''},
                ],
            },
            {
                text: '版本路线',
                icon: 'SubVolume',
                children: [
                    {
                        text: 'Nexus',
                        link: 'http://maven.teamhelper.cn:8081/#browse/browse:MST:com%2Fteamhelper%2Fxr'
                    },
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
            {
                text: '开发者工具',
                icon: 'Code',
                link: '/docs/develop_tools/develop_tools'
            },
            {text: '案例', link: '/docs/examples', icon: 'Fire'},
            {text: '留言板', link: '/docs/message-board', icon: 'Chat'},
        ],
        bulletin: {
            body: [
                {
                    type: "text",
                    content: `🎉🎉🎉 TH 太昊开发者平台正式发布，并且希望开发者们在 QQ 社群和 GitHub 踊跃反馈使用体验和开发需求，我们会第一时间响应。推出统一开发框架是为了补全AR眼镜的通用能力的同时将魔数团在B端业务上的核心服务沉淀下来共享给全行业，换而言之，你们只管开发，我们来搞定各厂商硬件适配。`,
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
            <li>AR行业交流群：615444691</li>
            <li>AR开发者交流群：815386788</li>
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
    })
    // debug: true,
});
