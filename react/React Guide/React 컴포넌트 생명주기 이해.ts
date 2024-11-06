`React 컴포넌트의 생명주기 이해
React 컴포넌트의 생명주기는 컴포넌트가 생성되고, 업데이트되며, 소멸되는 과정을 의미한다
React는 클래스형 컴포넌트와 함수형 컴포넌트 모두에서 컴포넌트 생명주기를 관리할 수 있는 다양한 방법을 제공한다
특히, 타입스크립트를 사용하면 컴포넌트와 관련된 타입을 명확히 지정하여 더 안전한 코드를 작성할 수 있다

1. 클래스형 컴포넌트의 생명주기 메서드 (TypeScript)
클래스형 컴포넌트에서는 생명주기 메서드를 사용하여 컴포넌트의 특정 시점에 작업을 수행할 수 있다

주요 생명주기 메서드는 다음과 같다
componentDidMount: 컴포넌트가 처음 마운트된 직후 호출된다 
이 시점에서 API 요청이나 DOM 조작과 같은 작업을 수행한다
componentDidUpdate: 컴포넌트가 업데이트된 직후 호출된다 
이 메서드를 통해 변경된 props나 state를 기반으로 추가 작업을 수행할 수 있다
componentWillUnmount: 컴포넌트가 화면에서 제거되기 직전에 호출된다 
타이머 해제나 이벤트 리스너 제거 등의 정리 작업을 수행한다

타입스크립트를 사용한 예시:
`;
import React from "react";

interface MyComponentProps {
  initialCount: number;
}

interface MyComponentState {
  count: number;
}

class MyComponent extends React.Component<MyComponentProps, MyComponentState> {
  constructor(props: MyComponentProps) {
    super(props);
    this.state = {
      count: props.initialCount,
    };
  }

  componentDidMount() {
    console.log("Component mounted");
    // API 요청이나 필요한 초기화 작업을 수행
  }

  componentDidUpdate(prevProps: MyComponentProps, prevState: MyComponentState) {
    if (prevState.count !== this.state.count) {
      console.log("Component updated");
      // 상태가 변경될 때마다 추가 작업 수행
    }
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    // 타이머 해제, 이벤트 리스너 제거 등 정리 작업 수행
  }

  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default MyComponent;
`
위 코드에서 MyComponent는 생명주기 메서드를 사용하여 컴포넌트의 상태 변화에 따라 적절한 작업을 수행한다

2. 함수형 컴포넌트의 생명주기 관리 (TypeScript)
함수형 컴포넌트에서는 생명주기 메서드 대신 React 훅을 사용하여 컴포넌트의 특정 시점에 작업을 수행한다
useEffect 훅을 활용하여 클래스형 컴포넌트의 생명주기와 동일한 작업을 수행할 수 있다

useEffect: useEffect 훅은 컴포넌트가 마운트될 때, 업데이트될 때, 언마운트될 때 특정 작업을 수행할 수 있다
마운트 시: 두 번째 인자로 빈 배열 []을 전달하면 마운트 시에만 실행된다
업데이트 시: 특정 값이 변경될 때 실행되도록 의존성 배열에 해당 값을 전달할 수 있다
언마운트 시: 정리(cleanup) 함수가 반환되어 언마운트될 때 실행된다

타입스크립트를 사용한 예시:
`;
import React, { useEffect, useState } from "react";

interface MyComponentProps {
  initialCount: number;
}

const MyComponent: React.FC<MyComponentProps> = ({ initialCount }) => {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    console.log("Component mounted");
    // 마운트 시 API 호출 등 초기화 작업

    return () => {
      console.log("Component will unmount");
      // 언마운트 시 타이머 해제, 이벤트 리스너 제거 등 정리 작업
    };
  }, []);

  useEffect(() => {
    console.log("Count updated:", count);
    // count 상태가 변경될 때마다 실행되는 추가 작업
  }, [count]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default MyComponent;
`
위 코드에서 MyComponent는 useEffect 훅을 통해 마운트, 업데이트, 언마운트 시점에 필요한 작업을 수행한다

3. 생명주기의 사용 시나리오
마운트 시 API 호출

컴포넌트가 화면에 처음 나타날 때 데이터를 가져와야 하는 경우, 
클래스형 컴포넌트에서는 componentDidMount에서, 함수형 컴포넌트에서는 useEffect의 빈 배열을 사용하여 API 호출을 수행한다

업데이트 시 추가 작업

컴포넌트의 props나 state가 변경될 때마다 특정 작업이 필요하다면, 
클래스형 컴포넌트의 componentDidUpdate 또는 함수형 컴포넌트의 useEffect의 의존성 배열을 활용하여 해당 작업을 수행할 수 있다

언마운트 시 정리 작업

컴포넌트가 더 이상 필요하지 않게 되어 언마운트될 때, 
클래스형 컴포넌트의 componentWillUnmount나 함수형 컴포넌트의 useEffect 정리(cleanup) 함수에서 타이머나 이벤트 리스너를 해제할 수 있다

요약
클래스형 컴포넌트에서는 생명주기 메서드(componentDidMount, componentDidUpdate, componentWillUnmount)를 사용하여 
컴포넌트의 특정 시점에 작업을 수행할 수 있다
함수형 컴포넌트에서는 React 훅(useEffect)을 사용하여 컴포넌트의 생명주기와 동일한 작업을 수행할 수 있다
타입스크립트를 사용하면 props와 state에 대한 타입을 명확히 지정하여 컴포넌트를 더 안전하게 작성할 수 있다
React 컴포넌트의 생명주기를 잘 이해하고 적절하게 활용하면, API 호출, DOM 조작, 이벤트 리스너 관리 등의 작업을 더 효율적으로 수행할 수 있다`;
