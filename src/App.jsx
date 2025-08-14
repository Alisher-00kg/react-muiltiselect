import { useState } from "react";
import { Multiselect } from "./components/UI/MultiSelect";

function App() {
  const [selected, setSelected] = useState([]);

  const testOptions = [
    { label: "JavaScript", value: "js" },
    { label: "TypeScript", value: "ts" },
    { label: "React", value: "react" },
    { label: "Vue", value: "vue" },
    { label: "Angular", value: "angular" },
    { label: "Node.js", value: "node" },
    { label: "Asan", value: "uson" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Тестовый Multiselect</h1>
      <Multiselect
        options={testOptions}
        selectedOptions={selected}
        onSelectionChange={setSelected}
        placeholder="Выберите технологии..."
      />
    </div>
  );
}

export default App;
