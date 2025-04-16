"use client";

import styles from "./Map.module.css";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function PostsMapView({ filteredData }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [markersData, setMarkersData] = useState([]);

  useEffect(() => {
    const fetchAllCoordinates = async () => {
      if (!filteredData || filteredData.lenght === 0) return;

      const results = await Promise.all(
        filteredData.map(async (post) => {
          const address = `${post.address}, ${post.zipcode} ${post.city}, ${post.country}`;
          const res = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
              address
            )}.json?access_token=${mapboxgl.accessToken}`
          );
          const data = await res.json();
          const coordinates = data.features?.[0]?.center;
          if (coordinates) {
            return { ...post, coordinates };
          }
          return null;
        })
      );
      const validResult = results.filter(Boolean);
      setMarkersData(validResult);
    };

    fetchAllCoordinates();
  }, [filteredData]);

  useEffect(() => {
    if (!mapContainer.current || markersData.length === 0) return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: markersData[0].coordinates,
        zoom: 10,
      });
    }
    markersData.forEach((post) => {
      new mapboxgl.Marker()
        .setLngLat(post.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${post.title}</h3><p>${post.address}, ${post.zipcode} ${post.city}, ${post.country}</p>`
          )
        )
        .addTo(mapRef.current);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [markersData]);

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
