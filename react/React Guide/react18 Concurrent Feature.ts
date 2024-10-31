`
# 기존 React에서 추구하고 있는 Concurrent Mode(동시성) 를 React 18 부터 하나의 기능으로 지원하게 됨

## Concurrent Mode?
### 자바스크립트는 싱글 스레드기반 언어
- 여러 작업을 동시에 처리할 수 없음
- React에서도 UI 렌더링 도중에 일어나는 모든 작업은 차단함

하지만 React는 Concurrent Mode를 사용해 여러 작업을 동시에 처리할 수 있도록 기능들을 확대하고 있었음
동시성이라는 개념을 활용하여 여러 작업을 동시에 처리하도록 React는 구현하고 있음

### Concurrent Mode의 동작
- 여러 작업을 작은 단위로 나눈 후 작업들 간의 우선순위를 정하고
- 정해진 우선순위에 따라 작업을 수행하는 방법
- 즉 실제로는 동시에 작업이 수행되지는 않지만 작업 간의 전환이 매우 빠르기 때문에 동시에 수행되는 것처럼 보임

## 왜 React는 Concurrent Mode를 개발하려고 하는가?
- 사용자 경험에서 아주 중요한 역할을 가짐

### 디바운스와 쓰로틀링
  기본적으로 Input 관련 기능을 이용할 때 디바운스 / 쓰로틀링을 활용함
  디바운스: 무조건 일정 시간을 기다려야 함
  쓰로틀링: 성능이 좋은 기기에서는 사용자 경험을 높일 수 있지만 성능이 안좋은 기기에서는 버벅거리는 현상이 발생
  사용자 경험을 개선하기 위해 자주 활용되지만 한계점이 존재

### Concurrent Mode는 이와 같은 한계점을 해결할 수 있습니다.
  작업간의 우선순위를 정하여 사용자 입력 / 다른 작업들을 동시에 처리되는 경험을 보여줄 수 있고 
  개발자가 설정한 Delay에 의존되는 것이 아닌 사용자 기기 성능에 따라 달라지게 됨

### suspense 기능
  React는 suspense기능을 지원하여 해당 페이지를 불러오기 전 로딩 기능을 지원하고 있음
  하지만 기기 성능이 좋다보니 빠른 렌더링을 지원함에도 불구하고 의미없는 로딩을 보여주게 됨
  Concurrent Mode는 일정 시간동안 현재 페이지를 유지하면서 다음 페이지의 렌더링에 대한 작업을 동시에 진행하게 됨
`;

`# createRoot
기존 React 17 의 render()와는 다르게 createRoot API를 활용해야 함
동시성 API / Automatic Batching 지원
React 17와 React 18의 차이점`;
// React 17
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// React 18
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

`
# startTransition
## 기존에 사용자 경험을 개선하기위 사용했던 디바운스 / 쓰로틀링 / setTimeout 등의 기능을 지원
- 일반적으로 자바스크립트에서 활용하는 setTimeout 동작방식과 다르게 동작
- 태스트 큐를 활용하지 않으며 동기적으로 즉시 실행

## useTransition 훅을 활용하여 isPending 상태값을 가져와 렌더리 결과를 분기 처리 가능
- isPending: state 변경 직후에도 UI를 리렌더링 하지 않고 UI를 잠시 유지하는 상태
- 각 상태 업데이트에 대한 우선순위를 설정할 수 있는 Hook

## startTransition만 사용할 수 있음
- startTransition: 클릭이나 키 입력에 의해 
  우선순위가 높은 상태 업데이트가 발생할 경우 내부에 선언한 상태 업데이트는 중단되고 
  클릭이나 키 입력이 끝난 후 이후에 해당 상태 업데이트가 발생

searchQuery 상태 업데이트 진행 중 inputValue의 상태 업데이트가 발생하게 되면 
잠시 중단하고 inputValue 상태 업데이트가 완료되면 searchQuery 상태 업데이트가 완료,
디바운스 / 쓰로틀링을 활용하지 않고 기기 성능에 따라 최적화가 가능해짐
기존 디바운스 / 쓰로틀링은 setTimeout을 활용해 특정 시간을 무조건 기다려야 했음`

