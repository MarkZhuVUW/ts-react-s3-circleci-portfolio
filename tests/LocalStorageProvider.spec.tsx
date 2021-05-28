import { findByText, getByText, render } from "@testing-library/react";
import React from "react";
import { LocalStorageProvider } from "../src/providers/LocalStorageProvider";
import { LocalStorageProviderDebug } from "./Utils";
describe("LocalStorageProvider tests.", () => {
  test("local storage provider function getItem with non existing key works", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <LocalStorageProviderDebug />
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();
    getByText(container, "null", { exact: true });
  });

  test("local storage provider function setItem works", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <LocalStorageProviderDebug functionToDebug="setItem" />
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();
    await findByText(container, '"1"');
  });
  test("local storage provider function keys works", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <LocalStorageProviderDebug functionToDebug="keys" />
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();
    await findByText(container, "a", { exact: true });
    localStorage.removeItem("a");
  });
  test("local storage provider function removeItem works", async () => {
    localStorage.setItem("b", "2");
    localStorage.setItem("a", "1");

    const { container } = render(
      <LocalStorageProvider>
        <LocalStorageProviderDebug functionToDebug="removeItem" />
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();
    await findByText(container, "2", { exact: true });
    await findByText(container, "b", { exact: true });
  });
});
