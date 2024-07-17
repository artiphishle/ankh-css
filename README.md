# Ankhorage CSS

Collection of CSS tools

## Converter

### convertArrayToCss

#### Input

Array with `tagName`, `property`, `value`

```json
[
  ["html", "margin", "0"],
  ["html", "padding", "0"],
  ["html", "height", "100%"],
  ["body", "margin", "0"],
  ["body", "padding", "0"],
  ["body", "height", "100%"],
  ["h1", "font-family", "Arial"]
]
```

#### Output

CSS

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 0;
}

h1 {
  font-family: Arial;
}
```

### convertCssToArray

#### Input

CSS

```css
html,
body {
  margin: 0;
  padding: 0;
  height: 0;
}

h1 {
  font-family: Arial;
}
```

#### Output

Array with `tagName`, `property`, `value`

```json
[
  ["html", "margin", "0"],
  ["html", "padding", "0"],
  ["html", "height", "100%"],
  ["body", "margin", "0"],
  ["body", "padding", "0"],
  ["body", "height", "100%"],
  ["h1", "font-family", "Arial"]
]
```

### convertTailwindToCss

Under development

#### Input

Array with `tagName`, `string` where string is the list of tailwind classes

```ts
[
  ["p", "text-left"],
  ["p", "p-2"],
  ["p", "m-4"]
]
```

#### Output

CSS

```css
p {
  margin: 1rem;
  padding: .5rem;
  text-align: "left";
}
```

### convertCssToTailwind

Under development

#### Input

CSS

```css
html, body {
  margin: none;
  padding: none;
}
```

#### Output

Array with `tagName`, `string` where string is the list of tailwind classes

```ts
[
  ["html", "m-none p-none"],
  ["body", "m-none p-none"]
]
```

## Optimizer

### optimizeCss

This is the method from `nanocss`, I'm also using it to merge same property/value styles like:

#### Before optimization

```css
html {
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
  padding: 0;
}
```

#### After optimization

```css
html, body {
  margin: 0;
  padding: 0;
}
```

## Contribution

As I've seen after releasing there was many downloads. Thank you.

### Feature requests / Issues

Every contribution is very appreciated.

1. Create issue or feature request
2. After we agree to the change either I or a volunteer gets the task assigned
3. The coder opens a Pull Request which I will review as fast as I can
4. The version containing the change will be released

## Changelog

### Version 1.2.2

- convertTailwindToCss() support: padding & margin (e.g. 'm-2 p-4')
- Usage of 'node:test' testing library (available: Node 18+)

### Version 1.2.1

- convertTailwindToCss() support: text align (e.g. 'text-center')

### Version 1.2.0

- convertCssToArray() tested & functional
- convertArrayToCss() tested & functional
- optimizeCss() integrated from `nanocss`

### <s>Version 1.1.0</s>

Deprecated, it was the first try and only one of the converters was supported. Please update.