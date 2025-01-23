
## 事件列表
| 100101001 | 用户       | 通讯录    | 添加成员          | 当应用订阅该事件后，如果有新员工添加（例如，通过管理后台添加成员、调用创建用户 API），则会触发该事件。 |
| --------- | ---------- | :----: | -------------- | ------------------------------------------------------------ |
| 100101002 | 用户       | 通讯录 | 成员离职       | 当应用订阅该事件后，如果有员工离职（例如，通过管理后台离职成员、调用删除用户 API），则会触发该事件。 |
| 100101003 | 用户       | 通讯录 | 成员信息被修改 | 应用订阅该事件后，当员工信息（包括：用户名、别名、邮箱、手机号、性别、头像、状态、所属部门、入职时间、工号）被修改时将会触发该事件。 |
| 100102001 | 部门       | 通讯录 | 部门新建       | 当应用订阅该事件后，如果通讯录内有部门被创建，则会触发该事件。 |
| 100102002 | 部门       | 通讯录 | 部门信息变化   | 当应用订阅该事件后，如果部门信息发生变化，则会触发该事件。部门信息发生变化的范围包括：  企业管理员在管理后台修改部门信息。 企业开发者调用修改部门部分信息、更新部门所有信息、更新部门ID API 修改部门信息。 |
| 100102003 | 部门       | 通讯录 | 部门被删除     | 当应用订阅该事件后，如果通讯录内有部门被删除，则会触发该事件。 |
| 100103001 | 用户组     | 通讯录 | 分组新建       | 当应用订阅该事件后，如果通讯录内有分组新建，则会触发该事件。 |
| 100103002 | 用户组     | 通讯录 | 分组信息变化   | 当应用订阅该事件后，如果通讯录内有分组信息变化，则会触发该事件。 |
| 100103003 | 用户组     | 通讯录 | 分组被删除     | 当应用订阅该事件后，如果通讯录内有分组被删除，则会触发该事件。 |
| 100104001 | 用户组成员 | 通讯录 | 成员加入分组   | 当应用订阅该事件后，如果通讯录内有成员加入分组，则会触发该事件。 |
| 100104002 | 用户组成员 | 通讯录 | 成员退出分组   | 当应用订阅该事件后，如果通讯录内有成员退出分组，则会触发该事件。 |

#### 用户入职

**事件**

| 基本            |                          |
|---------------| ------------------------ |
| 事件类型          | 100101001                |
| 支持的应用类型       | 【自有应用】【三方应用】 |

**event事件体**

| 名称         | 类型    | 描述     | 示例        |
| ------------ | ------- | -------- | ----------- |
| userId       | string  | 用户ID   |             |
| openId       | string  | open_id  |             |
| unionId      | string  | union_id |             |
| name         | string  | 用户名称 | 张三        |
| alias        | string  | 用户别名 |             |
| departmentId | integer | 部门ID   | 1001        |
| mobile       | string  | 手机号   | 13812345678 |

**event事件体示例**

```JSON
{
    "version": "1.0",
    "header": { 
        "token": "066zT6pS4QCbgj5Do145GfDbbagCHGgF",    // token
        "event_id": "bb224e75-f2fe-4455-aee0-0674ad9fc2f4", // 可以是UUID
        "event_name": "用户入职", // 事件名称, 比如:  用户离职等
        "event_key": 100101001, // 事件KEY
        "timestamp": 1737262443448, // 事件发生毫秒时间戳, 一般是生产方的createdTime或updatedTime
        "retry_count": 0, // 重试次数, 从0开始, 每重试1次, 新增1, 直到最大重试次数    
        },
    "event": {
        "userId": 1000001,
        "openId": "ou-caecc734c2e3328a62489fe0648c4b98779515d3",
        "unionId": "on-caecc734c2e3328a62489fe06xxx79515d3xxxx",
        "name": "决明子",
        "alias": "CEO",
        "avatarUrl": "https://v3-file.url.mo.cn/resource/avatar/1.png",
        "departmentId": 1
    }
}
```

#### 用户离职

**事件**

| 基本           |                          |
| -------------- | ------------------------ |
| 事件类型       | 100101002                |
| 支持的应用类型 | 【自有应用】【三方应用】 |

**event事件体**

| 名称    | 类型   | 描述     | 示例 |
| ------- | ------ | -------- | ---- |
| userId  | string | 用户ID   |      |
| openId  | string | open_id  |      |
| unionId | string | union_id |      |
| name    | string | 用户名称 | 张三 |
| alias   | string | 用户别名 |      |

**event事件体示例**

