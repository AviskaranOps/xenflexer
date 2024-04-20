import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Auth } from "./components/auth";
import { DashBoard } from "./components/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Auth />
      {/* <DashBoard /> */}
    </BrowserRouter>
  );
}

export default App;
