import Main from "./components/main/Main";
import Details from "./components/details/Details";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="h-[100vh] w-[100vw]">
      <div className="h-[10%]">
        <Navbar />
      </div>
      <div className="h-[90%]">
        <Routes>
          <Route path="/pokemon-search-app/" element={<Main />} />
          <Route path="/pokemon-search-app/details/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
