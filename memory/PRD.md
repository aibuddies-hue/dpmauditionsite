# DPM Beauty Pageant 2026 - Landing Page PRD

## Original Problem Statement
Build a landing page for DPM Beauty Pageant 2026 based on provided HTML template. Include Urvashi Rautela's picture in the main header section.

## Architecture
- **Frontend**: React (CRA + Craco) with Tailwind CSS
- **Backend**: FastAPI with MongoDB
- **Database**: MongoDB (applications collection)

## User Personas
- Aspiring models/actors looking to enter Bollywood
- Young women (12-28) for Miss Teen/Miss India categories
- Married women (23-60) for Mrs. India category
- Young men (16-32) for Mr. India category

## Core Requirements
- Dark themed landing page with gold accents (#C9A84C)
- Urvashi Rautela as Celebrity Patron featured in hero + dedicated section
- Multi-step application form (Personal Details -> Review -> Payment)
- All form submissions saved to MongoDB
- Responsive design
- Scroll reveal animations
- Sticky nav + sticky footer CTA bar

## What's Been Implemented (Dec 2025)
- Full landing page with all 15+ sections matching HTML template
- Hero section with Urvashi Rautela image (split layout)
- Celebrity Patron section with credentials and quote
- 3-step application form with validation
- Backend API: POST/GET /api/applications
- Sticky navigation and footer bar
- Scroll reveal animations
- Categories with "Most Popular" badge
- Rules & Regulations section
- Responsive CSS

## Prioritized Backlog
### P0 (Critical)
- None remaining

### P1 (Important)
- Real payment gateway integration (Razorpay/PayU)
- Admin dashboard to manage applications
- Email notifications on form submission

### P2 (Nice to Have)
- Replace placeholder images (judges, past events, sponsors)
- Add actual testimonials from past participants
- SEO meta tags and Open Graph
- Analytics integration
- Social media share buttons

## Next Tasks
1. Integrate payment gateway (Razorpay recommended for India)
2. Build admin panel for viewing/managing applications
3. Add email notification system
4. Replace placeholder content with real images/data
