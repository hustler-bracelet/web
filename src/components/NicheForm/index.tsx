import React from "react";
import { Controller } from "react-hook-form";
import Title from "../Title";
import FormatTextArea from "../FormatTextArea";
import { NestedFormPropsType } from "../../utils/types";

const NicheForm: React.FC<NestedFormPropsType> = ({ control, errors, id }) => {
  const nicheNameKey = `niche_name_${id}` as const;
  const nicheDescriptionKey = `niche_description_${id}` as const;

  return (
    <div className="sub_activity">
      <Title title={`Ниша #${id}`} bold />
      <Title title="Название ниши" />
      <Controller
        name={`niche_name_${id}`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <input
              className="form-input"
              type="text"
              {...field}
              placeholder="Название ниши"
            />
            {errors[nicheNameKey] ? (
              <p className="error">{errors[nicheNameKey]?.message}</p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
      <Title title="Описание ниши" />
      <Controller
        name={`niche_description_${id}`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <div className="form-input_container">
            <FormatTextArea value={field.value} onChange={field.onChange} />
            {errors[nicheDescriptionKey] ? (
              <p className="error">{errors[nicheDescriptionKey]?.message}</p>
            ) : (
              <p className="error"></p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default NicheForm;
