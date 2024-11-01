//useCallback
`useCallback은 함수가 불필요하게 다시 생성되는 것을 방지하기 위해 사용되는 리액트 훅 
주로 자식 컴포넌트에 콜백 함수가 props로 전달될 때, 
의존성이 변경되지 않는 한 동일한 함수 참조를 유지하여 불필요한 렌더링을 방지하는 데 유용`;
import React, { useState, useCallback } from "react";

interface ButtonProps {
  onClick: () => void;
}

const ChildButton: React.FC<ButtonProps> = ({ onClick }) => {
  console.log("ChildButton 렌더링");
  return <button onClick={onClick}>Click Me</button>;
};

export default function ParentComponent() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");

  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
      <ChildButton onClick={handleClick} />
      <p>Count: {count}</p>
    </div>
  );
}
`**useCallback**은 함수 컴포넌트가 렌더링될 때마다 
콜백 함수가 다시 생성되는 것을 방지하기 위해 사용된다
특히, 자식 컴포넌트에 콜백 함수가 props로 전달될 때 유용하다
동일한 함수 참조를 유지함으로써 자식 컴포넌트의 불필요한 재렌더링을 방지할 수 있다

의존성 배열: useCallback의 두 번째 인자는 의존성 배열로, 
이 배열에 포함된 값이 변경될 때만 콜백 함수가 다시 생성된다 
위 예제에서는 빈 배열 ([])을 사용하여 handleClick 함수가 한 번만 생성되도록 했음

만약 콜백 함수가 외부 상태나 props를 사용한다면, 해당 값들을 의존성 배열에 포함시켜야 한다

렌더링 최적화: useCallback을 사용하면 자식 컴포넌트에 동일한 함수 참조를 전달할 수 있어, 
자식 컴포넌트의 불필요한 재렌더링을 방지할 수 있다
위 코드에서 ChildButton은 handleClick이 변경되지 않는 한 불필요하게 렌더링되지 않는다

주의할 점:

의존성 배열의 정확성: 의존성 배열에 포함된 값이 변경될 때만 함수가 다시 생성되므로, 
잘못된 의존성 배열 설정은 함수가 재생성되지 않거나 불필요하게 재생성되는 문제를 일으킬 수 있다
따라서 모든 관련 변수를 의존성 배열에 포함시켜야 한다

useCallback과 성능 최적화: useCallback은 함수의 메모이제이션을 통해 성능을 최적화하려는 목적을 가지고 있지만, 
모든 경우에 사용하는 것이 적합하지 않을 수 있다 
메모이제이션 자체가 비용이 들기 때문에, 자주 변경되지 않는 함수나 무거운 연산을 가진 함수에 사용하는 것이 좋다

사용 사례

자식 컴포넌트에 콜백 함수 전달: 자식 컴포넌트가 props로 받은 콜백 함수의 변경을 감지하여 불필요하게 렌더링되지 않도록 할 때 유용하다

이벤트 핸들러: 동일한 이벤트 핸들러를 여러 번 사용해야 할 경우 useCallback을 사용하여 동일한 함수 참조를 유지할 수 있다

의존성 관리: 콜백 함수가 외부 변수에 의존할 때 의존성 배열을 정확하게 관리하여, 의도하지 않은 재렌더링을 방지할 수 있다

아래는 추가적인 예시로, 자식 컴포넌트가 복잡한 렌더링 로직을 가지고 있어, 최적화를 위해 useCallback을 사용한 경우`;
import React, { useState, useCallback, memo } from "react";

interface ExpensiveComponentProps {
  onAction: () => void;
}

const ExpensiveComponent: React.FC<ExpensiveComponentProps> = memo(
  ({ onAction }) => {
    console.log("ExpensiveComponent 렌더링");
    return <button onClick={onAction}>Perform Action</button>;
  }
);

export default function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleAction = useCallback(() => {
    console.log("Action performed");
  }, []);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <ExpensiveComponent onAction={handleAction} />
    </div>
  );
}
`위 코드에서 ExpensiveComponent는 memo로 감싸져 있어, 
props가 변경되지 않는 한 재렌더링되지 않는다
handleAction을 useCallback으로 감싸서 동일한 함수 참조를 유지함으로써 불필요한 재렌더링을 방지할 수 있다

이와 같이 useCallback을 적절히 사용하면 리액트 애플리케이션의 성능을 최적화하고 불필요한 렌더링을 줄일 수 있으며,
타입스크립트와 함께 사용하면 코드의 안정성을 더욱 높일 수 있다`;
