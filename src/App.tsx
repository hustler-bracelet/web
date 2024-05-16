import "./App.css";
import MainForm from "./components/MainForm";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
      <Title big title="⚡️ Запустить активность" />
      <MainForm />
    </div>
  );
}

export default App;
