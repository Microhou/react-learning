import React, { useState, useEffect, ReactNode } from "react";

import './styles.scss';
import { mojodnaUrl, defunktUrl, OptionalGithubUser, useData } from './components/data';

const SidebarContext = React.createContext<OptionalGithubUser | undefined>({} as OptionalGithubUser);
const IssueContext = React.createContext<OptionalGithubUser | undefined>({} as OptionalGithubUser);

const useSidebar = () => React.useContext(SidebarContext); // 想这样， 把useContext 使用hook 返回. 
const useIssue = () => React.useContext(IssueContext);

const SiderbarProvider = ({children}: {children: ReactNode}) => {
  const [sidebar, setSidebar] = useState();
  useEffect(() => {
    const dataFetch = async () => {
      fetch(mojodnaUrl)
      .then((r) => r.json())
      .then((r) => {setSidebar(r)})
    }

    dataFetch();
  }, [])

  return <SidebarContext.Provider value={sidebar}>{children}</SidebarContext.Provider>
}

const IssueProvider = ({children}: {children: ReactNode}) => {
  const [issue, setIssue] = useState<OptionalGithubUser>();

  useEffect(() => {
    const dataFetch = async () => {
      fetch(defunktUrl)
      .then((r) => r.json())
      .then((r) => {setIssue(r)})
    }

    dataFetch();
  }, [])

  return <IssueContext.Provider value={issue}>{children}</IssueContext.Provider>
}

const LoadingSidebar = () => (
    <>
      <div className="sidebar-base">
        <div className="loading sidebar-loading" />
        <div className="loading sidebar-loading" />
        <div className="loading sidebar-loading" />
        <div className="loading sidebar-loading" />
      </div>
    </>
  );
  
  const LoadingIssue = () => (
    <>
      <div className="issue">
        <div className="loading issue-loading" style={{ height: '20rem' }} />
        <div className="loading issue-loading" />
      </div>
    </>
  );

  const LoadingScreen = () => {
    return (
      <div className="layout">
        <LoadingSidebar />
        <LoadingIssue />
      </div>
    );
  };

  // const Sidebar = ({ data }: {data: OptionalGithubUser}) => {
  //   return (
  //       <div className="sidebar sidebar-base">
  //           <p>{data.name}</p>
  //           <p>{data.company}</p>
  //       </div>
  //   )
  // }
  // const Issue = ({ data }: {data: OptionalGithubUser}) => {
  //   return (
  //       <div className="issue">
  //           <p>{data.name}</p>
  //           <p>{data.company}</p>
  //       </div>
  //   )
  // }

  const Sidebar = () => {
    const data = useSidebar();

    return (
      <div className="sidebar sidebar-base">
             <p>{data?.name}</p>
             <p>{data?.company}</p>
      </div>
    )
  }

  const Issue = () => {
    const data = useIssue();
    return(
      <div className="issue">
             <p>{data?.name}</p>
             <p>{data?.company}</p>
        </div>
    )
  }

  const useAllData = () => {
    const [sidebar, setSidebar] = useState<OptionalGithubUser>();
    const [issue, setIssue] = useState<OptionalGithubUser>();

    useEffect(() => {
        // const dataFetch = async () => {
        //     const result = (await Promise.all([fetch(mojodnaUrl), fetch(defunktUrl)])).map((r) => r.json());
        //     console.log("res-->", result);
            

        //     const [sidebarResult, issueResult] = await Promise.all(result);

        //     setSidebar(sidebarResult);
        //     setIssue(issueResult);

        // }
        const dataFetch = async () => {  // 如果把fetch 的请求放在每个组件中去做的话，就会产生请求瀑布，我们可以在最顶层发请求。这样就是并行发送请求了
          fetch(mojodnaUrl)
          .then((r) => r.json())
          .then((r) => {setSidebar(r)});

          fetch(defunktUrl)
          .then((r) => r.json())
          .then((r) => {setIssue(r)} )
        }
        dataFetch(); // 想这个并行发送请求，我们会独立触发两次状态更改，App 组件又是顶层组件，所以它的渲染，会导致子组件的渲染。
    }, [])

    return { sidebar, issue };
  }

  // const App = () => {
  //   const { sidebar, issue } = useAllData();

  //   if (!sidebar || !issue ) return <LoadingScreen />;

  //   return (
  //       <div className="layout">
  //           <Sidebar data={sidebar} />
  //           <Issue data={issue} />
  //       </div>
  //   )
  // }
  const App = () => {
    const  sidebar = useSidebar();
    const issue = useIssue();

    if (!sidebar) return <LoadingScreen />;

    return (
      <div className="layout">
        <Sidebar />
        {issue ? <Issue /> : <LoadingIssue />}
      </div>
    )
  }

  // eslint-disable-next-line react-refresh/only-export-components
  export default () => (
    <SiderbarProvider>
      <IssueProvider>
        <App />
      </IssueProvider>
    </SiderbarProvider>
  );

