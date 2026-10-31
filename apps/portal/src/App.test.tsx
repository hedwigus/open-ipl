// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import OpenIPLApp from "./OpenIPLApp";

it("shows the Open IPL group leader portal entry point", () => {
  render(<OpenIPLApp />);
  expect(screen.getByRole("heading", { name: /group leader portal/i })).toBeTruthy();
  expect(screen.getByRole("link", { name: /start group application/i })).toBeTruthy();
});
