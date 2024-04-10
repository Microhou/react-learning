# react-learning
learning react 

## 算法
https://www.hello-algo.com/

## Java
[To Be Better Javaer]('https://github.com/itwanger/toBeBetterJavaer')

## 炭炭GPT
[炭炭GPT]('https://mytan.maiseed.com.cn/chat/6615ea23aa94a700d7ab3a4a')

## 什么是 Effect，它与事件（event）有何不同？

1. 如果某些逻辑必须在 每次应用加载时执行一次，而不是在 每次组件挂载时执行一次，可以添加一个顶层变量来记录它是否已经执行过了：
   ```js
    let didInit = false;

    function App() {
    useEffect(() => {
        if (!didInit) {
        didInit = true;
        // ✅ 只在每次应用加载时执行一次
        loadDataFromLocalStorage();
        checkAuthToken();
        }
    }, []);
    // ...
    }
   ```

   2. 每当你尝试保持两个不同的state 变量之间的同步时， 试试状态提升。
   3. 使用**清除函数**来忽略较早的返回结果
    ```js
        function SearchResults({ query }) {
            const [results, setResults] = useState([]);
            const [page, setPage] = useState(1);
            useEffect(() => {
                let ignore = false;
                fetchResults(query, page).then(json => {
                if (!ignore) {
                    setResults(json);
                }
                });
                return () => {
                ignore = true;
                };
            }, [query, page]);

            function handleNextPageClick() {
                setPage(page + 1);
            }
            // ...
        }
    ```

    ## Recap
    - 如果你可以在渲染期间计算某些内容，则不需要使用Effect。
    - 想要缓存昂贵的计算，请使用useMemo 而不是useEffect.
    - 想要重置整个组件树的state, 请传入不同的key.
    - 想要在props 变化时重置某些特定的state,请在渲染期间处理。
    - 组件**显示** 时就需要执行的代码应该改放在Effect 中，否则应该放在事件处理函数中。
    - 如果你需要更新多个组件的state,最好在单个事件处理函数中处理。
    - 当你尝试在不同的组件中同步state 变量时，请考虑状态提升，
    - 你可以使用Effect 获取数据，但你需要实现清除逻辑以避免竞争态条件。


## Effect 的生命周期  
1. Effect 只能做两件事，开始同步某些东西，然后停止同步它。
   effect 的清空函数，在组件的state,props 更新时会触发清空函数。
2. Effect **始终专注于单个启动和停止周期，无论组件是挂载、更新还是卸载，都不应该有影响。只需要描述如何开始同步和如何停止。如果做得好，Effect 将能够在需要时始终具备启动和停止的弹性**。
3. React 通过在开发环境中立即强制Effect 重新进行同步来验证其是否能够重新同步。
4. ![effect](image.png)
5. 通过effect 的依赖数组，来判断是否要重新进行Effect 同步。
6. 每个 Effect 表示一个独立的同步过程
7.  从组件的角度来看，空的 [] 依赖数组意味着这个 Effect 仅在组件挂载时连接到聊天室，并在组件卸载时断开连接。（请记住，在开发环境中，React 仍会 额外执行一次 来对逻辑进行压力测试。）
8.  当你不想进行重新同步时该怎么办，可以将依赖值移动到组件外部， **也可以将它们移动到Effect 内部**，它们不是在渲染过程中计算的，因此它们不是响应式的：


## 将事件从Effect中分开
1. 事件处理函数只有在响应特定的交互操作时运行。
2. 我们把show 默认值设置成false, 
3. 事件处理函数内部的逻辑是非响应式的。
4. Effect 内部的逻辑是响应式的。

## react 源码学习
- 异步可中断

