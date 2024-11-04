//useRef
`useRef는 리액트에서 DOM 요소에 직접 접근하거나 컴포넌트 간에 값을 기억하기 위해 사용되는 훅
컴포넌트가 다시 렌더링될 때도 참조하는 값이 변하지 않기 때문에, DOM 조작이나 컴포넌트 간 상태 유지에 유용하게 사용된다
`;
import React, { useRef } from "react";

export default function InputFocus() {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type something..." />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}

`**useRef**는 DOM 요소나 컴포넌트의 특정 값에 접근하거나 값을 기억하고 싶을 때 사용되는 리액트 훅
useRef를 통해 참조된 값은 컴포넌트의 라이프사이클 동안 유지되며, 값이 변경되더라도 컴포넌트가 다시 렌더링되지 않는다

DOM 접근: 위 코드에서 inputRef는 HTMLInputElement 타입의 ref로, 
input 요소에 접근하기 위해 사용된다
버튼 클릭 시 input 요소에 포커스를 설정할 수 있도록 구현되었다

값 유지: useRef는 상태가 아니기 때문에, 값이 변경되더라도 리렌더링을 트리거하지 않는다
이로 인해 렌더링 간 값을 기억해야 하지만 리렌더링을 발생시키고 싶지 않을 때 유용하다

초기값 설정: useRef는 초기값을 인자로 받아 current라는 속성을 가진 객체를 반환한다
이 current 속성은 참조하고자 하는 값으로 설정된다

사용 사례

DOM 요소에 접근: 특정 DOM 요소에 직접 접근하여 조작해야 할 때 useRef를 사용한다
예를 들어, 입력 필드에 포커스를 설정하거나, 스크롤 위치를 변경할 때 유용하다

값 유지: 컴포넌트가 리렌더링될 때 유지되어야 하는 값을 저장하기 위해 사용할 수 있다
예를 들어, 이전 렌더링에서의 값을 기억하거나, 타이머 ID와 같은 정보를 저장할 때 사용된다

타이머 및 외부 API 참조: setInterval이나 setTimeout의 ID를 저장하거나 외부 라이브러리에서 반환된 참조를 저장할 때도 유용하다

리팩토링 및 확장 예시

아래는 useRef를 활용하여 컴포넌트 내에서 타이머를 관리하는 예시다`;

import React, { useRef, useState } from "react";

export default function TimerComponent() {
  const [count, setCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={startTimer}>Start Timer</button>
      <button onClick={stopTimer}>Stop Timer</button>
    </div>
  );
}
`위 코드에서 timerRef는 타이머의 ID를 저장하는 데 사용되며,
타이머를 시작하거나 중지할 때 활용된다
useRef를 사용함으로써 타이머 ID를 저장하고, 이를 통해 타이머가 중복 실행되거나 멈추지 않는 문제를 방지할 수 있다

이와 같이 useRef를 활용하면 DOM 접근이나 컴포넌트의 렌더링 간 상태 유지와 같은 다양한 상황에서 유용하게 사용할 수 있다`;
