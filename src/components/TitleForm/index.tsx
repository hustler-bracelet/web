import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Валидатор для эмоджи
const emojiRegex = /\p{Emoji_Presentation}/u;
const schema = yup.object().shape({
  emoji: yup
    .string()
    .matches(emojiRegex, "Только эмоджи")
    .required("Обязательное поле"),
  // .max(1, "Должен быть 1 эмоджи"),
  text: yup.string().required("Обязательное поле"),
});

export function TitleForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="emoji"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div>
            <input type="text" {...field} />
            {errors.emoji && <p>{errors.emoji?.message}</p>}
          </div>
        )}
      />
      <Controller
        name="text"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div>
            <input type="text" {...field} />
            {errors.text && <p>{errors.text?.message}</p>}
          </div>
        )}
      />
      {/* <button type="submit">Отправить</button> */}
    </form>
  );
}