```JSON
{
    "version": "1.0",
    "header": { 
        "token": "066zT6pS4QCbgj5Do145GfDbbagCHGgF",    // token
        "event_id": "bb224e75-f2fe-4455-aee0-0674ad9fc2f4", // 可以是UUID
        "event_name": "用户离职", // 事件名称, 比如:  用户离职等
        "event_key": 100101002, // 事件KEY
        "timestamp": 1737262443448, // 事件发生毫秒时间戳, 一般是生产方的createdTime或updatedTime
        "retry_count": 0, // 重试次数, 从0开始, 每重试1次, 新增1, 直到最大重试次数    
        },
    "event": {
        "openId": "ou-caecc734c2e3328a62489fe0648c4b98779515d3",
        "unionId": "on-caecc734c2e3328a62489fe06xxx79515d3xxxx",
        "name": "决明子",
        "deleted": 0
    }
}
```

#### 用户信息被修改

**事件**

| 基本           |                          |
| -------------- | ------------------------ |
| 事件类型       | 100101003                |
| 支持的应用类型 | 【自有应用】【三方应用】 |

**event事件体**

| 名称         | 类型    | 描述     | 示例        |
| ------------ | ------- | -------- | ----------- |
| userId       | string  | 用户ID   |             |
| openId       | string  | open_id  |             |
| unionId      | string  | union_id |             |
| name         | string  | 用户名称 | 张三        |
| alias        | string  | 用户别名 |             |
| departmentId | integer | 部门ID   | 1001        |
| mobile       | string  | 手机号   | 13812345678 |

**event事件体示例**

```JSON
{
    "version": "1.0",
    "header": { 
        "token": "066zT6pS4QCbgj5Do145GfDbbagCHGgF",    // token
        "event_id": "bb224e75-f2fe-4455-aee0-0674ad9fc2f4", // 可以是UUID
        "event_name": "用户信息被修改", // 事件名称, 比如:  用户离职等
        "event_key": 100101003, // 事件KEY
        "timestamp": 1737262443448, // 事件发生毫秒时间戳, 一般是生产方的createdTime或updatedTime
        "retry_count": 0, // 重试次数, 从0开始, 每重试1次, 新增1, 直到最大重试次数    
        },
    "event": {
        "openId": "ou-caecc734c2e3328a62489fe0648c4b98779515d3",
        "unionId": "on-caecc734c2e3328a62489fe06xxx79515d3xxxx",
        "name": "决明子",
        "alias": "CEO",
        "avatarUrl": "https://v3-file.url.mo.cn/resource/avatar/1.png",
        "departmentId": 1
    }
}
```

#### 部门新建

**事件**

| 基本           |                          |
| -------------- | ------------------------ |
| 事件类型       | 100102001                |
| 支持的应用类型 | 【自有应用】【三方应用】 |

**event事件体**

| 名称           | 类型    | 描述                         | 示例    |
| -------------- | ------- | ---------------------------- | ------- |
| departmentId   | bigint  | 自增ID                       | 1000002 |
| departmentName | varchar | 部门名称                     |         |
| parentId       | bigint  | 父级部门ID（顶级部门为null） | 1000001 |
| companyId      | bigint  | 企业ID                       |         |

**event事件体示例**

```JSON
{
    "version": "1.0",
    "header": { 
        "token": "066zT6pS4QCbgj5Do145GfDbbagCHGgF",    // token
        "event_id": "bb224e75-f2fe-4455-aee0-0674ad9fc2f4", // 可以是UUID
        "event_name": "部门新建", // 事件名称, 比如:  用户离职等
        "event_key": 100102001, // 事件KEY
        "timestamp": 1737262443448, // 事件发生毫秒时间戳, 一般是生产方的createdTime或updatedTime
        "retry_count": 0, // 重试次数, 从0开始, 每重试1次, 新增1, 直到最大重试次数    
        },
    "event": {
        "departmentId": 1000002,
        "parentId": 1000001,
        "departmentName": "研发中心",
        "companyId": 1
    }
}
```

#### 部门信息被修改

**事件**

| 基本           |                          |
| -------------- | ------------------------ |
| 事件类型       | 100102002                |
| 支持的应用类型 | 【自有应用】【三方应用】 |

**event事件体**

| 名称           | 类型    | 描述                         | 示例    |
| -------------- | ------- | ---------------------------- | ------- |
| departmentId   | bigint  | 自增ID                       | 1000002 |
| departmentName | varchar | 部门名称                     |         |
| parentId       | bigint  | 父级部门ID（顶级部门为null） | 1000001 |
| companyId      | bigint  | 企业ID                       |         |

**event事件体示例**

