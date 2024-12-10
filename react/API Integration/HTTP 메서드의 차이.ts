`HTTP 메서드는 서버와 클라이언트 간의 통신에서 요청의 성격을 정의한다. 
GET, POST, PUT, DELETE, PATCH는 가장 많이 사용되는 메서드로, 각각의 목적과 사용 사례가 다르다. 

GET (데이터 조회)
목적: 서버에서 데이터를 조회하기 위한 메서드.

특징:
서버의 리소스를 변경하지 않음 (Read-Only).
요청 데이터는 URL에 쿼리 스트링(Query String)으로 포함.
브라우저의 캐싱이 가능하며, 북마크에 저장할 수 있음.

사용 사례:
특정 사용자의 프로필 조회: /users/123
검색 결과 조회: /search?query=example

GET 예제 (TypeScript)
`;
import axios from "axios";

const fetchUser = async (userId: number): Promise<void> => {
  const response = await axios.get(`https://example.com/users/${userId}`);
  console.log("User Data:", response.data);
};

fetchUser(123); // 호출: /users/123
`POST (데이터 생성)
목적: 서버에 새로운 데이터 생성.

특징:
요청 데이터는 HTTP Body에 포함.
리소스의 상태를 변경함 (Create 작업).
동일한 요청이 반복될 경우 리소스가 중복 생성될 수 있음.

사용 사례:
사용자 등록: /users
새 게시글 작성: /posts

POST 예제 (TypeScript)
`;
const createUser = async (user: {
  name: string;
  email: string;
}): Promise<void> => {
  const response = await axios.post("https://example.com/users", user);
  console.log("Created User:", response.data);
};

createUser({ name: "John Doe", email: "john.doe@example.com" });
`
PUT (데이터 수정: 전체 업데이트)
목적: 기존 데이터를 전체 업데이트.

특징:
요청 데이터는 리소스의 전체 상태를 대체.
리소스가 없는 경우 새로 생성하기도 함 (일부 서버에서).
요청 데이터에 모든 필드가 포함되어야 함.

사용 사례:
사용자 정보 업데이트: /users/123
게시글 내용 수정: /posts/456

PUT 예제 (TypeScript)
`;
const updateUser = async (
  userId: number,
  user: { name: string; email: string }
): Promise<void> => {
  const response = await axios.put(`https://example.com/users/${userId}`, user);
  console.log("Updated User:", response.data);
};

updateUser(123, { name: "Jane Doe", email: "jane.doe@example.com" });
`
DELETE (데이터 삭제)
목적: 서버에서 데이터를 삭제.

특징:
삭제 작업 후, 응답으로 성공 여부를 반환.
보통 응답 데이터는 없거나 삭제된 리소스의 상태를 포함.

사용 사례:
사용자 삭제: /users/123
게시글 삭제: /posts/456

DELETE 예제 (TypeScript)
`;
const deleteUser = async (userId: number): Promise<void> => {
  const response = await axios.delete(`https://example.com/users/${userId}`);
  console.log("Deleted User:", response.status); // 보통 204 (No Content) 상태 코드 반환
};

deleteUser(123);
`
PATCH (데이터 수정: 부분 업데이트)
목적: 기존 데이터의 일부 필드만 업데이트.

특징:
요청 데이터는 변경할 필드만 포함.
리소스의 특정 부분만 업데이트 가능.
서버가 일부 필드만 수정하도록 설계.

사용 사례:
사용자 이름 변경: /users/123
게시글 제목 변경: /posts/456

PATCH 예제 (TypeScript)
`;
const updateUserPartial = async (
  userId: number,
  partialData: { name?: string; email?: string }
): Promise<void> => {
  const response = await axios.patch(
    `https://example.com/users/${userId}`,
    partialData
  );
  console.log("Partially Updated User:", response.data);
};

updateUserPartial(123, { name: "John Smith" });
`
추가 고려 사항
멱등성(Idempotency):

GET, PUT, DELETE: 같은 요청을 여러 번 보내도 결과가 동일.
POST: 같은 요청을 여러 번 보내면 중복 생성될 가능성 있음.
PATCH: 멱등성을 보장하지 않음 (서버 구현에 따라 다름).
HTTP 상태 코드:

GET: 200(성공), 404(리소스 없음)
POST: 201(생성됨)
PUT: 200(성공), 204(내용 없음)
DELETE: 204(내용 없음)
PATCH: 200(성공)

`;
