import { format, parseISO } from 'date-fns';

export const formatDate = (date: Date | string | number, formatStr: string): string => {
  let parsedDate: Date;

  if (date instanceof Date) {
    parsedDate = date;
  } else if (typeof date === 'string') {
    parsedDate = parseISO(date); // Assure que la chaîne est correctement analysée en tant que date
  } else if (typeof date === 'number') {
    parsedDate = new Date(date);
  } else {
    throw new Error('Invalid date type');
  }

  return format(parsedDate, formatStr);
};
