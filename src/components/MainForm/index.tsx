import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormatTextArea from "../FormatTextArea";
import "./form.css";
import Title from "../Title";
import NicheForm from "../NicheForm";
import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

// Валидатор для эмоджи
const emojiRegex =
  /(?:\p{Emoji}|\p{Emoji_Presentation}|\p{Extended_Pictographic}){1}/gu;

// Функция для подсчета эмоджи в строке
const countEmojis = (str: any) => {
  return [...str.matchAll(emojiRegex)].length;
};

const schema = yup.object().shape({
  main_activity_emoji: yup
    .string()
    .matches(emojiRegex, "Только эмоджи")
    .required("Обязательное поле")
    .test(
      "max-emoji",
      "Должен быть 1 эмоджи",
      (value) => countEmojis(value) <= 1
    ),
  main_activity_name: yup.string().required("Обязательное поле"),
  main_activity_description: yup.string().required("Обязательное поле"),
  niche_name_1: yup.string().required("Обязательное поле"),
  niche_description_1: yup.string().required("Обязательное поле"),
  niche_name_2: yup.string().required("Обязательное поле"),
  niche_description_2: yup.string().required("Обязательное поле"),
  niche_name_3: yup.string().required("Обязательное поле"),
  niche_description_3: yup.string().required("Обязательное поле"),
  reward: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),
  places_count: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),
});

let options = {
  inlineStyles: {
    SPOILER: {
      element: "span",
      attributes: { class: "tg-spoiler" },
    },
  },
};

const MainForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const parseFormattedTextField = (field: string) => {
    const rawContent = JSON.parse(field);
    const contentState = convertFromRaw(rawContent);
    const htmlContent = stateToHTML(contentState, options);
    return htmlContent;
  };
  const onSubmit = (data: any) => {
    const finalData = {
      ...data,
      niche_description_1: parseFormattedTextField(data.niche_description_1),
      niche_description_2: parseFormattedTextField(data.niche_description_2),
      niche_description_3: parseFormattedTextField(data.niche_description_3),
      main_activity_description: parseFormattedTextField(
        data.main_activity_description
      ),
    };
    console.log(finalData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <Title title="Название активности" />
      <div className="form-input_title">
        <Controller
          name="main_activity_emoji"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="form-input_container__emoji">
              <input
                className="form-input form-input_emoji"
                type="text"
                {...field}
                placeholder="?"
              />
              {errors.main_activity_emoji ? (
                <p className="error">{errors.main_activity_emoji?.message}</p>
              ) : (
                <p className="error"></p>
              )}
            </div>
          )}
        />
        <Controller
          name="main_activity_name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <div className="form-input_container">
              <input
                className="form-input"
                type="text"
                {...field}
                placeholder="Название активности"
              />
              {errors.main_activity_name ? (
                <p className="error">{errors.main_activity_name?.message}</p>
              ) : (
                <p className="error"></p>
              )}
            </div>
          )}
        />
      </div>
      <Title title="Описание активности" />
      <Controller
        name="main_activity_description"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <FormatTextArea value={field.value} onChange={field.onChange} />
            {errors.main_activity_description ? (
              <p className="error">
                {errors.main_activity_description?.message}
              </p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <NicheForm control={control} errors={errors} id={1} />
      <NicheForm control={control} errors={errors} id={2} />
      <NicheForm control={control} errors={errors} id={3} />
      <Title title="Призовой фонд (в рублях)" />
      <Controller
        name="reward"
        control={control}
        render={({ field }) => (
          <div>
            <input
              className="form-input"
              type="number"
              {...field}
              placeholder="Награда (в рублях)"
            />
            {errors.reward ? (
              <p className="error">{errors.reward?.message}</p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="Количество призовых мест" />
      <Controller
        name="places_count"
        control={control}
        render={({ field }) => (
          <div>
            <input
              className="form-input"
              type="number"
              {...field}
              placeholder="Количество мест"
            />
            {errors.places_count ? (
              <p className="error">{errors.places_count?.message}</p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default MainForm;
