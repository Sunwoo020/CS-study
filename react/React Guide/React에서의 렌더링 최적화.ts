`React에서의 성능 최적화: 렌더링 최적화

React 애플리케이션의 성능을 최적화하는 중요한 부분 중 하나는 렌더링 최적화다
렌더링 최적화는 불필요한 컴포넌트의 리렌더링을 방지하고, 계산 비용이 큰 작업을 효율적으로 처리하여
애플리케이션의 성능을 개선하는 것을 목표로 한다
아래는 렌더링을 최적화하는 주요 기법들에 대한 자세한 설명이다

1. React.memo

React.memo는 고차 컴포넌트(Higher Order Component)로, 함수형 컴포넌트에서 불필요한 재렌더링을 방지하는 데 사용된다

React.memo는 컴포넌트의 props가 변경되지 않았을 경우 이전에 렌더링된 결과를 재사용하여 컴포넌트의 렌더링을 최적화한다
이는 특히 렌더링 비용이 큰 컴포넌트에서 유용하다

기본적으로 props가 얕은 비교(shallow comparison)를 통해 변경 여부를 확인하며, 
동일한 props가 전달되면 컴포넌트를 다시 렌더링하지 않는다

예시:
`;
import React from "react";

const MyComponent = React.memo(({ name }) => {
  console.log("Rendering MyComponent");
  return <div>Hello, {name}</div>;
});

export default MyComponent;

`위 코드에서 MyComponent는 name props가 변경되지 않는 한 재렌더링되지 않는다

2. useCallback

**useCallback**은 함수의 참조를 메모이제이션하는 훅이다

컴포넌트가 리렌더링될 때마다 함수가 새로 정의되는 것을 방지하기 위해 사용된다

자식 컴포넌트에 콜백 함수가 props로 전달될 때, 함수가 변경되지 않도록 참조를 유지하여 불필요한 자식 컴포넌트의 리렌더링을 방지한다

예시:
`;
import React, { useState, useCallback } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default Counter;

`위 코드에서 increment 함수는 useCallback을 사용하여 메모이제이션되므로, 

Counter 컴포넌트가 리렌더링되더라도 같은 함수 참조를 유지한다

3. useMemo

**useMemo**는 값을 메모이제이션하는 훅으로, 계산 비용이 큰 작업의 결과를 캐싱하여 불필요한 재계산을 방지한다

특정 값이 변경될 때만 재계산이 이루어지므로, 성능을 개선할 수 있다

예시:
`;
import React, { useState, useMemo } from "react";

function ExpensiveCalculationComponent({ num }) {
  const result = useMemo(() => {
    console.log("Calculating...");
    return num * 2; // 계산 비용이 큰 작업이라고 가정
  }, [num]);

  return <div>Result: {result}</div>;
}

export default ExpensiveCalculationComponent;

`위 코드에서 useMemo는 num이 변경될 때만 재계산을 수행하며, 그렇지 않으면 이전 계산 결과를 재사용한다

4. key 속성의 올바른 사용

React에서 리스트 렌더링 시 key 속성은 각 요소를 고유하게 식별하는 데 사용된다

key가 잘못 지정되면 불필요한 리렌더링이 발생하거나 예상치 못한 렌더링 오류가 발생할 수 있다

key는 리스트의 각 항목이 고유하게 식별될 수 있도록 설정해야 하며, 일반적으로 고유한 ID를 사용하는 것이 좋다

예시:
`;
const items = ["Apple", "Banana", "Cherry"];

function ItemList() {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li> // index 사용은 권장되지 않음
      ))}
    </ul>
  );
}

`위 예시에서 index를 key로 사용하는 것은 리스트의 순서가 변경될 경우 문제를 일으킬 수 있으므로, 고유한 값을 사용하는 것이 좋다

5. React Profiler로 성능 분석

React Profiler는 애플리케이션의 성능을 분석하는 도구로, 어떤 컴포넌트가 불필요하게 렌더링되고 있는지 확인할 수 있다

Profiler를 사용하여 렌더링 성능을 개선할 수 있는 부분을 찾고, 최적화 기법을 적용할 수 있다

예시:
`;
import { Profiler } from "react";

function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" or "update"
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  console.log({ id, phase, actualDuration });
}

function App() {
  return (
    <Profiler id="App" onRender={onRenderCallback}>
      <MyComponent />
    </Profiler>
  );
}

`Profiler를 사용하면 특정 컴포넌트의 렌더링 시간과 렌더링 빈도를 확인할 수 있어, 성능 개선의 근거 자료로 활용할 수 있다

6. 불필요한 리렌더링 방지

**상태 끌어올리기(Lifting State Up)**를 통해 부모 컴포넌트에서 관리할 필요가 없는 상태를 자식 컴포넌트로 내리거나, 
컨텍스트(Context) 사용 시 꼭 필요한 부분에만 값을 제공하여 불필요한 리렌더링을 방지할 수 있다

**React.memo와 useCallback/useMemo**를 조합하여, props나 상태가 변경되지 않았을 경우 컴포넌트가 다시 렌더링되지 않도록 최적화할 수 있다

요약

React에서의 렌더링 최적화는 불필요한 렌더링을 방지하고 
계산 비용이 큰 작업을 효율적으로 처리하여 성능을 개선하는 것을 목표로 한다
이를 위해 React.memo, useCallback, useMemo 등의 훅을 사용하며, 
key 속성을 올바르게 지정하고, Profiler를 통해 성능 병목을 분석하는 등의 기법을 적용할 수 있다
이러한 최적화 기법들을 적용함으로써 React 애플리케이션의 반응성과 사용자 경험을 크게 개선할 수 있다

`;
