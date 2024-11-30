`
useEffect를 사용하여 API 데이터를 로드하는 것은 
React 컴포넌트가 렌더링될 때 또는 특정 의존성이 변경될 때 
비동기 작업(예: API 호출)을 수행하기 위해 자주 사용된다. 
useEffect는 React의 생명 주기와 밀접하게 연관되어 있으며, 
비동기 작업을 안전하고 효율적으로 처리하기 위한 방법을 제공한다.

아래는 useEffect를 사용한 API 데이터 로드에 대해 자세히 설명하겠다.

1. useEffect의 기본 개념
useEffect는 컴포넌트가 렌더링된 이후 특정 작업을 실행하는 데 사용된다.

주요 사용 사례:
API 데이터 로드
구독(subscription) 설정/해제
DOM 조작
타이머 설정 등

2. useEffect를 사용한 API 데이터 로드
2.1. 기본 구조
useEffect에서 API 데이터를 로드하는 기본 구조는 다음과 같다
`
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DataLoader = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 빈 배열: 컴포넌트가 처음 렌더링될 때 한 번 실행

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
};

export default DataLoader;
`
2.2. 코드 설명
State 관리
data: API에서 로드한 데이터를 저장.
loading: 데이터 로딩 상태를 나타냄.
error: API 호출 중 발생한 에러를 저장.

useEffect와 비동기 함수
fetchData는 API 데이터를 가져오는 비동기 함수.
useEffect는 비동기 함수를 호출해 데이터를 로드.

의존성 배열
[]: 의존성 배열이 비어 있으면 컴포넌트가 처음 렌더링될 때 한 번 실행.

3. 의존성 배열에 따른 동작
빈 배열 ([]):
컴포넌트가 처음 마운트될 때만 useEffect 실행.

특정 의존성 포함 ([dependency]):
배열 안의 값이 변경될 때마다 useEffect가 실행.

예: 검색 키워드 변경 시 데이터 다시 로드.
`
useEffect(() => {
  const fetchFilteredData = async () => {
    const response = await axios.get(`https://api.example.com/data?query=${query}`);
    setData(response.data);
  };

  fetchFilteredData();
}, [query]); // query가 변경될 때마다 실행
`
의존성 배열이 없는 경우:
매 렌더링마다 useEffect가 실행.
일반적으로 비권장.

4. 비동기 작업 처리의 주의점
4.1. 비동기 함수와 메모리 누수 방지
useEffect 안에서 비동기 함수를 직접 호출하면 React 경고가 발생할 수 있다. 
따라서 내부에 비동기 함수를 정의하고 호출하는 것이 일반적이다.
`
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.example.com/data');
      setData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);
`
4.2. Cleanup 함수로 메모리 누수 방지
컴포넌트가 언마운트될 때 비동기 작업을 중단하거나 정리해야 할 경우, cleanup 함수를 사용한다.
`
useEffect(() => {
  let isMounted = true;

  const fetchData = async () => {
    try {
      const response = await axios.get('https://api.example.com/data');
      if (isMounted) {
        setData(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();

  return () => {
    isMounted = false; // 컴포넌트 언마운트 시 작업 중단
  };
}, []);
`
5. 로딩, 에러 처리, 재시도
5.1. 로딩 상태와 에러 처리
로딩 상태와 에러 처리를 포함한 API 호출의 일반적인 패턴
`
if (loading) return <p>Loading...</p>;
if (error) return <p>Error: {error.message}</p>;
`
5.2. 데이터 로드 재시도
API 호출이 실패했을 때, 재시도 버튼을 제공
`const handleRetry = () => {
  setLoading(true);
  setError(null);
  fetchData();
};

if (error) {
  return (
    <div>
      <p>Error: {error.message}</p>
      <button onClick={handleRetry}>Retry</button>
    </div>
  );
}
`
6. 고급 패턴
6.1. API 호출을 Custom Hook으로 분리
비슷한 API 호출 로직이 반복될 경우, Custom Hook으로 분리하여 재사용성을 높일 수 있다.
`
import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

// 사용
const MyComponent = () => {
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
};
`
7. 결론
useEffect는 React 컴포넌트가 데이터 로드를 수행하는 가장 일반적인 방법이다.
API 호출 로직에서 비동기 작업, 로딩 상태, 에러 처리를 적절히 관리해야 한다.
필요 시 Custom Hook으로 분리하여 코드 재사용성을 높일 수 있다.
`