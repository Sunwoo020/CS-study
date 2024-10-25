`React Server Components(RSC)는 React 18에서 도입된 개념으로, 
서버에서 컴포넌트를 렌더링하고 클라이언트로 전달하는 방식입니다.
기존의 클라이언트 렌더링과 서버 사이드 렌더링(SSR)의 조합을 통해 더 나은 성능과 개발자 경험을 제공합니다. 
RSC는 Next.js와 같은 프레임워크와 함께 사용되어 클라이언트 애플리케이션의 성능을 극대화합니다.

React Server Components는 기존의 SSR(Server-Side Rendering)이나 SSG(Static Site Generation)와는 다른 방식으로 작동하며,
 프론트엔드 애플리케이션에서 데이터 전달 및 렌더링을 최적화할 수 있습니다. 
 여기서 RSC의 개념과 특징, 이를 사용하는 방법 및 기존 SSR과의 차이점을 자세히 설명해드리겠습니다.

React Server Components(RSC)란?
React Server Components는 서버에서 React 컴포넌트를 렌더링하고, 
해당 컴포넌트가 필요한 HTML, 스타일, 스크립트 등의 리소스를 클라이언트에 직접 제공하는 방식입니다. 
이를 통해 클라이언트에서 무거운 자바스크립트 번들을 모두 다운로드하거나, 클라이언트 측에서 컴포넌트를 렌더링하는 부담을 줄일 수 있습니다.

주요 특징은 다음과 같습니다:

서버에서만 실행: RSC는 서버에서 실행되어 클라이언트에서 실행할 필요가 없는 부분을 처리합니다.
자바스크립트 번들 크기 감소: 클라이언트로 전송되는 자바스크립트 양을 줄이기 때문에 번들 크기가 감소하고, 클라이언트에서의 성능이 향상됩니다.
직접적인 데이터 접근: 서버에서 렌더링되므로, 서버 측 데이터에 직접 접근하여 데이터를 쉽게 가져오고 처리할 수 있습니다.

RSC의 작동 원리
RSC의 기본 원리는 서버에서 컴포넌트를 렌더링하여 JSON 형태로 클라이언트에 전달하고, 
클라이언트에서 이 결과를 기반으로 최종 UI를 구성하는 것입니다. 
서버 컴포넌트는 서버에서 데이터를 직접 가져오고 이를 렌더링하여 클라이언트에 전달하므로, 
클라이언트에서는 불필요한 데이터 페칭 로직을 최소화할 수 있습니다.

React Server Components는 React 컴포넌트 트리를 서버에서 렌더링하고, 
클라이언트 측의 컴포넌트 트리와 병합하는 방식으로 작동합니다. 
이 방식은 전체적인 성능을 크게 향상시키고, 서버에서 클라이언트로 데이터를 전달하는 효율적인 방법을 제공합니다.

React Server Components의 장점
퍼포먼스 최적화: 서버에서 컴포넌트를 렌더링하므로 클라이언트에서의 자바스크립트 실행 부담이 줄어들어 성능이 향상됩니다. 
특히, 초기 페이지 로딩 속도가 개선됩니다.
SEO 최적화: 서버에서 렌더링된 컴포넌트를 통해 클라이언트가 콘텐츠를 빠르게 로드할 수 있으며, 이는 SEO(Search Engine Optimization)에 유리합니다.
서버 자원 활용: 데이터베이스에 접근하거나, 서버에서만 수행할 수 있는 작업을 서버 컴포넌트에서 수행하여 클라이언트 측 리소스를 절약할 수 있습니다.

React Server Components와 SSR/SSG의 차이점
React Server Components는 기존의 SSR(Server-Side Rendering) 및 **SSG(Static Site Generation)**과 차별화된 방식으로 작동합니다. 
아래는 각 렌더링 방식 간의 주요 차이점입니다:

특징	  | RSC (React Server Components)   /  SSR (Server-Side Rendering)  / SSG (Static Site Generation)
렌더링 시점 | 서버에서 필요한 시점마다 컴포넌트를 렌더링 / 요청 시점에 서버에서 전체 페이지 렌더링 / 빌드 시점에 전체 페이지 렌더링
데이터 패칭	| 서버에서 컴포넌트 단위로 필요할 때마다 처리 / 서버에서 요청 시점에 전체 데이터를 페칭 / 빌드 시점에 미리 데이터 페칭
번들 크기 감소 | 클라이언트 측 자바스크립트 번들 크기 최소화 / 클라이언트로 HTML과 JavaScript 전달 / 정적 HTML과 JavaScript 제공
업데이트 및 재생성 | 서버에서 컴포넌트별로 업데이트 가능 / 매 요청마다 서버에서 다시 렌더링 / 빌드 시 정적 페이지 재생성 필요

RSC는 SSR이나 SSG와 다르게, 페이지 전체를 렌더링하지 않고 필요한 컴포넌트만 서버에서 렌더링하고 클라이언트에 전달합니다. 
이러한 특성으로 인해, 특정 컴포넌트의 자바스크립트 번들 크기를 줄이고, 불필요한 클라이언트 측 로딩 시간을 줄여줍니다.

React Server Components의 예시
RSC를 활용하기 위해서는 Next.js와 같은 프레임워크와 함께 사용하는 것이 일반적입니다. 다음은 간단한 RSC 예제입니다:

Next.js에서 React Server Components 활용 예시:
`;
// src/app/page.tsx (Next.js의 서버 컴포넌트 파일)
import { Suspense } from "react";

