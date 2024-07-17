#!/usr/bin/env node

import { convertArrayToCss, convertCssToArray } from "../css";
import { TStyle, TTailwindStyle } from "../types";

export function TwMapper(){
  /**
   * PRIVATE
   */

  // Alias resolution, e.g. 'mt' = 'margin-top'
  const twAlias = new Map();
  
  /**
   * Spacing > Padding
   * @todo Support: px, py, ...
   */
  twAlias.set("p", "padding");
  twAlias.set("pb", "padding-bottom");
  twAlias.set("pl", "padding-left");
  twAlias.set("pr", "padding-right");
  twAlias.set("pt", "padding-top");
  
  /**
   * Spacing > Margin
   * @todo Support: mx, my, ...
   */
  twAlias.set("m", "margin");
  twAlias.set("mb", "margin-bottom");
  twAlias.set("ml", "margin-left");
  twAlias.set("mr", "margin-right");
  twAlias.set("mt", "margin-top");

  // Fully mappable conversions like 'text-center' = 'text-align: center'
  const twMap = new Map();
  
  /**
   * Typography > Text Align
   */
  twMap.set("text-center", ["text-align", "center"]);
  twMap.set("text-end", ["text-align", "end"]);
  twMap.set("text-justify", ["text-align", "justify"]);
  twMap.set("text-left", ["text-align", "left"]);
  twMap.set("text-right", ["text-align", "right"]);
  twMap.set("text-start", ["text-align", "start"]);

  function convertCssToTailwind(css: string){
    const styleArray = convertCssToArray(css);
    return convertArrayToTailwind(styleArray);
  }
  function convertArrayToTailwind(styleArray: TStyle[]){
    console.log("convertArrayToTailwind: Under active development.");
    const twStyleArray: TTailwindStyle[] = [];

    /** @todo */

    return twStyleArray;
  }
  function convertTailwindToArray(twStyles: TTailwindStyle[]){
    const styleArray: TStyle[] = [];

    twStyles.forEach(([htmlElement, twStyles])=> {
      twStyles.split(" ").forEach((twStyle) => {
        /** @todo Support responsive classes or everything with a ':' before first '-' */
        const twAbbr = twStyle.split("-")[0];
        const directlyMapped = twMap.get(twStyle);

        if(!directlyMapped) {
          console.log(`Not directly mappable: ${twStyle}`);
          const alias = twAlias.get(twStyle);
          
          return alias
            ? console.log(`Alias found for ${twStyle}: ${alias} and ready to be used very soon.`)
            : console.log(`Alias for ${twStyle} not in twAlias map yet.`);
        }

        const [property, value] = directlyMapped;
        const style: TStyle = [htmlElement, property, value];
        styleArray.push(style);
      })
    });

    return styleArray;
  }
  async function convertTailwindToCss(twStyles: TTailwindStyle[]){
    const styleArray = convertTailwindToArray(twStyles);

    return await convertArrayToCss(styleArray);
  }

  /**
   * PUBLIC
   */
  return {
    convertCssToTailwind,
    convertArrayToTailwind,
    convertTailwindToCss,
    convertTailwindToArray
  };
}