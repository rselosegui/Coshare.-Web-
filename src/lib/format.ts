export const formatCurrency = (amount: number, language: 'EN' | 'AR' = 'EN', currency: string = 'AED') => {
  const formatter = new Intl.NumberFormat(language === 'AR' ? 'ar-AE' : 'en-AE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
};
