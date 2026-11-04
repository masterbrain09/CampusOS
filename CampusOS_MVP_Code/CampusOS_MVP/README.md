# CampusOS – College Community Platform

CampusOS is a college-exclusive digital platform designed to connect students with internship opportunities, part-time jobs, freelance projects and resource-sharing opportunities.

The platform aims to help students gain practical experience, showcase their skills, earn money and access useful resources within their college community.

## Key Features

### 1. Internship Opportunities
- Browse available internships.
- Search and explore opportunities.
- View internship details and requirements.
- Apply for internships.
- Track application statuses.

### 2. Part-time Jobs and Freelance Opportunities
- Explore part-time jobs and work opportunities.
- Discover opportunities to earn through skills.
- Connect students with potential work opportunities.

### 3. Campus Marketplace
- Browse second-hand products.
- Add items for sale.
- Explore lending and exchange opportunities.
- Encourage resource sharing among students.

### 4. Role-based Interface
- Student interface for exploring opportunities and managing applications.
- Company interface for posting opportunities and viewing applications.
- Admin interface for managing platform activities.

## Technology Stack

| Technology | Purpose |
|---|---|
| React.js 18 | Building the user interface |
| JavaScript (ES6+) | Application logic and interactivity |
| Vite 6 | Development server and build tool |
| CSS3 | Styling and responsive layouts |
| Lucide React | Icons and visual elements |
| Browser localStorage | Storing demo data locally |

## Project Structure

```text
CampusOS/
├── public/
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm
- VS Code or any code editor

### Installation

1. Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

2. Navigate to the project directory:

```bash
cd CampusOS
```

3. Install dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open the local URL displayed in the terminal, usually:

```text
http://localhost:5173
```

### Build for Production

To create an optimized production build, run:

```bash
npm run build
```

The generated production files will be available in the `dist` directory.

## Current Project Status

CampusOS is currently developed as a Minimum Viable Product (MVP).

The current implementation is primarily frontend-based. Demo data is stored using browser localStorage and is limited to the browser in which the application is used.

Features such as real user authentication, centralized database storage, secure role-based access, real-time messaging and payment processing require further backend development.

## Future Enhancements

- College email-based student authentication.
- Centralized database integration.
- Student skill profiles and portfolios.
- Company talent discovery and skill-based matching.
- Improved freelance project management.
- Complete lending and borrowing workflows.
- Real-time notifications and communication.
- Secure payment integration.

#
