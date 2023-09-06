# react-learning
learning react 

## 算法
https://www.hello-algo.com/

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


