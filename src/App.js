import classes from "./App.module.css";
import Main from "./components/main/Main";
import Details from "./components/details/Details";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className={classes.app}>
      <div className={classes.nav}>
        <Navbar />
      </div>
      <div className={classes.content}>
        <Routes>
          <Route path="/pokemon-search-app/" element={<Main />} />
          <Route path="/pokemon-search-app/details/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
