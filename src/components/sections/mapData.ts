/* Shared data for AssetMapSimulation + MapInner — no Leaflet imports here */

export type TimeWindow = "היום" | "מחר" | "שבוע הבא";
export type Status = "urgent" | "soon" | "ok";

export const demoSites = [
  { id: 1, name: "מרכז קניות ג'י",       address: "פתח תקווה",   lat: 32.094, lng: 34.887, equipment: "מכשיר בישום",       nextVisit: "היום"      },
  { id: 2, name: "מגדל שלום",             address: "תל אביב",     lat: 32.065, lng: 34.773, equipment: "יבשן תעשייתי",      nextVisit: "היום"      },
  { id: 3, name: "בית חולים מאיר",        address: "כפר סבא",     lat: 32.178, lng: 34.906, equipment: "מכשיר טיהור אוויר", nextVisit: "היום"      },
  { id: 4, name: "מרכז לוגיסטיקה",       address: "אשדוד",       lat: 31.804, lng: 34.655, equipment: "לוכד מזיקים",       nextVisit: "מחר"       },
  { id: 5, name: "קניון הזהב",            address: "ראשון לציון", lat: 31.971, lng: 34.789, equipment: "מכשיר בישום",       nextVisit: "מחר"       },
  { id: 6, name: "בית ספר אורט",         address: "גבעתיים",     lat: 32.071, lng: 34.813, equipment: "מכשיר ניטור",       nextVisit: "שבוע הבא"  },
  { id: 7, name: "מרפאת שירותי בריאות",  address: "חולון",       lat: 32.012, lng: 34.779, equipment: "ציוד רפואי",        nextVisit: "שבוע הבא"  },
  { id: 8, name: "מפעל תעשייתי",         address: "רמת גן",      lat: 32.082, lng: 34.823, equipment: "יבשן תעשייתי",      nextVisit: "שבוע הבא"  },
];

export const URGENCY_MAP: Record<TimeWindow, Record<number, Status>> = {
  "היום":      { 1: "urgent", 2: "urgent", 3: "urgent", 4: "soon",   5: "soon",   6: "ok",   7: "ok",   8: "ok"   },
  "מחר":       { 1: "ok",     2: "urgent", 3: "urgent", 4: "urgent", 5: "urgent", 6: "soon", 7: "soon", 8: "soon" },
  "שבוע הבא": { 1: "ok",     2: "ok",     3: "urgent", 4: "ok",     5: "ok",     6: "ok",   7: "ok",   8: "ok"   },
};
