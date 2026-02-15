import styles from "./CycleForm.module.css";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import mapboxgl from "mapbox-gl";

export default function CreateForm({ onSubmit }) {
  const { status, data: session } = useSession();

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    //Image upload to Cloudinary

    async function upload(formElement) {
      const fileInput = Array.from(form.elements).find(
        ({ name }) => name === "file"
      );

      const uploadData = new FormData();

      for (const file of fileInput.files) {
        uploadData.append("file", file);
      }

      uploadData.append("upload_preset", "scrapssociety");

      const data = await fetch(
        "https://api.cloudinary.com/v1_1/dkopuiyae/image/upload",
        {
          method: "POST",
          body: uploadData,
        }
      ).then((r) => r.json());

      return data.secure_url;
    }

    // Geocoding address to get coordinates

    const full_address = `${data.address}, ${data.zipcode} ${data.city}, ${data.country}`;

    async function fetchCoordinates(full_address) {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          full_address
        )}.json?access_token=${mapboxgl.accessToken}`
      );
      const geocodingData = await res.json();
      const coordinates = geocodingData.features?.[0]?.center;
      return coordinates ?? null;
    }

    const coordinates = await fetchCoordinates(full_address);
    if (!coordinates) {
      alert("Could not fetch coordinates. Please check address.");
      return;
    }

    const image_url = await upload(form);
    const created_by = session?.user?.username;

    const payload = {
      ...data,
      image_url,
      created_by,
      full_address,
      lngLat: coordinates,
    };
    console.log("payload", payload);
    onSubmit(payload);
  }
  return (
    <>
      <section className="p-5 rounded-lg m-5 xl:m-10 mx-auto">
        <form
          aria-labelledby="Cycle Form"
          className="flex flex-col lg:w-1/2 mx-auto flex-wrap flex-shrink justify-center bg-secondary gap-10 p-10 rounded-lg mb-2"
          onSubmit={handleSubmit}
          method="post"
        >
          <div className="flex flex-col w-full">
            <label htmlFor="title" className="mb-1 font-sm">
              Title
            </label>
            <input
              id="title"
              name="title"
              className="input rounded-lg px-3 py-2 mb-3"
              type="text"
              placeholder="Enter a post title"
              required
            />
            <label htmlFor="cycle_type" className="mb-1 font-sm">
              Type of Cycle
            </label>
            <select
              id="cycle_type"
              name="cycle_type"
              placeholder="Choose your type of Cycle"
              className="input rounded-lg px-3 py-2 mb-3"
              required
            >
              <option value="giveaway">GIVEAWAY</option>
              <option value="collect">COLLECT</option>
            </select>

            <label htmlFor="Category" className="mb-1 font-sm">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="input rounded-lg px-3 py-2 mb-3"
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
              className="input rounded-lg px-3 py-2 mb-3"
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
              className="input rounded-lg px-3 py-2 mb-3"
              required
            >
              <option value="Kilograms">kg.</option>
              <option value="grams">g.</option>
              <option value="meters">m.</option>
              <option value="liters">l.</option>
              <option value="pieces">pieces</option>
            </select>

            <label htmlFor="Deadline" className="mb-1 font-sm">
              Deadline
            </label>
            <input
              id="deadline"
              name="deadline"
              className="input rounded-lg px-3 py-2 mb-3"
              type="date"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="address" className="mb-1 font-sm">
              Address
            </label>
            <input
              id="address"
              name="address"
              className="input rounded-lg px-3 py-2 mb-3"
              type="text"
              required
            />
            <label htmlFor="zipcode" className="mb-1 font-sm">
              Zip Code
            </label>
            <input
              id="zipcode"
              name="zipcode"
              className="input rounded-lg px-3 py-2 mb-3"
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
              className="input rounded-lg px-3 py-2 mb-3"
              type="text"
              required
            />
            <label htmlFor="country" className="mb-1 font-sm">
              Country
            </label>
            <input
              id="country"
              name="country"
              className="input rounded-lg px-3 py-2 mb-3"
              type="text"
              required
            />
            <label htmlFor="details" className="mb-1 font-sm">
              Additional information
            </label>
            <textarea
              id="details"
              name="details"
              className="input rounded-lg px-3 py-2 mb-3"
              type="textarea"
              required
              rows="4"
            />
            <div className="p-5 border-dotted border-2 rounded-lg mb-5">
              <label htmlFor="pictures" className="mb-1 font-sm block">
                Add pictures
              </label>
              <input
                id="file"
                name="file"
                className="input text-white rounded-lg py-2 mb-3"
                type="file"
                required
              />
            </div>
            <Button text={"Submit"} accent />
          </div>
        </form>
      </section>
    </>
  );
}
