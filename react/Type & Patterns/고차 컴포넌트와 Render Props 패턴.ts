`고차 컴포넌트(Higher Order Components, HOC)와 Render Props 패턴

고차 컴포넌트 (Higher Order Components, HOC)
HOC는 컴포넌트를 인수로 받아서 새로운 컴포넌트를 반환하는 함수다
재사용 가능한 로직을 캡슐화하는 데 주로 사용된다

예시 - HOC를 사용한 접근 제어:
`import React from 'react';

interface WithAuthProps {
  isAuthenticated: boolean;
}

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithAuthProps> => ({ isAuthenticated, ...props }) => {
  if (!isAuthenticated) {
    return <p>You must be logged in to view this content.</p>;
  }

  return <WrappedComponent {...(props as P)} />;
};

interface ProfileProps {
  name: string;
}

const Profile: React.FC<ProfileProps> = ({ name }) => <div>Welcome, {name}!</div>;

const ProfileWithAuth = withAuth(Profile);

export default ProfileWithAuth;
`
위 코드에서는 withAuth라는 HOC를 통해 컴포넌트에 인증 여부를 확인하는 로직을 추가했다
이 HOC는 Profile 컴포넌트에 적용되어, 사용자 인증 여부에 따라 렌더링을 다르게 한다

Render Props 패턴
Render Props는 컴포넌트 자식으로 함수를 전달하여 해당 컴포넌트의 로직을 커스터마이징할 수 있게 한다

예시 - Render Props를 사용한 데이터 패칭:

`import React, { useState, useEffect } from 'react';

interface DataFetcherProps {
  url: string;
  children: (data: any) => JSX.Element;
}

const DataFetcher: React.FC<DataFetcherProps> = ({ url, children }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, [url]);

  return data ? children(data) : <p>Loading...</p>;
};

const App: React.FC = () => (
  <DataFetcher url="https://jsonplaceholder.typicode.com/users">
    {(data) => (
      <ul>
        {data.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    )}
  </DataFetcher>
);

export default App;
`
DataFetcher 컴포넌트는 children으로 함수를 받아 데이터를 가져와서 렌더링하는 방식을 제공한다
이 방식을 통해 로직을 재사용하고 유연한 렌더링을 할 수 있다
`