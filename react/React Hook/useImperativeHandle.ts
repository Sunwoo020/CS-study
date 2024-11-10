//useImperativeHandle
`useImperativeHandle은 부모 컴포넌트가 자식 컴포넌트의 내부 기능을 제어할 수 있게 해주는 리액트 훅
주로 useRef와 함께 사용되며, 컴포넌트의 외부에서 특정 기능을 노출하고 싶을 때 사용된다
이 훅을 사용하면 컴포넌트 간의 의존성을 높이지 않고도 부모가 자식 컴포넌트의 특정 메서드를 호출할 수 있다`;
import React, { useImperativeHandle, useRef, forwardRef } from "react";

interface ChildHandle {
  focusInput: () => void;
}

const ChildComponent = forwardRef<ChildHandle>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focusInput: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  return <input ref={inputRef} type="text" placeholder="Type something..." />;
});

export default function ParentComponent() {
  const childRef = useRef<ChildHandle>(null);

  const handleClick = () => {
    if (childRef.current) {
      childRef.current.focusInput();
    }
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Focus Child Input</button>
    </div>
  );
}

`**useImperativeHandle**은 부모 컴포넌트가 자식 컴포넌트의 특정 기능을 사용할 수 있도록 하는 리액트 훅이다

주로 forwardRef와 함께 사용된다

forwardRef: 자식 컴포넌트에서 ref를 전달받기 위해 사용된다

이를 통해 부모 컴포넌트가 자식 컴포넌트의 특정 메서드를 호출할 수 있게 된다

사용 예시: 위 코드에서 부모 컴포넌트는 ChildComponent의 focusInput 메서드를 호출하여 자식 컴포넌트의 input 요소에 포커스를 설정할 수 있다

의존성 관리: useImperativeHandle의 두 번째 인자로 함수를 전달하며, 

이 함수에서 부모에게 노출하고자 하는 메서드를 정의한다

이렇게 하면 자식 컴포넌트의 내부 기능을 부모 컴포넌트가 직접 제어할 수 있다

주의할 점:

과도한 사용 지양: useImperativeHandle은 컴포넌트 간의 의존성을 높일 수 있으므로 필요한 경우에만 신중히 사용해야 한다

컴포넌트 간의 명확한 역할 분리가 어려워질 수 있기 때문이다

일관된 상태 관리: 부모가 자식 컴포넌트의 내부 메서드를 직접 호출할 수 있기 때문에, 

상태 관리를 일관되게 유지하는 것이 중요하다

자식 컴포넌트의 상태가 부모에 의해 의도치 않게 변경되지 않도록 주의해야 한다

사용 사례

포커스 제어: 위 예시처럼 자식 컴포넌트에 있는 input 요소의 포커스를 부모 컴포넌트에서 제어하고 싶을 때 유용하다

스크롤 제어: 특정 요소의 스크롤 위치를 부모 컴포넌트에서 제어해야 할 때 사용된다

애니메이션 트리거: 자식 컴포넌트의 애니메이션을 부모 컴포넌트에서 시작하거나 멈출 때 사용할 수 있다

아래는 추가적인 예시로, 자식 컴포넌트에서 애니메이션을 트리거할 수 있도록 useImperativeHandle을 사용한 경우다`;
import React, { useRef, useImperativeHandle, forwardRef } from "react";

interface AnimationHandle {
  startAnimation: () => void;
}

const AnimatedComponent = forwardRef<AnimationHandle>((props, ref) => {
  useImperativeHandle(ref, () => ({
    startAnimation: () => {
      console.log("Animation started!");
      // 실제 애니메이션 로직을 여기에 작성
    },
  }));

  return <div>Animated Component</div>;
});

export default function ParentComponent() {
  const animationRef = useRef<AnimationHandle>(null);

  const handleAnimationStart = () => {
    if (animationRef.current) {
      animationRef.current.startAnimation();
    }
  };

  return (
    <div>
      <AnimatedComponent ref={animationRef} />
      <button onClick={handleAnimationStart}>Start Animation</button>
    </div>
  );
}
`위 코드에서 AnimatedComponent는 부모 컴포넌트가 호출할 수 있는 startAnimation 메서드를 제공하고 있으며, 

부모 컴포넌트에서 버튼 클릭 시 이 메서드를 호출하여 애니메이션을 시작할 수 있다

이와 같이 useImperativeHandle을 사용하면 부모 컴포넌트가 자식의 내부 로직에 직접 접근할 수 있도록 기능을 노출할 수 있지만,

남용하면 컴포넌트 간의 의존성이 높아져 유지 보수가 어려워질 수 있으므로 필요한 경우에만 사용하는 것이 좋다

`;
