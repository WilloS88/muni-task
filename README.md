# Metadata mining

- Python backend, Vite React TypeScript frontend
- For the purpose of fetching data from GitHub repository I used generated private GitHub token that has been stored in .env file
---

## Getting Started

### Prerequisites

- **Python**
- **Node.js** 
- **npm** 
- **.env** 
---

## Installation & Setup

### Backend

```bash
cd backend 

pip install -r requirements.txt

python index.py --output json

```

### Frontend

```bash
cd frontend

npm install

npm run dev

```

### Folder structure

```
└── 📁backend
    └── .gitignore
    └── index.py
    └── issues.json
    └── requirements.txt
```

```
└── 📁frontend
    └── 📁public
        └── data.json
        └── vite.svg
    └── 📁src
        └── App.tsx
        └── 📁components
            └── 📁card
                └── Card.tsx
                └── CardDetailsModal.tsx
                └── CardList.tsx
            └── 📁ui
                └── Footer.tsx
                └── Header.tsx
        └── index.css
        └── main.tsx
        └── 📁types
            └── Issue.ts
        └── vite-env.d.ts
    └── .gitignore
    └── .prettierrc
    └── eslint.config.js
    └── index.html
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
```
