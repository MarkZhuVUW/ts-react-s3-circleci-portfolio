import { render } from "@testing-library/react";
import React from "react";

describe("MenuContainer tests.", () => {
  test("bla", async () => {
    const { container } = render(<></>);
    expect(container).toBeTruthy();
  });
});
