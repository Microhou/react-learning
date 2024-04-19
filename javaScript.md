# JavaScript 基础知识

## script 标签
1. script 可以出现在html 的任何地方。
2. 如果script 设置了src 特性，script 标签内容将会被忽略。
```js
    <script src="file.js">
        alert(1); // 此内容会被忽略，因为设定了 src 
    </script>
```
## 代码结构
1. 语句
2. 分号
3. 注释   
    a. 单行注释 //    快捷键 Ctrl+/
    b. 多行注释 /** */     快捷键 Ctrl+Shift+/

## "use strict"
1. 确保 "use strict" 出现在脚本的顶端。负责严格模式不会生效。
2. 一旦进入严格模式，就没有回头路了。
3. 控制台使用 Shift+Enter 按键去输入多行代码，

## 变量
- 变量是数据的“命名存储”
- 两个变量也可以赋值
- 一个变量应该只被声明一次。
## 变量命名
1. 变量名称必须仅包含字母，数字，字符$ 和_
2. 首字符必须非数字
3. camelCase
4. 区别大小写
5. 保留关键字
## 常量
1. 使用const 声明
2. 大写形式的常量
3. 正确的命名变量  --> 一个变量名应该有一个清晰、明显的含义，对其存储的数据进行描述。

## 数据类型
 ### number
1. Number --> 代表整数和浮点数。
2. 特殊数值（special numeric values）-- Infinity(数学中的无穷大), -Infinity, NaN（一个计算错误）
3. "not a number"/ 2 --> NaN 这样的除法是错误的
4. NaN 是粘性的， 任何对NaN 的进一步数学运算都会返回NaN：
    - NaN + 1 // NaN
    - 3 * NaN
    - "not a number" / 2
    - 所以，如果在数学表达式中有一个 NaN，会被传播到最终结果（只有一个例外：NaN ** 0 结果为 1）。
### BigInt
1. Javascript 中 number 类型无法安全的表示大于(2^53-1)（即 9007199254740991），或小于 -(2^53-1) 的整数。
2. 可以通过将n 附件到整数字段的末尾来创建BigInt 值。
3. const bigInt = 1234567890123456789012345678901234567890n;

### String 
1. JavaScript 中 单引号， 双引号， 反引号 表示字符串。
### Boolean
1. true or  false 
2. 比较的结果会产生Boolean 值。
### null
1. JavaScript 中的 null 仅仅是一个代表“无”、“空”或“值未知”的特殊值。
### undefined
1. undefined 的含义是 未被赋值
### object and Symbol
### typeof 运算符
1. typeof 运算符返回参数的类型。快速对数据类型检验时，非常有用。
2. typeof undefined // "undefined"
- typeof Math // "object"  (1)

- typeof null // "object"  (2)

- typeof alert // "function"  (3)

- 七种原始数据类型：
    - number 用于任何类型的数字：整数或浮点数，在 ±(253-1) 范围内的整数。
    - bigint 用于任意长度的整数。
    - string 用于字符串：一个字符串可以包含 0 个或多个字符，所以没有单独的单字符类型。
    - boolean 用于 true 和 false。
    - null 用于未知的值 —— 只有一个 null 值的独立类型。
    - undefined 用于未定义的值 —— 只有一个 undefined 值的独立类型。
    - symbol 用于唯一的标识符。
- 以及一种非原始数据类型：
    - object 用于更复杂的数据结构。
- 我们可以通过 typeof 运算符查看存储在变量中的数据类型。

    - 通常用作 typeof x，但 typeof(x) 也可行。
    - 以字符串的形式返回类型名称，例如 "string"。
    - typeof null 会返回 "object" —— 这是 JavaScript 编程语言的一个错误，实际上它并不是一个 object。
## 类型转换
1. 字符串转换 -- String(value)
2. 数字型转换，-- Number(value)
3. number 类型转换规则
| 值 | 变成。。。 |
|-------|-------|
| undefined | NaN |
| null | 0 |
| true 和 false | 1 and 0 |
| string | 去掉首尾空白字符（空格、换行符 \n、制表符 \t 等）后的纯数字字符串中含有的数字。如果剩余字符串为空，则转换结果为 0。否则，将会从剩余字符串中“读取”数字。当类型转换出现 error 时返回 NaN。 |

alert( Number("   123   ") ); // 123
alert( Number("123z") );      // NaN（从字符串“读取”数字，读到 "z" 时出现错误）
alert( Number(true) );        // 1
alert( Number(false) );       // 0

### 布尔型转换
1. 转换规则如下：
 - 直观上为“空”的值（如 0、空字符串、null、undefined 和 NaN）将变为 false。
 - 其他值变成 true。

###  数学运算
- 平方根是指数为 ½ 的幂运算， 
- alert( 4 ** (1/2) ); // 2（1/2 次方与平方根相同）
- alert( 8 ** (1/3) ); // 2（1/3 次方与立方根相同）

### 数字转换总结
- 可以通过 + 在字符前进行数字转换。

### 值的比较
1. 大于 >
2. 小于 < 
3. 等于 ==
4. 不相等 !=
> 所有的比较运算符返回Boolean 值 
### 避免问题
- 除了严格相等 === 外， 其他但凡是有 undefined/null 参与的比较，我们都需要格外小心。
- 除非你非常清楚自己在做什么，否则永远不要使用 >= > < <= 去比较一个可能为null /undefined 的变量。对于取值可能是 null/undefined 的变量，请按需要分别检查它的取值情况。
### 总结
- 比较运算符始终返回布尔值。
- 字符串的比较，会按照“词典”顺序逐字符地比较大小。
- 当对不同类型的值进行比较时，他们会先转化为数字（不包括严格相等检查）在进行比较。

## 逻辑运算符
 > javascript 中有4个逻辑运算符： ||（或）， &&（与）， ！（非）， ??(空值合并运算符)
 - 一个或运算 || 的链，将返回第一个真值，如果不存在真值，就返回该连的最后一个值。
 - 或运算符 || 的另一个用途是所谓的“短路求值”。
 ### && 
 - && 运算返回第一个假值，如果没有假值就返回最后一个值。
 - 与运算 && 的优先级比或运算 || 要高。
 ### ！
 - 两个非运算 !! 有时候用来将某个值转化为布尔类型：



