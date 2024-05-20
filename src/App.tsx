import { useEffect } from "react";
import "./App.css";
import MainForm from "./components/MainForm";
import Title from "./components/Title";
import { TELEGRAM } from "./utils/constants";

function App() {
  useEffect(() => TELEGRAM.expand(), []);

  return (
    <div className="App">
      <Title size="big" title="⚡️ Запуск активности" />
      <MainForm />
    </div>
  );
}

export default App;
