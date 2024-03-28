import { useState, useEffect } from 'react';
import './styles.scss';

type Issue = {
    id: string;
    title: string;
    description: string;
    author: string;
}

const url1 = 'https://api-sage-two-60.vercel.app/mocks/issues/1?delay=2000';
const url2 = 'https://api-sage-two-60.vercel.app/mocks/issues/2?delay=1000';

const Page = ({id}: {id: string}) => {
    const [ data, setData] = useState<Issue>({} as Issue);
    const [loading, setLoading] = useState(false);

    const url = id ==='1' ? url1 : url2;

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        fetch(url, { signal: controller.signal })
        // fetch(url)
            .then((r) => r.json())
            .then((r) => {
                setData(r);
                console.log(r);
                setLoading(false)
            })
            .catch((e) => {
                console.log(e.name);
            })

            return () => {
                controller.abort();
            }
    }, [url])

    if(!data.id || loading) return <>loading issue {id}</>;

    return (
        <div>
            <h1>My issue number {data.id}</h1>
            <h2>{data.title}</h2>
            <p>{data.description}</p>
        </div>
    )
}

const App = () => {
    const [page, setPage] = useState('1');

    return (
        <div className="App">
          <div className="container">
            <ul className="column">
              <li>
                <button className="button" onClick={() => setPage('1')} disabled={page === '1'}>
                  Issue 1
                </button>
              </li>
              <li>
                <button className="button" onClick={() => setPage('2')} disabled={page === '2'}>
                  Issue 2
                </button>
              </li>
            </ul>
    
            <Page id={page} />
          </div>
        </div>
      );
}

export default App;