import { isInteger } from 'cypress/types/lodash';
import { $ } from '../utils/dom.js';

export const getLastWinnginNumbers = () => {
  const lastWinnginNumberList = Array.from(
    document.querySelectorAll('.last-lotto-winning-number-input'),
    number => Number(number.value),
  );
  console.log(lastWinnginNumberList);
  return lastWinnginNumberList;
};

export const checkLastWinnginNumberList = lastWinnginNumberList => {
  if (!isElementsInteger(lastWinnginNumberList)) {
    window.alert('정수값만 입력가능합니다.');
    return;
  }
  if (!isElementsValidRange(lastWinnginNumberList)) {
    window.alert('1~45의 값만 입력가능합니다.');
    return;
  }
  if (!isElementsUnique(lastWinnginNumberList)) {
    window.alert('값이 중복되지 않아야 합니다.');
    return;
  }
  return lastWinnginNumberList;
};

const isElementsInteger = numberList => {
  console.log(numberList.every(number => isInteger(number)));
  return numberList.every(number => isInteger(number));
};

const isElementsValidRange = numberList => {
  console.log(numberList.every(number => number >= 1 && number <= 45));
  return numberList.every(number => number >= 1 && number <= 45);
};

const isElementsUnique = numberList => {
  console.log(numberList.length === new Set(numberList).size);
  return numberList.length === new Set(numberList).size;
};
