/**
 * Place-level statistics for About Ikeduru.
 *
 * Every figure carries a named source. Nigerian census figures are
 * contested nationally — we publish the official 2006 census count and
 * the commonly cited 2022 projection, with the caveat that projections
 * apply a uniform state growth rate.
 */

export type PlaceStatistic = {
  id: string;
  value: string;
  /** Message key under aboutIkeduru for the label */
  labelKey: string;
  /** Message key under aboutIkeduru for the source line */
  sourceKey: string;
};

export const placeStatistics: PlaceStatistic[] = [
  {
    id: "area",
    value: "176.5 km²",
    labelKey: "statArea",
    sourceKey: "statSrcArea",
  },
  {
    id: "census-2006",
    value: "149,737",
    labelKey: "statCensus2006",
    sourceKey: "statSrcCensus",
  },
  {
    id: "proj-2022",
    value: "208,100",
    labelKey: "statProj2022",
    sourceKey: "statSrcProj",
  },
  {
    id: "wards",
    value: "12",
    labelKey: "statWards",
    sourceKey: "statSrcWards",
  },
  {
    id: "communities",
    value: "29",
    labelKey: "statCommunities",
    sourceKey: "statSrcCommunities",
  },
  {
    id: "created",
    value: "1989",
    labelKey: "statCreated",
    sourceKey: "statSrcCreated",
  },
];
