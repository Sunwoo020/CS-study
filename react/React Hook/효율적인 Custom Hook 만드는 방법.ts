`커스텀 훅(Custom Hook)은 React에서 공통 로직을 재사용하고 코드를 더욱 간결하고 유지보수하기 쉽게 만들어 준다
커스텀 훅은 기본적인 React Hook(useState, useEffect, useContext 등)을 조합하여 특별한 기능을 수행하도록 만들어질 수 있다
이제, 커스텀 훅을 작성할 때 효율성을 고려하는 다양한 방법과 실제 사례를 살펴보겠다

커스텀 훅을 만드는 이유
커스텀 훅을 만드는 주요 목적은 다음과 같다
- 코드 재사용성 증가: 동일한 로직을 여러 컴포넌트에서 공유할 때 반복을 줄일 수 있다
- 코드의 가독성 향상: 로직을 명확히 분리하여 각 컴포넌트의 역할을 명확히 할 수 있다
- 테스트 용이성: 로직을 별도로 분리하여 단위 테스트를 보다 쉽게 작성할 수 있다

커스텀 훅을 만들 때 고려할 사항
- 매개변수와 반환값을 명확하게 정의하여 여러 상황에서 사용 가능하도록 만들기
- 의존성 관리: 훅 내부에서 사용하는 상태나 값들이 올바르게 업데이트되도록 의존성을 명확하게 정의한다
- 효율적인 메모이제이션: 훅 내에서 반복적으로 계산하는 값들을 useMemo나 useCallback을 사용하여 메모이제이션한다

커스텀 훅 작성 예시
여기서는 데이터를 페칭하는 훅과 폼 필드 관리를 위한 커스텀 훅을 작성하는 예시를 통해 효율적인 커스텀 훅을 작성하는 방법을 설명하겠다

1. 데이터 페칭 훅 (useFetch)
데이터를 페칭하는 작업은 많은 컴포넌트에서 필요로 하는 공통 작업이다
이 로직을 커스텀 훅으로 분리하여 재사용할 수 있다

useFetch 커스텀 훅 작성:`;
import { useState, useEffect } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
`
사용 예시:
`;
import React from "react";
import useFetch from "./useFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

const UserList: React.FC = () => {
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
};

export default UserList;
`
설명:

타입 제네릭 (T) 사용: 데이터를 어떤 형식으로 받을지 모르는 경우, 제네릭 타입을 사용하여 데이터 타입을 정의할 수 있다
이를 통해 다양한 데이터 구조를 처리할 수 있다

의존성 배열 관리: useEffect의 의존성 배열로 url을 전달하여, URL이 변경될 때만 데이터를 다시 가져오도록 한다

상태 관리: loading, error와 같은 상태를 관리하여 로딩 상태와 에러 처리가 쉽도록 했다

2. 폼 상태 관리 훅 (useForm)
폼 필드를 관리하는 것도 자주 반복되는 로직이다
커스텀 훅을 사용해 폼 상태와 유효성 검사 로직을 재사용 가능하게 만들어 보자

useForm 커스텀 훅 작성:
`;
import { useState } from "react";

type FormValues = { [key: string]: any };

interface UseFormResult {
  values: FormValues;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetForm: () => void;
}

function useForm(initialValues: FormValues): UseFormResult {
  const [values, setValues] = useState<FormValues>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return { values, handleChange, resetForm };
}

export default useForm;
`
사용 예시:
`;
import React from "react";
import useForm from "./useForm";

const LoginForm: React.FC = () => {
  const { values, handleChange, resetForm } = useForm({
    username: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", values);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          name="username"
          value={values.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
`
설명:
동적 폼 필드 관리: 입력 필드의 이름(name)과 값을 기반으로 동적으로 상태를 관리한다
이를 통해 폼 필드의 수가 증가해도 코드를 단순하게 유지할 수 있다

초기 상태 (initialValues) 사용: 초기값을 받아서 폼 상태를 설정하고, 폼 리셋 기능을 추가해 폼의 상태를 쉽게 초기화할 수 있도록 했다

일관성 있는 상태 변경 로직: handleChange 함수는 모든 입력 필드의 변화를 일관된 방식으로 처리할 수 있게 한다

커스텀 훅 작성 시 유용한 팁
제네릭 타입 사용: 제네릭을 사용해 다양한 데이터 타입에 대해 재사용할 수 있는 훅을 만들자
이를 통해 커스텀 훅의 활용 범위를 넓힐 수 있다

기능 단일화: 하나의 커스텀 훅은 하나의 책임을 가질 수 있도록 설계한다
예를 들어, 데이터 페칭 훅은 데이터를 가져오는 기능만 담당하고, 폼 훅은 폼 상태 관리만 담당하는 것이 좋다

의존성 관리: useEffect와 같은 훅을 사용할 때는 의존성 배열을 잘 관리하여 불필요한 리렌더링을 방지한다

React Hook 규칙 준수: 모든 React 훅과 마찬가지로 커스텀 훅도 이름을 "use"로 시작해야 하며, 
컴포넌트 또는 다른 훅 내부에서만 호출되어야 한다
이를 통해 React의 훅 사용 규칙을 지키고 최적화를 유도한다

적절한 메모이제이션: useMemo와 useCallback을 활용하여 성능을 최적화하자
예를 들어, 계산 비용이 큰 로직이나 이벤트 핸들러 함수가 매번 새로 생성되지 않도록 메모이제이션한다

예시: 메모이제이션을 통한 최적화된 커스텀 훅
아래는 API 호출을 할 때, useCallback을 사용하여 불필요한 함수 재생성을 방지한 예시다

useApi 커스텀 훅:
`;
import { useState, useCallback } from "react";

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  fetchData: (url: string) => Promise<void>;
}

function useApi<T>(): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, fetchData };
}

export default useApi;
`
fetchData 함수를 useCallback을 사용하여 메모이제이션함으로써 의존성이 변경되지 않는 한 함수가 재생성되지 않도록 최적화하였다

결론
커스텀 훅은 반복되는 로직을 모듈화하고 재사용성을 높이기 위한 강력한 도구다
타입스크립트를 사용하여 커스텀 훅의 타입 안정성을 보장하면 유지보수하기 쉬운 코드를 작성할 수 있다
커스텀 훅을 작성할 때는 재사용성, 기능 단일화, 의존성 관리, 메모이제이션 등을 고려하여 효율적이고 최적화된 훅을 만들 수 있다






`;
