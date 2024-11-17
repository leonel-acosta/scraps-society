import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map from "@/components/Map";

const INITIAL_CENTER = [
  -74.0242,

  40.6941,
];

const INITIAL_ZOOM = 10.12;

export default function MapContainer() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  const [center, setCenter] = useState(INITIAL_CENTER);

  const [zoom, setZoom] = useState(INITIAL_ZOOM);

  useEffect(() => {
    (mapboxgl.accessToken =
      "pk.eyJ1IjoibGVvbmVsLWFjb3N0YSIsImEiOiJjbTM3ZjZzbDgwZW5yMmtzNWpjbXZkZHQwIn0.kzsc-czJRtGccjq1JyW6Wg"),
      (mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: center,
        zoom: zoom,
      }));

    mapRef.current.on("move", () => {
      const mapCenter = mapRef.current.getCenter();

      const mapZoom = mapRef.current.getZoom();

      setCenter([mapCenter.lng, mapCenter.lat]);

      setZoom(mapZoom);
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center: INITIAL_CENTER,

      zoom: INITIAL_ZOOM,
    });
  };
  return (
    <>
      <p>Map</p>
      <div className="sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
        Zoom: {zoom.toFixed(2)}
      </div>
      <button className="reset-button bg-primary" onClick={handleButtonClick}>
        RESET LOCATION
      </button>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}
