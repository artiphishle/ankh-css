import cssnano from 'cssnano';
import { TwMapper } from "./mappers/tw.mapper";
import type { TStyle, TTailwindStyle } from './types';

export async function convertArrayToCss(styles: TStyle[]) {
  const css = styles.map(([tag, prop, val]) => `${tag} { ${prop}: ${val}; }`).join(' ');
  return await optimizeCss(css);
}
export function convertCssToArray(css: string): TStyle[] {
  const styleArray: TStyle[] = [];
  const regex = /([^{]+)\{([^}]+)\}/g;
  let match;

  while ((match = regex.exec(css)) !== null) {
    const selectors = match[1].trim().split(/\s*,\s*/);
    const declarations = match[2].trim().split(/\s*;\s*/);

    selectors.forEach(selector => {
      declarations.forEach(declaration => {
        if (declaration) {
          const [prop, val] = declaration.split(/\s*:\s*/);
          styleArray.push([selector, prop, isNaN(Number(val)) ? val : Number(val).toString()]);
        }
      });
    });
  }
  return styleArray;
}
export function convertCssToTailwind(css: string){
  return TwMapper().convertCssToTailwind(css);
}
export async function convertTailwindToCss(twStyle: TTailwindStyle[]){
  return await TwMapper().convertTailwindToCss(twStyle);
}
export async function optimizeCss(css: string): Promise<string> {
  try {
    const result = await cssnano().process(css, { from: undefined });
    return result.css
  } catch(error: any){
    throw new Error(error);
  }
}