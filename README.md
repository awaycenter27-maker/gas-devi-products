# Devi Gas Products website

A static website (plain HTML, CSS and JavaScript). No build step and no server are
required. Open `index.html` in a browser, or host the folder on any static host
(Netlify, GitHub Pages, cPanel, Vercel, etc.).

## Pages

- `index.html` - Home
- `about.html` - About Us
- `products.html` - Products
- `factories.html` - Our Factories
- `group.html` - Our Group Companies
- `leadership.html` - Leadership
- `contact.html` - Contact / Request a Quote

## Editing content (one file)

Most details that repeat across the site live in **`assets/js/content.js`**:

- `email` - the contact email shown everywhere.
- `phone`, `whatsapp` - leave empty for now. Add verified numbers later to switch on
  click-to-call and WhatsApp (currently hidden because no numbers are verified).
- `awayCenterUrl` - paste the real Away Center website URL. Until it is filled in,
  the "Visit Away Center" buttons show "link to be added" and do nothing.
- `hanumanUrl` - paste the Hanuman Estates URL if there is one.
- `products`, `factories`, `group` - the lists shown on the product, factory and
  group pages. Edit the text here and it updates on the pages.

Longer page copy (headlines and paragraphs) lives directly in each `.html` file.

## Photographs

All factory, operational and leadership images are currently neutral placeholders
clearly marked "to be provided". To add a real image, replace the placeholder block
(`<div class="ph ...">...</div>`) with an `<img>` tag pointing to your file in
`assets/img/`. Do not use stock or AI images to represent real facilities or people.

## The enquiry form

The form on `contact.html` is an interface only. It validates on the page and, when
sent, opens the visitor's email app with the details filled in, addressed to the
contact email. Nothing is stored on a server yet. A real backend (server-side
validation, spam protection and storage or email delivery) can be added later
without changing the design.

Spam protection already present: a hidden honeypot field that silently blocks bots.

## Logo

The current mark is a typographic placeholder (the oxygen element tile). Replace it
with the official Devi Gas Products logo when supplied.

## Still to add later (optional)

- Real factory and operational photographs (currently neutral placeholders).
- Any verified phone / WhatsApp numbers and postal addresses (none published yet).

## Confirmed details already wired in

- Factory locality spelling: Ghusri, Howrah.
- away.center link: https://www.away.center/bangalore
- Hanuman Estates: no public website at present.
- Leadership photos and bios for Mr. Anirudh Jalan and Mr. Udbhav Jalan.
