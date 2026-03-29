"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { type TimeWindow, type Status, demoSites, URGENCY_MAP } from "./mapData";

/* ─── marker config ─────────────────────────────────────────────────────────── */
const MARKER_CONFIG: Record<Status, { fillColor: string; radius: number }> = {
  urgent: { fillColor: "#ef4444", radius: 10 },
  soon:   { fillColor: "#f97316", radius: 8  },
  ok:     { fillColor: "#22c55e", radius: 7  },
};

const STATUS_LABEL: Record<Status, string> = {
  urgent: "דחוף לאיסוף",
  soon:   "בקרוב",
  ok:     "תקין",
};

/* ─── component ─────────────────────────────────────────────────────────────── */
interface MapInnerProps {
  activeWindow: TimeWindow;
}

export default function MapInner({ activeWindow }: MapInnerProps) {
  return (
    <MapContainer
      center={[32.08, 34.85]}
      zoom={11}
      zoomControl={false}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {demoSites.map((site) => {
        const status = URGENCY_MAP[activeWindow][site.id];
        const { fillColor, radius } = MARKER_CONFIG[status];
        return (
          <CircleMarker
            key={site.id}
            center={[site.lat, site.lng]}
            radius={radius}
            pathOptions={{
              fillColor,
              fillOpacity: 0.9,
              color: "white",
              weight: 2,
            }}
          >
            <Popup>
              <div dir="rtl" style={{ textAlign: "right", minWidth: "160px", fontFamily: "inherit" }}>
                <p style={{ fontWeight: "bold", marginBottom: "4px", color: "#0D2B4E", fontSize: "13px" }}>
                  {site.name}
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "2px" }}>{site.address}</p>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "6px" }}>{site.equipment}</p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{
                    display: "inline-block", width: "8px", height: "8px",
                    borderRadius: "50%", backgroundColor: fillColor, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: "11px", fontWeight: 600, color: fillColor }}>
                    {STATUS_LABEL[status]}
                  </span>
                </div>
                <p style={{ fontSize: "11px", color: "#16B7E8", marginTop: "4px", fontWeight: 500 }}>
                  ביקור הבא: {site.nextVisit}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
