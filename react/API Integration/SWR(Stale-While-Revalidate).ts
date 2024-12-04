`
SWR (Stale-While-Revalidate)
SWR은 React 기반의 데이터 패칭 라이브러리로, 
빠르고 간단하게 데이터 요청과 상태 관리를 처리할 수 있도록 설계된 도구이다. 
SWR은 Stale-While-Revalidate 패턴을 기반으로 하며, 
이 패턴은 기존 데이터를 즉시 반환한 뒤, 
백그라운드에서 데이터를 새로 가져와 최신 상태로 업데이트한다.

SWR의 주요 특징
Stale-While-Revalidate 패턴
Stale: 기존의 캐시된 데이터를 즉시 반환하여 UI가 빠르게 렌더링되도록 한다.
Revalidate: 기존 데이터를 반환한 후, 백그라운드에서 데이터를 새로 가져와 상태를 업데이트한다.
이를 통해 사용자 경험(UX)을 향상시키고, 네트워크 요청을 최적화한다.

데이터 캐싱 및 공유
SWR은 동일한 키를 사용하는 요청에 대해 데이터를 캐싱하고, 캐시된 데이터를 여러 컴포넌트 간에 공유한다.
중복된 네트워크 요청을 방지하고 성능을 최적화한다.

자동 리패칭
데이터가 오래된 경우, 자동으로 데이터를 다시 가져온다.
브라우저 창이 포커스될 때나 네트워크가 다시 연결될 때 데이터를 리패칭한다.

간단한 사용법
SWR은 React의 Hook 형태로 제공되어 설정 및 사용이 간단하다.
코드 양이 적고 직관적이다.

SWR 설치 및 설정
설치
SWR은 아래 명령어로 설치할 수 있다:
`
npm install swr
`
기본 설정
SWRConfig를 사용해 전역 설정을 지정할 수 있다
`
import { SWRConfig } from 'swr';

const App = ({ children }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((res) => res.json()),
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default App;
`
SWR 사용법
기본 데이터 패칭
SWR의 핵심은 useSWR 훅이다.

코드 예제
`
import useSWR from 'swr';

// fetcher 함수 정의
const fetcher = (url) => fetch(url).then((res) => res.json());

const PostList = () => {
  const { data, error, isLoading } = useSWR(
    'https://jsonplaceholder.typicode.com/posts',
    fetcher
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

export default PostList;
`
설명
fetcher: 데이터를 가져오는 함수. 여기서는 fetch를 사용하여 API를 호출한다.
useSWR: 첫 번째 인자는 키(또는 URL), 두 번째 인자는 데이터를 가져오는 함수이다.
data, error, isLoading:
data: 서버에서 가져온 데이터.
error: 오류가 발생했을 때의 에러 객체.
isLoading: 데이터가 로드 중인지 나타낸다.

조건부 데이터 패칭
SWR은 조건부로 데이터를 가져올 수도 있다. 예를 들어, id 값이 있을 때만 API를 호출하는 경우
`
const PostDetail = ({ id }) => {
  const { data, error, isLoading } = useSWR(
    id ? `https://jsonplaceholder.typicode.com/posts/${id}` : null,
    fetcher
  );

  if (!id) return <p>No ID provided</p>;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error occurred!</p>;

  return <h1>{data.title}</h1>;
};
`
설명
id가 null이면 SWR은 데이터를 패칭하지 않는다.

데이터 갱신 및 리패칭
수동 리패칭
mutate를 사용해 데이터를 강제로 갱신할 수 있다
`
import useSWR, { mutate } from 'swr';

const updateData = async () => {
  await fetch('https://jsonplaceholder.typicode.com/posts', { method: 'POST' });
  mutate('https://jsonplaceholder.typicode.com/posts'); // 데이터를 리패칭
};

const PostList = () => {
  const { data } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher);

  return (
    <div>
      <button onClick={updateData}>Update Posts</button>
      <ul>
        {data?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};
`
폴링(Polling)
일정 간격으로 데이터를 새로고침하려면 refreshInterval을 사용한다
`
const { data } = useSWR(
  'https://jsonplaceholder.typicode.com/posts',
  fetcher,
  { refreshInterval: 5000 } // 5초마다 데이터 갱신
);
`
캐싱 및 전역 데이터 공유
SWR은 동일한 키를 사용하는 모든 컴포넌트에서 데이터를 공유한다. 
예를 들어, 두 컴포넌트가 같은 키로 데이터를 요청하면, 
첫 번째 요청에서 가져온 데이터를 두 번째 컴포넌트에서도 즉시 사용할 수 있다.

SWR의 장점
간단한 API: useSWR 훅으로 대부분의 작업을 처리할 수 있다.
자동화된 상태 관리: 로딩, 에러, 데이터 상태를 자동으로 관리한다.
빠른 초기 렌더링: 캐시된 데이터를 즉시 반환하여 빠른 UI 반응성을 제공한다.
자동 리패칭: 오래된 데이터를 자동으로 갱신해 항상 최신 상태를 유지한다.
데이터 캐싱: 동일한 데이터를 여러 컴포넌트에서 효율적으로 공유한다.
React 특화: React와 자연스럽게 통합되며, 코드의 간결성을 유지할 수 있다.

SWR 사용 시 주의사항
캐시 키 관리:
키는 데이터의 고유 식별자로 사용되므로 일관되게 정의해야 한다.
백엔드 협업:
백엔드 API가 SWR의 Stale-While-Revalidate 패턴에 적합하도록 설계되어야 한다.
비동기 작업의 복잡성:
SWR은 데이터 패칭에 특화되어 있으므로, 복잡한 상태 관리에는 적합하지 않을 수 있다.
`