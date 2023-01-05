import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("initial conditions", () => {
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("checkbox enables button on first click and disables on second click", async() => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
 await user.click(checkbox);
  expect(confirmButton).toBeEnabled();
  await user.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async()=>{
  const user = userEvent.setup();
  render(<SummaryForm />);
  // popover starts out hidden
const nullPopOver = screen.queryByText(/no icecream will actually be delivered/i);
expect(nullPopOver).not.toBeInTheDocument();
  //popover starts when mouseover of checkbox label
const termaAndConditions = screen.getByText(/terms and conditions/i);
await user.hover(termaAndConditions);
const popOver = screen.getByText(/no icecream will actually be delivered/i);
expect(popOver).toBeInTheDocument();
  //popover disappers when we mouse out
  await user.unhover(termaAndConditions);
  expect(popOver).not.toBeInTheDocument();
})
