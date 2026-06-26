# ★ Five Star Enterprises ★

> **Ranchi's Premier Luxury Car & Bus Rental Portal** *(formerly known as The Car Club)*

Welcome to the official repository for **Five Star Enterprises**, a premium mobility and transit booking platform serving Ranchi and Jharkhand. This project is built using modern web technologies to deliver a fast, responsive, and aesthetically stunning user experience inspired by leading-edge design standards (Claude AI and premium brand portals).

---

## 🌟 Key Features

### 1. Modern Interactive Hero & Booking Form
- **Staggered Letter Entrances**: The hero title `"Welcome to Five Star Enterprises"` slides into view letter-by-letter with physics-based spring animations.
- **Enquiry Form**: Simple, responsive layout to book self-drive, chauffeur-driven, or bus rentals with city, destination, and calendar date parameters.

### 2. High-End Fleet Catalog (`/cars`)
- **Apple-Style Tabs**: A native-feeling horizontally scrollable category tab bar that hides visual scrollbar clutter on mobile screens.
- **Interactive Sliding Pill**: A spring-based background pill indicator (`layoutId="activeTab"`) that slides smoothly between category switches.
- **3D Lift Cards**: Vehicle cards pop up and tilt slightly (`rotateX`) on scroll-down, featuring floating category tags, gold star ratings, custom specifications grids, and responsive zoom-on-hover image effects.
- **Dynamic Matching**: Real-time frontend catalog filtering that intelligently matches database labels under flexible spelling classifications.

### 3. Detailed Services Directory (`/services`)
- Overhauled card layouts decorated with high-resolution Unsplash photos, floating category badges, and customized Lucide indicators.
- Bottom recruitment panel designed as a sleek dark corporate banner with soft red ambient light spots.

### 4. Verified Client Testimonials & Guarantees (`/about`)
- Numbered guarantee panels featuring subtle red accent dividers and hover shadow states.
- Clean review cards featuring gold star rating rows, stylized double quotes, and colorful initials avatar bubbles representing verified corporate and leisure clients.

### 5. Mobile-First Global Support Menu
- Sticky floating action bubbles (WhatsApp Chat Support and Hotline Call Helpline) rendered globally at the bottom-right corner of all views.
- **Scroll Restoration**: Automated router hook that returns the browser viewport to the starting top coordinate (`y=0`) on every navigation transition.

---

## 🛠️ Technology Stack

- **Frontend**:
  - React.js (Vite environment)
  - Tailwind CSS v4 (Modern theme-driven configuration)
  - Framer Motion (Advanced scroll-linked, stagger, and spring physics transitions)
  - Lucide React & React Icons (Clean modern vector iconography)
  - Axios (Standardized async API requests)
- **Backend**:
  - Node.js & Express.js
  - MongoDB (Fleet databases and reservations storage)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

### Installation & Startup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/ayush2093/five-star-enterprises.git
   cd five-star-enterprises
   ```

2. **Install Dependencies**:
   Install dependencies for the root, frontend, and backend packages concurrently:
   ```bash
   npm run install-all
   ```

3. **Configure Environment Variables**:
   Create a `.env` file inside the `frontend/` and `backend/` directories mapping your database connections and port offsets:
   - Frontend `.env`:
     ```env
     VITE_BACKEND_URL=http://localhost:5002
     ```
   - Backend `.env`:
     ```env
     PORT=5002
     MONGO_URI=mongodb://localhost:27017/fivestar
     JWT_SECRET=your_jwt_secret_key
     ```

4. **Launch Development Servers**:
   Start both Express.js and Vite concurrently:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173/](http://localhost:5173/) in your browser to view the frontend application.

---

## 📈 Production Compilation
Build a production-ready client bundle to verify routing syntax:
```bash
npm run build --prefix frontend
```
All assets will compile into `frontend/dist/` in under 300ms.
