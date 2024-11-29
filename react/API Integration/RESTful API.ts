`
RESTful API의 특징과 설계 원칙
1. RESTful API의 특징
1.1. 클라이언트-서버 아키텍처
클라이언트와 서버를 명확히 분리하여 독립적으로 개발 및 배포할 수 있다.
클라이언트는 사용자 인터페이스와 관련된 작업을 처리하고, 서버는 데이터 저장 및 비즈니스 로직을 담당한다.

1.2. 무상태성 (Stateless)
서버는 클라이언트의 상태를 저장하지 않는다.
모든 요청은 필요한 정보를 포함해야 한다. 예를 들어, 인증 토큰을 요청마다 포함해야 한다.
이로 인해 서버의 확장성과 유지보수가 용이해진다.

1.3. 캐시 가능성 (Cacheable)
서버의 응답은 캐시될 수 있어야 한다.
HTTP 헤더(Cache-Control, Expires)를 사용해 캐싱 정책을 정의한다.
이를 통해 불필요한 요청을 줄이고 네트워크 성능을 향상시킬 수 있다.

1.4. 계층화 시스템 (Layered System)
클라이언트는 서버와 직접 통신하는지, 중간 계층(프록시, 로드 밸런서 등)을 통해 통신하는지 알 수 없다.
중간 계층은 보안, 로드 밸런싱, 캐싱 등 다양한 기능을 추가할 수 있다.

1.5. 일관된 인터페이스 (Uniform Interface)
모든 리소스를 고유한 URI로 식별한다.
HTTP 표준 메서드(GET, POST, PUT, DELETE 등)를 사용하며, 일관된 요청 및 응답 구조를 유지한다.
HTTP 상태 코드와 헤더를 활용해 명확한 통신 방식을 제공한다.

1.6. 코드 온 디맨드 (선택 사항)
필요에 따라 서버가 클라이언트에게 실행 가능한 코드를 전달할 수 있다. 예를 들어, 클라이언트가 동적으로 자바스크립트를 실행하도록 한다.

2. RESTful API 설계 원칙
2.1. 리소스 기반 설계
URI를 리소스를 명사로 표현한다.
예: /users, /products/123
리소스의 행위는 HTTP 메서드(GET, POST 등)를 통해 정의한다.

2.2. HTTP 메서드의 올바른 사용
GET: 데이터를 조회한다.
예: /users → 모든 사용자 조회.
POST: 새로운 리소스를 생성한다.
예: /users → 새 사용자 추가.
PUT: 리소스를 전체 업데이트한다.
예: /users/123 → 사용자 정보 수정.
PATCH: 리소스를 부분 업데이트한다.
예: /users/123 → 사용자 이름만 수정.
DELETE: 리소스를 삭제한다.
예: /users/123 → 특정 사용자 삭제.

2.3. HTTP 상태 코드의 활용
요청의 결과를 나타내기 위해 적절한 상태 코드를 사용한다.
200 OK: 요청 성공.
201 Created: 리소스 생성 성공.
204 No Content: 요청 성공, 응답 내용 없음.
400 Bad Request: 클라이언트의 잘못된 요청.
401 Unauthorized: 인증 필요.
404 Not Found: 리소스 없음.
500 Internal Server Error: 서버 내부 오류.

2.4. 데이터 포맷의 통일
JSON을 기본 데이터 형식으로 사용하는 것이 일반적이다.
Content-Type 헤더를 사용해 요청과 응답의 데이터 형식을 명시한다.
요청: Content-Type: application/json
응답: Content-Type: application/json

2.5. HATEOAS (Hypermedia As The Engine Of Application State)
응답 메시지에 관련 리소스의 링크를 포함하여 클라이언트가 애플리케이션의 상태를 탐색할 수 있도록 한다.
예: 사용자의 상세 정보 응답에 해당 사용자의 주문 목록 링크를 포함한다.

2.6. 버전 관리
API는 명확한 버전 관리가 필요하다.
일반적으로 두 가지 방식이 사용된다:
URI에 버전 포함: /v1/users
HTTP 헤더를 통해 버전 관리: Accept: application/vnd.example.v1+json

2.7. 필터링 및 페이징
쿼리 파라미터를 사용해 데이터를 필터링하거나 정렬한다.
예: /users?role=admin&sort=createdAt
대량 데이터를 처리할 때 페이징을 지원한다.
예: /users?page=2&limit=10

2.8. 보안
HTTPS를 통해 통신을 암호화한다.
인증 및 권한 부여를 위해 토큰 기반 인증(JWT), OAuth2 등을 사용한다.
입력 데이터를 검증해 보안 취약점을 방지한다.

3. RESTful API 설계 예시
리소스와 URI 설계
모든 사용자 조회: GET /users
특정 사용자 조회: GET /users/{id}
사용자 생성: POST /users
사용자 수정: PUT /users/{id} 또는 PATCH /users/{id}
사용자 삭제: DELETE /users/{id}
요청 및 응답 예시
사용자 생성 요청 (POST /users)
`
{
  "name": "홍길동",
  "email": "hong@example.com",
  "password": "securepassword"
}
`
사용자 생성 응답

상태 코드: 201 Created
헤더: Location: /users/12345
`
{
  "id": "12345",
  "name": "홍길동",
  "email": "hong@example.com",
  "createdAt": "2023-10-01T12:34:56Z"
}
`
4. RESTful API 설계 시 주의사항
일관성 유지: URI 구조, 데이터 형식, 응답 형태 등을 일관되게 유지해야 한다.
필요한 데이터만 제공: 클라이언트가 필요한 데이터를 반환하도록 API를 설계한다.
에러 처리 표준화: 에러 메시지와 상태 코드를 일관되게 반환한다.
버전 관리: 장기적인 API 유지보수를 위해 버전 관리를 고려한다.
보안 강화: HTTPS 사용, 인증 및 권한 검증, 입력 값 검증 등을 통해 보안을 강화한다.
RESTful API는 간결하고 확장 가능한 시스템 설계를 가능하게 하며, HTTP 프로토콜의 특징을 최대한 활용한다`