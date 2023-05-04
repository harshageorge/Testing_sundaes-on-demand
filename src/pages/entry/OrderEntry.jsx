import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";
import Button from "react-bootstrap/Button";

export default function OrderEntry({setOrderPhase}){
    const { totals } = useOrderDetails();
    const orderDisabled = totals.scoops===0;
    return( <div>
        <h1>Design your Sundae!</h1>
        <Options optionType="scoops"/>
        <Options optionType="toppings"/>
        <h2>Grand total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
        <Button disabled={orderDisabled} variant="primary" type="submit" onClick={()=>setOrderPhase('review')}>
        order sundae
      </Button>
    </div>
    )}