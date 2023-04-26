import { useEffect, useState } from "react";
import ScoopOptions from "./ScoopOptions";
import Row from "react-bootstrap/Row";
// import axios from "axios";
import ToppingOptions from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
function Options({ optionType }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(false);
  // optionType is 'scoops' or 'toppings'
  useEffect( () => {
    // axios
    //   .get(`https://localhost:3030/${optionType}`)
    //   .then((response) => setItems(response.data))
    //   .catch((error) => {
    //     console.log(error);
    //   });
    async function fetchData(){
      await fetch(`http://localhost:3030/${optionType}`)
.then((response) => response.json())
.then((data) => setItems(data))
.catch((error)=>{
setError(true);
});
    }
   fetchData();
  }, [optionType]);
  if(error){
    return <AlertBanner/>
  }
  //Replace null with ToppingsOption when available
  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  const optionItems = items.map((item) => <ItemComponent key={item.name} name={item.name} imagePath={item.imagePath}/>);
  return <Row>{optionItems}</Row>;
}

export default Options;
