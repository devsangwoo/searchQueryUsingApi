import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("");
  //렌더링의 조건이 만족이되서 해당하는 렌더링이 업데이트되었을때 effect실행
  useEffect(() => {
    let completed = false;
    async function get() {
      const result = await axios(
        `https://hn.algolia.com/api/v1/search?query=${query}`
      );
      //쿼리가 완료가된게아니라면
      if (!completed) setData(result.data);
    }

    get();

    return () => {
      completed = true;
    };
  }, [query]);
  //쿼리가 업데이트될때마다 감시해줌

  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <ul>
        {data.hits.map(item => (
          <li key={item.objectId}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
export default App;
