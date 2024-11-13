`React Strict Mode란?
React Strict Mode는 개발 중에 애플리케이션에서 잠재적인 문제를 감지하고 경고를 제공하는 도구다
개발 모드에서만 활성화되며, 사용자에게 영향을 주지 않으면서 코드의 품질을 향상시킬 수 있도록 도와준다
Strict Mode는 다음과 같은 상황에서 잠재적인 문제를 탐지하는 데 유용하다

안전하지 않은 생명주기 메서드 사용 탐지: 특정 생명주기 메서드가 안전하지 않거나 최적화에 문제가 될 수 있는 경우 경고한다

중복 렌더링 감지: Strict Mode에서는 컴포넌트를 한 번 더 렌더링하여 상태 관리에 오류가 있는지 조기에 발견할 수 있도록 도와준다

Deprecated API 사용 경고: 더 이상 사용되지 않는 API를 사용하는 경우 경고한다

의도치 않은 부수 효과 감지: 상태와 부수 효과 관리에서 발생할 수 있는 문제를 사전에 감지한다

Strict Mode 적용 방법 (TypeScript)
React의 Strict Mode는 React.StrictMode 컴포넌트를 사용하여 애플리케이션 전체 또는 일부를 감쌀 수 있다
이는 타입스크립트와 함께 사용될 수 있으며, 일반적인 JSX 문법을 사용해 애플리케이션에서 활용할 수 있다
`;
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
위 코드에서 React.StrictMode로 <App /> 컴포넌트를 감싸면 개발 모드에서 
해당 컴포넌트와 그 자식 컴포넌트에서 발생할 수 있는 잠재적인 문제를 감지하고, 콘솔에 경고 메시지를 출력한다
Strict Mode는 런타임 동작에 영향을 주지 않으며, 오직 개발 환경에서만 경고를 제공하는 역할을 한다

Strict Mode의 특징

- 중복 렌더링
Strict Mode는 개발 모드에서 컴포넌트가 처음 마운트될 때 두 번 렌더링한다
이는 상태 변경이 부작용을 유발할 수 있는 상황을 탐지하기 위해 의도적으로 이루어진다
중복 렌더링은 초기 렌더링 시에만 발생하며, 이후 업데이트 시에는 동일하게 동작한다

- Deprecated API 경고
더 이상 사용되지 않는 생명주기 메서드(componentWillMount, componentWillReceiveProps, componentWillUpdate 등)
를 사용하는 경우, 콘솔에 경고 메시지가 표시된다
이를 통해 최신 React API로 마이그레이션을 권장한다

- 부수 효과 감지
useEffect와 같은 훅을 사용할 때 부수 효과가 제대로 관리되지 않는 경우 문제를 감지할 수 있다
예를 들어, 클린업 함수가 올바르게 작성되지 않으면 Strict Mode는 이를 두 번 호출하여 버그를 탐지할 수 있도록 돕는다

함수형 컴포넌트에서의 예시:
`;
import React, { useState, useEffect } from "react";

const MyComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log("Effect triggered");

    return () => {
      console.log("Cleanup triggered");
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default MyComponent;
`
위 코드에서 useEffect는 컴포넌트가 렌더링될 때마다 호출된다
Strict Mode에서는 이 useEffect가 두 번 호출되므로, 개발자는 의도치 않은 부수 효과를 확인하고 관리할 수 있다

Strict Mode에서 발생할 수 있는 문제와 해결 방법

- 중복 렌더링으로 인한 예상치 못한 동작
Strict Mode에서는 컴포넌트가 처음 마운트될 때 두 번 렌더링되기 때문에, 부수 효과가 두 번 발생하는 것처럼 보일 수 있다
이는 주로 API 호출이나 상태 변경에서 문제를 일으킬 수 있다
해결 방법은 부수 효과를 idempotent하게 만드는 것이다
즉, 같은 작업이 여러 번 실행되더라도 부작용이 없도록 코드를 작성해야 한다

- Deprecated 생명주기 메서드 사용 경고
componentWillMount, componentWillReceiveProps, componentWillUpdate와 같은 메서드는 더 이상 사용되지 않으며,
대신 componentDidMount, getDerivedStateFromProps, componentDidUpdate 등을 사용해야 한다
타입스크립트와 함께 사용하는 경우, 타입 검사로 인해 사용하지 않는 메서드에 대한 경고를 더 쉽게 파악할 수 있다

Strict Mode를 적용할 때의 장점
- 코드의 견고성 향상: Strict Mode는 코드에서 잠재적인 문제를 조기에 발견하고 경고하므로, 코드를 더 안전하고 견고하게 작성할 수 있다

- React 최신 기능과의 호환성 유지: Strict Mode를 사용하면 더 이상 사용되지 않는 기능에 대한 경고를 통해 최신 React API로의 마이그레이션을 돕는다

- 개발 생산성 향상: Strict Mode는 개발자가 문제를 초기에 감지하고 해결할 수 있도록 도와준다
    이는 나중에 발생할 수 있는 복잡한 버그를 미리 방지하는 데 유용하다

전체 애플리케이션에서 Strict Mode 적용
Strict Mode는 애플리케이션의 일부 또는 전체에 적용할 수 있다 

예시 코드:
`;
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`
이렇게 하면 App 컴포넌트와 그 하위 컴포넌트 모두 Strict Mode의 영향을 받게 된다
이를 통해 애플리케이션 전체의 코드를 검토하고, 잠재적인 문제를 조기에 발견할 수 있다

요약
React Strict Mode는 개발 중에 잠재적인 문제를 감지하고 경고를 제공하는 도구로, 코드의 품질을 높이는 데 도움을 준다
타입스크립트와 함께 사용하면 컴포넌트 타입을 명확하게 지정하고, 더 안전한 코드를 작성할 수 있다
Strict Mode는 컴포넌트를 중복 렌더링하여 문제를 감지하고, 더 이상 사용되지 않는 생명주기 메서드에 대한 경고를 제공한다
이를 통해 부수 효과를 관리하고, React의 최신 기능과의 호환성을 유지하며, 개발 생산성을 높일 수 있다
Strict Mode는 개발 환경에서만 적용되며, 배포된 프로덕션 환경에서는 영향을 미치지 않기 때문에 안심하고 사용할 수 있다
React 프로젝트를 개발하는 동안 Strict Mode를 사용하는 것은 코드를 더 견고하고 유지보수하기 쉽게 만드는 좋은 방법이다`;
