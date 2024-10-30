`# React Server Component(RSC)
## React에서 node.js와 같은 Server 역할을 수행하는 Server Component 기능을 제공
- 브라우저가 받아오는 용량을 줄이기 위해 서버에서 실행되는 컴포넌트
- .client.jsx, .server.jsx, .jsx 3개의 파일로 구성
  기존 SSR 기능과는 다르게 RSC는 HTML 파일을 가져오지 않고 JSON 데이터를 가져오게 됩니다.

### 기존 SSR 방식
- renderToString 함수를 통해 초기 렌더링 결과를 HTML String으로 반환
- 위에서 내려받은 마크업이 포함된 HTML 문서를 먼저 사용자에게 보여줍니다.
- 그리고 나머지 청크파일을 다시 받은 후 ReactDOM.hydrate 함수를 통해 자바스크립트 / 변경된 곳을 업데이트 합니다.

input 태그에 검색어 입력
onChange 동작 => 내부 검색 Fetch API 작동 => 검색 결과를 받아옴
받은 검색 결과를 다시 React에 전달하여 컴포넌트 렌더링 진행`;

import ReactDOMServer from "react-dom/server";

const ReactDOMServer = require("react-dom/server");

ReactDOMServer.renderToString(element)`

### 변경된 SSR+RSC 방식

input 태그에 검색어 입력

onChange 동작 => 렌더링 서버에 Fetch 키워드 전달

렌더링 서버에서 Fetch API 요청 => 검색결과를 받아 비 HTML 형식으로 클라이언트에게 전달

클라이언트는 UI로 렌더링 진행
- React 컴포넌트가 아니기 때문에 컴포넌트 처리 비용이 절약
- 불필요한 청크 파일을 받아오는 것을 막을 수 있음

서버 컴포넌트는 API 호출 방식을 사용하지 않고 직접 DB에 접근하여 note 데이터를 받아오고 있습니다.
  이것이 RSA의 장점!
받아온 데이터를 바탕으로 NodeEditor라는 컴포넌트를 구성하고 있습니다.
  NodeEditor 컴포넌트는 클라이언트에게 내려줄 컴포넌트 입니다.
  서버 컴포넌트가 리렌더링 되도 클라이언트 컴포넌트가 기존에 가지고 있는 DOM / State들은 유지됩니다.
    서버에서 내려주는 props를 바탕으로 생성
또한 NodeEditor 컴포넌트를 RSC가 import할 때 필요할때만 dynamic하게 import할 수 있습니다.

즉 RSA는 서버에게 직접 JSON 데이터를 받거나, 클라이언트에서 필요한 전처리 과정, 
파일 시스템 등을 수행하고 클라이언트 컴포넌트는 React의 순수 컴포넌트 기능을 제공하게 됩니다.`;
// Note.server.js - Server Component

import db from "db.server";
// (A1) We import from NoteEditor.client.js - a Client Component.
import NoteEditor from "NoteEditor.client";

function Note(props) {
  const { id, isEditing } = props;
  // (B) Can directly access server data sources during render, e.g. databases
  const note = db.posts.get(id);
  return (
    <div>
      <h1>{note.title}</h1>
      <section>{note.body}</section>
      {/* (A2) Dynamically render the editor only if necessary */}
      {isEditing ? <NoteEditor note={note} /> : null}
    </div>
  );
}
`
## RSC의 장점 정리

### Zero-Bundle-Size Components
- 서버 컴포넌트는 번들에 포함되지 않기 때문에 번들 사이즈가 감소합니다.

### Full Access to the Backend
- API 호출을 통해 여러 데이터를 불러올 필요 없이 DB 접근 / 파일 시스템 등을 접근할 수 있습니다.

### Automatic Code Splitting
- 기존 lazy loading 방식을 자동으로 지원합니다.
`;
// 기존 방식
const OldPhotoRenderer = React.lazy(() => import("./OldPhotoRenderer.js"));
const NewPhotoRenderer = React.lazy(() => import("./NewPhotoRenderer.js"));
function Photo(props) {
  if (FeatureFlags.useNewPhotoRenderer) {
    return <NewPhotoRenderer {...props} />;
  } else {
    return <PhotoRenderer {...props} />;
  }
}

// 개선된 방식 => 자동으로 코드 스플리팅이 적용되어 렌더링이 필요한 시점에 import
import React from "react";

import OldPhotoRenderer from "./OldPhotoRenderer.client.js";
import NewPhotoRenderer from "./NewPhotoRenderer.client.js";

function Photo(props) {
  if (FeatureFlags.useNewPhotoRenderer) {
    return <NewPhotoRenderer {...props} />;
  } else {
    return <PhotoRenderer {...props} />;
  }
}
`
## 번외 - RSA의 Rule

RSA는 요청 당 한번만 수행되기 때문에 상태 변화 Hook 미지원
- useState, useReducer, useEffect, useLayoutEffect
- state or effect가 포함된 커스텀 Hook 미지원

폴리필 하지 않는 한 브라우저 API 미지원
- 브라우저 API를 활용한 함수들도 미지원

다른 서버 컴포넌트 / 다른 클라이언트 컴포넌트 혹 / HTML Tag 렌더링 가능`;
