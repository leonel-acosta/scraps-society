"use client";

import styles from "./Map.module.css";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function PostMap({ post }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [lngLat, setLngLat] = useState(null);

  const address = `${post.address}, ${post.zipcode} ${post.city}, ${post.country}`;

  useEffect(() => {
    const fetchCoordinates = async () => {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await res.json();
      const coordinates = data.features?.[0]?.center;
      if (coordinates) {
        setLngLat({ lng: coordinates[0], lat: coordinates[1] });
      }
      console.log("geocoding data features", data.features);

      console.log("map coordinates:", coordinates);
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    if (lngLat && mapContainer.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lngLat.lng, lngLat.lat],
        zoom: 12,
        scrollZoom: false,
      });
      new mapboxgl.Marker()
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(mapRef.current)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${post.title}</h3><p>${address}</p>`
          )
        );
    }
  }, [lngLat]);

  return (
    <>
      <div className="section text-center rounded-md text-black my-5 centered">
        <div
          ref={mapContainer}
          style={{ height: "500px", width: "100%" }}
        ></div>
      </div>
    </>
  );
}
