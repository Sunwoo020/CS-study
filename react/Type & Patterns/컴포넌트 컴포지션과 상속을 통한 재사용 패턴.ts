`컴포넌트 컴포지션 (Composition)
컴포지션은 React에서 코드 재사용성을 높이는 가장 일반적인 방법이다
여러 개의 컴포넌트를 조합하여 더 복잡한 컴포넌트를 생성할 수 있다

예시 - 레이아웃 컴포지션:`;
import React from "react";

const Header: React.FC = () => <header>Header Content</header>;
const Footer: React.FC = () => <footer>Footer Content</footer>;

const Layout: React.FC = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
);

const HomePage: React.FC = () => (
  <Layout>
    <h1>Welcome to the Homepage!</h1>
    <p>This is the main content area.</p>
  </Layout>
);

export default HomePage;
`
위 코드에서 Layout 컴포넌트는 Header, Footer, 메인 콘텐츠 영역을 컴포지션을 통해 조합하여 재사용할 수 있는 공통 레이아웃을 생성한다

상속 (Inheritance) - 잘 사용되지 않는 이유
React에서는 일반적으로 상속보다는 컴포지션을 권장한다
컴포넌트 간에 로직을 공유하기 위해 상속을 사용할 수 있지만, 
상속은 컴포넌트 구조를 복잡하게 만들고, 코드의 유연성을 떨어뜨릴 수 있다
컴포지션은 더 간단하고 직관적이며, 다중 조합이 가능해 코드의 재사용성과 유지보수성을 높일 수 있다

결론
컴포넌트에 Props 타입을 정의하는 다양한 방식: TypeScript에서는 interface와 type을 사용해 
컴포넌트의 props 타입을 정의하며, PropTypes는 런타임에서의 타입 검증을 위해 사용할 수 있다

이러한 패턴들을 적절히 사용하면, React 애플리케이션의 유연성, 재사용성, 그리고 유지보수성을 크게 향상시킬 수 있다`;
