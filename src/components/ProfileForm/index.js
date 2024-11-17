import styles from "./RegisterForm.module.css";
import Button from "../Button";
import Link from "next/link";

export default function profileForm({ onSubmit }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    Object.keys(data).forEach((key) => {
      if (data[key] === "") delete data[key];
    });

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

    const profile_picture = await upload();

    onSubmit({ ...data, profile_picture });
    console.log("data", data);
  }

  return (
    <>
      <form
        aria-labelledby="register form"
        className="flex flex-col pb-2 mb-2"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="mb-1 font-sm">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          placeholder="Enter your name"
        />
        <label htmlFor="profile picture" className="mb-1 font-sm">
          Profile Picture
        </label>
        <input
          id="file"
          name="file"
          className="input rounded-full px-3 py-2 mb-3"
          type="file"
        />
        <label htmlFor="phone" className="mb-1 font-sm">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          className="input rounded-full px-3 py-2 mb-3"
          type="tel"
          placeholder="+49 176 1234 5678"
        />
        <label htmlFor="city" className="mb-1 font-sm">
          City
        </label>
        <input
          id="city"
          name="city"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          placeholder="Berlin"
        />
        <label htmlFor="zipcode" className="mb-1 font-sm">
          Zipcode
        </label>
        <input
          id="zipcode"
          name="zipcode"
          className="input rounded-full px-3 py-2 mb-3"
          type="number"
          placeholder="12345"
        />
        <label htmlFor="country" className="mb-1 font-sm">
          country
        </label>
        <input
          id="country"
          name="country"
          className="input rounded-full px-3 py-2 mb-3"
          type="text"
          placeholder="Germany"
        />
        <label htmlFor="description" className="mb-1 font-sm">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="input rounded-full px-3 py-2 mb-3"
          placeholder="Tell us something about yourself"
          rows={4}
          maxLength={300}
        />
        <Button text={"Submit"} primary />
      </form>
    </>
  );
}
