
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages";
import EventDetailPage from "./pages/eventDetail";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/event-detail/:eventId" element={<EventDetailPage/>}/>
      </Routes>

    </div>
  );
}

export default App;
