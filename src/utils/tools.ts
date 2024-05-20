import { RawDraftContentState, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { FORMAT_OPTIONS } from "./constants";
import { ActivityFormType } from "./types";
import { FieldErrors } from "react-hook-form";

// Функция для подсчета эмоджи в строке
export const countEmojis = (str: string) => {
  const joiner = "\u{200D}";
  const split = str.split(joiner);
  let count = 0;

  for (const s of split) {
    const num = Array.from(s.split(/[\ufe00-\ufe0f]/).join("")).length;
    count += num;
  }

  return count / split.length;
};

export const parseFormattedTextField = (field: string) => {
  const rawContent = JSON.parse(field);
  const contentState = convertFromRaw(rawContent);
  const htmlContent = stateToHTML(contentState, FORMAT_OPTIONS);
  return htmlContent;
};
export function hasEditorErrors(value: string | undefined): boolean {
  if (value === undefined || value.trim() === "") {
    return true;
  }

  try {
    const parsedValue = JSON.parse(value) as RawDraftContentState;
    const text = parsedValue.blocks
      .map((block) => block.text)
      .join("")
      .trim();
    return text.length > 0;
  } catch (e) {
    return false;
  }
}

export const handleFocus = (errors: FieldErrors<ActivityFormType>) => {
  const firstErrorKey = Object.keys(errors)[0] as
    | keyof ActivityFormType
    | undefined;
  if (firstErrorKey) {
    const element = document.querySelector(
      `[name="${firstErrorKey}"]`
    ) as HTMLInputElement | null;
    element?.focus();
  }
  if (firstErrorKey === "niches" && Array.isArray(errors.niches)) {
    if (errors.niches) {
      for (let i = 0; i < errors.niches.length; i++) {
        if (errors.niches[i]) {
          const firstElementKey = Object.keys(errors.niches[i])[0];
          const element = document.querySelector(
            `[name="niches.${i}.${firstElementKey}"]`
          ) as HTMLInputElement | null;
          element?.focus();
          return firstElementKey;
        }
      }
    }
  }
  return firstErrorKey;
};
