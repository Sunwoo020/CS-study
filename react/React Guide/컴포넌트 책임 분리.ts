`# 컴포넌트의 책임 분리
## **컴포넌트의 책임 분리(Single Responsibility Principle, SRP)**란, 
하나의 컴포넌트가 하나의 명확한 역할만 수행하도록 설계하는 원칙을 의미. 
React 컴포넌트를 설계할 때 SRP를 적용하면 코드의 재사용성, 유지보수성, 테스트 용이성이 높아짐

## 단일 책임 원칙이란?
**단일 책임 원칙(SRP)**은 "컴포넌트나 모듈은 하나의 책임만 가져야 하며, 
그 책임은 명확히 정의되어야 한다"는 원칙
하나의 책임이란 하나의 명확한 기능이나 역할을 의미하며,
이렇게 분리된 컴포넌트는 독립적으로 유지보수하기 쉽고, 
다른 역할을 추가하거나 변경할 때에도 영향이 적어짐

## 책임 분리가 필요한 이유
- 유지보수성 향상: 각 컴포넌트가 하나의 책임만 가질 경우, 
  특정 기능에 변화가 필요할 때 해당 컴포넌트만 수정하면 됨 
  예를 들어, 데이터 가져오는 방식이 바뀌더라도 UI를 담당하는 부분은 변경할 필요가 없음
- 재사용성 증가: 역할이 명확히 구분된 작은 컴포넌트들은 여러 곳에서 재사용이 가능
  이를 통해 코드 중복을 줄이고, 전체 개발 생산성을 높일 수 있음
- 테스트 용이성: 단일 책임을 가진 컴포넌트는 독립적으로 테스트가 가능하므로, 
  오류를 쉽게 찾아내고 수정할 수 있고, 각 컴포넌트가 특정 역할에 집중하기 때문에 테스트 범위가 명확해짐

### 컴포넌트의 역할 분리 예시
책임 분리를 적용하여 컴포넌트를 설계할 때, 컴포넌트를 기능별로 분리할 수 있음
이를 통해 컴포넌트가 너무 많은 역할을 가지지 않도록 구성

#### UI와 데이터 로직의 분리
일반적인 실수 중 하나는 데이터 로직(예: API 호출)과 UI 렌더링 로직을 하나의 컴포넌트에 포함하는 것
이렇게 하면 컴포넌트가 너무 많은 책임을 가지게 되어 유지보수가 어렵다
데이터 로직을 커스텀 훅으로 분리하고, UI는 데이터를 가져와서 보여주는 역할만 하도록 할 수 있다
`;
// useFetchData.tsx (커스텀 훅)
import { useState, useEffect } from "react";

function useFetchData(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, loading };
}

export default useFetchData;

// DataDisplayComponent.tsx (UI 컴포넌트)
import React from "react";
import useFetchData from "./useFetchData";

function DataDisplayComponent() {
  const { data, loading } = useFetchData("https://api.example.com/data");

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataDisplayComponent;
`
위 예시에서는 데이터 로직을 useFetchData라는 커스텀 훅으로 분리하여, 
데이터 패칭 로직과 UI 렌더링 로직을 분리
이렇게 하면 데이터 패칭 로직이 재사용 가능해지며, 
UI는 데이터를 받아서 보여주는 역할에 집중할 수 있음

### 컨테이너 컴포넌트와 프레젠테이션 컴포넌트의 분리

#### 컨테이너 컴포넌트(Container Component): 상태 관리, API 호출 등의 로직을 담당 
컨테이너 컴포넌트는 데이터 소스와 연결되어 있으며, 
데이터를 가져오고 이를 프레젠테이션 컴포넌트로 전달함

#### 프레젠테이션 컴포넌트(Presentational Component): UI만을 담당하고, props로 데이터를 받아 렌더링함
비즈니스 로직이나 데이터 소스와 관련된 로직은 포함하지 않음`;
// ContainerComponent.tsx
import React, { useState, useEffect } from "react";
import PresentationalComponent from "./PresentationalComponent";

function ContainerComponent() {
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    // 데이터 패칭 예시
    setData(["Item 1", "Item 2", "Item 3"]);
  }, []);

  return <PresentationalComponent items={data} />;
}

export default ContainerComponent;

// PresentationalComponent.tsx
import React from "react";

interface Props {
  items: string[];
}

function PresentationalComponent({ items }: Props) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default PresentationalComponent;
`
위 예시에서는 ContainerComponent가 데이터를 가져오는 로직을 담당하고, 
PresentationalComponent는 받은 데이터를 단순히 화면에 렌더링하는 역할만 함
이와 같이 분리하면 UI의 변화와 데이터 관리 로직의 변화가 서로 독립적으로 이루어질 수 있음

### 핸들러 함수의 분리

컴포넌트 내부에서 모든 로직을 처리하려고 하면 코드가 길어지고 복잡해지기 쉽다
특히, 이벤트 핸들러 함수가 많아질 경우 
각 핸들러의 책임을 명확하게 분리하여 별도의 함수로 정의하거나, 
별도의 유틸리티 파일로 분리할 수 있음
`;
// handlerUtils.ts
export function handleInputChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<string>>
) {
  setState(event.target.value);
}

// InputComponent.tsx
import React, { useState } from "react";
import { handleInputChange } from "./handlerUtils";

function InputComponent() {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={(event) => handleInputChange(event, setValue)}
    />
  );
}

export default InputComponent;
`
핸들러 함수를 handlerUtils.ts 파일로 분리하여 여러 컴포넌트에서 재사용할 수 있음 
이 방식은 코드의 중복을 줄이고, 각 핸들러 함수의 역할을 명확하게 만들어줌

## 책임 분리의 실무 적용 방법
#### 커스텀 훅(Custom Hooks): 상태와 로직을 재사용하기 위해 커스텀 훅을 작성하여 데이터 패칭, 폼 관리 등 공통 기능을 분리
    프레젠테이션 컴포넌트와 컨테이너 컴포넌트로 분리하여 비즈니스 로직과 UI 로직의 결합을 최소화
    유틸리티 함수로 자주 사용하는 로직을 별도로 분리하여 여러 컴포넌트에서 재사용할 수 있게 함

#### 모듈화된 스타일링: 컴포넌트의 스타일을 별도의 파일로 분리하여 스타일과 로직이 독립적으로 관리되도록 함
    예를 들어, styled-components나 CSS Modules을 사용하여 스타일을 모듈화할 수 있다

## 책임 분리의 장점 요약
#### 유지보수성 향상: 각 컴포넌트가 독립적으로 변경될 수 있어 특정 기능 수정 시 다른 기능에 미치는 영향을 줄임
#### 재사용성 증가: 작은 컴포넌트는 여러 곳에서 쉽게 재사용할 수 있으며, 변경이 필요할 때도 컴포넌트 단위로 수정하면 됨
#### 테스트 용이성: 단일 책임을 가진 컴포넌트는 기능이 명확하기 때문에 테스트 케이스를 작성하고 유지하는 것이 쉽다
#### 코드 가독성: 컴포넌트가 명확한 역할을 가지면 코드의 가독성이 높아지며, 다른 개발자들이 코드를 이해하기 쉬움
React에서 컴포넌트를 설계할 때 책임 분리는 더 나은 유지보수성과 확장성을 제공하며, 협업 시에도 코드를 명확하고 쉽게 이해할 수 있도록 만들어줌
    이를 통해 복잡한 애플리케이션에서도 명확한 구조와 안정적인 코드베이스를 유지할 수 있다.`;
