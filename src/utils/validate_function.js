
export function validateEmailFormat(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export function validatePasswordFormat(pwd) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
  return regex.test(pwd);
};

export function validateNameFormat(name) {
  const regex = /^[a-zA-Z0-9-_]{5,20}$/
  return regex.test(name)
};