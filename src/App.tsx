import ReactBeautifulDnd from "./Components/ReactBeautifulDnd";
import ReactDnd from "./Components/ReactDnd";

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h2>React Beautiful DND </h2>
      <ReactBeautifulDnd />

      <div style={{ paddingTop: 16 }} />
      <h2>React DND </h2>
      <ReactDnd />
    </div>
  );
}

export default App;
