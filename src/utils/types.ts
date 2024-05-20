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
export type NicheType = {
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

export type NicheFormType = {
  niche_name: string;
  niche_description: string;
  activity_task_name: string;
  activity_task_description: string;
  activity_task_date: Date;
  activity_task_points_amount: number;
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
  niches?: NicheFormType[];
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
  id: number;
};
