// Функция для подсчета эмоджи в строке
export const countEmojis = (str: string, regex: RegExp): number => {
  return Array.from(str.matchAll(regex)).length;
};
