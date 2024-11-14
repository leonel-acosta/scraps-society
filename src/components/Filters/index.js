import Button from "../Button";
import styles from "./Filters.module.css";

export default function Filters({ onChange }) {
  return (
    <>
      <form
        name="filters"
        id="filters"
        onChange={onChange}
        className="flex flex-col bg-secondary rounded-lg p-5 gap-5"
      >
        <h4>Filter Options</h4>
        <label> Type of Cycle</label>
        <select name="cycle_type" id="cycle_type">
          <option value="give">GIVE</option>
          <option value="collect">COLLECT</option>
        </select>
        <label> Category</label>
        <select name="Category" id="category">
          <option value="wood">wood</option>
          <option value="metal">metal</option>
          <option value="food">food</option>
          <option value="rubber">rubber</option>
        </select>
        <label> Unit</label>
        <select name="Unit" id="unit">
          {" "}
          <option value="kg.">kg.</option>
          <option value="l.">kg.</option>
          <option value="g.">g.</option>
          <option value="m.">m.</option>
        </select>
        <div className="flex flex-row gap-3 justify-end">
          <Button className="w-1/2" accent text={"Apply filter"} />
          <Button primary text={"Clear"} />
        </div>
      </form>
    </>
  );
}