// 서버 컴포넌트 - 클라이언트에서 실행되지 않음
export default async function HomePage() {
  const data = await fetchDataFromServer();

  return (
    <div>
      <h1>Server-Side Data Rendering Example</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ServerComponent data={data} />
      </Suspense>
    </div>
  );
}

async function fetchDataFromServer() {
  // 서버에서 데이터를 페칭하는 함수
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();
  return data;
}

function ServerComponent({ data }: { data: any }) {
  return (
    <ul>
      {data.map((item: any) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}
`
설명:

HomePage 컴포넌트는 서버 컴포넌트로, Next.js에서 서버에서만 실행됩니다.
 이 컴포넌트에서 데이터를 직접 가져와 렌더링합니다.
fetchDataFromServer() 함수는 서버에서 API로부터 데이터를 가져오는 로직입니다.
Suspense 컴포넌트를 사용하여 서버에서 데이터가 로드될 때까지 로딩 UI를 제공할 수 있습니다.

서버 컴포넌트와 클라이언트 컴포넌트의 조합
React Server Components는 서버 컴포넌트와 클라이언트 컴포넌트를 함께 사용하는 것이 가능합니다. 
서버 컴포넌트는 클라이언트 컴포넌트를 포함할 수 있지만, 클라이언트 컴포넌트에서 서버 컴포넌트를 직접 포함하는 것은 불가능합니다.
따라서 클라이언트에서 자주 사용하는 상태나 이벤트 로직은 클라이언트 컴포넌트에서 처리하고, 
서버에서 데이터를 가져오거나 전처리하는 부분은 서버 컴포넌트에서 처리하는 식으로 조합합니다.

RSC를 사용하는 경우 고려해야 할 점
서버에서만 실행 가능: 서버 컴포넌트는 서버에서만 실행되기 때문에 클라이언트 측에서 필요한 이벤트 핸들링이나 사용자 상호작용 관련 로직은 포함할 수 없습니다.
상태 관리의 제약: 서버 컴포넌트는 클라이언트의 상태나 훅(useState, useEffect 등)을 사용할 수 없습니다. 
이러한 상태 관리 로직은 클라이언트 컴포넌트에서 처리해야 합니다.
보안 문제 해결: RSC를 사용할 때 서버에서 직접 데이터를 다루기 때문에, 보안에 대한 충분한 고려가 필요합니다. 
서버 컴포넌트에서 민감한 데이터를 안전하게 처리하는 방법을 적용해야 합니다.

결론
React Server Components(RSC)는 서버와 클라이언트 간의 컴포넌트 렌더링을 효과적으로 분리하여 클라이언트의 성능을 최적화하는 새로운 방식입니다. 
서버에서 컴포넌트를 렌더링하여 클라이언트로 전달하기 때문에 초기 로딩 속도와 SEO 측면에서 이점을 제공합니다. 
Next.js와 같은 프레임워크를 사용하면 RSC를 쉽게 도입할 수 있으며, 
서버 컴포넌트와 클라이언트 컴포넌트를 조합하여 최적의 사용자 경험을 제공할 수 있습니다.

RSC를 활용하면 서버와 클라이언트 간의 역할을 명확히 구분하고, 
서버에서 가능한 로직은 서버에서 처리하며, 클라이언트는 사용자 상호작용에 집중하도록 구조를 최적화할 수 있습니다. 
이를 통해 최상의 성능과 개발 경험을 얻을 수 있게 됩니다.`;
