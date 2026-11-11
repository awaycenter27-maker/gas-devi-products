/* ============================================================
   Devi Gas Products - Centralized editable content
   ------------------------------------------------------------
   This is the single place to edit the details that repeat across
   the site. Change a value here and it updates everywhere.

   Leave a URL as an empty string ("") and the site will show a
   neutral "Link to be added" state instead of a broken link.
   ============================================================ */

window.DGP = {
  /* ---- Contact (only verified details are published) ---- */
  email: "devigasproducts@gmail.com",

  // Add verified numbers later to switch on click-to-call / WhatsApp.
  // Leave empty to keep them hidden.
  phone: "",            // e.g. "+91 98XXXXXXXX"
  whatsapp: "",         // digits only, with country code, e.g. "9198XXXXXXXX"

  /* ---- External group links (use the real URLs, never a guess) ---- */
  awayCenterUrl: "https://www.away.center/bangalore",
  hanumanUrl: "",       // no public website at present

  /* ---- Products ---- */
  products: [
    {
      id: "oxygen",
      name: "Industrial Oxygen",
      status: "made",
      statusLabel: "Manufactured by us",
      summary:
        "Oxygen produced at our own facilities and filled into cylinders for industrial use across metal fabrication, cutting and welding, and allied processes.",
      detail:
        "As a manufacturer, we control the process end to end, from production to cylinder filling and dispatch. Talk to us about cylinder sizes and ongoing supply arrangements.",
    },
    {
      id: "nitrogen",
      name: "Nitrogen",
      status: "supplied",
      statusLabel: "Supplied by us",
      summary:
        "Industrial nitrogen supplied to order for inerting, blanketing, purging and general industrial requirements.",
      detail:
        "Supplied through our established network. Share your application and quantity and we will advise on availability and delivery.",
    },
    {
      id: "other-gases",
      name: "Other Industrial Gases",
      status: "supplied",
      statusLabel: "Enquire for availability",
      summary:
        "A range of other industrial gases arranged on request. Availability depends on grade, quantity and delivery location.",
      detail:
        "Tell us what you need. We will confirm what we can supply and the terms before you commit.",
    },
  ],

  /* ---- Factories ---- */
  factories: [
    {
      name: "Ghusri, Howrah",
      region: "Howrah, West Bengal",
      role: "Manufacturing",
      blurb:
        "Part of our Howrah manufacturing base, supporting oxygen production and cylinder filling for industrial customers.",
      points: ["Industrial oxygen manufacturing", "Cylinder filling and handling", "Serving Howrah and greater Kolkata"],
    },
    {
      name: "Junglepur, Howrah",
      region: "Howrah, West Bengal",
      role: "Manufacturing and supply",
      blurb:
        "A second Howrah location extending our production and supply reach across the district and surrounding industrial belts.",
      points: ["Oxygen production support", "Gas supply and dispatch", "Close to Howrah industrial clusters"],
    },
    {
      name: "Durgapur",
      region: "Durgapur, West Bengal",
      role: "Regional supply",
      blurb:
        "Our Durgapur presence serves the industrial corridor of western West Bengal, one of the state's major manufacturing regions.",
      points: ["Regional gas supply", "Serving the Durgapur industrial corridor", "Support for heavy industry"],
    },
  ],

  /* ---- Group companies (legal names shown, no invented details) ---- */
  group: [
    {
      mark: "DG",
      name: "Devi Gas Products Private Limited",
      note: "",
      blurb:
        "The industrial gases business at the centre of the group, manufacturing oxygen and supplying nitrogen and other industrial gases.",
    },
    {
      mark: "PP",
      name: "Prestige Properties Pvt Ltd",
      note: "",
      blurb:
        "A real estate and property interest within the group.",
    },
    {
      mark: "RF",
      name: "Rajasthan Fertilisers & Chemicals Corporation Ltd",
      note: "",
      blurb:
        "A fertilisers and chemicals interest associated with the group.",
    },
    {
      mark: "HE",
      name: "Hanuman Estates",
      note: "",
      blurb:
        "A real estate and estates interest within the group.",
    },
  ],
};
