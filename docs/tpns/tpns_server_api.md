---
title: TPNS 服务端SDK
date: 2025-04-01 09:30:52
---

## 1. 服务端 SDK 简介

服务端 SDK 提供 RESTful API，供第三方业务系统后端调用，主要功能包括：

- **消息推送**：通过调用 API，向指定设备推送消息。
- **消息状态查询**：支持查询消息投递、接收状态等信息。
- **安全认证**：使用 Token 或其他安全机制进行接口调用认证，确保消息传输安全。

# TPNS服务接口列表

1. ## 生成signature

计算签名关键的参数如下:

| 变量名    | 含义           | 类型   | 备注          |
| --------- | -------------- | ------ | ------------- |
| appKey    | 应用唯一标识   | String | 应用AppKey    |
| appSecret | 应用授权密钥   | String | 应用AppSecret |
| timestamp | 签名到期时间戳 | String | 毫秒级时间戳  |

Java获取签名值signature的示例代码如下:

```typescript
/**
* 签名算法
*
* @param signMap       所有参数
* @param appSecret    应用AppSecret
* @return
*/
public static String generateSignature(Map<String, Object> signMap,
                                    String appSecret) {
    // 生成签名字符数据
    String data = sortKeysAndConcatenateValues(signMap);
    // 密钥转为byte数组
    byte[] bytes = appSecret.getBytes(StandardCharsets.UTF_8);
    // 签名密钥
    SecretKeySpec signingKey = new SecretKeySpec(bytes, "HmacSHA256");
    // 开始计算签名
    Mac mac = null;
    try {
        mac = Mac.getInstance("HmacSHA256");
    } catch (NoSuchAlgorithmException e) {
        log.error(e.getMessage(), e);
    }
    try {
        mac.init(signingKey);
    } catch (InvalidKeyException e) {
        log.error(e.getMessage(), e);
    }
    byte[] rawHmac = mac.doFinal(data.getBytes(StandardCharsets.UTF_8));
    String signature = Base64.getEncoder().encodeToString(rawHmac);
    return signature;
}

/**
* key按照首字母, 依据ASCII码排序, 拼接value值
*
* @param signMap 全部参与签名的键值对
* @return
*/
private static String sortKeysAndConcatenateValues(Map<String, Object> signMap) {
    // 使用TreeMap对键进行排序
    Map<String, Object> sortedMap = new TreeMap<>(signMap);
    StringBuilder result = new StringBuilder("");
    // 遍历排序后的Map，拼接值
    for (Map.Entry<String, Object> entry : sortedMap.entrySet()) {
        result.append(entry.getValue());
    }
    return result.toString().toUpperCase();
}
```

1. ## 公共接口参数

- 功能说明
    - 规范API接口的请求参数
- 公共请求头 无
- 公共请求体

| 字段名称  | 字段描述       | 是否必填 | 类型   | 备注                                        |
| --------- | -------------- | -------- | ------ | ------------------------------------------- |
| appKey    | 应用唯一标识   | 是       | String | 开发者平台创建应用获取                      |
| timestamp | 签名到期时间戳 | 是       | String | 毫秒级时间戳,开发者根据自己的业务系统自定义 |
| signature | 签名值         | 是       | String | 签名算法计算得出                            |

- 公共响应体

| 参数 | 类型    | 是否必填 | 说明                          |
| ---- | ------- | -------- | ----------------------------- |
| code | Integer | 是       | 响应状态码: 200, 代表响应成功 |
| msg  | String  | 是       | 响应提示语                    |
| data | Object  | 否       | 响应数据                      |

- 响应体示例

```json
{
    "code": "200",
    "msg": "success",
    "data": {}
}
```

1. ## 获取连接授权码

- 功能说明：获取授权码，用于WebSocket连接
- 接口地址 POST http://tpns.teamhelper.cn/tpns/message/authorize
- 请求头 无
- 请求体

| 参数       | 类型   | 是否必填 | 说明           |
| ---------- | ------ | -------- | -------------- |
| deviceCode | String | 是       | 设备唯一识别码 |

