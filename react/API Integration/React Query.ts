`
React Query: 데이터 패칭, 캐싱, 상태 관리
React Query는 서버 상태를 관리하고, 데이터 패칭, 캐싱, 동기화 및 업데이트를 간단히 처리하도록 도와주는 라이브러리이다. 
React Query는 REST API뿐만 아니라 GraphQL과 같은 다양한 데이터 소스와도 잘 작동하며, 
클라이언트의 상태 관리와 서버 데이터 관리의 복잡성을 줄여준다.

1. React Query의 주요 개념
1.1. 서버 상태(Server State)
서버 상태는 클라이언트 애플리케이션에서 유지하지만, 서버에서 가져오는 데이터이다.

서버 상태의 특징:
서버에서 변경될 수 있다.
클라이언트에서 캐싱해야 한다.
최신 상태를 동기화해야 한다.
React Query는 이러한 서버 상태를 효율적으로 관리한다.

1.2. React Query의 주요 기능
데이터 패칭: API 호출을 간단히 처리한다.

캐싱: 클라이언트에서 데이터를 캐싱해 불필요한 네트워크 요청을 줄인다.
리페치(Refetch): 데이터의 최신 상태를 유지하기 위해 자동 또는 수동으로 요청한다.
백그라운드 동기화: 데이터가 오래되었을 때 백그라운드에서 자동으로 업데이트한다.
쿼리 무효화(Query Invalidation): 특정 작업 후 캐시를 무효화해 데이터를 갱신한다.
에러 및 로딩 상태 관리: 상태 관리 로직을 줄이고, 기본 상태를 제공한다.
React Suspense 지원: 데이터 로딩 시 Suspense와 연동 가능하다.

2. React Query 설치
React Query를 사용하려면 아래 명령어로 설치한다
`
npm install @tanstack/react-query
`
React Query는 QueryClient와 QueryClientProvider로 초기화한다

`import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <YourComponent />
  </QueryClientProvider>
);

export default App;
`
3. React Query 사용법
3.1. 데이터 패칭: useQuery
useQuery는 데이터를 가져오고 캐싱하는 데 사용된다.

기본 사용법
`
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return data;
};

const PostList = () => {
  const { data, isLoading, isError } = useQuery(['posts'], fetchPosts);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error occurred!</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};
`
설명
쿼리 키: ['posts']는 캐시 식별자 역할을 하며, 데이터를 구분짓는 데 사용된다.
fetchPosts: API 데이터를 가져오는 비동기 함수이다.

상태 관리:
isLoading: 데이터를 로드 중일 때 true.
isError: 오류가 발생했을 때 true.
data: API 호출 결과.

3.2. 데이터 생성 및 수정: useMutation
useMutation은 데이터 생성, 수정, 삭제와 같은 작업에 사용된다.

사용 예제
`import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const addPost = async (newPost) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return data;
};

const AddPost = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']); // 캐시 무효화
    },
  });

  const handleAddPost = () => {
    mutation.mutate({ title: 'New Post', body: 'This is a new post.' });
  };

  return (
    <div>
      <button onClick={handleAddPost}>Add Post</button>
      {mutation.isLoading && <p>Adding post...</p>}
      {mutation.isError && <p>Error adding post!</p>}
      {mutation.isSuccess && <p>Post added successfully!</p>}
    </div>
  );
};
`
설명
useMutation: 데이터 조작 작업을 수행한다.
onSuccess 콜백: 성공 시 posts 쿼리를 무효화해 데이터를 최신화한다.
mutation.mutate: API 호출을 실행한다.

3.3. 캐싱과 자동 리페치
캐싱
React Query는 데이터를 자동으로 캐싱한다. 동일한 키를 가진 쿼리는 캐시된 데이터를 반환하며, 네트워크 요청을 줄인다.

자동 리페치
쿼리는 기본적으로 오래된 데이터(stale)를 백그라운드에서 새로고침한다. 이 동작은 staleTime 옵션으로 제어할 수 있다.
`
const { data } = useQuery(['posts'], fetchPosts, { staleTime: 5000 });
`
3.4. 쿼리 무효화(Query Invalidation)
쿼리 무효화는 특정 작업 후 데이터를 새로고침하기 위해 사용된다.

사용 예제
`
const queryClient = useQueryClient();
queryClient.invalidateQueries(['posts']);
`
이 코드는 posts 쿼리를 무효화해 React Query가 데이터를 새로 가져오도록 강제한다.

3.5. 데이터 리패칭 옵션
기본 옵션
React Query는 데이터 패칭 동작을 여러 옵션으로 제어할 수 있다

refetchOnWindowFocus (기본값: true):
브라우저 창이 다시 포커스될 때 데이터를 새로고침.

staleTime (기본값: 0):
데이터가 오래된 상태로 간주되기까지의 시간(ms).

cacheTime (기본값: 5분):
데이터가 메모리에서 제거되기까지의 시간.

사용 예제
`const { data } = useQuery(['posts'], fetchPosts, {
  refetchOnWindowFocus: false,
  staleTime: 10000, // 10초 동안은 데이터를 새로 가져오지 않음
  cacheTime: 300000, // 5분 동안 캐싱된 데이터를 유지
});
`
4. React Query의 상태 관리
React Query는 상태 관리 라이브러리와 비교하여 서버 상태를 효율적으로 관리한다. 
전역 상태 관리가 필요할 경우 React Query의 캐싱 기능을 활용할 수 있다.

5. React Query의 장점
간단한 데이터 패칭: 비동기 로직을 줄이고 데이터 패칭 로직을 간결하게 유지한다.
자동 캐싱: 동일한 데이터 요청을 반복하지 않는다.
자동 리페치: 데이터 동기화가 자동으로 처리된다.
옵션 제어: 데이터의 유효성, 새로고침, 캐싱 시간 등을 세밀하게 조정할 수 있다.
로딩 및 에러 상태 기본 제공: 상태 관리 코드를 간소화한다.
확장성: REST API, GraphQL, WebSocket 등 다양한 데이터 소스와 통합 가능하다.

6. React Query 사용 시 주의사항
의존성 관리: 쿼리 키는 데이터 캐싱과 리패치의 기준이 되므로 일관성 있게 관리해야 한다.
백엔드와 협업: 서버 API 설계가 React Query와 잘 맞아야 효율적으로 사용할 수 있다.
캐싱 전략: 적절한 staleTime과 cacheTime 설정으로 네트워크 요청을 최적화해야 한다.
`;
