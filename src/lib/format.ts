function locale(language: string) {
  return language === "ar" ? "ar-EG" : "en-EG";
}

export function formatPrice(amount: number, language: string) {
  return new Intl.NumberFormat(locale(language), {
    style: "currency",
    currency: "EGP",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string, language: string) {
  return new Intl.DateTimeFormat(locale(language), {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}
