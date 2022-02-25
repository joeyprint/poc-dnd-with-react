import "./App.css";
import ReactBeautifulDnd from "./Components/ReactBeautifulDnd";
import QuestionDnd from "./Containers/QuestionDnd";
import QuestionDndWithDropZone from "./Containers/QuestionDndWithDropZone";

function App() {
  return (
    <div style={{ padding: 16 }}>
      <h2>React Beautiful DND </h2>
      <ReactBeautifulDnd />

      <div style={{ paddingTop: 16 }} />
      <h2>React DND </h2>
      <QuestionDnd />

      <div style={{ paddingTop: 16 }} />
      <h2>Question DND With DropZone</h2>
      <QuestionDndWithDropZone />
    </div>
  );
}

export default App;
