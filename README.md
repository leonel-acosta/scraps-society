# Scraps Society — One‑Page Web Application

<p align="center">
  <img src="https://res.cloudinary.com/dkopuiyae/image/upload/v1763545365/logo-circle_ousily.svg" alt="Scraps Society Logo" width="160" />
</p>

Scraps Society is a one‑page web application developed as the **capstone project of a full‑stack web development bootcamp**, designed to provide a social and sustainable solution for waste management. It empowers individuals to participate in **social economy**, **circular economy**, **recycling**, and **upcycling** practices by enabling the exchange and collection of reusable waste materials.

## 🌱 Purpose

The platform functions as a **community-driven announcement board** where users can:

* Post available waste materials for others to collect
* Coordinate donations and pickups
* View materials available in their area through an interactive map

By facilitating connections between individuals, Scraps Society promotes the responsible reuse of materials and increases participation in sustainable waste management.

## 🚀 Tech Stack

This application is built using a modern and scalable stack:

* **Next.js**
* **React**
* **MongoDB**
* **Mongoose**
* **Express**
* **TailwindCSS**
* **CSS / HTML**
* **JavaScript**
* **Mapbox** (interactive location map)
* **Cloudinary** (asset management)

## 🔗 Live Deployment

The application is deployed on **Vercel**:

➡️ **[https://scraps-society.vercel.app](https://scraps-society.vercel.app)**

## 📝 Current Features

This first version focuses on core functionality and user value:

* A clean **one‑page interface** for quick access to all features
* Ability to **publish and browse waste material announcements**
* **Location-based map view** powered by Mapbox
* Cloudinary‑optimized images for posts
* Basic user dashboard for managing listings
* Responsive design using TailwindCSS

## 🔮 Roadmap / Future Enhancements

The next version aims to significantly expand capabilities and enhance user experience.

### 1. **Improved User Dashboard**

* Analytics on contributions and material flow
* Better structure for managing posts

### 2. **Integrated Chat System**

* Direct messaging between donors and collectors
* Real‑time notifications

### 3. **Enhanced UI/UX**

* Smoother navigation and improved accessibility
* Refined visual design and layout
* UI animations throughout the experience

### 4. **Map Improvements**

* Optimized performance for large data sets
* Richer location markers and filtering

### 5. **Announcement Details**

* More metadata fields (material weight, type, condition, etc.)
* Image galleries and previews

### 6. **Quantitative Metrics**

* Total amount of materials available
* Materials successfully reused or upcycled
* Community impact statistics

## 📂 Project Structure (Simplified)

```
/ (root)
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Next.js routes
│       ├── api/             # API routes (Express / handlers)
│   ├── db/             # Database and helpers (Mongoose)
│   └── styles/          # Global and component styles
└── ...                  # Config and environment files
```

## 📦 Installation & Setup

```bash
# Install dependencies
npm install
# or
yarn install

# Run development server
npm run dev
# or
yarn dev
```

Open the app at **[http://localhost:3000](http://localhost:3000)**.

## 🤝 Contributions

Contributions and suggestions are welcome to expand the platform and increase its ecological and community impact.

## 📄 License

This project is licensed under the MIT License.

---

**Scraps Society** — Giving new life to discarded materials.
