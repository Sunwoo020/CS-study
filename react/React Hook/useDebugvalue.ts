// useDebugvalue
`useDebugValue는 리액트 개발자 도구에서 커스텀 훅의 디버깅 정보를 제공하기 위해 사용되는 리액트 훅
주로 커스텀 훅 내부에서 사용하여 해당 훅의 상태나 유용한 디버깅 정보를 표시하는 용도로 사용`;
import React, { useState, useDebugValue } from "react";

function useCount(initialValue: number) {
  const [count, setCount] = useState(initialValue);

  useDebugValue(count > 5 ? "High Count" : "Low Count");

  return [count, setCount] as const;
}

export default function DebugValueExample() {
  const [count, setCount] = useCount(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

`**useDebugValue**는 주로 커스텀 훅에서만 사용되며, 
리액트 개발자 도구에 디버깅 정보를 표시하기 위해 사용됨
이를 통해 개발자는 상태나 특정 값을 쉽게 확인할 수 있음

사용 예시: 위 코드에서 useDebugValue는 count 값이 5보다 큰 경우 
'High Count', 그렇지 않으면 'Low Count'로 표시되도록 설정했음
이는 리액트 개발자 도구에서 해당 훅을 사용할 때 유용한 정보를 제공하는 역할

복잡한 값 계산: useDebugValue는 두 번째 인자로 포맷터 함수를 받을 수 있다
이 함수는 디버깅 정보를 더 직관적으로 표시하기 위해 사용될 수 있다
예를 들어, 값이 복잡하거나 계산이 필요한 경우 포맷터 함수를 활용하여 디버깅 정보를 간결하게 만들 수 있다
`;
useDebugValue(count, (c) => `Count is ${c}`);
`
주의점: useDebugValue는 개발 중에만 사용되며, 
실제 애플리케이션의 동작에는 영향을 주지 않음
따라서 성능에 큰 부담을 주지 않으면서 디버깅에 도움을 줄 수 있다

사용 사례

커스텀 훅 디버깅: 커스텀 훅을 사용할 때 해당 훅의 내부 상태를 
리액트 개발자 도구에서 쉽게 파악할 수 있도록 하기 위해 사용됨
예를 들어, 복잡한 상태를 관리하는 커스텀 훅에서 현재 상태를 이해하기 쉽게 표시할 수 있다

상태 분류: 상태에 따라 다른 디버깅 메시지를 표시하여 개발자가 현재 상태를 빠르게 파악할 수 있도록 도와준다

이와 같이 useDebugValue를 활용하면 커스텀 훅의 상태를 좀 더 명확하게 디버깅하고, 리액트 개발자 도구를 통해 쉽게 상태를 추적할 수 있다

`;
