`
상태 관리 라이브러리와 API 연동(Redux, Zustand)
React 애플리케이션에서 상태 관리 라이브러리(Redux, Zustand)를 사용하면 
전역 상태를 효율적으로 관리하고, API 데이터를 다른 컴포넌트와 쉽게 공유할 수 있다. 
이 문서에서는 Redux와 Zustand를 활용한 API 연동 방법을 자세히 설명한다.

Redux와 API 연동
Redux의 개념
Redux는 애플리케이션 상태를 전역적으로 관리하는 라이브러리다. Redux는 다음과 같은 세 가지 핵심 원칙을 따른다

- Single Source of Truth: 애플리케이션 상태는 하나의 중앙 저장소(Store)에 저장된다.
- State is Read-Only: 상태를 직접 수정할 수 없으며, 상태를 변경하려면 액션(Action)을 통해야 한다.
- Pure Functions: 상태 변경은 순수 함수(Reducer)에 의해 이루어진다.

Redux Toolkit을 활용한 API 연동
Redux Toolkit은 Redux의 복잡한 설정을 간소화하고, 효율적인 API 상태 관리를 위해 RTK Query를 제공한다.

Redux 설치
`
npm install @reduxjs/toolkit react-redux
`
Redux Store 설정
Redux Toolkit을 사용해 Store를 설정한다.
`
// store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postsApi } from './postsApi';

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer, // RTK Query 리듀서 추가
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware), // 미들웨어 추가
});

setupListeners(store.dispatch); // 리스너 설정
`
RTK Query로 API 연동
RTK Query를 사용해 API 요청을 정의한다.
`
// postsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',


  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts', // GET 요청
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost, // POST 요청
      }),
    }),
  }),
});

export const { useGetPostsQuery, useAddPostMutation } = postsApi;
`
React 컴포넌트에서 API 사용
RTK Query로 정의한 훅을 사용하여 데이터를 패칭하거나, 데이터를 조작할 수 있다.
`
import React from 'react';
import { useGetPostsQuery, useAddPostMutation } from './postsApi';

const Posts = () => {
  const { data: posts, isLoading, error } = useGetPostsQuery(); // 데이터 가져오기
  const [addPost] = useAddPostMutation(); // 데이터 추가하기

  const handleAddPost = async () => {
    await addPost({ title: 'New Post', body: 'This is a new post', userId: 1 });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <button onClick={handleAddPost}>Add Post</button>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
`
Redux와 API 연동의 장점
중앙 집중식 상태 관리: API 데이터를 Redux 상태로 관리하여 다른 컴포넌트에서 쉽게 액세스 가능.
RTK Query 활용: 데이터 패칭, 캐싱, 상태 관리가 자동으로 처리되어 코드 복잡도가 낮아짐.
유연한 상태 관리: 커스텀 로직과 조합 가능.

Zustand와 API 연동
Zustand의 개념
Zustand는 가벼운 상태 관리 라이브러리로, 간결하고 사용하기 쉬운 상태 관리 방법을 제공한다. Zustand는 Redux보다 간단하며, 미들웨어 설정 없이도 API 데이터를 전역적으로 관리할 수 있다.

Zustand 설치
`
npm install zustand
`
Zustand로 API 연동하기
상태 스토어 생성
Zustand에서 상태를 정의하고 API 호출을 포함한 함수를 추가한다.
`
import { create } from 'zustand';
import axios from 'axios';

const usePostStore = create((set) => ({
  posts: [],
  isLoading: false,
  error: null,
  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      set({ posts: response.data, isLoading: false });
    } catch (err) {
      set({ error: err.message, isLoading: false });
    }
  },
  addPost: async (newPost) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      set((state) => ({ posts: [...state.posts, response.data] }));
    } catch (err) {
      console.error(err.message);
    }
  },
}));
`
React 컴포넌트에서 상태 사용
Zustand의 상태와 함수를 컴포넌트에서 호출한다.
`
import React, { useEffect } from 'react';
import usePostStore from './postStore';

const Posts = () => {
  const { posts, isLoading, error, fetchPosts, addPost } = usePostStore();

  useEffect(() => {
    fetchPosts(); // 컴포넌트 마운트 시 데이터 로드
  }, [fetchPosts]);

  const handleAddPost = () => {
    addPost({ title: 'New Post', body: 'This is a new post', userId: 1 });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <button onClick={handleAddPost}>Add Post</button>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
`
Zustand와 API 연동의 장점
간결한 코드: Redux에 비해 설정이 단순하고 코드가 적다.
유연성: 상태와 API 로직을 하나의 스토어에서 관리 가능.
가벼움: 작은 프로젝트에서 효율적으로 사용할 수 있다.

결론
Redux와 Zustand는 각각의 장점과 적합한 사용 사례가 있다.

Redux는 대규모 애플리케이션에서 API 상태를 중앙 집중적으로 관리할 때 강력하다.
Zustand는 설정이 간단하고 유연성이 뛰어나며, 소규모 프로젝트에서 효율적이다.`