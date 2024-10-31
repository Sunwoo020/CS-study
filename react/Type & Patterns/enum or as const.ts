// 일반 enum 사용
enum Providers1 {
  Kakao = "KAKAO",
  Naver = "NAVER",
}
interface ProviderProps {
  text: string;
}

// enum 사용
function getProvider1(provider: Providers1, props: ProviderProps) {
  console.log(`Provider: ${provider}, Text: ${props.text}`);
}
getProvider1(Providers1.Kakao, { text: "Kakao login" });
`출력: "Provider: KAKAO, Text: Kakao login"

특징 : 런타임 시 객체로 사용 가능하며 타입 안전성을 보장
장점 : 코드 가독성이 좋고, 런타임에 유효성 검사를 쉽게 할 수 있음
단점 : 번들 크기를 증가시킬 수 있음 ( Tree Shaking이 안됨 )
`;

// const enum 사용
const enum Providers2 {
  Kakao = "KAKAO",
  Naver = "NAVER",
}

function getProvider2(provider: Providers2, props: ProviderProps) {
  console.log(`Provider: ${provider}, Text: ${props.text}`);
}
getProvider2(Providers2.Kakao, { text: "Kakao login" });
` 출력: "Provider: KAKAO, Text: Kakao login"

특징 : 컴파일 타임에 인라인으로 변환되며, 런타임에서 객체로 사용 불가
장점 : 번들 크기를 줄임 ( Tree Shaking 가능 )
단점 : 런타임에서 접근 불가, TypeScript에서만 사용 가능
`;

// Record와 as const 사용
type ProviderType = "kakao" | "naver";

const providers3: Record<ProviderType, ProviderProps> = {
  kakao: { text: "Kakao login" },
  naver: { text: "Naver login" },
} as const;

function getProvider3(provider: ProviderType) {
  console.log(`Provider: ${provider}, Text: ${providers3[provider].text}`);
}

getProvider3("kakao");

`출력: "Provider: kakao, Text: Kakao login"

특징 : 불변 객체로 타입 안전성을 강화
장점 : 구체적인 리터럴 타입을 통해 안전한 프로퍼티 접근 가능
단점 : 코드가 길어질 수 있으며, 객체 프로퍼티 접근이 필요함
`;
