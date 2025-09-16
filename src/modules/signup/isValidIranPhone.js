function isValidIranPhone(number) {
  const str = number.toString();
  const phoneRegex = /^09\d{9}$/;
  return phoneRegex.test(str);
}

export {isValidIranPhone}
