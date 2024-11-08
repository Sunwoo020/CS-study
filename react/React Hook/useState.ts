// useState
`useState는 리액트에서 컴포넌트의 상태를 관리하기 위한 가장 기본적인 훅
이 훅은 컴포넌트 내부의 상태를 정의하고, 상태를 업데이트할 수 있는 함수를 제공한다
useState는 컴포넌트가 다시 렌더링될 때도 상태를 유지하며, 상태를 변경하면 컴포넌트가 자동으로 다시 렌더링된다`;
import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const decrement = () => {
    setCount((prevCount) => prevCount - 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

`**useState**는 리액트 함수형 컴포넌트에서 상태를 관리하기 위한 훅이다
상태의 초기 값을 설정하고, 해당 상태를 업데이트할 수 있는 함수를 반환한다

타입스크립트 사용: useState를 사용할 때 상태의 타입을 명시적으로 지정할 수 있다
위 코드에서는 useState<number>(0)을 사용하여 상태가 number 타입임을 명시했다
이를 통해 상태의 타입 안정성을 확보할 수 있다

상태 업데이트: setCount 함수는 상태를 업데이트하는 역할을 하며, 
함수 형태로 prevCount를 인자로 받아 이전 상태를 기반으로 새로운 상태를 계산할 수 있다
이렇게 하면 상태 업데이트가 비동기로 처리될 때도 안전하게 이전 값을 참조하여 상태를 변경할 수 있다

초기 값: useState의 초기 값은 상태의 기본 값을 설정하는 데 사용되며, 
이 값에 따라 타입스크립트가 상태의 타입을 추론한다
초기 값으로 함수(() => 초기값)를 전달하면 컴포넌트가 마운트될 때만 초기값 함수가 호출되므로 초기화 비용이 큰 경우에 유용하다

사용 사례

간단한 상태 관리: 카운터와 같은 간단한 상태를 관리할 때 useState를 사용한다
예를 들어, 버튼 클릭 시 증가하는 값이나, 토글 상태를 관리할 때 적합하다

폼 입력 값 관리: 사용자 입력 값을 관리하는 데 사용된다
여러 개의 입력 필드를 가진 폼을 다룰 때, 각각의 필드 값을 개별적으로 상태로 관리할 수 있다

컴포넌트 내부 상태: 특정 컴포넌트 내부에서만 사용되는 임시 상태를 관리할 때 유용하다
예를 들어, 모달의 열림/닫힘 상태, 체크박스 선택 여부 등을 관리할 수 있다

리팩토링 및 확장 예시

아래는 useState를 활용하여 여러 개의 입력 필드를 관리하는 예시`;
import React, { useState } from "react";

interface FormState {
  name: string;
  age: number;
}

export default function UserForm() {
  const [formState, setFormState] = useState<FormState>({ name: "", age: 0 });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formState.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Age:
        <input
          type="number"
          name="age"
          value={formState.age}
          onChange={handleInputChange}
        />
      </label>
      <p>
        Name: {formState.name}, Age: {formState.age}
      </p>
    </div>
  );
}
`위 코드에서는 useState를 사용하여 여러 입력 필드를 하나의 객체로 관리하고 있다
이렇게 하면 상태 업데이트 로직이 단순해지고, 관련된 상태를 하나의 객체로 묶어 관리할 수 있어 편리하다

이와 같이 useState를 활용하면 리액트 컴포넌트에서 동적인 상태를 손쉽게 관리할 수 있으며, 
타입스크립트와 함께 사용할 경우 상태의 타입을 명확하게 지정하여 코드의 안정성을 높일 수 있다`;
