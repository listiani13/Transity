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
  name: string,
  date: string,
  route: RouteData,
};
export type DataTripDB = Array<TripDB>;
