import menuKeyboardName from "./menu.keyboard-name.js";
import languageKeyboardName from "./language.keyboard-name.js";
import { readFileCustom } from "../helpers/read-helper.js";

const allCenters = readFileCustom("centers.json");

const result = [];

for (let i = 0; i < allCenters.length; i += 2) {
  let centersList = [];
  if (allCenters[i]) {
    centersList.push(
      {
        text: allCenters[i]?.name,
      },
      {
        text: allCenters[i + 1]?.name,
      }
    );
  }
  result.push(centersList.filter((e) => e.text));
}

result.push([
  {
    text: languageKeyboardName.backUz,
  },
]);

export const keyboards = {
  menuUz: [
    [menuKeyboardName.registerUz],
    [menuKeyboardName.branchesUz, menuKeyboardName.contactUz],
    [menuKeyboardName.backLangUz],
  ],
  menuRu: [
    [menuKeyboardName.registerRu],
    [menuKeyboardName.branchesRu, menuKeyboardName.contactRu],
    [menuKeyboardName.backLangRu],
  ],
  menuEng: [
    [menuKeyboardName.registerEng],
    [menuKeyboardName.branchesEng, menuKeyboardName.contactEng],
    [menuKeyboardName.backLangEng],
  ],
  lang: [
    [languageKeyboardName.uz, languageKeyboardName.ru],
    [languageKeyboardName.eng],
  ],
  centers: result,
};
