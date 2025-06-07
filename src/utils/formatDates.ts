export const transformToColombiaTime = (date: Date): string => {
  const colombiaOffset = -5 * 60; // UTC-5 en minutos

  // Convierte la fecha actual a UTC
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;

  // Aplica el desfase horario de Colombia
  const colombiaDate = new Date(utc + colombiaOffset * 60 * 1000);

  // Formatea como YYYY-MM-DDTHH:MM para input datetime-local
  const formatted = colombiaDate.toISOString().slice(0, 16);

  return formatted;
};