"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { type TimeWindow, type Status, demoSites, URGENCY_MAP } from "./mapData";

/* ─── marker config — all radius 10, fillOpacity 0.9 ───────────────────────── */
const MARKER_CONFIG: Record<Status, { fillColor: string }> = {
  urgent: { fillColor: "#ef4444" },
  soon:   { fillColor: "#f97316" },
  ok:     { fillColor: "#22c55e" },
};

const STATUS_LABEL: Record<Status, string> = {
  urgent: "דחוף לאיסוף",
  soon:   "בקרוב",
  ok:     "תקין",
};

const STATUS_BG: Record<Status, string> = {
  urgent: "rgba(239,68,68,0.12)",
  soon:   "rgba(249,115,22,0.12)",
  ok:     "rgba(34,197,94,0.12)",
};

/* ─── fly-to targets per time window ───────────────────────────────────────── */
const FLY_TARGETS: Record<TimeWindow, { center: [number, number]; zoom: number }> = {
  "היום":      { center: [32.11,  34.85], zoom: 11 },
  "מחר":       { center: [32.00,  34.78], zoom: 10 },
  "שבוע הבא": { center: [32.178, 34.91], zoom: 12 },
};

/* ─── MapController — zoom control + flyTo on window change ────────────────── */
function MapController({ activeWindow }: { activeWindow: TimeWindow }) {
  const map = useMap();

  // Add zoom control at bottom-left on mount
  useEffect(() => {
    L.control.zoom({ position: "bottomleft" }).addTo(map);
  }, [map]);

  // Fly to the focal area whenever the time window changes
  useEffect(() => {
    const { center, zoom } = FLY_TARGETS[activeWindow];
    map.flyTo(center, zoom, { animate: true, duration: 1.5 });
  }, [activeWindow, map]);

  return null;
}

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

      <MapController activeWindow={activeWindow} />

      {demoSites.map((site) => {
        const status = URGENCY_MAP[activeWindow][site.id];
        const { fillColor } = MARKER_CONFIG[status];
        return (
          <CircleMarker
            key={site.id}
            center={[site.lat, site.lng]}
            radius={10}
            pathOptions={{
              fillColor,
              fillOpacity: 0.9,
              color: "#fff",
              weight: 2,
            }}
          >
            <Popup className="freshmor-popup">
              <div dir="rtl" style={{ textAlign: "right", minWidth: "170px", fontFamily: "inherit" }}>
                <p style={{ fontWeight: "bold", marginBottom: "6px", color: "#0D2B4E", fontSize: "13px", lineHeight: 1.3 }}>
                  {site.name}
                </p>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "1px" }}>{site.address}</p>
                <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "8px" }}>{site.equipment}</p>
                {/* Colored status badge */}
                <span style={{
                  display: "inline-block",
                  padding: "2px 10px",
                  borderRadius: "20px",
                  backgroundColor: STATUS_BG[status],
                  color: fillColor,
                  fontSize: "11px",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}>
                  {STATUS_LABEL[status]}
                </span>
                <p style={{ fontSize: "11px", color: "#16B7E8", fontWeight: 500, margin: 0 }}>
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
