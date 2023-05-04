import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOptions";

test('check whether scoop count is not an integer or out of range',async()=>{
    const user = userEvent.setup();
    render(<ScoopOptions />);
    const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      await user.clear(vanillaInput);
      await user.type(vanillaInput, "-1");
      expect(vanillaInput).toHaveClass('is-invalid')

      await user.clear(vanillaInput);
      await user.type(vanillaInput, "2.5");
      expect(vanillaInput).toHaveClass('is-invalid')

      await user.clear(vanillaInput);
      await user.type(vanillaInput, "11");
      expect(vanillaInput).toHaveClass('is-invalid')

      await user.clear(vanillaInput);
      await user.type(vanillaInput, "3");
      expect(vanillaInput).not.toHaveClass('is-invalid')
})
