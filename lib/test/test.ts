#!/usr/bin/env node

import test from "node:test";
import assert from "node:assert";
import { convertArrayToCss, convertCssToArray } from "../css";
import { TwMapper } from "../mappers/tw.mapper";
import { TStyle, TTailwindStyle } from "../types";

test("convertArrayToCss", async () => {
    const test: TStyle[] = [["html", "margin", "0"],["body", "margin", "0"]];
    const expected = "body,html{margin:0}"
    const received = await convertArrayToCss(test);
    assert(received === expected)
});

test("convertCssToArray", () =>{
    const test = "body,html{margin:0}";
    const expected = [["body","margin","0"],["html","margin","0"]]
    const received = convertCssToArray(test);
    assert(JSON.stringify(received) === JSON.stringify(expected))
});

test("convertTailwindToCss", async () => {
    const test: TTailwindStyle[] = [["p", "text-left"],["p", "p-2"],["p", "m-4"]];
    const expected = "p{margin:1rem;padding:.5rem;text-align:left}";
    const received = await TwMapper().convertTailwindToCss(test);
    assert(received === expected);
});

/*
test("convertCssToTailwind", async () => {
  const test = "p{text-align:left}small{text-align:right}";
  const expected: TTailwindStyle[] = [["p", "text-left"],["small", "text-right"]];
  const received = await TwMapper().convertCssToTailwind(test);
  assert(JSON.stringify(received) === JSON.stringify(expected))
});
*/