- 请求体示例

```JSON
{
    "appKey":"55378b68709f40729876",
    "timestamp":"1743512623840",
    "deviceCode":"607ca2bbdc464020848b",
    "signature":"cea684c9-8cea4ffdaaa7a4f9bc052f7c"
}
```

- 响应体

| 参数 | 类型    | 是否必填 | 说明                          |
| ---- | ------- | -------- | ----------------------------- |
| code | Integer | 是       | 响应状态码: 200, 代表响应成功 |
| msg  | String  | 是       | 响应提示语                    |
| data | Object  | 否       | 响应数据                      |

data 响应数据说明

| 参数 | 类型   | 是否必填 | 说明       |
| ---- | ------ | -------- | ---------- |
| code | String | 是       | 连接授权码 |

- 响应体示例

```json
{
    "code": 200,
    "msg": "Succeed",
    "data": {
        "code": "cea684c9-8cea-4ffd-aaa7-a4f9bc052f7c"
    }
}
```

错误响应

```json
{
    "code": 10601,
    "msg": "应用不存在",
    "data": null
}

// 应用签名错误
{
    "code": 403,
    "msg": "Forbidden",
    "data": null
}
```

1. ## 发送消息接口

- 功能说明：消息发送接口
- 接口地址 POST http://tpns.teamhelper.cn/tpns/message/sendMessage
- 请求头 无
- 请求体

| 参数        | 类型   | 是否必填 | 说明           |
| ----------- | ------ | -------- | -------------- |
| deviceCode  | String | 是       | 设备唯一识别码 |
| messageBody | Object | 是       | 消息体         |

messageBody

| 参数          | 类型    | 是否必填 | 说明                                                         |
| ------------- | ------- | -------- | ------------------------------------------------------------ |
| fromUserId    | Long    | 是       | 发送UserId                                                   |
| fromAppId     | String  | 是       | 发送AppId                                                    |
| toUserId      | String  | 是       | 接收用户ID                                                   |
| toAppId       | String  | 是       | APPId                                                        |
| toPackageName | String  | 否       | 接收应用包名称                                               |
| type          | Integer | 是       | 消息类型 需要定义, 比如: SYSTEM = 0; // 系统级消息   APP = 1; // 应用级消息 |
| level         | Integer | 是       | 消息级别：  LOW = 0; // 低优先级   NORMAL = 1; // 普通优先级   HIGH = 2; // 高优先级   URGENT = 3; // 紧急优先级 |
| title         | String  | 是       | 消息标题                                                     |
| content       | String  | 是       | 消息内容                                                     |
| icon          | String  | 是       | 图标                                                         |

- 请求体示例

```JSON
{
    "appKey": "10000",
    "timestamp": 1742817435892,
    "signature": "oH4kx6VcvsqRz+L8HNbqmr3tSeoBcUH/eaz85ilXLOg=",
    "deviceCode": "1",
    "messageBody": "{\"client\":\"Glass\",\"fromUserId\":\"8\",\"toUserId\":\"7\",\"type\":\"1\",\"level\":\"1\",\"extraPayload\":\"{\\\"eventType\\\":\\\"inviteMeeting\\\",\\\"eventValue\\\":{\\\"invitorId\\\":\\\"10\\\",\\\"meetingNo\\\":\\\"697885890\\\"}}\"}"
}
```

- 响应体

| 参数 | 类型    | 是否必填 | 说明                          |
| ---- | ------- | -------- | ----------------------------- |
| code | Integer | 是       | 响应状态码: 200, 代表响应成功 |
| msg  | String  | 是       | 响应提示语                    |
| data | Object  | 否       | 响应数据                      |

data 响应数据说明

- 响应体示例

```json
{
    "code": 200,
    "msg": "Succeed",
    "data": null
}
```

错误响应

```json
{
    "code": 10601,
    "msg": "应用不存在",
    "data": null
}

// 应用签名错误
{
    "code": 403,
    "msg": "Forbidden",
    "data": null
}
```

