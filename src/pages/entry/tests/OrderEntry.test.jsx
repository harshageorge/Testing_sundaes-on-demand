import {
  render,
  screen,
  waitFor,
} from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";

test("handles error for scoops and toppings route", async () => {
  server.resetHandlers(
    rest.get(
      "http://localhost:3030/scoops",
      (req, res, ctx) => {
        return res(ctx.status(500));
      },

      rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    )
  );
  render(<OrderEntry />);
  await waitFor(async () => {
    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(2);
  });
});

test('disable order sundae button when no scoops are added',async()=>{
  const user = userEvent.setup();
  render(<OrderEntry setOrderPhase={jest.fn()}/>);
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  expect(orderButton).toBeDisabled();
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
 
})