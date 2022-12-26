import logo from "./logo.svg";
import "./App.css";
import { Row, Col } from "antd";
import "./app.scss";
import AppHeader from "./Components/layouts/Header";
import PageContent from "./Components/layouts/PageContent";
import AppFooter from "./Components/layouts/Footer";
//import AddCompany from "./Components/AddCompany";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <AppFooter />
      </BrowserRouter>
    </div>
  );
}

export default App;
