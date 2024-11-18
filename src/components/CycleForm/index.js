import styles from "./CycleForm.module.css";
import Button from "../Button";
import { useSession } from "next-auth/react";

export default function CreateForm({ onSubmit }) {
  const { status, data: session } = useSession();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    async function upload() {
      const form = event.currentTarget;
      const fileInput = Array.from(form.elements).find(
        ({ name }) => name === "file"
      );

      const formData = new FormData();

      for (const file of fileInput.files) {
        formData.append("file", file);
      }

      formData.append("upload_preset", "scrapssociety");

      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dkopuiyae/image/upload",
        {
          method: "POST",
          body: formData,
        }
      ).then((r) => r.json());

      return data.secure_url;
    }

    const image_url = await upload();
    const created_by = session?.user?.id;

    onSubmit({ ...data, image_url, created_by });
  }

  return (
    <>
      <form
        aria-labelledby="Cycle Form"
        className="flex flex-col pb-2 mb-2"
        onSubmit={handleSubmit}
        method="post"
      >
        <label htmlFor="title" className="mb-1 font-sm">
          Title
        </label>
        <input
          id="title"
          name="title"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          placeholder="Enter your name"
          required
        />
        <label htmlFor="cycle_type" className="mb-1 font-sm">
          Type of Cycle
        </label>
        <select
          id="cycle_type"
          name="cycle_type"
          placeholder="Choose your type of Cycle"
          className="input rounded-full px-3 py-2 mb-3"
          required
        >
          <option name="giveaway">GIVEAWAY</option>
          <option name="collect">COLLECT</option>
        </select>

        <label htmlFor="Category" className="mb-1 font-sm">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="input rounded-full px-3 py-2 mb-3"
        >
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
        <label htmlFor="Category" className="mb-1 font-sm">
          Quantity
        </label>
        <input
          id="quantity"
          name="quantity"
          className="input rounded-full px-3 py-2 mb-3"
          type="value"
          min="0"
          placeholder="quantity"
          required
        />
        <label htmlFor="Unit" className="mb-1 font-sm">
          Unit
        </label>
        <select
          id="unit"
          name="unit"
          default="kg."
          className="input rounded-full px-3 py-2 mb-3"
          required
        >
          <option name="Kilograms">kg.</option>
          <option name="grams">g.</option>
          <option name="meters">m.</option>
          <option name="liters">l.</option>
        </select>

        <label htmlFor="address" className="mb-1 font-sm">
          Address
        </label>
        <input
          id="address"
          name="address"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          required
        />
        <label htmlFor="zipcode" className="mb-1 font-sm">
          Zip Code
        </label>
        <input
          id="zipcode"
          name="zipcode"
          className="input rounded-full px-3 py-2 mb-3"
          type="value"
          min="0"
          required
        />
        <label htmlFor="city" className="mb-1 font-sm">
          City
        </label>
        <input
          id="city"
          name="city"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          required
        />
        <label htmlFor="country" className="mb-1 font-sm">
          Country
        </label>
        <input
          id="country"
          name="country"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          required
        />
        <label htmlFor="custom-information" className="mb-1 font-sm">
          Additional information
        </label>
        <textarea
          id="custom_information"
          name="custom_information"
          className="input rounded-full px-3 py-2 mb-3"
          type="textarea"
          required
          rows="4"
        />
        <label htmlFor="pictures" className="mb-1 font-sm">
          Add pictures
        </label>
        <input
          id="file"
          name="file"
          className="input rounded-full px-3 py-2 mb-3"
          type="file"
          required
          multiple
        />
        <Button text={"Submit"} primary />
      </form>
    </>
  );
}
