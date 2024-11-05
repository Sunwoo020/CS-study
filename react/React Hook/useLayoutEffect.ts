// useLayoutEffect
`useLayoutEffect는 DOM이 변경된 후, 브라우저가 화면에 그리기 전에 동기적으로 실행되는 리액트 훅
주로 DOM 요소의 레이아웃을 측정하거나 스타일을 변경하는 작업을 위해 사용됨
이는 useEffect와 달리 화면에 변경 사항이 반영되기 전에 실행되기 때문에 레이아웃에 영향을 주는 작업에 적합하다
`;

import React, { useLayoutEffect, useRef, useState } from "react";

export default function LayoutEffectExample() {
  const [width, setWidth] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      const currentWidth = divRef.current.getBoundingClientRect().width;
      setWidth(currentWidth);
    }
  }, []);

  return (
    <div>
      <div ref={divRef} style={{ width: "50%", backgroundColor: "lightblue" }}>
        This div is 50% of the parent width.
      </div>
      <p>Width of the div: {width}px</p>
    </div>
  );
}
`**useLayoutEffect**는 컴포넌트가 렌더링된 직후, 
브라우저가 화면에 페인트하기 전에 동기적으로 실행된다 
따라서 DOM을 직접 조작하거나 레이아웃 계산이 필요한 경우 유용하다

사용 시기:

useEffect는 비동기적으로 실행되므로 렌더링 결과가 화면에 반영된 후 실행된다
반면, useLayoutEffect는 렌더링 직후 화면에 그리기 전에 동기적으로 실행되므로 DOM 조작이나 레이아웃 측정에 적합하다

예를 들어, 특정 DOM 요소의 크기를 측정하고 그에 따라 상태를 업데이트해야 할 때
useLayoutEffect를 사용하면 화면이 깜빡이는 문제를 방지할 수 있다

의존성 배열: useLayoutEffect의 두 번째 인자는 의존성 배열로, 
이 배열 안에 있는 값이 변경될 때만 useLayoutEffect가 다시 실행된다

빈 배열 ([])을 전달하면 컴포넌트가 처음 렌더링될 때만 실행된다

배열 안에 특정 변수를 넣으면 해당 변수가 변경될 때마다 실행된다

주의할 점:

성능: useLayoutEffect는 동기적으로 실행되기 때문에 실행 시간이 길어지면 
브라우저의 화면 그리기를 지연시켜 사용자 경험에 악영향을 줄 수 있다
따라서 꼭 필요한 경우에만 사용해야 하며, 일반적인 사이드 이펙트는 useEffect를 사용하는 것이 좋다

사용 목적의 차이: useLayoutEffect는 레이아웃 계산이나 DOM 조작과 같은 작업에 적합하고, 
useEffect는 데이터 페칭이나 이벤트 리스너 등록과 같은 작업에 적합하다

사용 사례

DOM 요소의 크기나 위치 측정: 컴포넌트가 렌더링된 후 요소의 크기나 위치를 측정해야 할 때 사용한다
이를 통해 화면이 깜빡이거나 잘못된 정보를 표시하는 것을 방지할 수 있다

레이아웃 변경 반영: 렌더링 후에 레이아웃이나 스타일을 변경해야 할 때 사용된다 
예를 들어, 특정 조건에 따라 DOM 요소의 위치를 즉시 변경해야 할 때 유용하다

스크롤 위치 설정: 컴포넌트가 마운트된 직후 특정 요소로 스크롤해야 하는 경우, 
useLayoutEffect를 사용하면 정확한 타이밍에 스크롤을 설정할 수 있다

아래는 추가적인 예시로, 컴포넌트가 마운트될 때 특정 요소로 스크롤하는 경우
`;
import React, { useLayoutEffect, useRef } from "react";

export default function ScrollToElement() {
  const divRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (divRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div style={{ height: "200vh" }}>
      <div style={{ marginTop: "100vh" }} ref={divRef}>
        Scroll to me!
      </div>
    </div>
  );
}
`
위 코드에서 useLayoutEffect를 사용하여 컴포넌트가 마운트될 때 divRef가 가리키는 요소로 스크롤한다
이렇게 하면 화면이 렌더링되기 전에 정확한 위치로 스크롤할 수 있다

이와 같이 useLayoutEffect를 활용하면 DOM을 정확히 측정하거나 레이아웃 관련 작업을 수행하는 데 효과적이다
그러나 일반적인 사이드 이펙트는 useEffect를 사용하여 성능 문제를 피하는 것이 좋다

`;
