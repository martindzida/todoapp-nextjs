const useFromatDate = (date: Date): string => {
  const [year, month, day] = date.toString().split('T')[0].split('-');
  return `${day}. ${month}. ${year}`;
};

export default useFromatDate;

