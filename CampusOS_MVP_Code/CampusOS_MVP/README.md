# CampusOS MVP

A React + Vite frontend prototype for a college community platform.

## Requirements
- Node.js (LTS version recommended)
- VS Code (or another code editor)

## Run locally
1. Extract the ZIP file.
2. Open the extracted `CampusOS_MVP` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

   ```bash
   npm install
   npm run dev
   ```

5. Open the local URL printed in the terminal (usually http://localhost:5173).

## Demo
Use the **Preview as** selector at the top-right to switch between Student, Company, and Admin views.

The demo supports:
- Browsing and searching internships and part-time jobs
- Applying for opportunities
- Posting and removing opportunities in Company/Admin views
- Adding marketplace items
- Updating application statuses in the Admin view
- Saving demo data in browser localStorage

## Important limitations
This is a frontend-only MVP. It does not include real login, backend APIs, Supabase, college email verification, secure role permissions, or real messaging. Data is stored only in the current browser.

## Build check
Run `npm run build` to create the production build in the `dist` folder.
