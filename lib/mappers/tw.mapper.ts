#!/usr/bin/env node

import { convertArrayToCss, convertCssToArray } from "../css";
import { TStyle, TTailwindStyle } from "../types";

export function TwMapper(){
  /**
   * Alias resolution, e.g. 'mt' = 'margin-top'
   */
  const twAlias = new Map();
  
   /** Spacing > Padding */
  twAlias.set("p", "padding");
  twAlias.set("pb", "padding-bottom");
  twAlias.set("pl", "padding-left");
  twAlias.set("pr", "padding-right");
  twAlias.set("pt", "padding-top");
  
  /** Spacing > Margin */
  twAlias.set("m", "margin");
  twAlias.set("mb", "margin-bottom");
  twAlias.set("ml", "margin-left");
  twAlias.set("mr", "margin-right");
  twAlias.set("mt", "margin-top");

  /**
   * Fully mappable conversions like 'text-center' = 'text-align: center'
   */
  const twMap = new Map();

  /** Layout > Aspect Ratio */
  twMap.set("aspect-auto", ["aspect-ratio", "auto"])
  twMap.set("aspect-square", ["aspect-ratio", "1 / 1"])
  twMap.set("aspect-video", ["aspect-ratio", "16 / 9"])

  /** Spacing > Padding */
  function getMarginOrPaddingRem(spacing: string){
    if(spacing === "0") return "0";
    if(spacing === "auto") return "auto";
    if(spacing === "none") return "0";

    const ratio = 0.25

    return `${parseInt(spacing) * ratio}rem`;
  }

  /** @todo Spacing > Margin */
  /** @todo Spacing > Space Between */
  
  /** Typography > Text Align */
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
        const [twAbbr,twVal] = twStyle.split("-");
        const directlyMapped = twMap.get(twStyle);

        if(directlyMapped) {
          const [property, value] = directlyMapped;
          const style: TStyle = [htmlElement, property, value];
          return styleArray.push(style);
        }
        
        const alias = twAlias.get(twStyle);

        switch(twAbbr){
          case "p":
          case "pt":
          case "pr":
          case "pb":
          case "pl":
          case "m":
          case "mt":
          case "mr":
          case "mb":
          case "ml":
            const value = getMarginOrPaddingRem(twVal);
            styleArray.push([htmlElement, twAlias.get(twAbbr), value]);
            break;

          default:
            return alias
              ? console.log(`Alias found for ${twStyle}: ${alias} and ready to be used very soon.`)
              : console.log(`Alias for ${twStyle} not in twAlias map yet.`);
        }
      })
    });

    return styleArray;
  }
  async function convertTailwindToCss(twStyles: TTailwindStyle[]){
    const styleArray = convertTailwindToArray(twStyles);

    return await convertArrayToCss(styleArray);
  }

  return {
    convertCssToTailwind,
    convertArrayToTailwind,
    convertTailwindToCss,
    convertTailwindToArray
  };
}