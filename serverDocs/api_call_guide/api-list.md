# 认证及授权

### Web端获取code

- 请求地址：

  - ```Bash
    https://api-v3.teamhelper.cn/open-apis/authen/v1/authorize
    ```

- 请求方式：GET

- 请求头

| 名称          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| Content-Type  | string | 是   | 请求体类型。固定值：application/json; charset=utf-8          |
| Authorization | string | 是   | access_token以登录用户身份调用 API，可读写的数据范围由用户可读写的数据范围决定。值格式："Bearer access_token"示例值："Bearer u-cjz1eKCEx289x1TXEiQJqAh5171B4gDHPq00l0GE1234" |

- 请求参数：

| 参数         | 是否必须 | 说明                                                         |
| ------------ | -------- | ------------------------------------------------------------ |
| client_id    | 是       | 应用唯一标识，在应用中心提交应用审核通过后获得App ID         |
| redirect_uri | 是       | 应用重定向地址，在用户授权成功后会跳转至该地址，同时会携带 code 以及 state 参数（如有传递 state 参数）。 请注意：Web端必填 该地址需经过 URL 编码； 调用本接口前，你需要在开发者后台应用的安全设置页面，将用于接受 OAuth 回调的 HTTP GET 请求接口地址配置为应用的重定向 URL。重定向 URL 支持配置多个，只有在重定向 URL 列表中的 URL 才会通过开放平台的安全校验。 |
| scope        | 是       | 应用授权作用域，获取用户个人信息则填写 snsapi_base（只能填 snsapi_base） |
| state        | 否       | 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验。在state传递的过程中会将该参数作为url的一部分进行处理，因此建议对该参数进行url encode操作，防止其中含有影响url解析的特殊字符（如'#'、'&'等）导致该参数无法正确回传。 |

- 响应参数：

| 名称         | 类型   | 描述                                                         |
| ------------ | ------ | ------------------------------------------------------------ |
| code         | int    | 错误码，非 200 表示失败                                      |
| msg          | string | 错误描述                                                     |
| data         | -      | -                                                            |
| client_id    | string | 应用唯一标识，在应用中心提交应用审核通过后获得App ID         |
| redirect_uri | string | 应用重定向地址，在用户授权成功后会跳转至该地址，同时会携带 code 以及 state 参数（如有传递 state 参数）。 请注意： 该地址需经过 URL 编码； 调用本接口前，你需要在开发者后台应用的安全设置页面，将用于接受 OAuth 回调的 HTTP GET 请求接口地址配置为应用的重定向 URL。重定向 URL 支持配置多个，只有在重定向 URL 列表中的 URL 才会通过开放平台的安全校验。 |
| code         | string | 授权码                                                       |
| state        | string | 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验。在state传递的过程中会将该参数作为url的一部分进行处理，因此建议对该参数进行url encode操作，防止其中含有影响url解析的特殊字符（如'#'、'&'等）导致该参数无法正确回传。 |

- 示例说明：

```Plain
{
    "code":200,
    "msg":"成功",
    "data":{
        "grant_type": "authorization_code",
        "client_id": "cli_a5ca35a685b0x26e",
        "code": "a61hb967bd094dge949h79bbexd16dfe",
        "redirect_uri": "https://example.com/api/oauth/callback",
        "code_verifier": "TxYmzM4PHLBlqm5NtnCmwxMH8mFlRWl_ipie3O0aVzo"
    }
}
```

### 眼镜端获取code

​	开发者需要引入基座App提供的 SDK，并通过 SDK 提供的 API 来唤起基座App客户端并进行授权登录，用户点击确认授权之后，基座App客户端会唤起开发者客户端，并携带授权码（code）。

- 请求地址：

  - ```Bash
    https://api-v3.teamhelper.cn/open-apis/authen/v1/authorize
    ```

- 请求方式：POST

- 请求头

