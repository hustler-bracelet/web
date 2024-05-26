import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Title from "../Title";
import NicheForm from "../NicheForm";
import ActivityForm from "../ActivityForm";
import ActivityTaskForm from "../ActivityTaskForm";
import { ActivityFormType, NicheType, ResultDataType } from "../../utils/types";
import { SCHEMA, TELEGRAM } from "../../utils/constants";
import "./mainForm.css";
import { useEffect, useState } from "react";
import { handleFocus, parseFormattedTextField } from "../../utils/tools";
import Button from "../Button";
import * as api from "../../api";
import { Datepicker } from "../Datepicker";

const MainForm = () => {
  const {
    setFocus,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ActivityFormType>({
    resolver: yupResolver(SCHEMA),
    shouldFocusError: false,
  });

  useEffect(() => {
    handleFocus(errors);
  }, [errors, setFocus]);
  const onError = (errors: any, e: any) => console.log("ERRORS: ", errors);
  const [nichesCount, setNichesCount] = useState<number>(0);

  const setFocusOnLastNiche = () => {
    const lastNicheIndex = fields.length - 2;
    if (lastNicheIndex >= 0) {
      const lastNicheInput = document.querySelector(
        `[name="niches.${lastNicheIndex}.niche_name"]`
      ) as HTMLInputElement;
      lastNicheInput?.focus();
    }
  };

  const removeNiche = (index: number) => {
    remove(index);
    setNichesCount((state) => state - 1);
    setTimeout(setFocusOnLastNiche, 1);
  };

  const onSubmit = (data: ActivityFormType) => {
    const {
      main_activity_emoji,
      main_activity_name,
      main_activity_description,
      reward,
      prizes_number,
      activity_deadline,
    } = data;
    const finalData: ResultDataType = {
      activity: {
        name: `${main_activity_emoji} ${main_activity_name}`,
        description: parseFormattedTextField(main_activity_description),
        reward,
        prizes_number,
        activity_deadline: activity_deadline.toISOString(),
      },
      niches:
        data.niches?.map((niche) => {
          const nicheObj: NicheType = {
            name: niche.niche_name,
            description: parseFormattedTextField(niche.niche_description),
            task: {
              name: niche.activity_task_name,
              description: parseFormattedTextField(
                niche.activity_task_description
              ),
              expiration_date: niche.activity_task_date.toISOString(),
              points: niche.activity_task_points_amount,
            },
          };
          return nicheObj;
        }) || [],
    };
    TELEGRAM.showPopup(
      {
        message: "Подтверди отправку формы",
        buttons: [
          {
            id: "submit",
            type: "default",
            text: "Подтвердить",
          },
          {
            id: "cancel",
            type: "cancel",
            text: "Отменить",
          },
        ],
      },
      (buttonId: string) => {
        if (buttonId === "submit") {
          try {
            api.sendData(finalData);
            TELEGRAM.showAlert("Форма успешно отправлена!");
          } catch (e) {
            TELEGRAM.showAlert("Ошибка отправки формы");
            console.error("Submit error: ", e);
          }
        }
      }
    );
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handledSubmit = () => {
    handleSubmit(onSubmit)();
  };

  useEffect(() => {
    // Инициализация mainButton
    TELEGRAM.MainButton.setText("Отправить");
    TELEGRAM.MainButton.show();

    // Обработчик нажатия на mainButton
    TELEGRAM.onEvent("mainButtonClicked", handledSubmit);

    // Убираем mainButton при размонтировании компонента
    TELEGRAM.onEvent("mainButtonClicked", handledSubmit);
    return () => {
      TELEGRAM.offEvent("mainButtonClicked", handledSubmit);
    };
  }, [handledSubmit]);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "niches",
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)} className="form">
        <div className="section">
          <ActivityForm control={control} errors={errors} />
        </div>
        <div className="section">
          <Title title="💵 Призовой фонд (в рублях)" size="sub" />
          <Controller
            name="reward"
            control={control}
            render={({ field }) => (
              <div className="form-input_container">
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
          <Title title="🏆 Количество призовых мест" size="sub" />
          <Controller
            name="prizes_number"
            control={control}
            render={({ field }) => (
              <div className="form-input_container">
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
          <Title title="📅 Дедлайн активности" size="sub" />
          <Controller
            name="activity_deadline"
            control={control}
            render={({ field }) => (
              <Datepicker
                onChange={field.onChange}
                value={field.value}
                name={field.name}
              />
            )}
          />
        </div>
        {fields.map((field, index) => (
          <div className="section" key={field.id}>
            <NicheForm control={control} errors={errors} id={index} />
            <ActivityTaskForm control={control} errors={errors} id={index} />
            <Button
              text="Удалить нишу"
              type="button"
              onClick={() => {
                TELEGRAM && TELEGRAM.HapticFeedback.impactOccurred("light");
                TELEGRAM &&
                  TELEGRAM.showPopup(
                    {
                      message: `Подтверди удаление ниши #${index + 1}`,
                      buttons: [
                        {
                          id: "submit",
                          type: "destructive",
                          text: "Удалить",
                        },
                        {
                          id: "cancel",
                          type: "cancel",
                          text: "Отменить",
                        },
                      ],
                    },
                    (buttonId) => {
                      if (buttonId === "submit") removeNiche(index);
                    }
                  );
                !TELEGRAM && removeNiche(index);
                removeNiche(index);
              }}
            />
          </div>
        ))}
        <div>
          <Title
            title={`⚙️ Количество ниш: ${fields.length}`}
            bold
            size="default"
          />
          {errors.niches ? (
            <p className="error">{errors.niches.message}</p>
          ) : (
            <p className="error"></p>
          )}
        </div>
        <Button
          text="Добавить нишу"
          type="button"
          onClick={() => {
            TELEGRAM && TELEGRAM.HapticFeedback.impactOccurred("light");
            append(
              {
                niche_name: "",
                niche_description: "",
                //@ts-ignore
                activity_task_date: null,
                activity_task_description: "",
                activity_task_name: "",
                //@ts-ignore
                activity_task_points_amount: "",
              },
              {
                focusName: `niches.${nichesCount}.niche_name`,
              }
            );
            setNichesCount((state) => state + 1);
          }}
        />
        <button type="submit" onClick={() => handledSubmit()}>
          submit
        </button>
      </form>
    </div>
  );
};

export default MainForm;