- 代数效应（Algebraic Effects）
  ```js
    function getPrice(id) {
        const price = perform id;
        return price;
    }

    function getTotalPrice(id1, id2){
        const p1 = getPrice(id1);
        const p2 = getPrice(id2);

        return p1 + p2;
    }

    try {
        getTotalPrice('001', '002');
    } handle(productId) {
        fetch(`xxx.com?id=${productId}`).then((res)=>{
            resume with res.price
        })
    }
  ```
  - 这里的关键流程是perform 暂停函数的执行， handle获取函数执行权， resume 交出函数执行权。

## react 源码架构  
    const state = reconciler(update);
    const UI = commit(state);
- Scheduler（调度器）： 排序优先级，让优先级高的任务先进行reconcile
- Reconciler（协调器）： 找出哪些节点发生了改变，并打上不同的Flags（旧版本react叫Tag）
- Renderer（渲染器）： 将Reconciler中打好标签的节点渲染到视图上


> virtual-dom对象 （内存中用来描述dom阶段的对象）


## useEffect race conditions in React 
[Fixing Race Conditions in React with useEffect](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)
 - 竞争条件 例如你用id 去fetch data 再effect 中， 然后显示请求回来的结果，有时候显示正常，有时候是无效的。

## react 源码学习
`reactElement` 对象的数据结构是

```ts
export type ReactElement = {|
  // 用于辨别ReactElement对象
  $$typeof: any,

  // 内部属性
  type: any, // 表明其种类
  key: any,
  ref: any,
  props: any,

  // ReactFiber 记录创建本对象的Fiber节点, 还未与Fiber树关联之前, 该属性为null
  _owner: any,

  // __DEV__ dev环境下的一些额外信息, 如文件路径, 文件名, 行列信息等
  _store: {validated: boolean, ...},
  _self: React$Element<any>,
  _shadowChildren: any,
  _source: Source,
|};

```
从  createElement 会调用 ReactElement 返回虚拟DOM
`createElement`函数的第一个参数将作为创建`ReactElement`的`type`. 可以看到`Content`这个变量被编译器命名为`App_Content`, 并作为第一个参数(引用传递), 传入了`createElement`.
```js
class App_App extends react_default.a.Component {
  render() {
    return /*#__PURE__*/ react_default.a.createElement(
      'div',
      {
        className: 'app',
      } /*#__PURE__*/,
      react_default.a.createElement('header', null, 'header') /*#__PURE__*/,

      // 此处直接将Content传入, 是一个指针传递
      react_default.a.createElement(App_Content, null) /*#__PURE__*/,
      react_default.a.createElement('footer', null, 'footer'),
    );
  }
}
class App_Content extends react_default.a.Component {
  render() {
    return /*#__PURE__*/ react_default.a.createElement(
      react_default.a.Fragment,
      null /*#__PURE__*/,
      react_default.a.createElement('p', null, '1'),
      /*#__PURE__*/

      react_default.a.createElement('p', null, '2'),
      /*#__PURE__*/

      react_default.a.createElement('p', null, '3'),
    );
  }
}
```
```js
function createElement(type, config, children)
```
```ReactElement```  创建虚拟DOM

## react 
1. 任务调度循环
2. fiber 构造循环
   > 大循环（任务调度循环）负责调度task, 小循环（fiber构造循环）负责实现task.
结合上文的宏观概览图(展示核心包之间的调用关系), 可以将 react 运行的主干逻辑进行概括:

1. 输入: 将每一次更新(如: 新增, 删除, 修改节点之后)视为一次`更新需求`(目的是要更新`DOM`节点).
2. 注册调度任务: `react-reconciler`收到`更新需求`之后, 并不会立即构造`fiber树`, 而是去调度中心`scheduler`注册一个新任务`task`, 即把`更新需求`转换成一个`task`.
3. 执行调度任务(输出): 调度中心`scheduler`通过`任务调度循环`来执行`task`(`task`的执行过程又回到了`react-reconciler`包中).
   - `fiber构造循环`是`task`的实现环节之一, 循环完成之后会构造出最新的 fiber 树.
   - `commitRoot`是`task`的实现环节之二, 把最新的 fiber 树最终渲染到页面上, `task`完成.