| 名称          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| Content-Type  | string | 是   | 请求体类型。固定值：application/json; charset=utf-8          |
| Authorization | string | 是   | access_token以登录用户身份调用 API，可读写的数据范围由用户可读写的数据范围决定。值格式："Bearer access_token"示例值："Bearer u-cjz1eKCEx289x1TXEiQJqAh5171B4gDHPq00l0GE1234" |

- 请求参数：

| 参数      | 是否必须 | 说明                                                         |
| --------- | -------- | ------------------------------------------------------------ |
| client_id | 是       | 应用唯一标识，在应用中心提交应用审核通过后获得App ID         |
| scope     | 是       | 应用授权作用域，获取用户个人信息则填写 snsapi_base（只能填 snsapi_base） |
| state     | 否       | 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验。在state传递的过程中会将该参数作为url的一部分进行处理，因此建议对该参数进行url encode操作，防止其中含有影响url解析的特殊字符（如'#'、'&'等）导致该参数无法正确回传。 |

- 响应参数：

| 名称      | 类型   | 描述                                                         |
| --------- | ------ | ------------------------------------------------------------ |
| code      | int    | 错误码，非 200 表示失败                                      |
| msg       | string | 错误描述                                                     |
| data      | -      | -                                                            |
| client_id | string | 应用唯一标识，在应用中心提交应用审核通过后获得App ID         |
| code      | string | 授权码                                                       |
| state     | string | 用于保持请求和回调的状态，授权请求后原样带回给第三方。该参数可用于防止 csrf 攻击（跨站请求伪造攻击），建议第三方带上该参数，可设置为简单的随机数加 session 进行校验。在state传递的过程中会将该参数作为url的一部分进行处理，因此建议对该参数进行url encode操作，防止其中含有影响url解析的特殊字符（如'#'、'&'等）导致该参数无法正确回传。 |

- 示例说明：

```Plain
{
    "code":200,
    "msg":"成功",
    "data":{
        "grant_type": "authorization_code",
        "client_id": "cli_a5ca35a685b0x26e",
        "code": "a61hb967bd094dge949h79bbexd16dfe",
        "redirect_uri": "https://example.com/api/oauth/callback",
        "code_verifier": "TxYmzM4PHLBlqm5NtnCmwxMH8mFlRWl_ipie3O0aVzo"
    }
}
```

## 获取access_token

- 请求地址：

  - ```Bash
    https://api-v3.teamhelper.cn/open-apis/authen/v1/oauth/token
    ```

- 请求方式：POST

