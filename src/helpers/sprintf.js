// @flow
export default function sprintf(number: string | number) {
  let formattedNumber = ('0' + String(number)).slice(-2);
  return formattedNumber;
}
