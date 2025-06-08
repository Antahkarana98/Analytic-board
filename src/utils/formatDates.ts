
// Funcion para formatear la fecha a colombia
export const transformToColombiaTime = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const dateStr = date.toLocaleString('es-CO', options);

  const [datePart, timePart] = dateStr.split(', ');
  const [day, month, year] = datePart.split('/');

  return `${year}-${month}-${day}T${timePart}`;
};

// Funcion para formatear las fechas en el html
export const formatDateHtml = (date: string): string => {
  const formatted = new Date(date).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  return formatted;
};