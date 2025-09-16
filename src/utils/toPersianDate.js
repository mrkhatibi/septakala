export function toPersianDate(isoDate) {
  const date = new Date(isoDate);

  // تبدیل به تاریخ شمسی
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const persianDate = new Intl.DateTimeFormat('fa-IR', options).format(date);

  // ساعت و دقیقه
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${persianDate} ساعت ${hours}:${minutes}`;
}

