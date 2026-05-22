import { externalHandoffs } from "~/data/external-handoffs";

export const officialRoadLinks = {
  smartway: externalHandoffs.smartway.url,
  smartwayRegion1Cameras: "https://smartway.tn.gov/traffic/text/region/1/cameras/route/I-81",
  tn511: externalHandoffs.tn511.url,
} as const;

export const officialLakeLinks = {
  boone: "https://www.tva.com/environment/lake-levels/boone",
  southHolston: "https://www.tva.com/environment/lake-levels/south-holston",
  fortPatrickHenry: "https://www.tva.com/environment/lake-levels/fort-patrick-henry",
} as const;
