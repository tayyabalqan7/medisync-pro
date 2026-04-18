# 🏥 MediSync Pro — Patient Record Management & Medicine Intelligence Platform

![MediSync Pro](https://img.shields.io/badge/MediSync-Pro-0ea5e9?style=for-the-badge&logo=heart&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)

Pakistan's most advanced healthcare management platform with OCR prescription scanning, intelligent symptom analysis, drug interaction checking, and secure patient records.

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔍 **Medicine Scanner** | Upload prescriptions and extract medicine names using Tesseract.js OCR |
| 🩺 **Symptom Analyzer** | Describe symptoms → get home remedies, medicines, and doctor guidance |
| ⚠️ **Drug Interactions** | Check for dangerous interactions between multiple medicines |
| 📋 **Patient Records** | Securely store and manage complete medical history |
| 💊 **Medicine Database** | 60+ Pakistani medicines with full details, pricing, and manufacturer info |
| 🔔 **Medicine Timeline** | Track medicine schedules and history |
| 👤 **User Profiles** | Personal health profiles with blood group, allergies, conditions |
| 🛡️ **Admin Panel** | User management, system health monitoring |

## 🏗️ Tech Stack

### Frontend (`/frontend`)
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with glassmorphism design
- **Animations**: Framer Motion
- **OCR**: Tesseract.js (client-side)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

### Backend (`/backend`)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT + bcryptjs
- **Validation**: express-validator

## 🚀 Quick Start

### Frontend (Works without backend — demo mode)

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:3000
```

### Backend (Optional — for full functionality)

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
npm run dev
# API runs on http://localhost:5000
```

## 📁 Project Structure

```
medisync-pro/
├── frontend/                    # Next.js 14 application
│   ├── app/                     # App Router pages
│   │   ├── page.tsx             # Landing page
│   │   ├── dashboard/           # Main dashboard
│   │   ├── medicines/           # Medicine database browser
│   │   ├── symptoms/            # Symptom analyzer
│   │   ├── interactions/        # Drug interaction checker
│   │   ├── scanner/             # OCR prescription scanner
│   │   ├── records/             # Patient records
│   │   ├── settings/            # User settings
│   │   └── admin/               # Admin panel
│   ├── components/              # Reusable components
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── MedicineCard.tsx
│   │   ├── StatCard.tsx
│   │   └── MedicineTimeline.tsx
│   ├── context/                 # React Context
│   │   └── AuthContext.tsx      # Authentication state
│   └── lib/                     # Utilities & data
│       ├── api.ts               # Axios API client
│       ├── auth.ts              # Auth utilities
│       ├── data.ts              # Symptoms & interactions data
│       └── medicines-data.ts    # 60+ Pakistani medicines
│
└── backend/                     # Express.js API
    ├── server.js                # Main server
    ├── models/                  # Mongoose models
    │   ├── User.js
    │   ├── Medicine.js
    │   ├── PatientRecord.js
    │   └── Prescription.js
    ├── routes/                  # API routes
    │   ├── auth.js
    │   ├── medicines.js
    │   ├── patients.js
    │   └── symptoms.js
    └── data/                    # Static data
        ├── medicines.js         # 60 Pakistani medicines
        ├── symptoms.js          # 32 symptoms with remedies
        └── interactions.js      # 25+ drug interactions
```

## 🎨 Design System

- **Primary**: Sky Blue (`#0ea5e9`)
- **Secondary**: Teal (`#14b8a6`)
- **Accent**: Green (`#22c55e`)
- **Background**: Dark slate gradient
- **Style**: Glassmorphism with backdrop blur

## 📊 Data Coverage

- **60 Pakistani Medicines** including Panadol, Brufen, Glucophage, Lipitor, and more
- **32 Symptoms** with home remedies, related medicines, and doctor guidance
- **25+ Drug Interactions** with severity levels (MAJOR/MODERATE/MINOR)
- Prices in PKR with manufacturer information

## ⚠️ Disclaimer

This platform is for educational and informational purposes only. Always consult a qualified healthcare professional for medical advice, diagnosis, or treatment.

---

Made with ❤️ for Pakistan | © 2024 MediSync Pro
