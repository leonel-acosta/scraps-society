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
          <option value="">All</option>
          <option value="GIVE">GIVE</option>
          <option value="COLLECT">COLLECT</option>
        </select>
        <label> Category</label>
        <select name="category" id="category">
          <option value="">All</option>
          <option value="Wood">Wood</option>
          <option value="Metal">Metal</option>
          <option value="Food">Food</option>
          <option value="Rubber">Rubber</option>
          <option value="Textile">Textile</option>
          <option value="Computer Hardware">Computer Hardware</option>
          <option value="Organic">Organic</option>
          <option value="Glass">Glass</option>
          <option value="Aluminum">Aluminum</option>
          <option value="Furniture">Furniture</option>
          <option value="Other">Other</option>
        </select>
        <label> Unit</label>
        <select name="unit" id="unit">
          <option value="">All</option>
          <option value="kg.">kg.</option>
          <option value="l.">l.</option>
          <option value="g.">g.</option>
          <option value="m.">m.</option>
        </select>
      </form>
    </>
  );
}
