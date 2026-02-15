import Button from "../Button";

export default function SwitchViewButton({ isMapView, onToggle }) {
  return (
    <>
      <Button
        onClick={onToggle}
        text={isMapView ? "List view" : "Map view"}
      ></Button>
    </>
  );
}