import React, { useTransition, useState } from "react";

import "./App.css";

function App() {
  const [isPending, startTransition] = useTransition();
  const [inputValue, setInputValue] = useState();
  const [searchQuery, setSearchQuery] = useState();

  const onClickCreateNumber = (e) => {
    const input = e.target.value;

    setInputValue(input);

    // React에게 searchQuery의 상태 업데이트는 inputValue 상태보다 지연시키라고 알리기
    startTransition(() => {
      setSearchQuery(input);
    });
  };

  console.log("리렌더링", isPending, inputValue, searchQuery);
  return (
    <>
      <input onChange={onClickCreateNumber} />
      // isPending값이 true일 경우 searchQuery 상태가 우선순위에 밀려 pending 상태임으로 버튼 클릭 불가
      // searchQuery 상태 업데이트가 완료되면 버튼 클릭 가능 => 이것을 활용해 로딩 기능 구현 가능
      <button disabled={isPending}>button</button>
    </>
  );
}

export default App;
`
useTransition() 에서 timeout을 설정할 수 있음
최대 얼마까지 기다릴 것인지 시간을 설정,
아래의 코드는 5초 동안 렌더링을 기다리다가 5초가 지나도 pending값이 변하지 않으면 강제로 렌더링 됨`;
const [isPending, startTransition] = useTransition({ timeoutMs: 5000 });

`# Suspense와 SSR
## 기존 React SSR 방식은 waterfall 방식을 사용하고 있었음
  Server는 React 코드를 전달 받음 => HTML로 변환 => 
  React는 다시 변환된 HTML 코드를 전달 받음 => hydrate
   * hydrate: HTML 문서에 자바스크립트를 붙이는 작업
### 특정 부분에서 병목현상이 발생할 경우 성능 이슈가 발생하게 됨
### 기존에는 SSR을 구현할 때 Suspense와 renderToString()과 같이 사용할 수 없었으며
  다른 서드파티 라이브러리의 도움이 필요했음
### React 18 부터는 응답이 오래걸리는 컴포넌트는 
  <Suspense>를 적용하여 초기 렌더링 속도를 개선할 수 있음

## React 18 에서는 독립적으로 각각의 렌더링이 가능한 기능이 추가 되었음
### 기존의 createRoot 대신 hyrateRoot 사용
  즉 유저에게 처음 보여주는 페이지 전체를 그려 내려주는 것이 아닌 빠르게 준비되는 부분부터 보여줌
### HTML Streaming API + Suspense를 연계하여 SSR 설계 지원
### Selective hydrating 기능 지원

## HTML Streaming
- Server에서 HTML 문서를 내려주는 것을 의미

- 기존의 React는 renderToString()을 활용하였음
  * 완성된 HTML 문서를 전달 받음

- React 18 부터는 pipeToNodeWritable()를 활용해 HTML코드를 작은 청크로 나눈 후 보내줄 수 있음

## Selective hydrating
### HTML Streaming 기능을 통해 하나의 컴포넌트가 영향을 미치는 빈도수는 감소하였지만
    극단적으로 하나의 컴포넌트가 너무 복잡할 경우 다른 컴포넌트들은 렌더링이 완료되고 
    내려받은 자바스크립트 코드를 hydration 해야하는데 
    아직 렌더링 되지 않는 컴포넌트 때문에 기다려야 하는 현상이 발생함

### React 18 부터는 <Suspense> 를 활용해 구현할 경우 
해당 컴포넌트가 아직 렌더링되지 않았어도 상관없이 다른 컴포넌트들은 hydration을 시작할 수 있게 되었음
`