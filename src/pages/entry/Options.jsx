import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import Row from "react-bootstrap/Row";
import { pricePerItem } from "../../constants";
import { formatCurrency } from "../../utilities";
import { useOrderDetails } from "../../contexts/OrderDetails";
// import axios from "axios";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();
  // optionType is 'scoops' or 'toppings'
  useEffect(() => {
    // axios
    //   .get(`https://localhost:3030/${optionType}`)
    //   .then((response) => setItems(response.data))
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // const controller = new AbortController();
    console.log("OPTIONTYPE", optionType);
    async function fetchData() {
      // await fetch(`http://localhost:3000/${optionType}`,{signal:controller.signal})
      await fetch(`http://localhost:3030/${optionType}`)
        .then((response) =>response.json())
        .then((data) =>{
          setItems(data);
          console.log(data);
        } )
        .catch((error) => {
          // console.log(error);
          // if(error.name !== "CancelledError")
          setError(true);
        });
    }
    fetchData();

    //abort fetch call on component unmount
    // return()=>{
    //   controller.abort();
    // }
  }, [optionType]);
  if (error) {
    return <AlertBanner />;
  }
  //Replace null with ToppingsOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();
  const optionItems = items.map((item) => (
    <ItemComponent
      key={item.name}
      name={item.name}
      imagePath={item.imagePath}
    />
  ));

  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerItem[optionType])} each</p>
      <p>
        {title} total: {formatCurrency(totals[optionType])}
      </p>
      <Row>{optionItems}</Row>
    </>
  );
}

export default Options;
