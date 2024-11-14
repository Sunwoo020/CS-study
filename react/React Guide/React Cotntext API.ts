`React의 Context API는 전역 상태 관리를 위한 도구로, 
여러 컴포넌트 간에 공통된 데이터를 공유하고 관리하는 데 유용하다
이 기능은 계층 구조 깊은 곳에 위치한 자식 컴포넌트들에 데이터를 전달하기 위해
prop drilling을 사용하는 문제를 해결하는 데 도움이 된다
Context API는 타입스크립트와 함께 사용하면 타입 안정성을 더 높일 수 있다

Context API란?
React Context API는 부모 컴포넌트에서 전역적으로 사용할 수 있는 데이터를 생성하고, 
이 데이터를 손쉽게 하위 컴포넌트에 전달하기 위한 기능이다
예를 들어, 사용자 인증 정보, 테마 설정, 다국어 지원 등의 전역적으로 공유할 필요가 있는 상태에 유용하다

Context API를 사용한 주요 단계
Context 생성 (React.createContext): 전역 상태를 관리하기 위해 먼저 Context 객체를 생성한다
Provider 설정 (Context.Provider): Provider 컴포넌트는 데이터를 공유할 컴포넌트 트리의 최상위에 위치시키며, 자식 컴포넌트가 데이터를 구독할 수 있도록 한다
Consumer 사용 (useContext 훅): 자식 컴포넌트에서 공유된 데이터를 사용하기 위해 useContext 훅을 사용한다

Context API 예시 (TypeScript)
예시: 사용자 인증 상태 관리

Context 생성
먼저, 사용자 정보와 관련된 Context를 생성한다`;
import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
`
// 초기값 설정`;
const AuthContext = createContext<AuthContextType | undefined>(undefined);
`
여기서 AuthContext는 사용자 정보를 관리하는 컨텍스트다
초기값으로 undefined를 설정하여, 나중에 실제 데이터를 할당할 수 있도록 한다

Provider 설정
AuthContextProvider를 만들어 사용자 정보 및 로그인/로그아웃 기능을 관리할 수 있다
`;
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
`
AuthProvider는 자식 컴포넌트들에게 사용자 정보와 로그인/로그아웃 함수를 제공하기 위해 AuthContext.Provider를 사용하고 있다

Consumer 사용
컨텍스트를 사용하여 데이터를 읽고 업데이트하려면 useContext 훅을 사용한다
`;
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
`
useAuth 훅을 통해 AuthContext에 접근할 수 있으며, Context가 없는 상황에 대한 오류 처리를 포함한다

자식 컴포넌트에서의 Context 사용

아래 예시는 로그인 및 로그아웃 버튼을 포함한 컴포넌트다
`;
import React from "react";
import { useAuth } from "./AuthProvider";

const UserProfile: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button
          onClick={() =>
            login({ name: "John Doe", email: "john.doe@example.com" })
          }
        >
          Login
        </button>
      )}
    </div>
  );
};

export default UserProfile;
`
UserProfile 컴포넌트는 useAuth 훅을 사용하여 사용자 정보를 가져온다
로그인한 사용자 정보가 있다면 환영 메시지를 출력하고, 그렇지 않으면 로그인 버튼을 표시한다

Context API의 사용 시나리오
글로벌 상태 관리: 테마, 언어 설정, 사용자 정보 등 여러 컴포넌트에서 공통으로 필요로 하는 상태를 관리할 때 유용하다
Prop Drilling 방지: 부모-자식 간의 여러 단계에 걸쳐 props를 전달하는 대신, Context를 사용하여 더 쉽게 상태를 공유할 수 있다

타입스크립트를 사용한 Context의 장점
타입 안정성: Context의 값에 대한 타입을 명확히 정의하여 컴파일 시점에 오류를 미리 방지할 수 있다
안전한 접근: Context의 기본값을 undefined로 설정한 뒤 이를 사용하려고 할 때 오류를 던지도록 구현하여, 
반드시 Provider 내부에서만 Context를 사용할 수 있도록 보장한다

Context API의 성능 최적화
Context API 사용 시 모든 하위 컴포넌트가 Context 값이 변경될 때마다 재렌더링되기 때문에 성능에 영향을 줄 수 있다
이러한 문제를 해결하기 위해 몇 가지 최적화 방법을 고려해야 한다

Context를 여러 개로 분리: 각 Context는 특정한 데이터를 관리하도록 분리하여 불필요한 재렌더링을 줄일 수 있다
Memoization 사용: Context에서 제공하는 값이 객체이거나 함수인 경우, **useMemo**와 같은 훅을 사용하여 불필요한 객체 재생성을 방지한다

성능 최적화를 고려한 예시:
`;
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
} from "react";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
`
위 코드에서는 useMemo를 사용하여 user가 변경될 때만 value 객체를 재생성하도록 함으로써 불필요한 렌더링을 방지하고 성능을 최적화한다

Context API와 Redux 비교
Context API는 간단한 상태 공유에 적합하다
예를 들어, 사용자 인증 정보나 앱의 테마와 같은 상대적으로 작은 규모의 전역 상태 관리에 유용하다

Redux는 복잡한 상태 로직과 다양한 상태를 공유해야 하는 경우 적합하다
미들웨어를 사용해 비동기 작업을 처리할 수 있고, 액션과 리듀서를 통해 상태 변경 과정을 명확하게 정의할 수 있다

Context API의 장점은 사용법이 간단하고 React의 기본 내장 기능이라 별도의 설치가 필요 없다는 점이다
반면에, Redux는 보다 체계적인 상태 관리와 미들웨어를 통한 확장성이 장점이다

결론
React의 Context API는 글로벌 상태 관리를 간단하게 수행할 수 있는 강력한 도구다
타입스크립트와 함께 사용하면 타입 안정성을 제공하여 더욱 안전하게 전역 상태를 관리할 수 있다
Context API는 적절한 사용 시 매우 편리하지만, 
대규모 애플리케이션에서는 Context 값 변경 시 모든 하위 컴포넌트가 재렌더링될 수 있다는 점을 염두에 두고,
필요시 최적화 전략을 사용하거나 Redux 같은 대안적인 상태 관리 도구를 고려하는 것이 좋다
`;
