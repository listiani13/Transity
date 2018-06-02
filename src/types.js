// @flow

export type DestDatum = {
  placeName: string,
  placeDesc: string,
  travelTime?: ?number,
};
export type RouteData = Array<DestDatum>;
export type TripDatum = {
  id: string,
  title: string,
  isOpen: boolean,
  sight: number,
  route: RouteData,
};

export type TripDB = {
  username: string,
  routeData: {
    name: string,
    date: string,
    routeList: RouteData,
  },
};
export type DataTripDB = Array<TripDB>;
