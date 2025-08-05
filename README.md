![App Screenshot](https://ik.imagekit.io/mrdee/IMG_7831.JPG?updatedAt=1754387102992)

# FAQ Extractor

A smart, flexible tool for extracting Frequently Asked Questions (FAQs) from any public webpage.

- Automatically scrapes and parses visible FAQ content
- Supports manual addition of question-answer pairs
- Lets users view, edit, and download the final FAQs as a clean PDF

## Features

- Scrapes visible and hidden FAQs from webpages

- Expands accordions, toggles, and other JS-driven elements

- Supports manual FAQ entry/editing

- Cleans and parses content into structured Q&A format (JSON)

- Headless browser powered (e.g., Playwright or Puppeteer)

- Skips common non-content areas (headers, footers, nav, etc.)

- Great for training AI, chatbots, or building help centers

### Tech Stack

- [Next.js](https://nextjs.org/) with TypeScript for app framework
- [Shadcn](https://ui.shadcn.com/) for UI components and [Tailwind](https://tailwindcss.com/) for styling
- [Upstash Redis](https://upstash.com/) for rate limiting
- [Google Gemini](https://ai.google.dev/) for AI-powered FAQ extraction
- [Puppeteer](https://pptr.dev/) for headless browser automation and FAQ content extraction from dynamic web pages

## Cloning & Running

1.  Clone the repo:
    `git clone https://github.com/dayojiboye/faq2pdf.git`

2.  Create a .env file and add your Gemini API key: GEMINI_API_KEY=

3.  Install dependencies:
    `npm install`

4.  Run the app:
    `npm run dev`

## Future Tasks

- [ ] Edit scraped/extracted results

- [ ] Allow company or brand logo

- [ ] Allow merging of manual entries and scraped FAQs in cases where users want to add to what was extracted from their web page
