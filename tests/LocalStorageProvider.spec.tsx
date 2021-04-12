import { getByText, render } from "@testing-library/react";
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
    getByText(container, "1", { exact: true });
  });
  test("local storage provider function keys works", async () => {
    const { container } = render(
      <LocalStorageProvider>
        <LocalStorageProviderDebug functionToDebug="keys" />
      </LocalStorageProvider>
    );
    expect(container).toBeTruthy();
    getByText(container, "[]", { exact: true });
  });
  test("local storage provider function removeItem works", async () => {
    // TODO
  });
});
