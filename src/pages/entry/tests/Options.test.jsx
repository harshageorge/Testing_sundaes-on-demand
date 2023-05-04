import { render, screen } from "../../../test-utils/testing-library-utils";
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
});

test('dont update total if scoops input is invalid',async()=>{
    const user = userEvent.setup();
    render(<Options optionType='scoops'/>);
    
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      const scoopsTotal = screen.getByText("Scoops total: $0.00");
      await user.clear(vanillaInput);
      await user.type(vanillaInput, "2.5");
      expect(scoopsTotal).toHaveTextContent("$0.00");

      await user.clear(vanillaInput);
      await user.type(vanillaInput, "100");
      expect(scoopsTotal).toHaveTextContent("$0.00");

      await user.clear(vanillaInput);
      await user.type(vanillaInput, "-1");
      expect(scoopsTotal).toHaveTextContent("$0.00");
});