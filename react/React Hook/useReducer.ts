// useReducer
`useReducer는 복잡한 상태 로직을 다룰 때 useState보다 더 구조적인 접근을 가능하게 해주는 리액트 훅
상태와 액션을 기반으로 상태를 업데이트하는 로직을 컴포넌트 외부로 분리할 수 있어, 코드의 가독성과 유지보수성을 높이는 데 유용하다`;
import React, { useReducer } from "react";

interface State {
  count: number;
}

const initialState: State = { count: 0 };

// 액션 타입 정의
type Action = { type: "increment" } | { type: "decrement" } | { type: "reset" };

// 리듀서 함수 정의
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return { count: 0 };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}
`**useReducer**는 상태와 이를 변경하는 로직을 분리하여 컴포넌트의 로직을 명확하게 관리할 수 있도록 해주는 훅이다
상태를 여러 가지 방식으로 변경해야 하거나 상태 관리가 복잡한 경우 유용하다

리듀서 함수: reducer 함수는 현재 상태와 액션을 인자로 받아 새로운 상태를 반환하는 순수 함수다
이를 통해 상태의 변경 로직을 하나의 함수로 집중시킬 수 있다

순수 함수: reducer 함수는 부작용이 없어야 하며, 동일한 입력에 대해 항상 동일한 출력을 반환해야 한다

액션: 상태를 변경하는 데 사용되는 객체로, type 프로퍼티를 가지고 있다
액션 타입에 따라 상태가 어떻게 변경될지를 정의한다

상태와 디스패치: useReducer는 현재 상태와 상태를 업데이트하는 함수 dispatch를 반환한다
dispatch 함수를 호출할 때 액션 객체를 전달하여 상태를 변경할 수 있다

사용 사례

복잡한 상태 관리: 여러 단계로 상태를 업데이트하거나 여러 상태가 상호 작용하는 경우 useReducer가 더 적합할 수 있다
예를 들어, 폼의 여러 입력 값을 관리하거나 API 요청의 상태(로딩, 성공, 실패)를 관리하는 경우 유용하다

상태 로직 분리: 상태 변경 로직을 컴포넌트 외부로 분리하여 코드를 모듈화하고 테스트하기 쉽게 만들 수 있다
reducer 함수를 별도로 정의하여 재사용하거나 독립적으로 테스트할 수 있다

대체 가능한 액션 처리: 액션에 따라 여러 상태를 처리해야 할 때, 
각 액션을 명확하게 정의하여 다양한 상태 변경을 쉽게 관리할 수 있다

리팩토링 및 확장 예시

아래는 상태를 좀 더 복잡하게 관리하기 위한 useReducer의 활용 예시다
이 예제에서는 여러 개의 상태를 관리하고, 각 상태에 대해 다양한 액션을 처리`;
import React, { useReducer } from "react";

interface State {
  count: number;
  step: number;
}

const initialState: State = { count: 0, step: 1 };

// 액션 타입 정의
type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" }
  | { type: "setStep"; payload: number };

// 리듀서 함수 정의
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + state.step };
    case "decrement":
      return { ...state, count: state.count - state.step };
    case "reset":
      return { ...state, count: 0 };
    case "setStep":
      return { ...state, step: action.payload };
    default:
      return state;
  }
}

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <div>
        <label>
          Step:
          <input
            type="number"
            value={state.step}
            onChange={(e) =>
              dispatch({ type: "setStep", payload: Number(e.target.value) })
            }
          />
        </label>
      </div>
      <button onClick={() => dispatch({ type: "increment" })}>Increment</button>
      <button onClick={() => dispatch({ type: "decrement" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </div>
  );
}

`위 코드에서는 step이라는 추가 상태를 관리하며, 사용자 입력에 따라 step 값을 설정할 수 있다
이를 통해 useReducer를 사용하여 복잡한 상태 로직을 효과적으로 관리할 수 있음을 알 수 있다

이와 같이 useReducer를 활용하면 컴포넌트의 상태 관리 로직을 명확하게 분리하고, 복잡한 상태를 체계적으로 관리할 수 있다
특히, 여러 상태를 다루거나 상태 변경 로직이 복잡할 경우 useReducer가 useState보다 더 적합한 선택이 될 수 있다

`;
