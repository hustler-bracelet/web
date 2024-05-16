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
import ActivityForm from "../ActivityForm";
import ActivityTaskForm from "../ActivityTaskForm";
type ResultDataType = {
  activity: {
    name: string;
    description: string;
    reward: number;
    prizes_number: number;
  };
  niches: NicheType[];
};
type NicheType = {
  name: string;
  description: string;
  task: {
    name: string;
    description: string;
    expiration_date: string;
    points: number;
  };
};
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
  activity_task_name_niche_1: yup.string().required("Обязательное поле"),
  activity_task_description_niche_1: yup.string().required("Обязательное поле"),
  activity_date_niche_1: yup.date(),
  activity_task_points_amount_niche_1: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),
  activity_task_name_niche_2: yup.string().required("Обязательное поле"),
  activity_task_description_niche_2: yup.string().required("Обязательное поле"),
  activity_date_niche_2: yup.date(),
  activity_task_points_amount_niche_2: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),
  activity_task_name_niche_3: yup.string().required("Обязательное поле"),
  activity_task_description_niche_3: yup.string().required("Обязательное поле"),
  activity_task_date_niche_3: yup.date(),
  activity_task_points_amount_niche_3: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),
  reward: yup
    .number()
    .typeError("Должно быть числом")
    .required("Обязательное поле"),
  prizes_number: yup
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
    const {
      main_activity_emoji,
      main_activity_name,
      main_activity_description,
      niche_name_1,
      niche_description_1,
      niche_name_2,
      niche_description_2,
      niche_name_3,
      niche_description_3,
      activity_task_name_niche_1,
      activity_task_description_niche_1,
      activity_task_date_niche_1,
      activity_task_points_amount_niche_1,
      activity_task_name_niche_2,
      activity_task_description_niche_2,
      activity_task_date_niche_2,
      activity_task_points_amount_niche_2,
      activity_task_name_niche_3,
      activity_task_description_niche_3,
      activity_task_date_niche_3,
      activity_task_points_amount_niche_3,
      reward,
      prizes_number,
    } = data;

    const finalData: ResultDataType = {
      // ...data,
      activity: {
        name: `${main_activity_emoji} ${main_activity_name}`,
        description: parseFormattedTextField(main_activity_description),
        reward,
        prizes_number,
      },
      niches: [
        {
          name: niche_name_1,
          description: parseFormattedTextField(niche_description_1),
          task: {
            name: activity_task_name_niche_1,
            description: parseFormattedTextField(
              activity_task_description_niche_1
            ),
            expiration_date: activity_task_date_niche_1.toISOString(),
            points: activity_task_points_amount_niche_1,
          },
        },
        {
          name: niche_name_2,
          description: parseFormattedTextField(niche_description_2),
          task: {
            name: activity_task_name_niche_2,
            description: parseFormattedTextField(
              activity_task_description_niche_2
            ),
            expiration_date: activity_task_date_niche_2.toISOString(),
            points: activity_task_points_amount_niche_2,
          },
        },
        {
          name: niche_name_3,
          description: parseFormattedTextField(niche_description_3),
          task: {
            name: activity_task_name_niche_3,
            description: parseFormattedTextField(
              activity_task_description_niche_3
            ),
            expiration_date: activity_task_date_niche_3.toISOString(),
            points: activity_task_points_amount_niche_3,
          },
        },
      ],
      // niche_description_1: parseFormattedTextField(data.niche_description_1),
      // niche_description_2: parseFormattedTextField(data.niche_description_2),
      // niche_description_3: parseFormattedTextField(data.niche_description_3),
      // main_activity_description: parseFormattedTextField(
      //   data.main_activity_description
      // ),
    };
    console.log(finalData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      <ActivityForm control={control} errors={errors} />
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
        name="prizes_number"
        control={control}
        render={({ field }) => (
          <div>
            <input
              className="form-input"
              type="number"
              {...field}
              placeholder="Количество мест"
            />
            {errors.prizes_number ? (
              <p className="error">{errors.prizes_number?.message}</p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <ActivityTaskForm control={control} errors={errors} id={1} />
      <ActivityTaskForm control={control} errors={errors} id={2} />
      <ActivityTaskForm control={control} errors={errors} id={3} />
      <button type="submit">Отправить</button>
    </form>
  );
};

export default MainForm;
