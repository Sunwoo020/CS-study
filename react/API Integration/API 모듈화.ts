`
API 모듈화란?
API 모듈화는 애플리케이션의 API 호출 로직을 하나의 파일 또는 모듈로 분리하여 재사용성과 유지보수성을 높이는 설계 방식이다

API 호출 코드가 여러 컴포넌트에 중복되지 않도록 하고, 중앙에서 관리하여 변경이 발생했을 때 효율적으로 수정할 수 있도록 돕는다

API 모듈화를 사용하는 이유
- 중복 코드 감소
동일한 API를 호출하는 코드가 여러 컴포넌트에 중복되지 않도록 한다
API 호출 로직을 한 곳에서 관리하여 코드의 일관성을 유지한다

- 유지보수성 향상
API URL이나 공통 설정(예: 인증 토큰, 헤더)이 변경될 경우, API 모듈만 수정하면 된다

- 재사용성 증가
한 번 작성한 API 호출 코드를 여러 컴포넌트에서 쉽게 재사용할 수 있다

- 가독성 및 구조화
컴포넌트와 API 호출 로직을 분리하여 코드 가독성을 높인다
비즈니스 로직과 데이터 처리 로직을 명확히 구분한다

API 모듈화 기본 구조
API 모듈화를 구현하기 위해, 보통 다음과 같은 구조를 사용한다

Base API 설정: Axios 또는 Fetch로 공통 API 설정을 정의
각 API 엔드포인트별 함수 작성: 각 API 호출을 담당하는 함수를 작성
컴포넌트에서 호출: API 모듈을 컴포넌트에서 import하여 사용

API 모듈화 구현

Axios 설치
`

npm install axios

`
Axios 인스턴스 생성
공통 설정을 포함한 Axios 인스턴스를 생성한다.
`
// api/baseApi.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000, // 요청 시간 초과 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    // 예: 인증 토큰 추가
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 오류 처리 로직 추가 (예: 인증 만료)
    console.error(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
`
API 엔드포인트 함수 작성

baseApi를 사용하여 엔드포인트별 API 호출 함수를 작성한다
`
// api/userApi.ts
import axiosInstance from './baseApi';

// 사용자 관련 API 호출 함수
export const fetchUsers = async () => {
  const response = await axiosInstance.get('/users');
  return response.data;
};

export const fetchUserById = async (id: number) => {
  const response = await axiosInstance.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (user: { name: string; email: string }) => {
  const response = await axiosInstance.post('/users', user);
  return response.data;
};

export const updateUser = async (id: number, user: { name?: string; email?: string }) => {
  const response = await axiosInstance.put(`/users/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await axiosInstance.delete(`/users/${id}`);
  return response.data;
};
`
컴포넌트에서 API 호출
컴포넌트에서 API 모듈을 import하여 사용한다
`
// components/UserList.tsx
import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api/userApi';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
`
고급 패턴
환경 변수로 API URL 관리
dotenv를 사용해 API URL을 환경 변수로 관리한다

환경 변수 파일 설정 (.env)
`
REACT_APP_API_BASE_URL=https://api.example.com
`
Axios 인스턴스에서 사용
`
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
`
React Query와 결합
React Query를 사용하여 데이터 패칭, 캐싱, 동기화를 처리하면 더욱 효율적이다

React Query 설치
`
npm install @tanstack/react-query

`
React Query와 API 모듈 결합
`
// hooks/useUsers.ts
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '../api/userApi';

export const useUsers = () => {
  return useQuery(['users'], fetchUsers);
};
`
컴포넌트에서 사용
`
import React from 'react';
import { useUsers } from '../hooks/useUsers';

const UserList = () => {
  const { data: users, isLoading, error } = useUsers();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
`
TypeScript로 타입 정의
API 응답 타입 정의
`
// types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
}
`
API 함수에 적용
`
import { User } from '../types/user';

export const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get('/users');
  return response.data;
};
`
API 모듈화의 장점
중앙화된 관리:
API 호출 로직을 한 곳에서 관리하므로 변경 사항 반영이 쉽다

재사용성:
동일한 API 호출 코드를 여러 컴포넌트에서 재사용할 수 있다

가독성:
컴포넌트 코드에서 API 호출 로직을 분리하여 가독성을 높인다

확장성:
새로운 API를 쉽게 추가할 수 있다

테스트 용이성:
API 모듈을 독립적으로 테스트하기 쉽다

결론
API 모듈화는 대규모 프로젝트에서 효율적이고 유지보수 가능한 코드를 작성하는 데 필수적이다
Axios 인스턴스, 환경 변수, React Query 등을 활용하여 모듈화하면 개발 효율성과 코드 품질을 크게 향상시킬 수 있다
`