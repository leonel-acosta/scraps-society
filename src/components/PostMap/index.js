"use client";

import styles from "./Map.module.css";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function PostMap({ post }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (post.lngLat && mapContainer.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [post.lngLat[0], post.lngLat[1]],
        zoom: 12,
        scrollZoom: false,
      });
      new mapboxgl.Marker()
        .setLngLat([post.lngLat[0], post.lngLat[1]])
        .addTo(mapRef.current)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${post.title}</h3><p>${post.address}</p>`
          )
        );
    }
  }, [post.lngLat]);

  return (
    <>
      <div className="section text-center rounded-md text-black centered">
        <div
          ref={mapContainer}
          style={{ height: "500px", width: "100%" }}
        ></div>
      </div>
    </>
  );
}
