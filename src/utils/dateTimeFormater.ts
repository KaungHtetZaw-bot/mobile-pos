export const dateTimeFormater = (dateTime: Date | string | null | undefined, to: 'date' | 'time' | '' = '') => {
  if (!dateTime) return "N/A";
  
  const dateObj = new Date(dateTime);

  if (isNaN(dateObj.getTime())) return "N/A";

  if (to === 'date') {
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  if (to === 'time') {
    return dateObj.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

  return dateObj.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};