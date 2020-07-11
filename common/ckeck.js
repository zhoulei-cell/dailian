export const checkMoney = (money) => {
  const reg = /^(?:0\.\d{0,1}[1-9]|(?!0)\d{1,6}(?:\.\d{0,1}[1-9])?)$/;
  return reg.test(money);
}

export const checkQQ = (qq) => {
  const reg = /^[1-9]\d{4,9}$/;
  return reg.test(qq);
}

export const checkPhone = (phone) => {
  const reg = /^1[3-9]\d{9}$/;
  return reg.test(phone);
}

export const checkLength = (value,length = 5) => {
  return value.length >= length;
}