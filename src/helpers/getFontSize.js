// @flow

import {
  baseTextStyle,
  POINTER_FONT_SIZE,
  YEAR_FONT_SIZE,
} from '../constants/text';

export default function getFontSize(size?: string) {
  switch (size) {
    case 'SMALL':
      return baseTextStyle.SMALL_FONT_SIZE;
    case 'MEDIUM':
      return baseTextStyle.MEDIUM_FONT_SIZE;
    case 'LARGE':
      return baseTextStyle.LARGE_FONT_SIZE;
    case 'EXTRA_LARGE':
      return baseTextStyle.EXTRA_LARGE_FONT_SIZE;
    case 'YEAR':
      return YEAR_FONT_SIZE;
    case 'POINTER':
      return POINTER_FONT_SIZE;
    case 'DEFAULT':
    default:
      return baseTextStyle.DEFAULT_FONT_SIZE;
  }
}
