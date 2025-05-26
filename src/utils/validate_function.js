import { checkUsernameAPI } from "../api/api";

export function validateEmailFormat(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export function validatePasswordFormat(pwd) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/;
  return regex.test(pwd);
};

export function validateNameFormat(name) {

  // 1. 擴充羅馬字
  const regex = /^[A-Za-z0-9ⁿ\u00C0-\u00FF\u0100-\u017F\u0300-\u036F\-_]{5,20}$/
  // 2. 使用 Intl.Segmenter 數「顯示的字數」
  function countGraphemes(name) {
    const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(name)).length;
  }
  // 3. 檢查合法性與長度
  function isValidTaiLoInput(name) {
    if (!regex.test(name)) return false;
    const graphemeCount = countGraphemes(name);
    return graphemeCount >= 5 && graphemeCount <= 10;
  }
  return isValidTaiLoInput(name)

  //簡單版英數字
  //const regex = /^[a-zA-Z0-9-_]{5,20}$/
  //return regex.test(name)
};


export async function validateNameUnique(name) {
  try {
    const res = await fetch(checkUsernameAPI(name), {
      method: 'GET',
      credentials: 'include'
    })
    const resData = await res.json()
    if (res.ok && resData.data) {
      return true
    } else {
      return false
    }
  } catch (err) {
    alert('驗證錯誤: ' + err.message)
    return false
  }
}