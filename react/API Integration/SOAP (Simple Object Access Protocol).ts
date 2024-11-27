`
SOAP (Simple Object Access Protocol)
SOAP은 XML 기반의 메시지 프로토콜로, 
네트워크를 통해 애플리케이션 간 데이터를 교환하기 위해 설계된 표준이다.
REST API와 달리, SOAP은 구조화된 메시지 포맷과 엄격한 규격을 가지고 있으며, 
주로 금융, 의료, 정부 시스템 등 높은 신뢰성과 보안이 필요한 환경에서 사용된다.

SOAP의 특징

XML 기반
SOAP 메시지는 XML로 구성되며, 플랫폼 및 언어에 독립적이다.

엄격한 표준화
WSDL(Web Services Description Language)을 사용해 API의 인터페이스를 정의한다.

다양한 프로토콜 지원
HTTP, SMTP, TCP 등 다양한 네트워크 프로토콜을 지원한다.

보안
WS-Security를 통해 메시지 암호화 및 인증을 제공한다.

상태 유지
REST API는 무상태성(Stateless)인 반면, SOAP은 상태 유지를 지원할 수 있다.

SOAP 메시지 구조
SOAP 메시지는 다음과 같은 구조로 구성된다.

Envelope: 전체 메시지를 감싸는 최상위 요소.
Header: 인증, 보안 등의 메타데이터.
Body: 실제 데이터 또는 요청/응답 내용을 포함.
Fault: 에러 정보를 제공.
SOAP 메시지 예시:

<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header>
    <authToken>123456</authToken>
  </soap:Header>
  <soap:Body>
    <getUserDetails xmlns="http://example.com/user">
      <userId>1</userId>
    </getUserDetails>
  </soap:Body>
</soap:Envelope>

SOAP와 TypeScript
SOAP API와 통신하기 위해 TypeScript에서 soap 라이브러리를 사용할 수 있다. 
다음은 SOAP를 사용하는 방법에 대한 자세한 예제다.

1. SOAP 클라이언트 설치
npm install soap

2. WSDL 기반의 SOAP 클라이언트 생성
WSDL 파일은 SOAP API의 엔드포인트, 메서드, 데이터 타입 등을 정의한다.

클라이언트 생성 코드
`;
import soap from "soap";

// WSDL URL (예제용 공개 API)
const WSDL_URL = "http://www.dneonline.com/calculator.asmx?WSDL";

// SOAP 클라이언트 생성 함수
const createSoapClient = async (): Promise<soap.Client> => {
  return new Promise((resolve, reject) => {
    soap.createClient(WSDL_URL, (err, client) => {
      if (err) reject(err);
      else resolve(client);
    });
  });
};
`
3. SOAP 메서드 호출
SOAP 클라이언트는 WSDL에 정의된 메서드를 자동으로 제공한다.

Add 메서드 호출 예제
`;
// 요청 데이터 타입 정의
interface AddRequest {
  intA: number;
  intB: number;
}

// 응답 데이터 타입 정의
interface AddResponse {
  AddResult: number;
}

// Add 메서드 호출 함수
const addNumbers = async (intA: number, intB: number): Promise<number> => {
  const client = await createSoapClient();
  const args: AddRequest = { intA, intB };

  return new Promise((resolve, reject) => {
    client.Add(args, (err: any, result: AddResponse) => {
      if (err) reject(err);
      else resolve(result.AddResult);
    });
  });
};

// 실행 예제
(async () => {
  try {
    const result = await addNumbers(5, 10);
    console.log("Add Result:", result); // 출력: 15
  } catch (error) {
    console.error("SOAP Error:", error);
  }
})();
`
4. SOAP 메서드 에러 처리
SOAP 호출 중 에러가 발생하면 적절히 처리해야 한다.
`;
const safeSoapCall = async <T>(
  soapFunction: () => Promise<T>
): Promise<T | null> => {
  try {
    return await soapFunction();
  } catch (error) {
    console.error("SOAP Call Error:", error);
    return null;
  }
};

// 안전한 호출
(async () => {
  const result = await safeSoapCall(() => addNumbers(5, 10));
  console.log("Safe SOAP Result:", result);
})();
`
5. WSDL 기반 타입 생성
WSDL 파일을 기반으로 타입을 자동 생성하면 생산성과 유지보수성이 향상된다. 
TypeScript에서 SOAP API 타입을 자동으로 생성하려면 wsdl2ts와 같은 도구를 사용할 수 있다.

설치
npm install -g wsdl2ts

타입 생성
wsdl2ts http://www.dneonline.com/calculator.asmx?WSDL --output calculator.ts
생성된 파일을 사용하여 SOAP 메서드의 타입 안전성을 더욱 강화할 수 있다.

SOAP의 장점
보안: WS-Security를 통해 데이터 암호화 및 서명 가능.
표준화: 엄격한 표준을 따르며, 복잡한 시스템에서 신뢰성 높음.
상태 유지 가능: 상태 기반 작업이 필요한 환경에 적합.

SOAP의 단점
복잡성: REST보다 설정 및 사용이 복잡.
과도한 오버헤드: XML 기반 메시지로 인해 네트워크 트래픽 증가.
유연성 부족: REST와 달리 데이터 요청이 유연하지 않음.

SOAP와 REST의 비교
특징	      SOAP	      REST
데이터 형식 	XML	 / JSON, XML, 기타
전송 프로토콜 HTTP, SMTP, TCP 등  /	HTTP
보안	WS-Security	/ HTTPS (보안 추가 필요)
상태 유지	가능  / 	무상태(Stateless)
유연성	제한적 /        	유연함

결론
SOAP은 높은 신뢰성과 보안이 필요한 시스템에서 여전히 강력한 선택지다. 
특히 금융, 의료, 정부 시스템에서 널리 사용된다. 
TypeScript를 활용하면 SOAP API 호출을 타입 안전하고 구조적으로 관리할 수 있다.

`;
