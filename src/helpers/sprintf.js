// @flow
export default function sprintf(number: string | number) {
  let formattedNumber = ('0' + number).slice(-2);
  return formattedNumber;
}
