/* React v18 주요 변경점 */
`1. Automatic Batching
- React 18 = 상태 업데이트(setState)를 하나로 통합해서 배치처리를 한 후 리렌더링을 진행
  리렌더링 관련 성능 개선

- React 17 에서는 이벤트 핸들러 내부에서 발생하는 상태 업데이트만 배치처리를 지원
  이벤트 핸들러 내부에 fetch()등 과 같은 콜백을 받아 처리하는 메소드가 존재할 경우 
  내부의 콜백이 모두 완료된 후에는 Automatic Batching이 처리되지 않음
`;
`
이벤트 핸들러 내부에서 상테 업데이트가 여러번 발생
`;
// 2가지의 상태 존재
const [number, setNumber] = useState(0);
const [boolean, setBoolean] = useState(false);

// 하나의 핸들러에 2가지 상태를 업데이트
const onClickCreateNumber1 = () => {
  setNumber((prev) => prev + 1);
  setBoolean((prev) => !prev);
};
`
React 17 : 하나의 핸들러에서 2가지의 상태 업데이트가 이루어졌음에도 불구하고 리렌더링은 1번
React 18 : Automatic Batching이 활성화되어 2번의 상태 업데이트를 한번으로 통합
`;
`
이벤트 핸들러 내부에서 fetch()함수를 활용하여 상태 업데이트 여러번 발생`;

const onClickCreateNumber2 = () => {
  // fetch()를 활용해서 콜백함수 내부에서 여러개의 상태 업데이트
  fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) => {
    setNumber((prev) => prev + 1);
    setBoolean((prev) => !prev);
  });
};
`
React 17 : 버튼 클릭 1번당 리렌더링이 2번 발생, Automatic Batching이 작동하지 않고 있음
React 18 : Automatic Batching이 활성화되어 2번의 상태 업데이트를 한번으로 통합
`;

`이벤트 핸들러 내부에서 2가지 상태를 활용할 경우
일반적인 상태 업데이트 + 콜백함수 내부에서 상태 업데이트를 진행할 경우 Automatic Batching이 작동할까?`;
const onClickCreateNumber3 = () => {
  // 핸들러 내부에서 상태 업데이트 (콜스택)
  setNumber((prev) => prev + 1);

  // fetch() 콜백함수 내부에서 상태 업데이트 (태스트 큐)
  fetch("https://jsonplaceholder.typicode.com/posts/1").then((response) => {
    setBoolean((prev) => !prev);
  });
};
`버튼 클릭 1번당 리렌더링이 2번 발생, 동시 사용 불가
 결론적으로 혼용하여 사용할 경우 React 18에서도 Automatic Batching이 작동하지 않음
 
 Automatic Batching은 지원 범위를 기존 콜스택에서 태스크 큐까지 확장한 것
콜스택: JS 엔진에서 일반적으로 Job을 처리하는 일반적인 자료구조
태스크 큐: 비동기 콜백 등을 처리하는 자료구조`;

`번외) Automatic Batching 기능을 사용하고 싶지 않다면?
react-dom의 flushSync()를 활용하여 Automatic Batching 기능을 off 할 수 있음
`;
import { flushSync } from "react-dom";
const onClickCreateNumber4 = () => {
  // flushSync() 활용
  flushSync(() => {
    setNumber((prev) => prev + 1);
  });

  flushSync(() => {
    setBoolean((prev) => !prev);
  });
};
