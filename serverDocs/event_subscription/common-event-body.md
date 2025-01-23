
**事件体**

| 名称               | 类型    | 描述                                                 | 示例                                                 |
| ------------------ | ------- | ---------------------------------------------------- | ---------------------------------------------------- |
| version            | String  | 事件的版本                                           | 1.0                                                  |
| header.event_id    | String  | 事件消息唯一值                                       | bb224e75-f2fe-4455-aee0-0674ad9fc2f4                 |
| header.event_name  | String  | 事件名称                                             | 用户入职                                             |
| header.event_key   | String  | 事件key                                              | 事件KEY, 往往是领域模型的唯一标识                    |
| header.timestamp   | Long    | 事件发生时间戳（毫秒）                               | 一般是生产方的createdTime或updatedTime               |
| header.retry_count | Integer | 重试次数                                             | 从0开始, 每重试1次, 新增1, 直到最大重试次数          |
| header.app_id      | String  | App ID                                               |                                                      |
| header.token       | String  | token                                                | 字段即 Verification Token。                          |
| event              | Object  | 携带的事件数据, JSON格式, 根据不同的事件类型自行定义 | 携带的事件数据, JSON格式, 根据不同的事件类型自行定义 |

**事件体示例**

```JSON
{
    "version": "1.0",
    "header": { 
        "token": "066zT6pS4QCbgj5Do145GfDbbagCHGgF",    // token
        "event_id": "bb224e75-f2fe-4455-aee0-0674ad9fc2f4", // 事件消息唯一值
        "event_name": "用户离职", // 事件名称, 比如:  用户离职等
        "event_key": 100101002, // 事件KEY
        "timestamp": 1737262443448, // 事件发生毫秒时间戳, 一般是生产方的createdTime或updatedTime
        "retry_count": 0, // 重试次数, 从0开始, 每重试1次, 新增1, 直到最大重试次数    
        },
    "event":{}            // 携带的事件数据, JSON格式, 根据不同的事件类型自行定义
}
```

**响应体**

开发者在收到消息回调数据后**应在3秒内返回结果**。若超时未返回，开发会将本次消息回调的请求作为失败处理，影响开发者SLA。

开发者在处理消息回调后，应按照规范返回处理结果。**结果数据应为****json****格式，并放在http body中返回。**

**返回示例（成功返回）**

```Java
{ "code":200, "msg":"success" }
```

**返回示例（失败返回）**

```Java
{ "code":-1, "msg":"error" }
```