```JSON
{
    "version": "1.0",
    "header": { 
        "token": "066zT6pS4QCbgj5Do145GfDbbagCHGgF",    // token
        "event_id": "bb224e75-f2fe-4455-aee0-0674ad9fc2f4", // 可以是UUID
        "event_name": "部门信息被修改", // 事件名称, 比如:  用户离职等
        "event_key": 100102002, // 事件KEY
        "timestamp": 1737262443448, // 事件发生毫秒时间戳, 一般是生产方的createdTime或updatedTime
        "retry_count": 0, // 重试次数, 从0开始, 每重试1次, 新增1, 直到最大重试次数    
        },
    "event": {
        "departmentId": 1000002,
        "parentId": 1000001,
        "departmentName": "研发中心",
        "companyId": 1
    }
}
```

#### 部门被删除

**事件**

| 基本           |                          |
| -------------- | ------------------------ |
| 事件类型       | 100102003                |
| 支持的应用类型 | 【自有应用】【三方应用】 |

**event事件体**

| 名称           | 类型    | 描述                         | 示例    |
| -------------- | ------- | ---------------------------- | ------- |
| departmentId   | bigint  | 自增ID                       | 1000002 |
| departmentName | varchar | 部门名称                     |         |
| parentId       | bigint  | 父级部门ID（顶级部门为null） | 1000001 |
| companyId      | bigint  | 企业ID                       |         |

**event事件体示例**

```JSON
{
    "version": "1.0",
    "header": { 
        "token": "066zT6pS4QCbgj5Do145GfDbbagCHGgF",    // token
        "event_id": "bb224e75-f2fe-4455-aee0-0674ad9fc2f4", // 可以是UUID
        "event_name": "部门信息被删除", // 事件名称, 比如:  用户离职等
        "event_key": 100102003, // 事件KEY
        "timestamp": 1737262443448, // 事件发生毫秒时间戳, 一般是生产方的createdTime或updatedTime
        "retry_count": 0, // 重试次数, 从0开始, 每重试1次, 新增1, 直到最大重试次数    
        },
    "event": {
        "departmentId": 1000002,
        "parentId": 1000001,
        "departmentName": "研发中心",
        "companyId": 1
    }
}
```

#### 分组信息被修改

**事件**

| 基本           |                          |
| -------------- | ------------------------ |
| 事件类型       | 100103002                |
| 支持的应用类型 | 【自有应用】【三方应用】 |

**event事件体**

| 名称          | 类型   | 描述     | 示例 |
| ------------- | ------ | -------- | ---- |
| groupId       | string | 分组ID   |      |
| groupName     | string | 分组名称 |      |
| departmentIds | Long[] | 部门ID   |      |
| userIds       | Long[] | 用户ID   | 张三 |

**event事件体示例**

```JSON
{
    "version": "1.0",
    "header": { 
        "token": "066zT6pS4QCbgj5Do145GfDbbagCHGgF",    // token
        "event_id": "bb224e75-f2fe-4455-aee0-0674ad9fc2f4", // 可以是UUID
        "event_name": "分组信息被修改", // 事件名称, 比如:  用户离职等
        "event_key": 100103002, // 事件KEY
        "timestamp": 1737262443448, // 事件发生毫秒时间戳, 一般是生产方的createdTime或updatedTime
        "retry_count": 0, // 重试次数, 从0开始, 每重试1次, 新增1, 直到最大重试次数    
        },
    "event": {
        "groupId": 10001111,
        "groupName": "IT 外包组"
    }
}
```

#### 添加用户组成员(成员或者部门)

**事件**

| 基本           |                          |
| -------------- | ------------------------ |
| 事件类型       | 100104001                |
| 支持的应用类型 | 【自有应用】【三方应用】 |

**event事件体**

| 名称          | 类型     | 描述     | 示例      |
| ------------- | -------- | -------- | --------- |
| groupId       | Long     | 用户组ID |           |
| departmentIds | string[] | 部门ID   | ["D1001"] |
| userIds       | string[] | 用户ID   | ["U1001"] |

**event事件体示例**

```JSON
{
    "version": "1.0",
    "header": { 
        "token": "066zT6pS4QCbgj5Do145GfDbbagCHGgF",    // token
        "event_id": "bb224e75-f2fe-4455-aee0-0674ad9fc2f4", // 可以是UUID
        "event_name": "添加用户组成员", // 事件名称, 比如:  用户离职等
        "event_key": 100104001, // 事件KEY
        "timestamp": 1737262443448, // 事件发生毫秒时间戳, 一般是生产方的createdTime或updatedTime
        "retry_count": 0, // 重试次数, 从0开始, 每重试1次, 新增1, 直到最大重试次数    
        },
    "event": {
        "groupId": 1000001,
        "groupName": "Python研发组",
        "userIds": ["U10001"],
        "departmentIds": ["D10001"]
    }
}
```