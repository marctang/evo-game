// WorldMap.jsx
import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

// Computed once, not on every render
const countries = feature(worldData, worldData.objects.countries);

const MARKER_COLOR = "#e11d48"; // rose-600

function Label({ text }) {
  // Rough width estimate so the label background fits the text
  const width = Math.max(40, text.length * 6.4 + 14);
  return (
    <g transform="translate(0,-14)" pointerEvents="none">
      <rect
        x={-width / 2}
        y={-14}
        width={width}
        height={18}
        rx={9}
        fill="#0f172a"
        opacity={0.9}
      />
      <text
        textAnchor="middle"
        y={-1}
        style={{ fontFamily: "Inter, system-ui, sans-serif", fill: "#fff", fontSize: "11px", fontWeight: 500 }}
      >
        {text}
      </text>
    </g>
  );
}

/**
 * mode="dataset": many small clickable points, name shown on hover/focus.
 * mode="single": one highlighted point with its name always shown.
 * The map fills its parent: give the parent a height.
 */
export default function WorldMap({ mode, markers = [], onMarkerClick }) {
  const isDataset = mode === "dataset";
  const isSingle = mode === "single";
  const [active, setActive] = useState(null);

  const clickable = isDataset && Boolean(onMarkerClick);
  const activeMarker = markers.find((m) => m.glottocode === active);

  return (
    <div className="w-full h-full">
      <ComposableMap
        projection="geoEqualEarth"
        viewBox="-40 0 880 450"
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={countries}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#e8ece6"
                stroke="#c2c8c2"
                strokeWidth={0.5}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                  pressed: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {markers.map((marker) => {
          const isActive = active === marker.glottocode;
          return (
            <Marker
              key={marker.glottocode}
              coordinates={[marker.longitude, marker.latitude]}
              onMouseEnter={isDataset ? () => setActive(marker.glottocode) : undefined}
              onMouseLeave={isDataset ? () => setActive(null) : undefined}
              onFocus={isDataset ? () => setActive(marker.glottocode) : undefined}
              onBlur={isDataset ? () => setActive(null) : undefined}
              onClick={clickable ? () => onMarkerClick(marker.glottocode) : undefined}
              onKeyDown={
                clickable
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onMarkerClick(marker.glottocode);
                      }
                    }
                  : undefined
              }
              tabIndex={clickable ? 0 : undefined}
              role={clickable ? "link" : undefined}
              aria-label={marker.label}
              style={{
                default: { outline: "none", cursor: clickable ? "pointer" : "default" },
                hover: { outline: "none" },
                pressed: { outline: "none" },
              }}
            >
              {/* larger invisible hit area for touch / mouse */}
              {isDataset && <circle r={10} fill="transparent" />}
              <circle
                r={isDataset ? (isActive ? 6.5 : 4.5) : 7}
                fill={MARKER_COLOR}
                fillOpacity={isDataset ? (isActive ? 1 : 0.75) : 1}
                stroke="#ffffff"
                strokeWidth={isSingle ? 2.5 : 1}
                style={{ transition: "all 0.15s ease-out" }}
              />
              {isSingle && marker.label && <Label text={marker.label} />}
            </Marker>
          );
        })}

        {/* Hover label drawn last so it sits above every point */}
        {isDataset && activeMarker && (
          <Marker coordinates={[activeMarker.longitude, activeMarker.latitude]}>
            <Label text={activeMarker.label} />
          </Marker>
        )}
      </ComposableMap>
    </div>
  );
}
