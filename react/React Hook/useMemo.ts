// useMemo
`useMemo는 컴포넌트가 렌더링될 때 값이 재계산되는 것을 방지하기 위해 사용되는 리액트 훅입니다. 주로 계산 비용이 높은 작업을 메모이제이션하여 성능을 최적화하는 데 유용합니다. useMemo는 특정 값이 변경되지 않는 한 이전에 계산된 값을 재사용하므로 불필요한 계산을 방지할 수 있습니다. 
`;
import React, { useMemo, useState } from "react";

export default function FactorialCalculator() {
  const [number, setNumber] = useState(1);
  const [multiplier, setMultiplier] = useState(1);

  const factorial = (n: number): number => {
    return n <= 0 ? 1 : n * factorial(n - 1);
  };

  const result = useMemo(() => factorial(number), [number]);

  return (
    <div>
      <div>
        <label>
          Number:
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value) || 1)}
          />
        </label>
      </div>
      <div>
        <label>
          Multiplier:
          <input
            type="number"
            value={multiplier}
            onChange={(e) => setMultiplier(parseInt(e.target.value) || 1)}
          />
        </label>
      </div>
      <p>Factorial: {result}</p>
      <p>Multiplied Result: {result * multiplier}</p>
    </div>
  );
}

`
**useMemo**는 컴포넌트가 렌더링될 때 계산된 결과를 메모이제이션하여 성능을 최적화하는 리액트 훅입니다. 이는 계산 비용이 높은 작업이 불필요하게 반복되지 않도록 방지합니다.

의존성 배열: useMemo의 두 번째 인자는 의존성 배열로, 이 배열에 포함된 값이 변경될 때만 메모이제이션된 값을 다시 계산합니다.

빈 배열 ([])을 전달하면 컴포넌트가 처음 렌더링될 때만 계산되고, 이후에는 재계산되지 않습니다.

배열 안에 특정 변수를 넣으면 해당 변수가 변경될 때마다 계산이 다시 실행됩니다.

렌더링 최적화: useMemo는 값이 변경되지 않는 한 이전의 계산 결과를 재사용하므로 불필요한 계산을 피할 수 있습니다. 위 코드에서 expensiveComputation 함수는 계산 비용이 높은 작업이므로, count 값이 변경될 때만 다시 계산되도록 useMemo를 사용했습니다.

주의할 점:

메모이제이션의 비용: useMemo 자체도 메모이제이션을 위해 메모리를 사용하고, 참조 비교를 수행하기 때문에 모든 경우에 사용하는 것이 적합하지 않을 수 있습니다. 계산 비용이 크지 않은 작업에서는 굳이 사용하지 않는 것이 좋습니다.

의존성 배열의 정확성: 의존성 배열을 올바르게 설정하지 않으면 값이 변경되었을 때 재계산이 이루어지지 않거나 불필요하게 재계산될 수 있습니다. 따라서 의존성 배열에 모든 관련 변수를 정확하게 포함해야 합니다.

사용 사례

비싼 계산: 계산 비용이 높은 작업(예: 복잡한 수학 계산, 대량의 데이터 처리 등)을 최적화하기 위해 사용합니다.

필터링이나 정렬된 데이터: 대량의 데이터를 필터링하거나 정렬해야 할 때, 입력 데이터가 변경될 때만 재계산하여 성능을 최적화할 수 있습니다.

렌더링 최적화: 부모 컴포넌트의 상태가 변경되었지만 특정 값은 변하지 않을 경우, 불필요한 계산을 방지할 수 있습니다.

아래는 추가적인 예시로, 배열의 필터링 작업에 useMemo를 사용한 경우입니다.
`;
import React, { useState, useMemo } from "react";

interface Item {
  id: number;
  name: string;
}

export default function FilteredListExample() {
  const [searchTerm, setSearchTerm] = useState("");
  const items: Item[] = [
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Cherry" },
    { id: 4, name: "Date" },
    { id: 5, name: "Elderberry" },
  ];

  const filteredItems = useMemo(() => {
    console.log("Filtering items...");
    return items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, items]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search items..."
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
`
위 코드에서 useMemo는 searchTerm이 변경될 때만 filteredItems를 다시 계산하도록 하여, 불필요한 필터링 작업을 방지합니다. 이와 같이 useMemo를 활용하면 리액트 애플리케이션의 성능을 최적화하고, 불필요한 렌더링과 계산을 줄이는 데 도움을 줄 수 있습니다.

`;
