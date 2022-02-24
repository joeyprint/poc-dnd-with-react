import ReactBeautifulDnd from "./Components/ReactBeautifulDnd";
import ReactDnd from "./Components/ReactDnd";
import ReactDraggable from "./Components/ReactDraggable";

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h2>React Beautiful DND </h2>
      <ReactBeautifulDnd />

      <div style={{ paddingTop: 16 }} />
      <h2>React DND </h2>
      <ReactDnd />

      <div style={{ paddingTop: 16 }} />
      <h2>React Draggable </h2>
      <ReactDraggable />
    </div>
  );
}

export default App;
