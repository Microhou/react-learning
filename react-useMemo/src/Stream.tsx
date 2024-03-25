import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StreamResponseComponent = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    // 定义获取流式响应的函数
    const fetchStreamResponse = async () => {
      try {
        // 在这里定义您的请求头
        const headers = {
          'Content-Type': 'application/json',
        //   "accept-language": "en-US,en;q=0.9",
          "api-key": "61ca998a170e4cbeac69c06e7564b8e4",
        //   "cache-control": "no-cache",
        //   "pragma": "no-cache",
        //   "referer": "https://oai.azure.com/",
        //   "sec-ch-ua": "\"Chromium\";v=\"122\", \"Not(A:Brand\";v=\"24\", \"Microsoft Edge\";v=\"122\"",
        //   "sec-ch-ua-mobile": "?0",
        //   "sec-ch-ua-platform": "\"Windows\"",
        //   "sec-fetch-dest": "empty",
        //   "sec-fetch-mode": "cors",
        //   "sec-fetch-site": "same-site",
        //   "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
        //   "x-ms-useragent": "AzureOpenAI.Studio/1.0.02635.1620"
        };

        // 使用axios获取流式响应，并添加请求头
        const response = await axios.get('https://amf-finetunes-in-sweden.openai.azure.com/openai/threads/thread_Uxu8j4HsyDYcSwosgtXpRPFK/messages?api-version=2024-02-15-preview&limit=10&order=desc&before=msg_bZoWzDIDc75odW0JMepcnzGq', {
        //   responseType: 'stream',
          headers: headers // 将请求头对象传递给axios
        });

        // 处理流式数据
        const content = response.data.data[0]?.content[0]?.text.value;
        console.log("data", response)
        const decoder = new TextDecoder('utf-8');

        setData(content);
        // reader.read().then(function processText({ done, value }) {
        //   if (done) {
        //     console.log('Stream complete');
        //     return;
        //   }
        //   // 将流中的数据片段转换为文本
        // //   const str = decoder.decode(value, { stream: true });
        //   // 更新状态以包含新数据
        //   // 读取下一个数据片段
        //   reader.read().then(processText);
        // });
      } catch (error) {
        console.error('Error fetching stream response:', error);
      }
    };

    // 调用函数以获取流式响应
    fetchStreamResponse();
  }, []); // 空依赖数组意味着effect只会在组件挂载时运行一次

  return (
    <div>
      <h2>Stream Response Data:</h2>
      <p>{data}</p>
    </div>
  );
};

export default StreamResponseComponent;
