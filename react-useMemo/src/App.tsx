import React, { useState, useEffect } from "react";

import './styles.scss';
import { mojodnaUrl, defunktUrl, OptionalGithubUser, useData } from './components/data';

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

  const Sidebar = ({ data }: {data: OptionalGithubUser}) => {
    return (
        <div className="sidebar sidebar-base">
            <p>{data.name}</p>
            <p>{data.company}</p>
        </div>
    )
  }
  const Issue = ({ data }: {data: OptionalGithubUser}) => {
    return (
        <div className="issue">
            <p>{data.name}</p>
            <p>{data.company}</p>
        </div>
    )
  }

  const useAllData = () => {
    const [sidebar, setSidebar] = useState<OptionalGithubUser>();
    const [issue, setIssue] = useState<OptionalGithubUser>();

    useEffect(() => {
        const dataFetch = async () => {
            const result = (await Promise.all([fetch(mojodnaUrl), fetch(defunktUrl)])).map((r) => r.json());
            console.log("res-->", result);
            

            const [sidebarResult, issueResult] = await Promise.all(result);

            setSidebar(sidebarResult);
            setIssue(issueResult);

        }
        dataFetch();
    }, [])

    return { sidebar, issue };
  }

  const App = () => {
    const { sidebar, issue } = useAllData();

    if (!sidebar || !issue ) return <LoadingScreen />;

    return (
        <div className="layout">
            <Sidebar data={sidebar} />
            <Issue data={issue} />
        </div>
    )
  }

  export default App;

