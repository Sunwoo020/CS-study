`const MyComponent1: React.FC = ({ children }) => {
  return (
  <div>{children}</div>;
)
}`;

`특징
1. 타입 자동 완성 제공
- React.FC를 사용하면 컴포넌트가 기본적으로 children 프로퍼티를 가지고 있다고 가정합니다. 따라서 props에 children을 포함하는 것이 자동으로 타입에 명시

2. 명시적인 컴포넌트 정의
React.FC를 사용하면 해당 함수가 React 컴포넌트라는 것이 명시적입니다. 코드의 가독성을 높이는 데 도움이 될 수 있음

장점
1. children 타입이 자동으로 포함되므로, 별도로 children 타입을 정의하지 않아도 됨
2. 팀 간의 협업에서 함수형 컴포넌트라는 것을 명확히 알 수 있음

단점
1. 불필요한 children 속성 포함
- 모든 컴포넌트가 children을 필요로 하지 않는데도 children 타입이 기본적으로 포함됨 
- 만약 children을 사용하지 않는 컴포넌트라면 이는 오히려 불필요한 코드가 될 수 있음
2. 타입 추론의 유연성 부족
- React.FC는 유연하지 못한 부분이 있음
- 예를 들어, 특정 타입을 명시적으로 더 정의해야 할 때 불편할 수 있음

`;

interface MyComponentProps {
  title: string;
  count: number;
}
`
const MyComponent2 = ({ title, count }: MyComponentProps) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>Count: {count}</p>
    </div>
  );
};`;
`특징
1. 유연한 타입 지정
- children을 사용하지 않는 경우, children을 포함하지 않은 커스텀 타입을 정의할 수 있음
- 이는 불필요한 속성을 제거하여 코드의 가독성을 높이고 타입 검사를 더 강하게 만들 수 있음

2. 타입 확장과 명시적 프로퍼티
- 원하는 경우, 컴포넌트에서 필요한 props만을 정의하고, 추가적인 속성을 제한적으로 사용할 수 있음

장점
1. 보다 정확한 타입 정의
- 필요한 props만 명시적으로 정의할 수 있기 때문에 컴포넌트가 정확하게 요구하는 props만 지정할 수 있음
2. 유연성
- React.FC를 사용하지 않으면 컴포넌트에 반드시 children 속성을 포함하지 않아도 됨
- 필요한 경우에만 children을 추가하는 방식으로 더 깔끔한 타입 관리가 가능

단점
1. React.FC처럼 기본적인 자동 완성 기능이 없기 때문에, children 속성을 사용할 때는 수동으로 추가해야 함
`;
