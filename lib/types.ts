export type THtmlElement = string;
export type TCssProperty = string;
export type TCssValue = string | number;
export type TTailwindClassNames = string; // e.g. "m-2 p-none"
export type TTailwindStyle = [THtmlElement, TTailwindClassNames];
export type TStyle = [THtmlElement, TCssProperty, TCssValue];
