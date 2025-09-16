function formatRial(number) {
  const persianDigits = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];

  // جدا کردن سه‌رقمی
  let formatted = number.toLocaleString('en-US');

  // تبدیل همه‌ی اعداد به فارسی
  formatted = formatted.replace(/\d/g, d => persianDigits[d]);

  return formatted + ' ریال';
}

function productSlicer(name) {
  
 const parts = name.trim().split(/\s+/);
   if (parts.length <= 5) {
    return name.trim()
  }
  // گرفتن سه کلمه‌ی اول
  const shortParts = parts.slice(0, 5);
  
  // برگردوندن دوباره به صورت رشته
  return shortParts.join(' ')+ "...";

}


export {formatRial , productSlicer}
