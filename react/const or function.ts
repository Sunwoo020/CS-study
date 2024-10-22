interface SampleProps {
  props: string;
}

export default function sample1({ props }: SampleProps) {
  return;
}
` 함수 선언문 특징
호이스팅 : 함수 선언 전체가 호이스팅됨
사용 시점 : 어디서든 호출 가능 
화살표 함수 사용 : X
this 바인딩 : 동적으로 바인딩
코드 스타일 : 전통적인 함수 선언 방식 `;

export const sample2 = ({ props }: SampleProps) => {
  return;
};
` 함수 표현식 특징
호이스팅 : 변수 선언은 호이스팅되지만 초기화되지 않음
사용 시점 : 선언 이후부터 호출 가능
화살표 함수 사용 : O (화살표 함수 사용 가능)
this 바인딩 : 주변 컨텍스트를 사용한 바인딩
코드 스타일 : 함수 표현식 및 클로저/콜백에 유용`;

`그래서 무엇을 선택해야 하는가?
전역적으로 사용하거나, 호출 시점에 제약이 없는 경우에는 function 함수 선언문을 사용할 수 있음.
컴포넌트 선언, 클로저 또는 콜백 함수, 혹은 화살표 함수의 this 바인딩 특성을 활용하고자 한다면 const 함수 표현식을 사용하는 것이 좋음.`;
