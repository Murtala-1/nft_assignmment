import "./App.css";
import NFTsList from "./component/NFTsList";
import { Col, Row } from "reactstrap";
function App() {
  return (
    <Row className="m-0 p-0">
      <Col></Col>
      <Col md={8}>
        <NFTsList />
      </Col>
      <Col></Col>
    </Row>
  );
}

export default App;