主干逻辑就是`输入到输出`这一条链路, 为了更好的性能(如`批量更新`, `可中断渲染`等功能), `react`在输入到输出的链路上做了很多优化策略, 比如本文讲述的`任务调度循环`和`fiber构造循环`相互配合就可以实现`可中断渲染`.

## React 应用中的高频对象

### Fiber 对象

先看数据结构, 其 type 类型的定义在[`ReactInternalTypes.js`](https://github.com/facebook/react/blob/v17.0.2/packages/react-reconciler/src/ReactInternalTypes.js#L47-L174)中:

```js
// 一个Fiber对象代表一个即将渲染或者已经渲染的组件(ReactElement), 一个组件可能对应两个fiber(current和WorkInProgress)
// 单个属性的解释在后文(在注释中无法添加超链接)
export type Fiber = {|
  tag: WorkTag,
  key: null | string,
  elementType: any,
  type: any,
  stateNode: any,
  return: Fiber | null,
  child: Fiber | null,
  sibling: Fiber | null,
  index: number,
  ref:
    | null
    | (((handle: mixed) => void) & { _stringRef: ?string, ... })
    | RefObject,
  pendingProps: any, // 从`ReactElement`对象传入的 props. 用于和`fiber.memoizedProps`比较可以得出属性是否变动
  memoizedProps: any, // 上一次生成子节点时用到的属性, 生成子节点之后保持在内存中
  updateQueue: mixed, // 存储state更新的队列, 当前节点的state改动之后, 都会创建一个update对象添加到这个队列中.
  memoizedState: any, // 用于输出的state, 最终渲染所使用的state
  dependencies: Dependencies | null, // 该fiber节点所依赖的(contexts, events)等
  mode: TypeOfMode, // 二进制位Bitfield,继承至父节点,影响本fiber节点及其子树中所有节点. 与react应用的运行模式有关(有ConcurrentMode, BlockingMode, NoMode等选项).

  // Effect 副作用相关
  flags: Flags, // 标志位
  subtreeFlags: Flags, //替代16.x版本中的 firstEffect, nextEffect. 当设置了 enableNewReconciler=true才会启用
  deletions: Array<Fiber> | null, // 存储将要被删除的子节点. 当设置了 enableNewReconciler=true才会启用

  nextEffect: Fiber | null, // 单向链表, 指向下一个有副作用的fiber节点
  firstEffect: Fiber | null, // 指向副作用链表中的第一个fiber节点
  lastEffect: Fiber | null, // 指向副作用链表中的最后一个fiber节点

  // 优先级相关
  lanes: Lanes, // 本fiber节点的优先级
  childLanes: Lanes, // 子节点的优先级
  alternate: Fiber | null, // 指向内存中的另一个fiber, 每个被更新过fiber节点在内存中都是成对出现(current和workInProgress)

  // 性能统计相关(开启enableProfilerTimer后才会统计)
  // react-dev-tool会根据这些时间统计来评估性能
  actualDuration?: number, // 本次更新过程, 本节点以及子树所消耗的总时间
  actualStartTime?: number, // 标记本fiber节点开始构建的时间
  selfBaseDuration?: number, // 用于最近一次生成本fiber节点所消耗的时间
  treeBaseDuration?: number, // 生成子树所消耗的时间的总和
|};
```

属性解释:

- `fiber.tag`: 表示 fiber 类型, 根据`ReactElement`组件的 type 进行生成, 在 react 内部共定义了[25 种 tag](https://github.com/facebook/react/blob/v17.0.2/packages/react-reconciler/src/ReactWorkTags.js#L10-L35).
- `fiber.key`: 和`ReactElement`组件的 key 一致.
- `fiber.elementType`: 一般来讲和`ReactElement`组件的 type 一致
- `fiber.type`: 一般来讲和`fiber.elementType`一致. 一些特殊情形下, 比如在开发环境下为了兼容热更新(`HotReloading`), 会对`function, class, ForwardRef`类型的`ReactElement`做一定的处理, 这种情况会区别于`fiber.elementType`, 具体赋值关系可以查看[源文件](https://github.com/facebook/react/blob/v17.0.2/packages/react-reconciler/src/ReactFiber.old.js#L571-L574).
- `fiber.stateNode`: 与`fiber`关联的局部状态节点(比如: `HostComponent`类型指向与`fiber`节点对应的 dom 节点; 根节点`fiber.stateNode`指向的是`FiberRoot`; class 类型节点其`stateNode`指向的是 class 实例).
- `fiber.return`: 指向父节点.
- `fiber.child`: 指向第一个子节点.
- `fiber.sibling`: 指向下一个兄弟节点.
- `fiber.index`: fiber 在兄弟节点中的索引, 如果是单节点默认为 0.
- `fiber.ref`: 指向在`ReactElement`组件上设置的 ref(`string`类型的`ref`除外, 这种类型的`ref`已经不推荐使用, `reconciler`阶段会将`string`类型的`ref`转换成一个`function`类型).
- `fiber.pendingProps`: 输入属性, 从`ReactElement`对象传入的 props. 用于和`fiber.memoizedProps`比较可以得出属性是否变动.
- `fiber.memoizedProps`: 上一次生成子节点时用到的属性, 生成子节点之后保持在内存中. 向下生成子节点之前叫做`pendingProps`, 生成子节点之后会把`pendingProps`赋值给`memoizedProps`用于下一次比较.`pendingProps`和`memoizedProps`比较可以得出属性是否变动.
- `fiber.updateQueue`: 存储`update更新对象`的队列, 每一次发起更新, 都需要在该队列上创建一个`update对象`.
- `fiber.memoizedState`: 上一次生成子节点之后保持在内存中的局部状态.
- `fiber.dependencies`: 该 fiber 节点所依赖的(contexts, events)等, 在`context`机制章节详细说明.
- `fiber.mode`: 二进制位 Bitfield,继承至父节点,影响本 fiber 节点及其子树中所有节点. 与 react 应用的运行模式有关(有 ConcurrentMode, BlockingMode, NoMode 等选项).
- `fiber.flags`: 标志位, 副作用标记(在 16.x 版本中叫做`effectTag`, 相应[pr](https://github.com/facebook/react/pull/19755)), 在[`ReactFiberFlags.js`](https://github.com/facebook/react/blob/v17.0.2/packages/react-reconciler/src/ReactFiberFlags.js#L10-L41)中定义了所有的标志位. `reconciler`阶段会将所有拥有`flags`标记的节点添加到副作用链表中, 等待 commit 阶段的处理.
- `fiber.subtreeFlags`: 替代 16.x 版本中的 firstEffect, nextEffect. 默认未开启, 当设置了[enableNewReconciler=true](https://github.com/facebook/react/blob/v17.0.2/packages/shared/ReactFeatureFlags.js#L93) 才会启用, 本系列只跟踪稳定版的代码, 未来版本不会深入解读, [使用示例见源码](https://github.com/facebook/react/blob/v17.0.2/packages/react-reconciler/src/ReactFiberCompleteWork.new.js#L690-L714).
- `fiber.deletions`: 存储将要被删除的子节点. 默认未开启, 当设置了[enableNewReconciler=true](https://github.com/facebook/react/blob/v17.0.2/packages/shared/ReactFeatureFlags.js#L93) 才会启用, 本系列只跟踪稳定版的代码, 未来版本不会深入解读, [使用示例见源码](https://github.com/facebook/react/blob/v17.0.2/packages/react-reconciler/src/ReactChildFiber.new.js#L275-L287).
- `fiber.nextEffect`: 单向链表, 指向下一个有副作用的 fiber 节点.
- `fiber.firstEffect`: 指向副作用链表中的第一个 fiber 节点.
- `fiber.lastEffect`: 指向副作用链表中的最后一个 fiber 节点.
- `fiber.lanes`: 本 fiber 节点所属的优先级, 创建 fiber 的时候设置.
- `fiber.childLanes`: 子节点所属的优先级.
- `fiber.alternate`: 指向内存中的另一个 fiber, 每个被更新过 fiber 节点在内存中都是成对出现(current 和 workInProgress)

通过以上 25 个属性的解释, 对`fiber`对象有一个初步的认识.



## Build your own React 构建你自己的 React
[构建你自己的 React]('https://pomb.us/build-your-own-react/')

> fiber 查找顺序   
> 1 先查找它的的child , 没有child 就查找sibling, 既没有child 有没有sibling，那就查找它的叔叔，如何parent 也没有sibling, 就继续向上找，直到root  然后到parent, 

## typescript learning
- TypeScript 允许开发人员定义变量的类型，可以在编译时捕获类型错误。
- 数组类型 let arr: string[] = ['1', '2'] or let arr: Array<number> = [1, 2]


## Elements, Children as props and re-render
1. 如果我们把一个组件提前到sub-tree 中，那么我们提取的这个组件中的state 更新，不会影响到父组件的更新，因为react 只能向下传递值。
2.
```js
  <Parent children={<Child />} />
  // exactly the same as above
  <Parent>
    <Child />
  </Parent>
  // And will be represented as this object:
  {
    type: Parent,
    props: {
      // element for Child here
      children: {
        type:  Child,
        ...
      }
    }
  }
```

## Advanced configuration with render props
1. 我们可以接收一个renderProps 函数，用函数来返回对应的组件。
2. render props, --> 如果一个组件希望对其作为属性传递的元素拥有控制权，或者向它们传递状态，你需要将这些元素转换为渲染属性（render props）：
```ts
  const Button = ({ renderIcon }) => {
  const [someState, setSomeState] = useState()
  const someProps = { ... };
  return <button>Submit {renderIcon(someProps, someState)}</button>;


  <Button renderIcon={(props, state) => <IconComponent {...props}someProps={state} /> } />
  // Children also can be render props, including "nesting" syntax.
  const Parent = ({ children }) => {
      return children(somedata);
  };
```
## Memoization with useMemo, useCallback and React.memo
1. 在react 中，为什么组件re-render 的时候，都要把组件中的声明的方法和变量重新生成一次，这个做的作用是什么了？
 - 因为在函数组件中，一个组件本身就是一个函数，函数执行结束和重新生成的时候都会创建一个新的函数作用域。
  ```ts
    const Component = () => {
    const submit = useCallback(() => {  // 我们使用useCallback 缓存了submit ,其实就是submit reference 在re-render 的时候一样了。
    // submit something here
    }, [])
    useEffect(() => {
    submit();
    // submit is memoized, so useEffect won't be triggered on
    every re-render
    }, [submit]);
    return ...
    }
  ```
  2. 什么时候需要把组件的props 进行Memoize 了， 就是当这个props, 用在了另一个组件的依赖中时。

  ```ts
    const Child = ({data, onChange}) => {};
    const ChildMemo = React.Memo(Child);

    const Component = () => {
      const data = useMemo(() => {...}, []) //some object
      const onChange = useCallback(() => {}, []) //some object

      // data and onChange now have stable reference
      // re-renders of ChildMemo will be prevented

      return <ChildMemo data={data} onChange={onChange} /> //By memoizing data and onChange , we're preserving the reference to those objects between re-renders. 
    }
  ```

  3. Why we can't define components inside other components
  ```ts
    export default function App() {
      const [text, setText] = useState('');

      const ComponentWithState = () => {
        const [isActive, setIsActive] = useState(false);

        return (
          <div className={`block ${isActive ? 'active' : ''}`}>
            <button onClick={() => setIsActive(!isActive)}>click to highlight</button>
          </div>
        );
      };

      return (
        <div>
          <input type="text" className="input" value={text} onChange={(e) => setText(e.target.value)} />
          <ComponentWithState />
        </div>
      );
    }
  ```
  - 上面的代码中，如果我们设置了点击highlight button , 改变了颜色，但是当我们input 一些数据时，就会重新渲染，
  - Declaring components inside other components like this can be one of the biggest performance killers in React.
  - 可以给组件上面加key 来告诉react,组件已经重新渲染。

##  Higher-order components in modern world
- 如何我们要回调一个函数，可以用另外一个函数包装一下。
- 可以使用useMemo 包裹数据，进行缓存。
## Refs from storing data imperative API
- 当组件的state 更新时，ref 中的存储的值会突然更新。
- when can we use Ref then?
  - is this value used for rendering components, now or in the feature.
  - is this value passed as props to other components in any way, now or in the future.

- useRef 创建的引用不是响应式的，者意味着，即使你的组件重新渲染了，useRef 所指向的值也不会自动更新。这个值会保持在最后一次设置的状态，
  直到你显式的改变它，这种特性使得useRef非常适合用于存储那些不应该在每次渲染时都改变的值，比如动画的上下文、定时器的ID、DOM元素的引用等。
-  我们可以将一个ref 通过props 传递给子组件。 如果我们要通过子组件，调用父组件里的set*** 方法，可以直接将 set*** 方法传递给props.
-  this bus is full of young passengers. get off --> 下车 ， tramp --- 流浪汉 except --> 除了

> React.forwardRef() 为什么要使用 forwardRef, 因为直接给子组件使用ref, react 是不知道的。

## React 中的闭包（Closures in React）
- 


## box-sizing: content-box
- box-sizing: 
  - width = border + padding + 内容的宽度
  - height = border + padding + 内容的高度
  - symbal -- symbol 类型用于创建对象的唯一标识符.

  -- 节流确保函数在
  -- Actions (描述发生了什么)  --> Dispatch(发送到store) --> Reducer(计算新状态) --> Store(保持新状态) --> View跟新视图。

## 微前端
- 微前端 一般由 MainApp and MicroApp 组成， 
> 这篇文章很赞
- https://medium.com/simform-engineering/building-scalable-and-modular-web-applications-with-react-micro-frontends-and-webpack-modul-ca3c6b9b3b23
## full stack github
- https://github.com/tiangolo/full-stack-fastapi-template

## Promise 
- Promise 中的executor 只能调用一个resolve or reject, 也就是说 再executor 中，如果有多个 resolve, and reject, 只会执行第一个。
```js
  let promise = new Promise(function(resolve, reject) {
    resolve("done");

    reject(new Error("…")); // 被忽略
    setTimeout(() => resolve("…")); // 被忽略
  });
```
## Promise all
- 请求瀑布 ![alt text](image-1.png)

## React 中通用错误处理
- 在 useEffect 的内部使用 try/catch
- try/catch won't able to catch anything that happens inside children component.
- React ErrorBoundary 
- 我们可以在onClick 中 try/catch 

## intro to Re-render
- hooks 会隐藏state update, 但是实际上你使用hook 在组件中，还是会引起全局渲染的，所以最好的方式还是，把state 封装到一个component 中。
- 我们可以使用"moving state down" 的模式，防止大应用的的重新渲染。

## elements as props
- always remember: "children" in this context are nothing more than a prop, and the "nested" syntax is just syntax for it!
- 当我们要渲染一个条件component 时， 如果这个component 的props 接受一个组件，我们不用关心props 接受的组件是否创建，影响性能，其实时不会的
  因为react 只有渲染的时候才会处理props 接收的组件
- 理解 React.cloneElement(icon, newProps)