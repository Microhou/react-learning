import React, { useState, useEffect } from 'react';

export const mojodnaUrl = "https://api.github.com/users/mojodna"

export type GithubUser = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    name: string | null;
    company: string | null;
    blog: string;
    location: string | null;
    email: string | null;
    hireable: boolean | null;
    bio: string | null;
    twitter_username: string | null;
    public_repos: number;
    public_gists: number;
    followers: number;
    following: number;
    created_at: string;
    updated_at: string;
  }

export type OptionalGithubUser = Partial<GithubUser>;

export const defunktUrl = 'https://api.github.com/users/defunkt';


export const useData = <T extends unknown>(url: string) => {
    const [state, setState] = useState<T>();

    useEffect(() => {
        const dataFetch = async () => {
            const data = await (await fetch(url)).json();

            setState(data)
        }

        dataFetch();
    }, [url])
    
    return {data: state}; 
}
