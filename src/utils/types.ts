import { Control, FieldErrors } from "react-hook-form";

/**
 * Задание
 *
 * @typedef {TaskType}
 * @property {string} name - имя задания
 * @property {string} description - описание задания
 * @property {string} expiration_date - дедлайн задания
 * @property {number} points - кол-во баллов за выполнение
 */
type TaskType = {
  name: string;
  description: string;
  expiration_date: string;
  points: number;
};

/**
 * Ниша
 *
 * @typedef {NicheType}
 * @property {string} name - имя ниши
 * @property {string} description - описание ниши
 * @property {TaskType | Record<string, never>} task - задание, прикрепленное к нише (ниша может не иметь задания)
 */
type NicheType = {
  name: string;
  description: string;
  task: TaskType | Record<string, never>;
};

/**
 * Активность
 *
 * @typedef {ActivityType}
 * @property {string} name - имя активности
 * @property {string} description - описание активности
 * @property {number} reward - награда (рублей) за активность
 * @property {number} prizes_number - кол-во призовых мест
 */
type ActivityType = {
  name: string;
  description: string;
  reward: number;
  prizes_number: number;
};

/**
 * Результирующий объект
 *
 * @export
 * @typedef {ResultDataType}
 * @property {ActivityType} activity - активность
 * @property {NicheType[]} niches - ниши
 */
export type ResultDataType = {
  activity: ActivityType;
  niches: NicheType[];
};

/**
 * Поля формы
 *
 * @export
 * @typedef {ActivityFormType}
 */
export type ActivityFormType = {
  main_activity_emoji: string;
  main_activity_name: string;
  main_activity_description: string;
  niche_name_1: string;
  niche_description_1: string;
  niche_name_2: string;
  niche_description_2: string;
  niche_name_3: string;
  niche_description_3: string;
  activity_task_name_niche_1: string;
  activity_task_description_niche_1: string;
  activity_task_date_niche_1: Date;
  activity_task_points_amount_niche_1: number;
  activity_task_name_niche_2: string;
  activity_task_description_niche_2: string;
  activity_task_date_niche_2: Date;
  activity_task_points_amount_niche_2: number;
  activity_task_name_niche_3: string;
  activity_task_description_niche_3: string;
  activity_task_date_niche_3: Date;
  activity_task_points_amount_niche_3: number;
  reward: number;
  prizes_number: number;
};

/**
 * Пропсы вложенных форм
 *
 * @export
 * @typedef {NestedFormPropsType}
 */
export type NestedFormPropsType = {
  control: Control<ActivityFormType>;
  errors: FieldErrors<ActivityFormType>;
  id: "1" | "2" | "3";
};
