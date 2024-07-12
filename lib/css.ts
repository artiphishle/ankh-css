type THtmlElement = string;
type TCssProperty = string;
type TCssValue = string | number;
export type TStyle = [THtmlElement, TCssProperty, TCssValue];

export function convertArrayToCss(styles: TStyle[]) {
  let css = '';
  let open = '';

  styles.forEach((style) => {
    const [tag, prop, val] = style;

    if (tag !== open) {
      if (css) css += '}';
      css += tag + '{';
      open = tag;
    }
    css += prop + ':' + val + ';';
  });
  css += '}';

  return css;
}

export function convertCssToArray(css: string){
  let styles = [];

  /** @todo */

  return styles;
}
