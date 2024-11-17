`React의 테스트 전략에는 컴포넌트 테스트(Unit Test)와 E2E(End-to-End) 테스트가 있다
각 테스트 방법에 대해 타입스크립트를 사용하여 어떻게 구현하고 활용할 수 있는지 자세히 알아보자

1. 컴포넌트 테스트 (Unit Test)
컴포넌트 테스트는 주로 Jest와 React Testing Library를 사용하여 작성된다
단위 테스트는 개별 컴포넌트가 의도한 대로 작동하는지 확인하는 것이 목적이며, 사용자 인터페이스(UI)가 올바르게 동작하는지를 보장한다

Jest와 React Testing Library를 사용한 컴포넌트 테스트 (TypeScript)
Jest는 자바스크립트 테스트 프레임워크이며, React Testing Library는 React 컴포넌트를 테스트하기 위해 사용되는 도구다
이 둘을 함께 사용하면 직관적이고 유지보수하기 쉬운 테스트를 작성할 수 있다

먼저, 프로젝트에 Jest와 React Testing Library를 설치한다

npm install --save-dev jest @testing-library/react @testing-library/jest-dom

버튼 컴포넌트 (Button.tsx):
`;
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
`

컴포넌트 테스트 (Button.test.tsx):
`;
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

test("renders Button component with label", () => {
  render(<Button label="Click Me" onClick={() => {}} />);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});

test("calls onClick handler when clicked", () => {
  const handleClick = jest.fn();
  render(<Button label="Click Me" onClick={handleClick} />);
  const buttonElement = screen.getByText(/Click Me/i);
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
`
설명:
render(): 컴포넌트를 렌더링하고, 테스트할 수 있는 가상 DOM을 생성한다
screen.getByText(): 특정 텍스트를 가진 요소를 찾습니다. 이 기능은 접근성을 고려한 테스트를 작성할 수 있게 해준다
fireEvent.click(): 해당 요소에 클릭 이벤트를 발생시킨다
jest.fn(): 모의 함수를 생성하여 테스트에서 실제 함수 호출 여부를 확인할 수 있다
expect(): 특정 조건을 만족하는지 단언(assert)한다

2. E2E 테스트 (End-to-End Test)
E2E 테스트는 애플리케이션의 전체 플로우를 테스트하여 사용자가 경험하는 모든 것을 확인한다
주로 Cypress와 같은 도구를 사용하며, UI를 통해 사용자 상호작용을 테스트한다

Cypress를 사용한 E2E 테스트 (TypeScript)
Cypress는 E2E 테스트를 위해 널리 사용되는 도구로, 브라우저에서 직접 테스트를 실행하여 사용자 경험을 검증한다

Cypress를 설치방법
npm install cypress --save-dev
그리고 Cypress를 TypeScript와 함께 사용할 수 있도록 설정한다

다음은 간단한 로그인 플로우를 테스트하는 예시다

로그인 페이지 (Login.tsx):
`;
import React, { useState } from "react";

interface LoginProps {
  onLogin: (username: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
`
E2E 테스트 (Login.spec.ts):
`;
describe("Login flow", () => {
  it("should allow a user to log in", () => {
    cy.visit("/login"); // 로그인 페이지 방문
    cy.get("input#username").type("testuser"); // 사용자 이름 입력
    cy.get("input#password").type("password123"); // 비밀번호 입력
    cy.get('button[type="submit"]').click(); // 로그인 버튼 클릭
    cy.url().should("include", "/dashboard"); // 대시보드 페이지로 이동했는지 확인
  });
});
`

설명:
cy.visit(): 지정한 URL로 이동하여 테스트를 시작한다
cy.get(): 특정 요소를 선택합니다. 여기서는 input#username과 같은 셀렉터를 사용하여 입력 필드를 찾는다
type(): 지정된 입력 필드에 텍스트를 입력한다
click(): 버튼 등을 클릭하여 상호작용을 수행한다
should(): URL이나 특정 요소의 상태를 확인하는 단언(assertion)이다
여기서는 사용자가 로그인 후 대시보드 페이지로 이동했는지 확인한다

컴포넌트 테스트와 E2E 테스트의 균형:

컴포넌트 테스트는 개별 컴포넌트의 기능을 신속하게 검증하며, 빠른 피드백을 제공한다
이는 빠르고 신뢰성이 높기 때문에 많은 수의 테스트를 작성해야 한다
E2E 테스트는 전체 사용자 흐름을 검증하는 데 유용하지만, 실행 시간이 오래 걸리고 설정이 복잡할 수 있다
따라서 중요한 사용자 시나리오에 집중하여 작성하는 것이 좋다

테스트 커버리지:

모든 기능에 대해 100%의 테스트 커버리지를 목표로 하기보다는, 핵심 로직과 중요한 사용자 흐름을 테스트하는 것이 실용적이다
컴포넌트 테스트에서 핵심 기능을, E2E 테스트에서 사용자 경험을 테스트하여 전반적인 애플리케이션 품질을 보장할 수 있다

Mocking과 Stubbing:

테스트에서 API 요청을 다룰 때는 Mocking이나 Stubbing을 사용하여 테스트 중 실제 네트워크 요청을 방지하고,
테스트 환경에서 예측 가능한 결과를 제공하도록 한다
Jest의 jest.fn()을 활용하거나, Cypress의 cy.intercept()를 사용해 서버 응답을 모의(Mock)할 수 있다

결론
컴포넌트 테스트(Unit Test)는 개별 컴포넌트가 제대로 동작하는지 빠르게 검증하는 중요한 도구다
이를 통해 코드가 변경될 때 발생할 수 있는 회귀 버그를 방지할 수 있다
E2E 테스트(End-to-End Test)는 애플리케이션의 전체적인 사용자 경험을 확인하여 사용자 관점에서 모든 기능이 정상적으로 동작하는지를 보장한다
타입스크립트를 활용하면 컴포넌트의 타입을 명확하게 지정하여 테스트 시점에 잠재적인 오류를 사전에 방지할 수 있으며, 더 안전한 코드 작성이 가능하다
React 애플리케이션에서 컴포넌트 테스트와 E2E 테스트를 잘 조화롭게 사용하면, 애플리케이션의 품질과 안정성을 크게 향상시킬 수 있다
이를 통해 개발자는 사용자에게 안정적이고 신뢰할 수 있는 애플리케이션을 제공할 수 있게 된다






`;
