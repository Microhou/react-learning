# JavaScript 基础知识

## https://github.com/Asabeneh/30-Days-Of-JavaScript
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

 ### 空值合并运算符 '??'
>  a ?? b 的结果是：
 - 如果 a 不是 null/undefined 则 ?? 返回第一个参数，否则返回第二个参数。
 - a ?? b ==> (a !== null && a !== undefined) ? a : b
 - 常见的场景是 提供默认值
```js
let firstName = null;
let lastName = null;
let nickName = "Supercoder";

// 显示第一个已定义的值：
alert(firstName ?? lastName ?? nickName ?? "匿名"); // Supercoder
```

## 循环： while 和 for
- 循环 是一种重复运行同一代码的方法。
> while 循环
```js
    while(condition){

    }
```
- 循环体的单次执行叫做 **一次迭代**
- 任何表达式和变量都可以是循环条件。
> do...while 循环
```js
    do {
        // 循环体
    } while (condition)
```
- do while 就是无论如何，都会执行一次循环体

> for 循环
```js
    for(begin, condition, step){
        // ……循环体……
    }
```
- 也就是说 begin 执行一次，然后进行迭代：每次检查condition 后，执行body 和 step.

> 跳出循环
- break 会终止循环
- continue,不会停掉整个循环，而是停止当前这一次迭代，并强制启动新一轮循环（如果条件允许的话）。
```js
    for(let i = 0; i< 10; i++){
        if(i % 2 == 0) continue;
        console.log(i) // 1，然后 3，5，7，9
    }
```
- 禁止 break/continue 在 ‘?’ 的右边
`(i > 5) ? alert(i) : continue; // continue 不允许在这个位置`
  
- 直接使用标签，跳出多层循环
```js
    outer: for (let i = 0; i < 3; i++) {

                for (let j = 0; j < 3; j++) {

                    let input = prompt(`Value at coords (${i},${j})`, '');

                    // 如果是空字符串或被取消，则中断并跳出这两个循环。
                    if (!input) break outer; // (*)

                    // 用得到的值做些事……
                }
            }

        alert('Done!');
``` 
## "switch" 语句
> switch 语句至少有一个case 代码和一个可选的default 代码块
- 会比较 x 的值和第一个case 是否严格相等，然后比较第二个case, 以此类推。
- 每一个case 后面，最好要有一个break.
- 如果没有符合的case 则执行default 代码块。
- 任何表达式都可以成为switch/case 的参数.
### case 分组
- 共享同一段代码的几个case 分支可以被分为一组。

## 函数
- 在函数体声明的变量，只有在函数中可见
- parameter and argument 的概念
    - 参数（parameter）时函数声明中括号内列出的变量（它是函数声明时的术语）。
    - 参数（argument）是调用函数时传递给函数的值（它是函数调用时的术语）。
- 默认值
    - 我们可以使用 = 提供默认值
- 返回值
    - 如何一个函数 没有return 值，或者直接return, 都返回undefined
- 函数 == 注释
```js
    function showPrimes(n){
        for(let i = 2; i < n; i++){
            if(!isPrime(i)) continue;

            alert(i);
        }
    }

    function isPrime(n) {
        for(let i = 2; i < n; i++){
            if(n % i == 0) return false;
        }

        return true; 
    }
```

## 函数表达式
-  再JavaScript中 函数是一个值，
- 函数声明的方式，JavaScript 在准备运行脚本时，首先会在脚本中寻找函数声明，并创建这些函数。
- 函数表达式只在代码执行到它时才会被创建。
## 箭头函数
- JavaScript info 这个文档，会帮我对JavaScript 基础知识的加深和一些知识盲点的澄清，但是也要对它有怀疑的精神。
## 对象
- 对象是有花括号和 key:value 组合而成。
- 对象中 key 是一个字符串， value 可以是任何值
- 两种创建一个空对象的方法：
    - let user = new Object() // “构造函数” 的语法
    - let user = {} // “字面量” 的语法
- 多词属性，点的操作就不用用了，可以使用[] -- user['like birds']
    - [] 中可以是变量，
- 属性名称限制
    - 对象的属性名可以是保留字
- 属性存在测试， “in” 操作符
    - “key” in object
- 遍历对象： for(let key in obj) 循环
## JavaScript 的垃圾回收
-  

## 商业保险
- 定期寿险
- 重疾险 -- 成人
- 少儿重疾险
- 商业医疗险 -- 老人
    - 防癌医疗险
    - 普惠性商业补充医疗保险
## 买保险的基本原则
1. 
- 先考虑风险保障，再考虑理财
- 返还型保险并不划算，往往保障和理财都做的不好。
- 分开买风险保障型保险
2. 如果预算有限，先大人，后小孩。
- 不要超过年收入的10% 
- 买保险没有必要一口吃个胖子，可以做长期规划，预算有限，先做基本保障。
3. 定期寿险 
- 建议覆盖至少未来5年的家庭收入。
- 建议保到60岁退休
- 建议指定收益人
4. 重疾险
    - 经济条件允许的情况下，尽早买、
    - 保额： 30万起步，50 万是标配
    - 保障多少年 预算有限 70岁， 预算宽裕- 可以终身
    - 60 岁之前出事，提高保额的附件条款
    - 保障病种 -- 28种重大疾病 选择覆盖 高发轻症产品： 早期恶性肿瘤，轻微中风， 
5. 商业医疗险怎么买
 - 保额不太重要 -- 医疗保险是花多少，报多少。
 - 基本保障要做足 -- 最后覆盖高价，稀缺的药品，例如癌症特效药和医院外购药。
 - 购买长期可续保的产品。

6. 增额终身寿险和年金保险，买那个好。

- JavaScript 技术要一定要好。
- 现在要求的是复合型人才。
- Vue 也一定要会呀
- 你对项目的把控能力
    - 模块的设计
    - 架构的能力
    - 早早的准备
    - 代码的扩展性
    - 在职研究生
    - 必须会一门后端语言
    - 前后端都能拉通
    - 前端开发，化时间调样式，
    - 后端把握数据呀
    - 把自己看成web 开发的。
    - 简历，HR 到底想看什么，学历，看个人工作年限， 个人工作技能。技能写细化一点，具体一点。
    - 项目介绍-是否和现有的公司是否匹配。你给用户提供了什么功能。
    - 主要职责 - 看你有没有能力， 你能拿到出手的东西。
    - 你封装过哪些组件，哪些工具。
    - 简历是一遍一遍磨出来的。
    - 深度学习--背后的逻辑是什么（复杂请求，简单请求， post 再什么情况下简单请求和复杂请求， 跨越请求）
    - 树形结构化 -- 扁平化
    - 二分法 -
    - 一天不要稀里糊涂的，把上面的知识清楚，MDN 上面的教程
    - 
   