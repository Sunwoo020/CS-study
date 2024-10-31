//useEffect
`useEffect는 리액트 컴포넌트가 렌더링된 이후에 특정 작업을 수행할 수 있도록 도와주는 훅입니다. 이 훅은 데이터 페칭, 구독 설정, 수동으로 DOM 업데이트 등 컴포넌트의 사이드 이펙트를 처리하는 데 자주 사용됩니다.`;
import React, { useState, useEffect } from "react";

export default function Timer() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p>Timer: {count} seconds</p>
    </div>
  );
}
`**useEffect**는 컴포넌트가 렌더링될 때와 업데이트될 때 특정 작업을 수행할 수 있도록 해주는 리액트 훅입니다. 기본적으로 componentDidMount, componentDidUpdate, componentWillUnmount의 기능을 하나로 합친 역할을 합니다.

의존성 배열: useEffect의 두 번째 인자로 전달되는 배열을 의존성 배열이라고 합니다. 이 배열 안에 있는 값이 변경될 때만 useEffect가 실행됩니다.

빈 배열 ([])을 전달하면 컴포넌트가 처음 렌더링될 때만 실행됩니다.

배열을 생략하면 컴포넌트가 렌더링될 때마다 useEffect가 실행됩니다.

배열 안에 특정 변수를 넣으면 해당 변수가 변경될 때마다 실행됩니다.

정리 함수: useEffect 내에서 반환하는 함수는 컴포넌트가 언마운트되거나 업데이트되기 전에 정리(cleanup) 작업을 수행하는 데 사용됩니다. 위 예시에서 clearInterval을 호출하여 타이머를 정리하는 것이 그 예입니다.

타입스크립트 사용: useEffect는 기본적으로 타입 추론이 잘 되는 편이지만, 특정 API 호출이나 이벤트 리스너 설정과 같은 경우 타입을 명시적으로 지정해 줄 수 있습니다.

주의할 점:

렌더링 타이밍: useEffect는 렌더링 결과가 실제로 화면에 반영된 이후에 실행됩니다. 따라서 렌더링 전에 DOM을 조작해야 할 경우에는 useLayoutEffect를 사용하는 것이 좋습니다.

의존성 배열 관리: 의존성 배열에 포함된 값이 변경될 때만 효과가 다시 실행되므로, 의존성 배열을 잘못 설정하면 불필요한 재실행이나 의도하지 않은 동작이 발생할 수 있습니다. 이를 방지하기 위해 필요한 모든 변수를 의존성 배열에 포함시켜야 합니다.

비동기 함수 사용 시 주의: useEffect 내에서 비동기 함수를 직접 사용하는 것은 권장되지 않습니다. 대신, 비동기 함수를 내부에 정의하고 호출하는 방식으로 구현해야 합니다.

주요 사용 사례:

데이터 페칭: 컴포넌트가 마운트될 때 API로부터 데이터를 가져와 상태를 업데이트하는 경우.

이벤트 리스너 설정: 윈도우 이벤트 리스너를 추가하거나 제거할 때.

타이머 설정: 주기적으로 실행되는 작업을 설정하거나 정리할 때.

구독(subscriptions): 외부 데이터 소스에 대한 구독을 설정하고 컴포넌트가 언마운트될 때 구독을 해제할 때.

아래는 데이터 페칭을 예로 든 useEffect 활용 예시입니다.`;

import React, { useState, useEffect } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching users");
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
