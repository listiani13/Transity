// @flow
/* eslint-disable no-undef */
import type {StyleObj} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

declare type StyleSet = StyleObj | Object | Array<StyleObj | Object>;

declare type Action = {type: string, payload: mixed};

declare type Dispatch = (action: Action) => void;

declare type NavigationState = {
  index: number,
  key: string,
  routes: Array<NavigationRoute | (NavigationRoute & NavigationState)>,
};

declare type NavigationRoute = {
  key: string,
  routeName: string,
  path?: string,
  params?: NavigationParams,
};

declare type NavigationParams = {
  [key: string]: mixed,
};

declare type NavigationAction =
  | {
      type: 'Navigation/NAVIGATE',
      routeName: string,
      key?: string,
    }
  | {
      type: 'Navigation/BACK',
      key: string,
    };

declare type NavigateFunction = (
  routeName: string,
  params?: NavigationParams,
  action?: NavigationAction,
) => void;

declare type Navigation = {
  goBack: () => void,
  navigate: NavigateFunction,
  setParams: (param: NavigationParams) => boolean,
  state: NavigationState,
};

declare type NavigationObject = Navigation & {
  state: NavigationState,
  dispatch: Dispatch,
  index: number,
};
