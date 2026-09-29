/* Bridging Investments — demo dataset (v1). All figures are illustrative demo data. */
const BIDEMO = {
  meta: { brand: "Bridging Investments", version: "1.0-demo", currency: "AED", updated: "29 Sep 2026" },

  investor: {
    name: "Ahmed Khan", id: "INV-2041", email: "ahmed.k@demo.ae", mobile: "+971 5X XXX 2210",
    since: "14 Jun 2026", status: "Verified", country: "United Arab Emirates",
    taxResidency: "UAE", bank: "Emirates NBD **** 4418", riskProfile: "Balanced"
  },

  portfolio: {
    contributed: 280000, pending: 100000, indicative: 301400, paid: 8600,
    xirr: 10.8, moic: 1.08,
    curve: [280, 282, 279, 286, 291, 289, 296, 301.4],
    curveLabels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    allocation: [
      { label: "Commercial property", pct: 66, color: "#ff7a1a" },
      { label: "Charter yacht", pct: 27, color: "#22c55e" },
      { label: "Cash (pending)", pct: 7, color: "#38bdf8" }
    ]
  },

  projects: [
    {
      id: "yacht", code: "BI-YT-01", name: "Dubai Charter Yacht", category: "Maritime charter",
      location: "Dubai Marina, UAE", img: "assets/yacht.jpg", status: "funding",
      tagline: "A 78ft luxury charter yacht with an established operator and forward bookings.",
      capital: 2000000, units: 100, unitPrice: 20000, reserved: 62, funded: 20,
      min: 1, max: 20, operator: "Marina Crest Charters LLC", issuer: "BI Yacht One Ltd",
      longStop: "30 Nov 2026", campaignEnds: "31 Oct 2026", version: "v1.2",
      budget: [
        ["Yacht purchase", 1500000], ["Survey, registration & insurance setup", 100000],
        ["Refit & charter launch", 150000], ["Working capital & maintenance reserve", 200000],
        ["Legal setup & disclosed closing fees", 50000]
      ],
      risks: ["Charter revenue is seasonal and not guaranteed.", "The yacht is a single physical asset — damage or downtime reduces income.", "Holdings are illiquid; no public market exists for the units.", "Capital is at risk; you may get back less than you invest."],
      docs: [["Offering terms v1.2", "PDF · 2.1 MB"], ["Risk acknowledgement", "PDF · 310 KB"], ["Independent survey summary", "PDF · 1.4 MB"], ["Operator agreement summary", "PDF · 880 KB"], ["Valuation report — Sep 2026", "PDF · 1.1 MB"]],
      timeline: [["Campaign opens", "01 Oct 2026"], ["Funding call (if fully reserved)", "05 Nov 2026"], ["Long stop date", "30 Nov 2026"], ["Legal closing & issuance", "Dec 2026"], ["First monthly report", "15 Jan 2027"]]
    },
    {
      id: "property", code: "BI-CP-02", name: "Business Bay Commercial Tower — Levels 12–14", category: "Commercial property",
      location: "Business Bay, Dubai, UAE", img: "assets/property.jpg", status: "funding",
      tagline: "Three tenanted office floors with contracted rental income and 94% occupancy.",
      capital: 5000000, units: 250, unitPrice: 20000, reserved: 141, funded: 88,
      min: 1, max: 25, operator: "Bayline Facilities Management LLC", issuer: "BI Property Two Ltd",
      longStop: "15 Dec 2026", campaignEnds: "30 Nov 2026", version: "v1.0",
      budget: [
        ["Property acquisition (3 floors)", 4250000], ["Transfer & registration fees", 170000],
        ["Fit-out & common-area upgrade", 280000], ["Leasing & legal costs", 140000],
        ["Working capital & service-charge reserve", 160000]
      ],
      risks: ["Rental income depends on tenants paying on time; voids reduce distributions.", "Property values can fall; sale proceeds are not guaranteed.", "Holdings are illiquid with a planned 5-year holding period.", "Capital is at risk; you may get back less than you invest."],
      docs: [["Offering terms v1.0", "PDF · 2.4 MB"], ["Risk acknowledgement", "PDF · 310 KB"], ["Title & encumbrance review", "PDF · 980 KB"], ["Tenancy schedule (redacted)", "PDF · 1.2 MB"], ["Valuation report — Aug 2026", "PDF · 1.6 MB"]],
      timeline: [["Campaign opens", "15 Sep 2026"], ["Funding call (if fully reserved)", "05 Dec 2026"], ["Long stop date", "15 Dec 2026"], ["Legal closing & issuance", "Jan 2027"], ["First monthly report", "15 Feb 2027"]]
    },
    {
      id: "restaurant", code: "BI-RS-03", name: "JBR Flagship Restaurant", category: "Hospitality",
      location: "JBR, Dubai, UAE", img: "assets/restaurant.jpg", status: "evaluation",
      tagline: "A flagship dining outlet under evaluation — revenue reconciliation in progress.",
      capital: 3200000, units: 160, unitPrice: 20000, reserved: 0, funded: 0,
      min: 1, max: 20, operator: "Under selection", issuer: "TBC", longStop: "TBC", campaignEnds: "TBC", version: "draft",
      budget: [["Fit-out & kitchen", 1800000], ["Licences & approvals", 320000], ["Launch working capital", 780000], ["Reserve", 300000]],
      risks: ["Still under evaluation — no offer has been approved.", "Restaurant revenue is volatile and operator-dependent."],
      docs: [["Evaluation note (summary)", "PDF · 420 KB"]],
      timeline: [["Evaluation", "In progress"], ["Investment committee review", "Oct 2026"]]
    },
    {
      id: "falcon", code: "BI-FX-04", name: "Project Falcon — FX Brokerage Equity", category: "Financial services",
      location: "Under review", img: "", status: "review",
      tagline: "Brokerage equity requires separate regulatory approval before any offer can be made.",
      capital: 0, units: 0, unitPrice: 0, reserved: 0, funded: 0,
      min: 0, max: 0, operator: "—", issuer: "—", longStop: "—", campaignEnds: "—", version: "—",
      budget: [], risks: ["Not an approved product. Subscriptions are never trader deposits."], docs: [], timeline: [["Regulatory review", "Pending"]]
    }
  ],

  reservations: [
    { id: "RSV-88121", projectId: "yacht", qty: 5, value: 100000, state: "Awaiting payment", version: "v1.2", created: "28 Sep 2026", expiresInH: 23, paymentDue: "03 Oct 2026" },
    { id: "RSV-88097", projectId: "property", qty: 2, value: 40000, state: "Funded", version: "v1.0", created: "02 Sep 2026", expiresInH: 0, paymentDue: "Paid" }
  ],

  payments: [
    { ref: "PAY-55219", reservation: "RSV-88121", project: "Dubai Charter Yacht", amount: 100000, method: "Bank transfer", state: "Pending", date: "Due 03 Oct 2026", iban: "AE07 0331 2345 6789 0123 456", refCode: "BI-88121-AK" },
    { ref: "PAY-55198", reservation: "RSV-88097", project: "Business Bay Commercial Tower", amount: 40000, method: "Bank transfer", state: "Cleared", date: "05 Sep 2026", iban: "—", refCode: "BI-88097-AK" }
  ],

  investments: [
    { projectId: "property", project: "Business Bay Commercial Tower", units: 10, capital: 200000, cls: "Class B", issued: "20 Aug 2026", tranchePct: "4.0%", totalPct: "3.2%", cert: "CRT-2026-0912" },
    { projectId: "yacht", project: "Dubai Charter Yacht", units: 4, capital: 80000, cls: "Class B", issued: "20 Aug 2026", tranchePct: "4.0%", totalPct: "3.2%", cert: "CRT-2026-0907" }
  ],

  distributions: [
    { project: "Business Bay Commercial Tower", period: "Aug 2026", perUnit: 200, units: 10, gross: 2000, state: "Paid", paidOn: "15 Sep 2026" },
    { project: "Dubai Charter Yacht", period: "Aug 2026", perUnit: 165, units: 4, gross: 660, state: "Paid", paidOn: "15 Sep 2026" },
    { project: "Business Bay Commercial Tower", period: "Sep 2026", perUnit: 210, units: 10, gross: 2100, state: "Approved", paidOn: "15 Oct 2026" }
  ],

  reports: [
    { project: "Business Bay Commercial Tower", period: "August 2026", revenue: 412000, costs: 287000, net: 98400, dist: 84000, published: "15 Sep 2026", status: "Published" },
    { project: "Dubai Charter Yacht", period: "August 2026", revenue: 188000, costs: 121000, net: 53600, dist: 42000, published: "15 Sep 2026", status: "Published" },
    { project: "Business Bay Commercial Tower", period: "September 2026", revenue: 0, costs: 0, net: 0, dist: 0, published: "—", status: "In preparation" }
  ],

  waterfall: [
    ["Revenue", 100000], ["Operating costs (incl. disclosed mgmt fees)", -55000], ["Depreciation", -10000],
    ["Finance costs", -3000], ["Tax expense (illustrative)", -2000], ["Net accounting profit", 30000],
    ["Add back: depreciation (non-cash)", 10000], ["Debt principal repaid", -8000], ["Capital expenditure", -6000],
    ["Increase in cash reserve", -6000], ["Cash available for distribution", 20000]
  ],

  documents: [
    ["Offering terms — Yacht v1.2", "Project", "v1.2 · 12 Sep 2026", "a3f9…c21d"],
    ["Risk acknowledgement (signed)", "Compliance", "Signed 14 Jun 2026", "77b1…0e9a"],
    ["Subscription agreement — RSV-88097", "Legal", "Signed 02 Sep 2026", "e40c…19bb"],
    ["Share certificate CRT-2026-0912", "Register", "Issued 20 Aug 2026", "92de…44f0"],
    ["August 2026 monthly report — Property", "Reporting", "15 Sep 2026", "11aa…78cd"]
  ],

  activity: [
    ["Distribution approved — Sep 2026 (AED 2,100)", "2h ago", "ok"],
    ["August reports published for 2 projects", "14 Sep 2026", "info"],
    ["Payment PAY-55198 cleared — AED 40,000", "05 Sep 2026", "ok"],
    ["Reservation RSV-88121 created — 5 units, Yacht", "28 Sep 2026", "warn"],
    ["KYC review passed — Verified investor", "14 Jun 2026", "ok"]
  ],

  tickets: [
    { id: "TCK-3091", subject: "Update bank details for distributions", state: "Open", date: "26 Sep 2026" },
    { id: "TCK-2988", subject: "August report — question on depreciation line", state: "Resolved", date: "18 Sep 2026" }
  ],

  /* ------- admin ------- */
  adminKpis: [
    ["Eligible investors", "312", "+18 this month", ""],
    ["Reservation conversion", "68%", "+4 pts", ""],
    ["Cleared funding (YTD)", "AED 4.86M", "2 live campaigns", ""],
    ["Defaults (30d)", "3", "2 resolved", "warn"],
    ["Refunds overdue", "0", "All clear", "ok"],
    ["Reconciliation breaks", "2", "Needs review", "warn"],
    ["Reports on time", "100%", "Aug cycle", "ok"],
    ["Payout success", "99.2%", "Last run", "ok"]
  ],

  pipeline: {
    "New": [["Layla H.", "Yacht · 5 units"], ["Omar S.", "Property · 2 units"], ["Nadia R.", "Yacht · 10 units"]],
    "Contacted": [["Vikram P.", "Property · 4 units"], ["Sara M.", "Yacht · 3 units"]],
    "Interested": [["Jonas K.", "Property · 8 units"], ["Priya D.", "Yacht · 2 units"]],
    "Onboarding": [["Tariq A.", "Docs pending"], ["Elena V.", "Address proof"]],
    "Verified": [["Ahmed Khan", "INV-2041"], ["Rashid B.", "INV-2038"]],
    "Reserved": [["Ahmed Khan", "5 units · Yacht"], ["Meera J.", "2 units · Property"]],
    "Paid": [["Khalid N.", "AED 120k"], ["Fatima Z.", "AED 60k"]],
    "Investor": [["+12 active investors", "View all"]]
  },

  compliance: [
    { id: "KYC-118", who: "Sara M.", type: "PEP screening hit", state: "In review", sla: "12h left", risk: "High" },
    { id: "KYC-121", who: "Tariq A.", type: "Address evidence", state: "Awaiting docs", sla: "2d left", risk: "Medium" },
    { id: "KYC-122", who: "Elena V.", type: "Source of funds", state: "In review", sla: "1d left", risk: "Medium" },
    { id: "KYC-115", who: "Rashid B.", type: "Periodic review", state: "Approved", sla: "Done", risk: "Low" }
  ],

  treasury: [
    { ref: "PAY-55219", who: "Ahmed Khan", amount: 100000, state: "Pending", note: "Due 03 Oct 2026" },
    { ref: "PAY-55231", who: "Khalid N.", amount: 120000, state: "Cleared", note: "Matched 28 Sep" },
    { ref: "PAY-55198", who: "Ahmed Khan", amount: 40000, state: "Cleared", note: "Matched 05 Sep" },
    { ref: "PAY-55240", who: "Unknown sender", amount: 60000, state: "Unmatched", note: "Sender name mismatch — exception queue" },
    { ref: "PAY-55244", who: "Meera J.", amount: 20000, state: "Pending", note: "Value date 30 Sep" }
  ],

  register: [
    { holder: "Ahmed Khan", project: "Business Bay Commercial Tower", cls: "Class B", units: 10, effective: "20 Aug 2026", ref: "CRT-2026-0912" },
    { holder: "Ahmed Khan", project: "Dubai Charter Yacht", cls: "Class B", units: 4, effective: "20 Aug 2026", ref: "CRT-2026-0907" },
    { holder: "Khalid N.", project: "Dubai Charter Yacht", cls: "Class B", units: 6, effective: "20 Aug 2026", ref: "CRT-2026-0915" },
    { holder: "Sponsor — BI Holdings", project: "Dubai Charter Yacht", cls: "Class A (sponsor)", units: 20, effective: "01 Aug 2026", ref: "CRT-2026-0801" }
  ],

  audit: [
    ["A. Rahman (Finance)", "Prepared distribution Sep 2026 — Property", "29 Sep 2026 14:02", "ok"],
    ["System", "Reservation RSV-88121 created (idempotency key 9f2c…)", "28 Sep 2026 18:44", "info"],
    ["L. Haddad (Compliance)", "Approved KYC-115 — Rashid B.", "27 Sep 2026 11:20", "ok"],
    ["System", "Payment PAY-55240 routed to exception queue", "27 Sep 2026 09:12", "warn"],
    ["S. Iqbal (Admin)", "Published offering terms Yacht v1.2", "12 Sep 2026 16:05", "info"]
  ],

  team: [
    ["A. Rahman", "Finance", "Prepare recon & distributions", "Cannot release payouts"],
    ["L. Haddad", "Compliance", "Approve eligibility & KYC", "Cannot approve own cases"],
    ["S. Iqbal", "System admin", "Access & infrastructure", "No balance changes — logged"],
    ["M. Osei", "Project analyst", "Prepare offerings", "Cannot publish (IC approves)"]
  ],

  integrations: [
    ["Stripe", "Payments", "Cards + Apple Pay · intl. coverage", "available"],
    ["Network International", "Payments", "UAE cards & bank rails", "available"],
    ["Telr", "Payments", "MENA checkout", "available"],
    ["ComplyCube", "Identity & KYC", "ID + liveness + AML screening", "connected"],
    ["Veriff", "Identity & KYC", "Backup verification lane", "available"],
    ["DocuSign", "E-signature", "Subscription agreements", "connected"],
    ["Twilio", "Messaging", "SMS one-time passcodes", "available"],
    ["WhatsApp Business", "Messaging", "Notices & funding-call alerts", "available"],
    ["Xero", "Accounting", "Approved general ledger sync", "connected"]
  ],

  posts: [
    { slug: "reservation-vs-ownership", title: "Reservation vs ownership: what you actually hold, and when", date: "24 Sep 2026", read: "6 min read", excerpt: "A reservation holds units. Cleared funds plus legal issuance create ownership. Here is exactly where the line sits — and why it protects you.", tag: "How it works" },
    { slug: "distribution-waterfall", title: "The distribution waterfall: from project revenue to your payout", date: "18 Sep 2026", read: "7 min read", excerpt: "Revenue is not profit, and profit is not cash. Walk through a real monthly waterfall and see how AED 100,000 of revenue becomes a AED 200 per-unit distribution.", tag: "Reporting" },
    { slug: "spv-explained", title: "Why every project gets its own company (SPVs, explained plainly)", date: "11 Sep 2026", read: "5 min read", excerpt: "One project, one company, one set of accounts. How ring-fencing keeps a problem in one project from ever touching another.", tag: "Structure" },
    { slug: "illiquidity-holding-period", title: "Illiquidity is a feature, not a bug: planning your holding period", date: "04 Sep 2026", read: "6 min read", excerpt: "There is no sell button. What that means for your planning, how exits actually work, and the questions to ask before you reserve.", tag: "Risk" }
  ]
};

const fmtAED = n => "AED " + Number(n).toLocaleString("en-US");
