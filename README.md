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
html {
  margin: 0;
  padding: 0;
  height: 0;
}

body {
  margin: 0;
  padding: 0;
  height: 100%;
}

h1 {
  font-family: Arial;
}
```

It's planned to combine output like this in the future:

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

pending

### tailwindToCss

pending

### cssToTailwind

pending