- 请求参数：

  - 请求头

    - | 名称         | 类型   | 必填 | 描述                                                |
      | ------------ | ------ | ---- | --------------------------------------------------- |
      | Content-Type | string | 是   | 请求体类型。固定值：application/json; charset=utf-8 |
      | user-client  | int    | 是   |                                                     |

  - 请求体

    - | 名称          | 类型   | 必填 | 描述                                                         |
      | ------------- | ------ | ---- | ------------------------------------------------------------ |
      | grant_type    | string | 是   | 授权类型。固定值：authorization_code                         |
      | client_id     | string | 是   | 应用的 App ID，可以在开发者后台中的应用详情页面找到该值。示例值：cli_a5ca35a685b0x26e |
      | client_secret | string | 是   | 应用的 App Secret，可以在开发者后台中的应用详情页面找到该值。示例值：baBqE5um9LbFGDy3X7LcfxQX1sqpXlwy |
      | code          | string | 是   | 授权码。示例值：a61hb967bd094dge949h79bbexd16dfe             |
      | redirect_uri  | string | 否   | 在构造授权页页面链接时所拼接的应用回调地址。网页应用授权场景必填，且需要严格与获取授权码时设置的 redirect_uri 保持一致，眼镜端授权场景无需传递 |
      | code_verifier | string | 否   | 在发起授权前，本地生成的随机字符串，用于 PKCE（Proof Key for Code Exchange）流程。使用 PKCE 时，该值为必填项。有关 PKCE 的详细介绍，请参阅 [RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients](https://datatracker.ietf.org/doc/html/rfc7636)。长度限制： 最短 43 字符，最长 128 字符可用字符集： [A-Z] / [a-z] / [0-9] / "-" / "." / "_" / "~"示例值：TxYmzM4PHLBlqm5NtnCmwxMH8mFlRWl_ipie3O0aVzo |
      | scope         | string | 否   | 用于缩减 access_token 的权限范围。如果未指定，生成的 access_token 将包含用户授权时的所有权限。请务必注意该列表中不得包含重复项以及未授权项（错误码 20068）。 |

  - 请求体示例

  - ```JSON
    {
        "grant_type": "authorization_code",
        "client_id": "cli_a5ca35a685b0x26e",
        "client_secret": "baBqE5um9LbFGDy3X7LcfxQX1sqpXlwy",
        "code": "a61hb967bd094dge949h79bbexd16dfe",
        "redirect_uri": "https://example.com/api/oauth/callback",
        "code_verifier": "TxYmzM4PHLBlqm5NtnCmwxMH8mFlRWl_ipie3O0aVzo"
    }
    ```

- 响应

  - 响应体类型：application/json; charset=utf-8
  - 响应体

| 名称                     | 类型   | 描述                                                         |
| ------------------------ | ------ | ------------------------------------------------------------ |
| code                     | string | 错误码，为 200 时表明请求成功，非 0 表示失败，请参照下文错误码 |
| msg                      | string | 具体的错误信息，仅在请求失败时返回                           |
| data                     | 对象   | 返回数据                                                     |
| access_token             | string | 即 access_token，仅在请求成功时返回                          |
| expires_in               | int    | 即 access_token 的有效期，单位为秒，仅在请求成功时返回建议使用该字段以确定 access_token 的过期时间，不要硬编码有效期 |
| refresh_token            | string | 用于刷新 access_token，详见刷新 access_token。该字段仅在请求成功且用户授予 offline_access 权限时返回。如果你在获取 access_token 时设置了 scope 请求参数，且需要返回 refresh_token，则需要在 scope 参数中包括 offline_access。另外，refresh_token 仅能被使用一次。 |
| refresh_token_expires_in | int    | 即 refresh_token 的有效期，单位为秒，仅在返回 refresh_token 时返回 |
| token_type               | string | 值固定为 Bearer，仅在请求成功时返回                          |
| scope                    | string | 本次请求所获得的 access_token 所具备的权限列表，以空格分隔，仅在请求成功时返回 |

- 响应体示例

成功响应示例：

```JSON
{
    "code": 200,
    "access_token": "eyJhbGciOiJFUzI1NiIs**********X6wrZHYKDxJkWwhdkrYg",
    "expires_in": 7200, // 非固定值，请务必根据响应体中返回的实际值来确定 access_token 的有效期
    "refresh_token": "eyJhbGciOiJFUzI1NiIs**********XXOYOZz1mfgIYHwM8ZJA",
    "refresh_token_expires_in": 604800, // 非固定值，请务必根据响应体中返回的实际值来确定 refresh_token 的有效期
    "scope": "auth:user.id:read offline_access task:task:read user_profile",
    "token_type": "Bearer"
}
```

失败响应示例：

```JSON
{
    "code": 20050,
    "error": "server_error",
    "error_description": "An unexpected server error occurred. Please retry your request."
}
```

## 获取用户身份信息

- 请求地址：

```Plain
https://api-v3.teamhelper.cn/open-apis/authen/v1/user_info
```

- 请求方式：GET

- 请求参数：

  - 请求头

  - | 名称          | 类型   | 必填 | 描述                                                         |
    | ------------- | ------ | ---- | ------------------------------------------------------------ |
    | Authorization | string | 是   | access_token以登录用户身份调用 API，可读写的数据范围由用户可读写的数据范围决定。值格式："Bearer access_token"示例值："Bearer u-cjz1eKCEx289x1TXEiQJqAh5171B4gDHPq00l0GE1234" |
    | Content-Type  | string | 是   | 固定值："application/json; charset=utf-8"                    |

  - 请求示例

```Shell
curl -i -X GET 'https://api-v3.teamhelper.cn/open-apis/authen/v1/user_info' \
-H 'Authorization: Bearer t-7f1b******8e560'
```

- 响应参数：

| 名称收起子列表 | 类型      | 描述                    |
| -------------- | --------- | ----------------------- |
| code           | int       | 错误码，非 200 表示失败 |
| msg            | string    | 错误描述                |
| data           | user_info | -                       |
| name           | string    | 用户姓名                |
| alias          | string    | 员工别名                |
| avatarUrl      | string    | 用户头像                |
| openId         | string    | 用户在应用内的唯一标识  |
| unionId        | string    | 用户在企业内的唯一标识  |
| email          | string    | 用户邮箱                |
| mobile         | string    | 用户手机号              |
| companyNo      | string    | 当前企业标识            |
| employeeNo     | string    | 用户工号                |

- 示例说明

```JSON
{
    "code": 200,
    "msg": "success",
    "data": {
        "name": "zhangsan",
        "alias": "zhangsan",
        "openId": "ou-caecc734c2e3328a62489fe0648c4b98779515d3",
        "unionId": "on-caecc734c2e3328a62489fe06xxx79515d3xxxx",
        "email": "zhangsan@feishu.cn",
        "mobile": "+86130002883xx",
        "company_no": "EU0001",
        "employee_no": "1212"
    }
}
```

## 刷新access_token

- 请求地址：

  - ```Bash
    https://api-v3.teamhelper.cn/open-apis/authen/v1/oauth/token
    ```

- 请求方式：POST

- 请求参数：

  - 请求头

    - | 名称         | 类型   | 必填 | 描述                                                |
      | ------------ | ------ | ---- | --------------------------------------------------- |
      | Content-Type | string | 是   | 请求体类型。固定值：application/json; charset=utf-8 |

  - 请求体

    - | 名称          | 类型   | 必填 | 描述                                                         |
      | ------------- | ------ | ---- | ------------------------------------------------------------ |
      | grant_type    | string | 是   | 授权类型。固定值：refresh_token                              |
      | client_id     | string | 是   | 应用的 App ID，可以在开发者后台中的应用详情页面找到该值。示例值：cli_a5ca35a685b0x26e |
      | client_secret | string | 是   | 应用的 App Secret，可以在开发者后台中的应用详情页面找到该值。示例值：baBqE5um9LbFGDy3X7LcfxQX1sqpXlwy |
      | refresh_token | string | 是   | 刷新令牌，用于刷新 access_token                              |
      | scope         | string | 否   | refresh_token                                                |

  - 请求体示例

  - ```JSON
    {
        "grant_type": "refresh_token",
        "client_id": "cli_a5ca35a685b0x26e",
        "client_secret": "baBqE5um9LbFGDy3X7LcfxQX1sqpXlwy",
        "refresh_token": "eyJhbGciOiJFUzI1NiIs**********XXOYOZz1mfgIYHwM8ZJA"
    }
    ```

- 响应

  - 响应体类型：application/json; charset=utf-8

  - 响应体

    - | 名称 | 类型   | 描述                                                         |
      | ---- | ------ | ------------------------------------------------------------ |
      | code | string | 错误码，为 200 时表明请求成功，非 0 表示失败，请参照下文错误码 |
      | msg  | string | 具体的错误信息，仅在请求失败时返回                           |
      | data | 对象   | 返回数据                                                     |

    -   data的数据结构描述

    - | 名称                     | 类型   | 描述                                                         |
      | ------------------------ | ------ | ------------------------------------------------------------ |
      | access_token             | string | 即 access_token，仅在请求成功时返回                          |
      | expires_in               | int    | 即 access_token 的有效期，单位为秒，仅在请求成功时返回建议使用该字段以确定 access_token 的过期时间，不要硬编码有效期 |
      | refresh_token            | string | 用于刷新 access_token，详见刷新 access_token。该字段仅在请求成功且用户授予 offline_access 权限时返回。如果你在获取 access_token 时设置了 scope 请求参数，且需要返回 refresh_token，则需要在 scope 参数中包括 offline_access。另外，refresh_token 仅能被使用一次。 |
      | refresh_token_expires_in | int    | 即 refresh_token 的有效期，单位为秒，仅在返回 refresh_token 时返回 |
      | token_type               | string | 值固定为 Bearer，仅在请求成功时返回                          |
      | scope                    | string | 本次请求所获得的 access_token 所具备的权限列表，以空格分隔，仅在请求成功时返回 |

- 响应体示例

成功响应示例：

```JSON
{
    "code": 200,
    "msg":"Success",
    "data":{
        "access_token": "eyJhbGciOiJFUzI1NiIs**********X6wrZHYKDxJkWwhdkrYg",
        "expires_in": 7200, // 非固定值，请务必根据响应体中返回的实际值来确定 access_token 的有效期
        "refresh_token": "eyJhbGciOiJFUzI1NiIs**********XXOYOZz1mfgIYHwM8ZJA",
        "refresh_token_expires_in": 604800, // 非固定值，请务必根据响应体中返回的实际值来确定 refresh_token 的有效期
        "scope": "auth:user.id:read offline_access task:task:read user_profile",
        "token_type": "Bearer"
    }
}
```

失败响应示例：

```JSON
{
    "code": 10301,
    "msg": "账号无效",
    "data":null
}
```

# 通讯录

## 通讯录概述

​	你可以将通讯录理解为企业组织架构，包含了企业部门信息、企业人员信息等。开放平台针对通讯录提供了一系列安全可靠的接口（API），便于你管理通讯录数据。例如使用通讯录 API 可实现的操作有：

- 查看企业的组织架构
- 为企业创建新的用户
- 修改企业中已有用户的基本属性
- 维护用户和部门的关联关系
- 维护用户和用户分组的关联关系

## 用户

### 用户资源介绍

用户是通讯录中的基础资源，对应企业组织架构中的用户实体。

**基本概念**

在调用通讯录 API 之前，建议你了解以下基本概念。

**用户 ID**

在调用通讯录 API 时，你将会用到用户的多种身份标识，包括 `user_id`、`open_id` 和 `union_id`。

- user_id 是用户在某一租户内的身份标识。
- open_id 是用户在某一应用内的身份标识。
- union_id 是用户在同一应用服务商所开发的多个应用下的身份标识。

### 创建用户

**请求**

| 基本        |                                                   |
| ----------- | ------------------------------------------------- |
| HTTP URL    | https://api-v3-test.teamhelper.cn/manage/user/add |
| HTTP Method | POST                                              |

**请求头**

| 名称          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| Authorization | string | 是   | access_token以登录用户身份调用 API，可读写的数据范围由用户可读写的数据范围决定。值格式："Bearer access_token"示例值："Bearer u-cjz1eKCEx289x1TXEiQJqAh5171B4gDHPq00l0GE1234" |
| Content-Type  | string | 是   | 固定值："application/json; charset=utf-8"                    |
| User-Client   | string | 是   | 0:服务端,1:苹果端,2:安卓端,3:WEB端,4眼镜端                   |

**请求体**

| 名称         | 类型    | 描述     | 示例        |
| ------------ | ------- | -------- | ----------- |
| name         | string  | 用户名称 | 张三        |
| alias        | string  | 用户别名 |             |
| departmentId | integer | 部门ID   | 1001        |
| mobile       | string  | 手机号   | 13812345678 |

**请求示例**

```JSON
{
  "name": "张三",
  "alias": "麦冬",
  "departmentId": 1000001,
  "mobile":"13812345678"
}
```

**响应体**

| 名称 | 类型   | 描述     | 示例 |
| ---- | ------ | -------- | ---- |
| code | int    | 错误码   | 200  |
| msg  | string | 错误描述 | 成功 |
| data | object | 数据     |      |

**响应体示例**

```JSON
{
  "code": 200,
  "msg": "成功",
  "data":null
}
```

### 修改用户部分信息

**请求**

| 基本        |                                                    |
| ----------- | -------------------------------------------------- |
| HTTP URL    | https://api-v3-test.teamhelper.cn/manage/user/edit |
| HTTP Method | POST                                               |

**请求头**

| 名称          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| Authorization | string | 是   | access_token以登录用户身份调用 API，可读写的数据范围由用户可读写的数据范围决定。值格式："Bearer access_token"示例值："Bearer u-cjz1eKCEx289x1TXEiQJqAh5171B4gDHPq00l0GE1234" |
| Content-Type  | string | 是   | 固定值："application/json; charset=utf-8"                    |
| User-Client   | string | 是   | 0:服务端,1:苹果端,2:安卓端,3:WEB端,4眼镜端                   |

**请求体**

| 名称         | 类型    | 描述     | 示例        |
| ------------ | ------- | -------- | ----------- |
| userId       | Long    | 用户ID   |             |
| name         | string  | 用户名称 | 张三        |
| alias        | string  | 用户别名 |             |
| departmentId | integer | 部门ID   | 1001        |
| mobile       | string  | 手机号   | 13812345678 |

**请求示例**

```JSON
{
  "userId": 10002,
  "name": "张三",
  "alias": "麦冬",
  "departmentId": 1000001,
  "mobile":"13812345678"
}
```

**响应体**

| 名称 | 类型   | 描述     | 示例 |
| ---- | ------ | -------- | ---- |
| code | int    | 错误码   | 200  |
| msg  | string | 错误描述 | 成功 |
| data | object | 数据     |      |

**响应体示例**

```JSON
{
  "code": 200,
  "msg": "成功",
  "data":null
}
```

### 获取单个用户信息

**请求**

| 基本        |                                                            |
| ----------- | ---------------------------------------------------------- |
| HTTP URL    | https://api-v3-test.teamhelper.cn/manage/user/info/:userId |
| HTTP Method | GET                                                        |

**请求头**

| 名称          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| Authorization | string | 是   | access_token以登录用户身份调用 API，可读写的数据范围由用户可读写的数据范围决定。值格式："Bearer access_token"示例值："Bearer u-cjz1eKCEx289x1TXEiQJqAh5171B4gDHPq00l0GE1234" |
| Content-Type  | string | 是   | 固定值："application/json; charset=utf-8"                    |
| User-Client   | string | 是   | 0:服务端,1:苹果端,2:安卓端,3:WEB端,4眼镜端                   |

**路径参数**

| 名称   | 类型 | 描述   | 示例   |
| ------ | ---- | ------ | ------ |
| userId | Long | 用户ID | 100001 |

**请求示例**

```JSON

```

**响应**

**响应体**

| 名称      | 类型   | 描述                   | 示例 |
| --------- | ------ | ---------------------- | ---- |
| code      | int    | 错误码                 | 200  |
| msg       | string | 错误描述               | 成功 |
| data      | object | 数据                   |      |
| name      | string | 用户姓名               |      |
| alias     | string | 员工别名               |      |
| avatarUrl | string | 用户头像               |      |
| openId    | string | 用户在应用内的唯一标识 |      |
| unionId   | string | 用户在企业内的唯一标识 |      |
| email     | string | 用户邮箱               |      |
| mobile    | string | 用户手机号             |      |

**响应体示例**

```JSON
{
  "code": 200,
  "msg": "成功",
  "data":{
        "name": "zhangsan",
        "alias": "zhangsan",
        "openId": "ou-caecc734c2e3328a62489fe0648c4b98779515d3",
        "unionId": "on-caecc734c2e3328a62489fe06xxx79515d3xxxx",
        "email": "zhangsan@feishu.cn",
        "mobile": "+86130002883xx",
        "company_no": "EU0001",
        "employee_no": "1212"
    }
}
```

### 批量获取用户信息

**请求**

| 基本        |                                                     |
| ----------- | --------------------------------------------------- |
| HTTP URL    | https://api-v3-test.teamhelper.cn/manage/user/batch |
| HTTP Method | GET                                                 |

**请求头**

| 名称          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| Authorization | string | 是   | access_token以登录用户身份调用 API，可读写的数据范围由用户可读写的数据范围决定。值格式："Bearer access_token"示例值："Bearer u-cjz1eKCEx289x1TXEiQJqAh5171B4gDHPq00l0GE1234" |
| Content-Type  | string | 是   | 固定值："application/json; charset=utf-8"                    |
| User-Client   | string | 是   | 0:服务端,1:苹果端,2:安卓端,3:WEB端,4眼镜端                   |

**查询参数**

| 名称    | 类型   | 描述   | 示例     |
| ------- | ------ | ------ | -------- |
| userIds | Long[] | 用户ID | [100001] |

**请求示例**

```JSON

```

**响应体**

| 名称      | 类型   | 描述                   | 示例 |
| --------- | ------ | ---------------------- | ---- |
| code      | int    | 错误码                 | 200  |
| msg       | string | 错误描述               | 成功 |
| data      | list   | 数据                   |      |
| name      | string | 用户姓名               |      |
| alias     | string | 员工别名               |      |
| avatarUrl | string | 用户头像               |      |
| openId    | string | 用户在应用内的唯一标识 |      |
| unionId   | string | 用户在企业内的唯一标识 |      |
| email     | string | 用户邮箱               |      |
| mobile    | string | 用户手机号             |      |

**响应体示例**

```JSON
{
  "code": 200,
  "msg": "成功",
  "data":[{
        "name": "zhangsan",
        "alias": "zhangsan",
        "openId": "ou-caecc734c2e3328a62489fe0648c4b98779515d3",
        "unionId": "on-caecc734c2e3328a62489fe06xxx79515d3xxxx",
        "email": "zhangsan@feishu.cn",
        "mobile": "+86130002883xx",
        "company_no": "EU0001",
        "employee_no": "1212"
    }]
}
```

### 用户离职

**请求**

| 基本        |                                                           |
| ----------- | --------------------------------------------------------- |
| HTTP URL    | https://api-v3-test.teamhelper.cn/manage/user/leaveOffice |
| HTTP Method | POST                                                      |

**请求头**

| 名称          | 类型   | 必填 | 描述                                                         |
| ------------- | ------ | ---- | ------------------------------------------------------------ |
| Authorization | string | 是   | access_token以登录用户身份调用 API，可读写的数据范围由用户可读写的数据范围决定。值格式："Bearer access_token"示例值："Bearer u-cjz1eKCEx289x1TXEiQJqAh5171B4gDHPq00l0GE1234" |
| Content-Type  | string | 是   | 固定值："application/json; charset=utf-8"                    |
| User-Client   | string | 是   | 0:服务端,1:苹果端,2:安卓端,3:WEB端,4眼镜端                   |

**请求体**

| 名称   | 类型   | 描述                                | 示例   |
| ------ | ------ | ----------------------------------- | ------ |
| userId | Long   | 用户ID                              | 100001 |
| type   | string | 资源转移类型0:不转移1转移给其他用户 | 0      |
| assets | []     | type=1时，该集合不能为空            |        |
| appId  | string | 应用ID                              |        |
| userId | long   | 用户ID                              |        |

**请求示例**

```JSON
{
  "userId": 10001,
  "type": "1",
  "assets": [
    {
      "userId": 10002,
      "appId": "xxxxxxxxxxxxxxxxxxxx"
    }
  ]
}
```

**响应体**

| 名称 | 类型   | 描述     | 示例 |
| ---- | ------ | -------- | ---- |
| code | int    | 错误码   | 200  |
| msg  | string | 错误描述 | 成功 |
| data | object | 数据     |      |

**响应体示例**

```JSON
{
  "code": 200,
  "msg": "成功",
  "data":null
}
```