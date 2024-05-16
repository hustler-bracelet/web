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
  sub_activity_name: yup.string().required("Обязательное поле"),
  sub_activity_description: yup.string().required("Обязательное поле"),
  // number: yup
  //   .number()
  //   .typeError("Должно быть числом")
  //   .required("Обязательное поле"),
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

  const onSubmit = (data: any) => {
    const rawContent = JSON.parse(data.sub_activity_description);
    const contentState = convertFromRaw(rawContent);
    const htmlContent = stateToHTML(contentState, options);
    const finalData = { ...data, sub_activity_description: htmlContent };
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
              {errors.main_activity_emoji && (
                <p>{errors.main_activity_emoji?.message}</p>
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
              {errors.main_activity_name && (
                <p>{errors.main_activity_name?.message}</p>
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
            {errors.main_activity_description && (
              <p>{errors.main_activity_description?.message}</p>
            )}
          </div>
        )}
      />
      {/* <FormatTextArea /> */}
      {/* <Controller
        name="number"
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <div>
            <input type="number" {...field} />
            {errors.number && <p>{errors.number?.message}</p>}
          </div>
        )}
      /> */}
      <NicheForm control={control} errors={errors} id={1} />
      <NicheForm control={control} errors={errors} id={2} />
      <NicheForm control={control} errors={errors} id={3} />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default MainForm;
