`React에서의 에러 처리
React 애플리케이션에서 에러를 효과적으로 처리하는 것은 사용자 경험을 보호하고 앱의 안정성을 유지하는 데 매우 중요하다 

React는 컴포넌트 레벨에서 발생하는 에러를 처리하기 위한 여러 메커니즘을 제공한다 

주요한 방법은 Error Boundaries를 사용하는 것이며, 다양한 에러 핸들링 패턴을 통해 애플리케이션의 신뢰성을 높일 수 있다

1. Error Boundaries
Error Boundaries는 컴포넌트 트리에서 자식 컴포넌트에서 발생한 에러를 감지하고 처리하는 특수한 컴포넌트다

UI의 특정 부분에서 에러가 발생해도 전체 애플리케이션이 중단되지 않도록 에러가 발생한 부분만 안전하게 처리할 수 있다

클래스형 컴포넌트에서만 사용할 수 있으며, static getDerivedStateFromError와 componentDidCatch 메서드를 사용하여 에러를 처리한다

getDerivedStateFromError: 에러가 발생했을 때 상태를 업데이트하여 다음 렌더링에서 대체 UI(Fallback UI)를 표시할 수 있도록 한다

componentDidCatch: 에러를 로깅하는 등 추가적인 작업을 수행할 수 있다

함수형 컴포넌트에서는 Error Boundary를 직접 사용할 수 없으므로, 클래스형 컴포넌트를 사용하거나 외부 라이브러리의 도움을 받는 것이 필요하다

사용 예시:`;
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI를 표시하도록 상태를 업데이트합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 로깅 서비스에 에러를 기록할 수 있습니다.
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 폴백 UI를 렌더링합니다.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <MyComponent />
    </ErrorBoundary>
  );
}
`
위 코드에서 ErrorBoundary는 MyComponent에서 발생한 에러를 감지하고, 

폴백 UI를 렌더링하여 애플리케이션의 나머지 부분이 정상적으로 동작하도록 한다

Error Boundaries의 사용 시나리오

페이지 일부만 렌더링 실패할 경우: 예를 들어, 사이드바나 특정 위젯에서 에러가 발생해도 메인 콘텐츠는 계속해서 제공될 수 있어야 한다

사용자에게 친화적인 메시지 제공: 에러가 발생했을 때 "잠시 후 다시 시도해주세요"와 같은 사용자 친화적인 메시지를 표시하여 사용자 경험을 보호할 수 있다

2. 에러 핸들링 패턴

에러는 예기치 못한 상황에서 발생하기 때문에, 사용자 경험을 해치지 않으면서 이를 적절히 처리하는 것이 중요하다

다음과 같은 패턴을 통해 에러를 효율적으로 관리할 수 있다

1) 사용자 경험 보호
명확한 피드백 제공: 네트워크 요청 실패 시 사용자에게 "데이터를 불러오지 못했습니다. 다시 시도해주세요."와 같은 명확한 피드백을 제공하는 것이 좋다
이렇게 하면 사용자가 문제의 원인을 이해하고 적절한 조치를 취할 수 있다

UI의 일부분만 대체: 전체 페이지가 아닌 일부 컴포넌트만 대체 UI를 표시하여 사용자 경험을 최소한으로 방해하는 것이 중요하다

2) 전역 에러 처리기(Global Error Handler)
React 외부에서 발생하는 에러는 전역 에러 처리기를 사용해 처리할 수 있다 예를 들어, 
window.onerror 또는 window.addEventListener('unhandledrejection', handler)를 사용하여 
Promise가 처리되지 않은 경우에도 전역적으로 에러를 잡아낼 수 있다
예시:

`;
window.onerror = function (message, source, lineno, colno, error) {
  console.error("Global error caught:", message, error);
};

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});
`
이렇게 하면 애플리케이션 전반에서 발생하는 예기치 못한 에러를 처리하고, 
사용자에게 적절한 피드백을 제공하거나 로깅 서비스에 기록할 수 있다

3) 에러 로깅 서비스와 통합
에러가 발생하면 이를 외부 에러 로깅 서비스(예: Sentry, LogRocket)에 전송하여 에러 발생 빈도와 원인을 파악할 수 있다
이는 애플리케이션의 신뢰성을 높이는 데 도움이 된다

4) 재시도 매커니즘
네트워크 에러와 같은 일시적인 문제에 대해 재시도 로직을 구현할 수 있다 
예를 들어, 데이터를 가져오지 못했을 때 일정 시간 후에 다시 시도하는 방식으로 사용자에게 더 나은 경험을 제공할 수 있다

재시도 로직 예시:`;
import React, { useState, useEffect } from "react";

function FetchWithRetry({ url }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
        setTimeout(() => setAttempt((prev) => prev + 1), 3000); // 3초 후 재시도
      }
    };
    fetchData();
  }, [url, attempt]);

  if (error) return <div>Error occurred. Retrying...</div>;
  if (!data) return <div>Loading...</div>;

  return <div>Data: {JSON.stringify(data)}</div>;
}
`

위 코드에서 FetchWithRetry 컴포넌트는 데이터를 가져오는 과정에서 실패할 경우 3초 후 재시도하며,
사용자는 "Error occurred. Retrying..."이라는 메시지를 보게 된다

결론
React에서의 에러 처리는 Error Boundaries를 통해 UI 레벨에서 에러를 감지하고, 사용자 경험을 최대한 보호하는 방향으로 대처하는 것이 중요하다 
또한, 에러 로깅과 전역 에러 처리를 통해 전체 애플리케이션의 안정성을 높일 수 있다 
에러가 발생했을 때는 적절한 피드백을 제공하고, 가능하다면 재시도 로직을 구현하여 사용자에게 더 나은 경험을 제공하는 것이 좋다`;
