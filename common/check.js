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

export const checkNoThing = (value) => {
  return value !== ""
}

export const checkThing = (value) => {
  return value === ""
}

export const checkLevel = (value) => {
  if (checkThing(value)) {
	  return false
  }
  return value >= 0 && value <= 150
}

export const checkHeroNum = (value) => {
  if (checkThing(value)) {
	  return false
  }
  return value >=0 && value <= 200
}

export const checkDuration = (value) => {
  if (checkThing(value)) {
	  return false
  }
  return value >= 0 && value <= 999999999
}