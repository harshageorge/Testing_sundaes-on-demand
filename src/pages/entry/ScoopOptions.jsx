import Col from "react-bootstrap/Col";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
function ScoopOptions({ name, imagePath }) {
  const[isValid,setIsValid] = useState(true);
  const { updateItemCount } = useOrderDetails();
  const handleChange = (e) => {
    const currentValue =e.target.value;
    const currentValueFloat = parseFloat(currentValue);
    const valueIsValid= 0<=currentValueFloat && currentValueFloat<=10 && Math.floor(currentValueFloat)===currentValueFloat;
    setIsValid(valueIsValid);

    const newValue =valueIsValid?parseInt(currentValue):0;
    updateItemCount(name,parseInt(newValue),"scoops");
  }
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
      >
        <Form.Label column xs="6" style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs="5" style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={handleChange}
            isInValid={!isValid}   
          />
        </Col>
      </Form.Group>
    </Col>
  );
}

export default ScoopOptions;
