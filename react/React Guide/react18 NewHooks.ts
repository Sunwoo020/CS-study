`## New Hooks
### useId
난수 ID를 생성하는 Hook
클라이언트와 서버간의 hydration의 불일치를 피하면서 유니크 아이디를 생성 기능을 제공
- 특정 key값을 생성하는 것이 아님

### useSyncExternalStore
기존의 useMutableSource hook에서 변경되었음
동시성 기능을 사용할 때 전역 상태 관리 라이브러리의 상태가 업데이트 되지 않을 경우 강제로 업데이트를 발생시키는 Hook
- 라이브러리 제작 활용

### useDeferredValue
트리에서 급하지 않은 부분의 재랜더링을 지연할 수 있는 기능을 지원하는 Hook
디바운스와 비슷하지만 고정된 지연시간이 없고 렌더링이 반영되는 시점에 지연 렌더링을 시도
지연된 렌더링은 인터럽트가 가능 => 사용자 입력을 차단하지 않음

### useInsertionEffect
Css-in-JS 라이브러리를 활용할 때 스타일 삽입 성능 문제를 해결할 수 있는 Hook
- 라이브러리 제작 활용
Dom이 한번 mutate된 이후 실행되지만 
layout effect가 발생하기 전 새 레이아웃을 한번 읽을 수 있기 때문에 사전에 계산할 수 있는 기회가 주어짐

기존 useLayoutEffect와 비슷하지만 다른점은 DOM 노드에 대한 참조에 접근할 수 있게 됨`;
