"use client";

import styles from "./Map.module.css";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

export default function PostsMapView({ filteredData }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || !filteredData || filteredData.length === 0)
      return;

    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: filteredData[0].coordinates,
        zoom: 10,
      });
    }
    filteredData.forEach((post) => {
      if (Array.isArray(post.lngLat) && post.lngLat.length === 2) {
        new mapboxgl.Marker()
          .setLngLat(post.lngLat)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<h3>${post.title}</h3><p>${post.address}, ${post.zipcode} ${post.city}, ${post.country}</p><a href="/posts/${post._id}">View Post</a>`
            )
          )
          .addTo(mapRef.current);
      }
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [filteredData]);

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
