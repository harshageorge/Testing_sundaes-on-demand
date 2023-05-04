import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // make sure total starts out $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  // make sure total starts out $0.00
  const toppingsSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  //make sure when check box is checked subtotal changes

  const checkbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(checkbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  //make sure when another check box is checked subtotal changes again
  const checkbox2 = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });
  await user.click(checkbox2);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  //make sure code can handle checked and unchecked at the same time

  await user.click(checkbox2);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});


describe("grand total",()=>{
  test("grand total starts at $0.00",()=>{
    // const {unmount} = render(<OrderEntry />);
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
    expect(grandTotal).toHaveTextContent("0.00");
    // unmount();
  });
  test("grand total updates properly if scoops is added first",async()=>{
    const user = userEvent.setup();
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });

    //updates vanilla scoop by 2 and check grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    //add cherries and check grand total

    const checkbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(checkbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if toppings are added first",async()=>{
    const user = userEvent.setup();
    render(<OrderEntry />);

    //add cherries and check grand total
    const checkbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    await user.click(checkbox);
    //grand total 1.50

        //updates vanilla scoop by 2 and check grand total
        const vanillaInput = await screen.findByRole("spinbutton", {
          name: "Vanilla",
        });
        await user.clear(vanillaInput);
        await user.type(vanillaInput, "2");
         //remove one scoop of vanilla and check grand total
         await user.clear(vanillaInput);
         await user.type(vanillaInput, "1");

         //check grand total
         const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
         expect(grandTotal).toHaveTextContent("3.50");

          //remove cherries and check grand total
          await user.click(checkbox)
          expect(grandTotal).toHaveTextContent("2.00");
  })
})