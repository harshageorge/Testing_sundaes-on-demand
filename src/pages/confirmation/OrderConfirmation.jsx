import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const [error, setError] = useState(false);
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  useEffect(() => {
    const requestOptions = {
        method: 'POST'
    };

    async function fetchData() {
        await fetch('http://localhost:3030/order',requestOptions)
          .then((response) =>{
          response.json()
           })
          .then((data) =>{
           setOrderNumber(data?.orderNumber);

          } )
          .catch((error) => {
            setError(true);
          });
      }
      fetchData();
    // axios
    //   .post('http://localhost:3030/order')
    //   .then((response) => {
    //    console.log(response.data.orderNumber);
    //    setOrderNumber(response.data.orderNumber);
    //   });
  }, []);

  const newOrderButton =(  <Button onClick={handleClick}>Create new order</Button>)
  function handleClick() {
    resetOrder();
    setOrderPhase("inProgress");
  }
  if (error) {
    return 
    <><AlertBanner />
    {newOrderButton}
    </>
  }
  if (orderNumber) {
    return (
      <div>
        <h1>Thank You</h1>
        <p>Your order number is{orderNumber}</p>
      {newOrderButton}
      </div>
    );
  } else {
    return <div>Loading</div>;
  }
}
