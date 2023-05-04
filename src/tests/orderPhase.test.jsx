import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  //render app
  const user = userEvent.setup();
  const { unmount } = render(<App />);
  //add icecream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  const chocolateInput = screen.getByRole("spinbutton", {
    name: "Chocolate",
  });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  const grandTotal = screen.getByRole("heading", { name: /Grand total: \$/ });
  expect(grandTotal).toHaveTextContent("7.50");

  //find and click order button
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderButton);

  //check summary information based on order ie subtotals

  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();
  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();
  const toppingsHeading = screen.getByRole("heading", {
    name: "Toppings: $1.50",
  });
  expect(toppingsHeading).toBeInTheDocument();
  //check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();
  //accept terms and conditions and click button to confirm order
  const tcCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tcCheckbox);
  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);
  //expect loading to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  //check confirmation page text
  // this one is async because ther is a post request to server in between summary and confirmation pages
  const thankYouHeading = await screen.findByRole("heading", {
    name: "thank you",
  });
  expect(thankYouHeading).toBeInTheDocument();

  //expect that loading has disapperead
  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  //confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order numer/i);
  expect(orderNumber).toBeInTheDocument();

  //click "new order" button on confirmation page
  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  await user.click(newOrderButton);
  //check scoops and toppings subtotal have been reset
  const scoopsTotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsTotal).toBeInTheDocument();
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsTotal).toBeInTheDocument();
  //unmount the component to trigger cleanup and avoid not wrapped in act error
  unmount();
});

test("tests to check if toppings heading not shown when toppings are not added", async () => {
  const user = userEvent.setup();
  render(<App />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderButton);

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $2.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", { name: /Toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test("tests to check if toppings heading not shown when toppings added and then removed", async () => {
  const user = userEvent.setup();
  render(<App />);
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();

  const toppingsTotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingsTotal).toHaveTextContent("1.50");
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();
  expect(toppingsTotal).toHaveTextContent("0.00");

  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderButton);

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $2.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.getByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
