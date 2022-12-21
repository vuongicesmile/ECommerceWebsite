import logo from "./logo.svg";
import "./App.css";
import { Row, Col } from "antd";
// import AddCompany from "./Components/AddCompany";

function App() {
  const handleClickAvatar = () => {};
  return (
    <div
      className="d-flex align-items-center justify-content-center cursor-pointer"
      onClick={handleClickAvatar}
      style={{ height: "100vh" }}
    >
      {/* <AddCompany /> */}
      <div style={{ height: "20px", width: "20px" }}>
        <img
          src={"https://source.unsplash.com/random"}
          width="20"
          height={"20"}
        />
      </div>
    </div>
  );

  function DropdownContent() {
    return (
      <div
        className="d-flex align-items-start"
        style={{
          padding: "25px 20px",
          width: "230px",
          height: "249px",
          background: "gray",
          boxShadow: "0 14 64 rgba(0,0,0,0,1)",
          borderRadius: "16px",
        }}
      >
        <Col className="p-10">
          <Col> Account </Col>
          <Col> Settings </Col>
          <Col> Sign out </Col>
        </Col>
      </div>
    );
  }
}

export default App;
