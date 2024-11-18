`Interface와 Type을 사용한 타입 정의
TypeScript에서 props의 타입을 정의하는 데 가장 많이 사용하는 방식은 interface와 type을 활용하는 것이다

예시 - Interface 사용:
`
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

export default Button;
`
interface를 사용하여 Button 컴포넌트의 props를 정의했다
TypeScript에서는 interface가 주로 구조적인 정의에 사용된다

예시 - Type 사용:
`type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

export default Button;
`
type을 사용해도 비슷한 방식으로 props를 정의할 수 있다
type은 유니온 타입이나 기타 복잡한 타입을 정의할 때도 사용된다

PropTypes를 사용한 타입 정의
React의 PropTypes는 JavaScript 환경에서 props의 타입을 검증하는 데 사용되는 도구다
이는 런타임에 타입을 검사할 수 있지만, 타입스크립트와는 다르게 컴파일 시점에 타입 체크를 제공하지 않는다

예시 - PropTypes 사용:
`
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;`
이 방식은 타입스크립트의 강력한 타입 시스템을 사용할 수 없는 경우에 유용하지만, 
런타임에서만 타입 검증을 수행할 수 있다는 한계가 있다`