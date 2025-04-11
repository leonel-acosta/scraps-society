"use client";

import styles from "./Map.module.css";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function Map({ post }) {

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

      console.log("map coordinates:", coordinates);
    };

    fetchCoordinates();
  }, []);

  useEffect(() => {
    if (lngLat && mapContainer.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [lngLat.lng, lngLat.lat],
        zoom: 12,
      });
      new mapboxgl.Marker()
        .setLngLat([lngLat.lng, lngLat.lat])
        .addTo(mapRef.current);
    }
  }, [lngLat]);

  return (
    <>
      <div className="section text-center rounded-full bg-white text-black my-5 p-5">
        Map Component
        <div ref={mapContainer} style={{ height: "auto", width: "100%" }}></div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          LIST VIEW
        </button>
      </div>
    </>
  );
}
