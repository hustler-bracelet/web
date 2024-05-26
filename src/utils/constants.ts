import * as yup from "yup";
import { countEmojis, hasEditorErrors } from "./tools";

export const TELEGRAM = window.Telegram.WebApp;

export const FORMAT_OPTIONS = {
  inlineStyles: {
    SPOILER: {
      element: "span",
      attributes: { class: "tg-spoiler" },
    },
  },
};

// Валидатор для эмоджи
export const EMOJI_REGEX =
  /(?:\p{Emoji}|\p{Emoji_Presentation}|\p{Extended_Pictographic}){1}/gu;

const nicheSchema = yup.object().shape({
  niche_name: yup.string().required("❗️ Обязательное поле"),
  niche_description: yup
    .string()
    .required("❗️ Обязательное поле")
    .test("is-not-empty", "❗️ Обязательное поле", (value) =>
      hasEditorErrors(value)
    ),
  activity_task_name: yup.string().required("❗️ Обязательное поле"),
  activity_task_description: yup
    .string()
    .required("❗️ Обязательное поле")
    .test("is-not-empty", "❗️ Обязательное поле", (value) =>
      hasEditorErrors(value)
    ),
  activity_task_date: yup.date().required("❗️ Обязательное поле"),
  activity_task_points_amount: yup
    .number()
    .typeError("❗️ Должно быть числом")
    .required("❗️ Обязательное поле")
    .min(1, "❗️ Число должно быть больше 0"),
});

//Схема валидации
export const SCHEMA = yup.object().shape({
  // Активность
  main_activity_emoji: yup
    .string()
    .matches(EMOJI_REGEX, "❗️ Только эмоджи")
    .required("❗️ Обязательное поле")
    .test("max-emoji", "Только 1 эмоджи", (value) => countEmojis(value) <= 1),
  main_activity_name: yup.string().required("❗️ Обязательное поле"),
  main_activity_description: yup
    .string()
    .required("❗️ Обязательное поле")
    .test("is-not-empty", "❗️ Обязательное поле", (value) =>
      hasEditorErrors(value)
    ),

  // Призы
  reward: yup
    .number()
    .typeError("❗️ Должно быть числом")
    .required("❗️ Обязательное поле")
    .min(1, "❗️ Число должно быть больше 0"),
  prizes_number: yup
    .number()
    .typeError("❗️ Должно быть числом")
    .required("❗️ Обязательное поле")
    .min(1, "❗️ Число должно быть больше 0"),
  activity_deadline: yup.date().required("❗️ Обязательное поле"),
  // Ниши
  niches: yup
    .array()
    .of(nicheSchema)
    .min(1, "❗️ Должна быть хотя бы одна ниша"),
});
