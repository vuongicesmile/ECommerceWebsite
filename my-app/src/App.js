import logo from "./logo.svg";
import "./App.css";
import { Row, Col } from "antd";
import "./app.scss";
import AppHeader from "./Components/layouts/Header";
import PageContent from "./Components/layouts/PageContent";
import AppFooter from "./Components/layouts/Footer";
//import AddCompany from "./Components/AddCompany";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./store/store";


function App() {
  return (
    <div className="app-container">
      <Provider store={store}>
        <BrowserRouter>
          <AppHeader />
          <PageContent />
          <AppFooter />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
