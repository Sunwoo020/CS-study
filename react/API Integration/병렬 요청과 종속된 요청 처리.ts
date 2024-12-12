`
병렬 요청과 종속된 요청 처리
JavaScript에서 병렬 요청과 종속된 요청은 비동기 작업을 처리하는 두 가지 주요 패턴이다

병렬 요청은 독립적인 작업을 동시에 처리한다
종속된 요청은 이전 요청의 결과가 다음 요청의 입력으로 필요한 경우 처리된다
아래에서 이 두 가지를 자세히 설명하고, Promise와 async/await를 사용한 예제를 제공한다

병렬 요청
병렬 요청은 서로 독립적인 여러 작업을 동시에 처리할 때 사용한다
JavaScript의 비동기 환경에서 병렬 요청은 Promise.all 또는 Promise.allSettled을 주로 사용한다

Promise.all을 사용한 병렬 요청
Promise.all은 전달된 모든 Promise가 성공할 때 하나의 Promise를 반환한다
하나라도 실패하면 전체 요청이 실패로 간주된다
예제
`;
const fetchData1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Data 1"), 1000));
const fetchData2 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Data 2"), 2000));

const fetchAllData = async () => {
  try {
    const results = await Promise.all([fetchData1(), fetchData2()]);
    console.log(results); // ["Data 1", "Data 2"]
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

fetchAllData();
`
Promise.allSettled을 사용한 병렬 요청
Promise.allSettled은 모든 Promise가 완료될 때까지 기다린다
성공 여부와 상관없이 모든 결과를 반환한다
예제
`;
const fetchData1 = () =>
  new Promise((resolve) => setTimeout(() => resolve("Data 1"), 1000));
const fetchData2 = () =>
  new Promise((_, reject) => setTimeout(() => reject("Error in Data 2"), 2000));

const fetchAllData = async () => {
  const results = await Promise.allSettled([fetchData1(), fetchData2()]);
  console.log(results);
  // [
  //   { status: "fulfilled", value: "Data 1" },
  //   { status: "rejected", reason: "Error in Data 2" }
  // ]
};

fetchAllData();
`
병렬 요청이 적합한 상황
작업들이 서로 독립적이고 결과가 종속되지 않는 경우
네트워크 요청, 파일 읽기, 비동기 데이터 가져오기 등

종속된 요청
종속된 요청은 이전 작업의 결과가 다음 작업의 입력으로 필요한 경우 처리한다
이 경우, 비동기 요청을 순차적으로 실행해야 한다

Promise 체인을 사용한 종속된 요청
예제
`;
const fetchUser = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: "John" }), 1000)
  );

const fetchUserPosts = (userId) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve([`Post 1 by User ${userId}`, `Post 2 by User ${userId}`]),
      1000
    )
  );

fetchUser()
  .then((user) => {
    console.log("User:", user);
    return fetchUserPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
`
async/await을 사용한 종속된 요청
예제
`;
const fetchUser = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: "John" }), 1000)
  );

const fetchUserPosts = (userId) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve([`Post 1 by User ${userId}`, `Post 2 by User ${userId}`]),
      1000
    )
  );

const fetchUserData = async () => {
  try {
    const user = await fetchUser();
    console.log("User:", user);

    const posts = await fetchUserPosts(user.id);
    console.log("Posts:", posts);
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchUserData();
`
종속된 요청이 적합한 상황
작업 간 의존성이 있는 경우
하나의 작업 결과가 다음 작업의 입력으로 필요한 경우
예: 사용자 정보를 가져온 후, 해당 사용자의 게시글 또는 댓글을 가져오는 경우

병렬 요청과 종속된 요청을 혼합하기
복합적인 작업에서는 병렬 요청과 종속된 요청을 조합하여 효율적으로 처리할 수 있다

예제: 사용자 데이터와 게시글 병렬 요청, 댓글 종속 요청
`;
const fetchUser = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ id: 1, name: "John" }), 1000)
  );

const fetchPosts = () =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          { id: 101, title: "Post 1" },
          { id: 102, title: "Post 2" },
        ]),
      1000
    )
  );

const fetchComments = (postId) =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve([
          `Comment 1 for Post ${postId}`,
          `Comment 2 for Post ${postId}`,
        ]),
      1000
    )
  );

const fetchUserData = async () => {
  try {
    // 병렬 요청
    const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);
    console.log("User:", user);
    console.log("Posts:", posts);

    // 종속된 요청: 각 게시글의 댓글 가져오기
    const comments = await Promise.all(
      posts.map((post) => fetchComments(post.id))
    );
    console.log("Comments:", comments);
  } catch (error) {
    console.error("Error:", error);
  }
};

fetchUserData();
`
병렬 요청과 종속된 요청 처리 시 주의점
병렬 요청
중복된 네트워크 요청 방지
동일한 데이터 요청을 캐싱하거나 중복 요청을 피해야 한다

에러 처리
Promise.all에서 하나의 요청이라도 실패하면 전체 요청이 실패로 처리된다
중요한 요청이 섞여 있다면 Promise.allSettled를 사용한다

종속된 요청
의존성 관리:
작업 간 의존성이 명확하지 않으면 코드 복잡도가 증가할 수 있다

성능 최적화:
가능한 작업은 병렬로 처리하고, 종속된 작업은 순차적으로 처리하는 혼합 패턴을 활용한다

결론
병렬 요청은 독립적인 작업에서 효율적이며, Promise.all과 Promise.allSettled를 활용한다
종속된 요청은 작업 간 의존성이 있는 경우에 적합하며, async/await 또는 Promise 체인을 활용해 처리한다
복잡한 애플리케이션에서는 병렬 요청과 종속된 요청을 혼합하여 성능과 코드 가독성을 동시에 확보할 수 있다
`;
