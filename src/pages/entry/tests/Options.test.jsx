import { render, screen } from "@testing-library/react";
import Options from '../Options';

test('display image for each scoop options from server',async()=>{
    render(<Options optionType='scoops'/>);

    //find images
    const scoopImages = await screen.findAllByRole('img', { name: /scoop$/i});
    expect(scoopImages).toHaveLength(2);

    //confirm alt text of images

    const altText = scoopImages.map((element)=>element.alt);
    expect(altText).toEqual(['Chocolate scoop','Vanilla scoop']);
})

test('display image for each toppings options from server',async()=>{
    render(<Options optionType='toppings'/>);

    //find images
    const toppingsImages = await screen.findAllByRole('img',{name: /topping$/i});
    expect(toppingsImages).toHaveLength(3);

    //confirm alt text of images

    const altText = toppingsImages.map((element)=>element.alt);
    expect(altText).toEqual(['Cherries topping','M&Ms topping','Hot fudge topping']);
})