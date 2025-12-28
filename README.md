# 🎨 Creative Showcase

A modern full-stack web application where artists can upload, showcase, and share their digital artwork.  
Built with **React**, **Supabase**, and **Tailwind CSS**, featuring authentication, protected dashboards, public profiles, image uploads, and a stunning animated landing page.

---

## 🚀 Live Demo

🔗 **Live App:** https://full-stack-web-application-creative.vercel.app/
🔗 **GitHub Repo:** https://github.com/debangshucode/Full-Stack-Web-Application-Creative-Showcase

---

## ✨ Features

### 🌐 Public
- Animated **Landing Page** with WebGL Light Rays hero
- Public gallery of uploaded artworks
- Public user profiles (`/profile/:username`)
- Responsive masonry-style image layout

### 🔐 Authentication
- Email & password authentication (Supabase Auth)
- Secure signup & login
- Protected dashboard routes

### 🎨 User Dashboard
- Upload images from local device
- Image preview before upload
- Store images securely in Supabase Storage
- View & manage uploaded artworks
- Delete own images (DB + Storage)

### 🛡 Security
- Row Level Security (RLS) on all database tables
- Users can only modify their own data
- Public read-only access for galleries & profiles

### 🎯 UX Enhancements
- Toast notifications for success & errors
- Dark / Light mode support
- Smooth animations & transitions
- Fully responsive design

---

## 🧰 Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- react-hot-toast
- lucide-react
- OGL (WebGL effects)

### Backend
- Supabase
  - Authentication
  - PostgreSQL database
  - Row Level Security (RLS)
  - Storage buckets

---

## 🗄 Database Schema

### `profiles`
- `id` (uuid, primary key, auth.users reference)
- `username` (unique)
- `full_name`
- `bio`
- `avatar_url`
- `created_at`
- `updated_at`

### `images`
- `id` (uuid)
- `user_id` (foreign key → profiles.id)
- `title`
- `description`
- `image_url`
- `created_at`
- `views`

Profiles are **auto-created** using a database trigger on user signup.

---

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

```
## ⚙️ Local Setup
### 1️⃣ Clone the Repository
git clone https://github.com/debangshucode/Full-Stack-Web-Application-Creative-Showcase.git
cd Full-Stack-Web-Application-Creative-Showcase

### 2️⃣ Install Dependencies
npm install

### 3️⃣ Supabase Project Setup

Go to 👉 https://supabase.com

Create a new project

Save the following from Project Settings → API:

Project URL

Anon public API key

### 4️⃣ Database Setup (IMPORTANT)

Open Supabase Dashboard → SQL Editor

Run the migration SQL provided in this repository:

Creates profiles and images tables

Enables Row Level Security (RLS)

Adds policies for public access and user ownership

Creates trigger to auto-create profiles on signup

Verify:

Tables exist

RLS is enabled

Policies are active

### 5️⃣ Storage Setup

Go to Storage → Buckets

Create a bucket named:

images


Set bucket to public

Add storage policies:

Authenticated users can upload

Public users can view

Users can delete their own images

### 6️⃣ Enable Authentication

Go to Authentication → Providers

Enable Email

Disable email confirmation (optional for local testing)

### 7️⃣ Start Development Server
npm run dev


### Open in browser:

http://localhost:5173
