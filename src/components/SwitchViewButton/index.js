export default function SwitchViewButton({ isMapView, onToggle }) {
  return (
    <>
      <button
        className="btn text-sm rounded-full bg-black py-2 px-3 mx-2"
        onClick={onToggle}
      >
        {isMapView ? "List view" : "Map view"}
      </button>
    </>
  );
}
