/* OwnStakeX — demo dataset (v2). All figures are illustrative demo data. */
const BIDEMO = {
  meta: { brand: "OwnStakeX", version: "1.0-demo", currency: "AED", updated: "29 Sep 2026" },

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
      { label: "Charter yacht", pct: 27, color: "#f0b429" },
      { label: "Cash (pending)", pct: 7, color: "#38bdf8" }
    ]
  },

  projects: [
    {
      id: "yacht", code: "BI-YT-01", name: "Dubai Charter Yacht", category: "Maritime charter",
      location: "Dubai Marina, UAE", country: "UAE", countryName: "United Arab Emirates", img: "assets/yacht.webp", video: "assets/videos/yacht.mp4", status: "funding",
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
      docs: [["Offering terms v1.2", "PDF · 2.1 MB", "docs/yacht-offering-terms-v1-2.pdf"], ["Risk acknowledgement", "PDF · 310 KB", "docs/yacht-risk-acknowledgement.pdf"], ["Independent survey summary", "PDF · 1.4 MB", "docs/yacht-survey-summary.pdf"], ["Operator agreement summary", "PDF · 880 KB", "docs/yacht-operator-agreement-summary.pdf"], ["Valuation report — Sep 2026", "PDF · 1.1 MB", "docs/yacht-valuation-sep-2026.pdf"]],
      timeline: [["Campaign opens", "01 Oct 2026"], ["Funding call (if fully reserved)", "05 Nov 2026"], ["Long stop date", "30 Nov 2026"], ["Legal closing & issuance", "Dec 2026"], ["First monthly report", "15 Jan 2027"]]
    },
    {
      id: "property", code: "BI-CP-02", name: "Business Bay Commercial Tower — Levels 12–14", category: "Commercial property",
      location: "Business Bay, Dubai, UAE", country: "UAE", countryName: "United Arab Emirates", img: "assets/property.webp", video: "assets/videos/property.mp4", status: "funding",
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
      docs: [["Offering terms v1.0", "PDF · 2.4 MB", "docs/property-offering-terms-v1-0.pdf"], ["Risk acknowledgement", "PDF · 310 KB", "docs/property-risk-acknowledgement.pdf"], ["Title & encumbrance review", "PDF · 980 KB", "docs/property-title-review.pdf"], ["Tenancy schedule (redacted)", "PDF · 1.2 MB", "docs/property-tenancy-schedule.pdf"], ["Valuation report — Aug 2026", "PDF · 1.6 MB", "docs/property-valuation-aug-2026.pdf"]],
      timeline: [["Campaign opens", "15 Sep 2026"], ["Funding call (if fully reserved)", "05 Dec 2026"], ["Long stop date", "15 Dec 2026"], ["Legal closing & issuance", "Jan 2027"], ["First monthly report", "15 Feb 2027"]]
    },
    {
      id: "restaurant", code: "BI-RS-03", name: "JBR Flagship Restaurant", category: "Hospitality",
      location: "JBR, Dubai, UAE", country: "UAE", countryName: "United Arab Emirates", img: "assets/restaurant.webp", video: "assets/videos/restaurant.mp4", status: "evaluation",
      tagline: "A flagship dining outlet under evaluation — revenue reconciliation in progress.",
      capital: 3200000, units: 160, unitPrice: 20000, reserved: 0, funded: 0,
      min: 1, max: 20, operator: "Under selection", issuer: "TBC", longStop: "TBC", campaignEnds: "TBC", version: "draft",
      budget: [["Fit-out & kitchen", 1800000], ["Licences & approvals", 320000], ["Launch working capital", 780000], ["Reserve", 300000]],
      risks: ["Still under evaluation — no offer has been approved.", "Restaurant revenue is volatile and operator-dependent."],
      docs: [["Evaluation note (summary)", "PDF · 420 KB", "docs/restaurant-evaluation-note.pdf"], ["Risk acknowledgement", "PDF · 300 KB", "docs/restaurant-risk-acknowledgement.pdf"]],
      timeline: [["Evaluation", "In progress"], ["Investment committee review", "Oct 2026"]]
    },
    {
      id: "falcon", code: "BI-FX-04", name: "Project Falcon — FX Brokerage Equity", category: "Financial services",
      location: "Under review", country: "UAE", countryName: "United Arab Emirates", img: "", video: "assets/videos/falcon.mp4", status: "review",
      tagline: "Brokerage equity requires separate regulatory approval before any offer can be made.",
      capital: 0, units: 0, unitPrice: 0, reserved: 0, funded: 0,
      min: 0, max: 0, operator: "—", issuer: "—", longStop: "—", campaignEnds: "—", version: "—",
      budget: [], risks: ["Not an approved product. Subscriptions are never trader deposits."], docs: [["Evaluation note (summary)", "PDF · 350 KB", "docs/falcon-evaluation-note.pdf"]], timeline: [["Regulatory review", "Pending"]]
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
    ["Offering terms — Yacht v1.2", "Project", "v1.2 · 12 Sep 2026", "a3f9…c21d", "docs/yacht-offering-terms-v1-2.pdf"],
    ["Risk acknowledgement (signed)", "Compliance", "Signed 14 Jun 2026", "77b1…0e9a", "docs/yacht-risk-acknowledgement.pdf"],
    ["Subscription agreement — RSV-88097", "Legal", "Signed 02 Sep 2026", "e40c…19bb", "docs/subscription-agreement-rsv-88097.pdf"],
    ["Share certificate CRT-2026-0912", "Register", "Issued 20 Aug 2026", "92de…44f0", "docs/share-certificate-crt-2026-0912.pdf"],
    ["August 2026 monthly report — Property", "Reporting", "15 Sep 2026", "11aa…78cd", "docs/monthly-report-aug-2026-property.pdf"]
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


  referralProgram: {
    levels: [
      { level: 1, label: "Direct", rate: 2.5, desc: "Investors who join with your link" },
      { level: 2, label: "Level 2", rate: 1.25, desc: "Investors invited by your direct referrals" },
      { level: 3, label: "Level 3", rate: 0.50, desc: "Investors invited at the third level" }
    ],
    minPayout: 500, cookieDays: 90,
    terms: [
      "Commission is calculated on cleared, funded investment only — reservations do not earn commission.",
      "Commission becomes payable after the 14-day cooling period on the referred investment.",
      "Minimum payout AED 500; smaller balances roll forward to the next cycle.",
      "Self-referrals and duplicate accounts earn no commission and may close the IB account.",
      "The program applies to demo data in this build; production terms are set by governance."
    ]
  },

  myReferral: {
    code: "INV-2041",
    url: "https://dawoodshah2232-svg.github.io/bridging-investments/investor/login.html?ref=INV-2041",
    network: [
      { level: 1, name: "Sara M.", id: "INV-3102", invested: 60000, date: "12 Jul 2026", via: "Direct" },
      { level: 1, name: "Omar K.", id: "INV-3188", invested: 40000, date: "28 Jul 2026", via: "Direct" },
      { level: 2, name: "Layla H.", id: "INV-3241", invested: 100000, date: "09 Aug 2026", via: "Sara M." },
      { level: 2, name: "Yusuf R.", id: "INV-3290", invested: 20000, date: "17 Aug 2026", via: "Omar K." },
      { level: 3, name: "Nadia S.", id: "INV-3355", invested: 80000, date: "02 Sep 2026", via: "Layla H." }
    ],
    ledger: [
      { id: "COM-904", from: "Sara M.", level: 1, base: 60000, rate: 2.5, amount: 1500, status: "Approved", date: "12 Jul 2026" },
      { id: "COM-905", from: "Omar K.", level: 1, base: 40000, rate: 2.5, amount: 1000, status: "Paid", date: "28 Jul 2026" },
      { id: "COM-906", from: "Layla H.", level: 2, base: 100000, rate: 1.25, amount: 1250, status: "Pending", date: "09 Aug 2026" },
      { id: "COM-907", from: "Yusuf R.", level: 2, base: 20000, rate: 1.25, amount: 250, status: "Approved", date: "17 Aug 2026" },
      { id: "COM-908", from: "Nadia S.", level: 3, base: 80000, rate: 0.50, amount: 400, status: "Pending", date: "02 Sep 2026" }
    ]
  },

  ibApplications: [
    { id: "IB-201", name: "Faisal D.", email: "faisal.d@sample.ae", country: "UAE", exp: "5 yrs FX introducing broker", status: "Pending", date: "27 Sep 2026" },
    { id: "IB-202", name: "Maria C.", email: "maria.c@sample.ae", country: "Philippines", exp: "2 yrs community manager, 40k followers", status: "Pending", date: "28 Sep 2026" },
    { id: "IB-203", name: "Tariq A.", email: "tariq.a@sample.ae", country: "UAE", exp: "Real-estate broker network, Dubai", status: "Approved", date: "20 Sep 2026" },
    { id: "IB-204", name: "John P.", email: "john.p@sample.ae", country: "UK", exp: "No relevant experience declared", status: "Rejected", date: "18 Sep 2026" }
  ],

  ibNetwork: [
    { level: 1, ib: "Tariq A.", name: "Hassan B.", id: "INV-3401", invested: 120000, date: "21 Sep 2026" },
    { level: 1, ib: "Tariq A.", name: "Rania F.", id: "INV-3418", invested: 40000, date: "24 Sep 2026" },
    { level: 2, ib: "Tariq A.", name: "Khalid N.", id: "INV-3440", invested: 60000, date: "26 Sep 2026", via: "Hassan B." },
    { level: 1, ib: "Sara M.", name: "Layla H.", id: "INV-3241", invested: 100000, date: "09 Aug 2026" },
    { level: 3, ib: "Sara M.", name: "Nadia S.", id: "INV-3355", invested: 80000, date: "02 Sep 2026", via: "Layla H." }
  ],

  ibLedger: [
    { id: "COM-910", ib: "Tariq A.", from: "Hassan B.", level: 1, base: 120000, rate: 2.5, amount: 3000, status: "Pending", date: "21 Sep 2026" },
    { id: "COM-911", ib: "Tariq A.", from: "Rania F.", level: 1, base: 40000, rate: 2.5, amount: 1000, status: "Pending", date: "24 Sep 2026" },
    { id: "COM-912", ib: "Tariq A.", from: "Khalid N.", level: 2, base: 60000, rate: 1.25, amount: 750, status: "Pending", date: "26 Sep 2026" },
    { id: "COM-904", ib: "Ahmed Khan", from: "Sara M.", level: 1, base: 60000, rate: 2.5, amount: 1500, status: "Approved", date: "12 Jul 2026" },
    { id: "COM-906", ib: "Ahmed Khan", from: "Layla H.", level: 2, base: 100000, rate: 1.25, amount: 1250, status: "Pending", date: "09 Aug 2026" }
  ],

  notifications: [
    { id: "N-1", title: "Distribution approved — Sep 2026", body: "AED 2,100 approved to your Emirates NBD **** 4418.", time: "2h ago", read: false },
    { id: "N-2", title: "Commission approved", body: "AED 1,500 (COM-904) from Sara M. — Level 1.", time: "10 Sep 2026", read: false },
    { id: "N-3", title: "August reports published", body: "Monthly reports are ready for 2 projects.", time: "14 Sep 2026", read: true },
    { id: "N-4", title: "Payment cleared", body: "PAY-55198 — AED 40,000 received and allocated.", time: "05 Sep 2026", read: true }
  ],

  announcements: [
    { id: "AN-31", title: "September distributions approved", audience: "All investors", date: "29 Sep 2026", status: "Published" },
    { id: "AN-30", title: "New document: Yacht valuation — Sep 2026", audience: "Yacht investors", date: "15 Sep 2026", status: "Published" }
  ],

  auditSeed: [
    { time: "29 Sep 2026 · 09:41", actor: "S. Iqbal", action: "Commission approved", detail: "COM-904 · AED 1,500 · Sara M. (Level 1)" },
    { time: "28 Sep 2026 · 16:02", actor: "S. Iqbal", action: "IB application approved", detail: "IB-203 · Tariq A." },
    { time: "27 Sep 2026 · 11:20", actor: "System", action: "Reports published", detail: "August 2026 · 2 projects" }
  ],

  statementTx: [
    ["05 Sep 2026", "PAY-55198", "Investment funding — Yacht (2 units)", 40000, "Cleared"],
    ["15 Sep 2026", "DIST-2091", "Distribution — Property, Aug 2026", 2100, "Paid"],
    ["28 Jul 2026", "COM-905", "Referral commission — Omar K. (L1)", 1000, "Paid"],
    ["12 Jul 2026", "COM-904", "Referral commission — Sara M. (L1)", 1500, "Approved"]
  ],

  posts: [
    { slug: "reading-financial-statements-basics", img: "assets/blog/reading-financial-statements-basics.jpg", title: "Financial Statements in 10 Minutes: What Actually Matters", date: "7 Oct 2026", read: "4 min read", excerpt: "You do not need an accounting degree — three documents and ten minutes will tell you most of what matters.", tag: "Investor guide" },
    { slug: "fee-schedule-reading", img: "assets/blog/fee-schedule-reading.jpg", title: "Reading the Fee Schedule: Every Fee, Disclosed", date: "7 Oct 2026", read: "4 min read", excerpt: "Every private investment has fees — here is how to find them, understand them, and judge them fairly.", tag: "How it works" },
    { slug: "commercial-vs-residential-investing", img: "assets/blog/commercial-vs-residential-investing.jpg", title: "Commercial vs Residential Property: Cash Flow, Leases and Effort", date: "7 Oct 2026", read: "4 min read", excerpt: "A villa and an office floor are both property — but the cash, the leases and the effort are almost entirely different investments.", tag: "Market" },
    { slug: "emergency-fund-first", img: "assets/blog/emergency-fund-first.jpg", title: "Before You Invest: The Emergency Fund Comes First", date: "6 Oct 2026", read: "4 min read", excerpt: "The least exciting money you'll ever hold is the reason everything else can stay invested.", tag: "Investor guide" },
    { slug: "distribution-calendar", img: "assets/blog/distribution-calendar.jpg", title: "The Distribution Calendar: When Money Moves and Why", date: "6 Oct 2026", read: "5 min read", excerpt: "Revenue arrives daily, payouts arrive on a schedule — the monthly timetable that turns an asset's earnings into money in your account.", tag: "Reporting" },
    { slug: "gcc-tourism-vision-impact", img: "assets/blog/gcc-tourism-vision-impact.jpg", title: "GCC Tourism Targets and What They Mean for Hospitality Assets", date: "6 Oct 2026", read: "5 min read", excerpt: "Tourism targets are the backdrop behind every hospitality revenue projection — here's what they promise and what they don't.", tag: "Market" },
    { slug: "cash-flow-vs-capital-growth", img: "assets/blog/cash-flow-vs-capital-growth.jpg", title: "Cash Flow vs Capital Growth: Know Which Game You Are Playing", date: "5 Oct 2026", read: "5 min read", excerpt: "Cash flow or capital growth — pick the game before you reserve, and judge every holding by its own rules.", tag: "Investor guide" },
    { slug: "document-room-guide", img: "assets/blog/document-room-guide.jpg", title: "The Document Room: Which Papers Matter Most", date: "5 Oct 2026", read: "5 min read", excerpt: "Twenty focused minutes on the five documents that actually protect your capital in a private investment.", tag: "How it works" },
    { slug: "occupancy-rate-truth", img: "assets/blog/occupancy-rate-truth.jpg", title: "“94% Occupied” — What Occupancy Figures Do and Don't Tell You", date: "5 Oct 2026", read: "5 min read", excerpt: "Occupancy is a summary, not a fact — here is how to read the leases behind the headline before you trust it.", tag: "Market" },
    { slug: "holding-period-mindset", img: "assets/blog/holding-period-mindset.jpg", title: "Thinking in Holding Periods, Not Headlines", date: "4 Oct 2026", read: "4 min read", excerpt: "Private assets reward patience. How to match an asset to your time horizon and ignore the noise in between.", tag: "Investor guide" },
    { slug: "long-stop-date-meaning", img: "assets/blog/long-stop-date-meaning.jpg", title: "The Long-Stop Date: Your Backstop If a Campaign Stalls", date: "4 Oct 2026", read: "4 min read", excerpt: "Every campaign carries a long-stop date. What it means, what happens when it hits, and why it's there for your protection.", tag: "How it works" },
    { slug: "dubai-marina-berth-economics", img: "assets/blog/dubai-marina-berth-economics.jpg", title: "Berth Economics: The Hidden Cost Line in Every Yacht Investment", date: "4 Oct 2026", read: "5 min read", excerpt: "The berth is often the largest fixed cost of a yacht investment. Here's how to read that cost line honestly.", tag: "Market" },
    { slug: "red-flags-private-offers", img: "assets/blog/red-flags-private-offers.jpg", title: "Red flags in private investment offers", date: "3 Oct 2026", read: "4 min read", excerpt: "Seven warning signs that separate serious private offers from ones to walk away from.", tag: "Investor guide" },
    { slug: "funding-call-process", img: "assets/blog/funding-call-process.jpg", title: "The funding call: what happens when a campaign fills", date: "3 Oct 2026", read: "4 min read", excerpt: "From payment reconciliation to your certificate: the five steps that close a filled campaign.", tag: "How it works" },
    { slug: "offplan-vs-tenanted-property", img: "assets/blog/offplan-vs-tenanted-property.jpg", title: "Off-plan vs tenanted: which commercial property suits shared ownership", date: "3 Oct 2026", read: "4 min read", excerpt: "Off-plan and tenanted commercial assets suit different investors — here is where the risk really sits in each.", tag: "Market" },
    { slug: "questions-to-ask-operator", img: "assets/blog/questions-to-ask-operator.jpg", title: "12 questions to ask any project operator", date: "2 Oct 2026", read: "6 min read", excerpt: "Before committing capital to any private project, ask the operator these twelve questions — and watch how they answer.", tag: "Investor guide" },
    { slug: "certificate-register-entry", img: "assets/blog/certificate-register-entry.jpg", title: "Your certificate and register entry: proof of ownership", date: "2 Oct 2026", read: "5 min read", excerpt: "Two documents confirm your stake in a project: the ownership certificate and the investor register entry. Here's what each one does.", tag: "How it works" },
    { slug: "jbr-hospitality-footfall", img: "assets/blog/jbr-hospitality-footfall.jpg", title: "What drives a JBR restaurant's revenue: footfall, not food", date: "2 Oct 2026", read: "5 min read", excerpt: "A restaurant on The Walk lives or dies on the number of people passing its door — here's how hospitality investors should read footfall.", tag: "Market" },
    { slug: "risk-tolerance-honest-test", img: "assets/blog/risk-tolerance-honest-test.jpg", title: "Risk tolerance: an honest test before you commit capital", date: "1 Oct 2026", read: "6 min read", excerpt: "Every investor has a risk tolerance. Almost everyone's is lower than they think — they just haven't met it yet.", tag: "Investor guide" },
    { slug: "payment-reconciliation-explained", img: "assets/blog/payment-reconciliation-explained.jpg", title: "Payment reconciliation: how your money finds your reservation", date: "1 Oct 2026", read: "5 min read", excerpt: "Your transfer doesn't know what it was for. Reconciliation is the quiet process that connects every payment to its reservation.", tag: "How it works" },
    { slug: "yacht-charter-seasonality", img: "assets/blog/yacht-charter-seasonality.jpg", title: "Why charter income is seasonal — and how operators smooth it", date: "1 Oct 2026", read: "6 min read", excerpt: "A yacht can earn handsomely in March and sit quiet in August. Here's what seasonal charter income really means for investors.", tag: "Market" },
    { slug: "diversification-private-assets", img: "assets/blog/diversification-private-assets.webp", title: "Diversification with private assets: how many projects is enough", date: "30 Sep 2026", read: "5 min read", excerpt: "Diversification is about narrowing the range of bad outcomes, not raising the average — and it is a discipline, not a product feature.", tag: "Investor guide" },
    { slug: "kyc-what-we-check", img: "assets/blog/kyc-what-we-check.webp", title: "KYC: what we check and why it protects you", date: "30 Sep 2026", read: "4 min read", excerpt: "Identity, address, sanctions screening and source of funds — what happens in verification and why it protects your money.", tag: "How it works" },
    { slug: "business-bay-vs-difc-offices", img: "assets/blog/business-bay-vs-difc-offices.webp", title: "Business Bay vs DIFC: two office markets, two investor profiles", date: "30 Sep 2026", read: "5 min read", excerpt: "DIFC offers blue-chip tenants and stability; Business Bay offers higher yields with more management. Which suits your risk appetite?", tag: "Market" },
    { slug: "due-diligence-checklist", title: "The 10-point checklist before you invest in anything private", date: "30 Sep 2026", read: "7 min read", excerpt: "Twenty minutes that protect your capital. The ten questions every private investment must survive.", tag: "Investor guide" },
    { slug: "guaranteed-returns-myth", title: "Guaranteed returns: why the phrase itself is the warning", date: "30 Sep 2026", read: "5 min read", excerpt: "No honest investment guarantees returns. The tricks behind the word — and the one-sentence test that protects you.", tag: "Investor guide" },
    { slug: "monthly-report-anatomy", title: "Anatomy of a monthly report: every section explained", date: "30 Sep 2026", read: "6 min read", excerpt: "Six sections, ten minutes a month. How to read a project report like an insider and spot trouble early.", tag: "Reporting" },
    { slug: "how-reservations-work", title: "How reservations work: the 60-second version", date: "30 Sep 2026", read: "4 min read", excerpt: "A reservation is a time-limited hold with a real countdown. What happens when you click reserve — and what it is not.", tag: "How it works" },
    { slug: "fractional-ownership-gcc-trend", title: "Fractional ownership is growing in the GCC — here is what is driving it", date: "30 Sep 2026", read: "5 min read", excerpt: "Smaller tickets, real assets, monthly income, lighter paperwork. The four forces behind the shift — and what hasn't changed.", tag: "Market" },
    { slug: "dubai-commercial-yields-explained", title: "How commercial yields work in Dubai, and what net really means", date: "30 Sep 2026", read: "6 min read", excerpt: "Gross yield is a headline. Net yield is what reaches your pocket. How to read the difference before you invest.", tag: "Market" },
    { slug: "reservation-vs-ownership", title: "Reservation vs ownership: what you actually hold, and when", date: "24 Sep 2026", read: "6 min read", excerpt: "A reservation holds units. Cleared funds plus legal issuance create ownership. Here is exactly where the line sits — and why it protects you.", tag: "How it works" },
    { slug: "distribution-waterfall", title: "The distribution waterfall: from project revenue to your payout", date: "18 Sep 2026", read: "7 min read", excerpt: "Revenue is not profit, and profit is not cash. Walk through a real monthly waterfall and see how AED 100,000 of revenue becomes a AED 200 per-unit distribution.", tag: "Reporting" },
    { slug: "spv-explained", title: "Why every project gets its own company (SPVs, explained plainly)", date: "11 Sep 2026", read: "5 min read", excerpt: "One project, one company, one set of accounts. How ring-fencing keeps a problem in one project from ever touching another.", tag: "Structure" },
    { slug: "illiquidity-holding-period", title: "Illiquidity is a feature, not a bug: planning your holding period", date: "04 Sep 2026", read: "6 min read", excerpt: "There is no sell button. What that means for your planning, how exits actually work, and the questions to ask before you reserve.", tag: "Risk" }
  ]
};

/* Admin-managed projects: overrides to built-ins + brand-new projects (localStorage).
   Public pages merge these in so admin edits appear on the site the same way. */
(function () {
  try {
    const ov = JSON.parse(localStorage.getItem("bi_projects_overrides") || "{}");
    const custom = JSON.parse(localStorage.getItem("bi_projects_custom") || "[]");
    BIDEMO.projects = BIDEMO.projects
      .map(p => Object.assign({}, p, ov[p.id] || {}))
      .concat(custom.filter(c => c && c.id && c.name));
    BIDEMO.projectIsCustom = id => { try { return JSON.parse(localStorage.getItem("bi_projects_custom") || "[]").some(c => c && c.id === id); } catch (e) { return false; } };
  } catch (e) { BIDEMO.projectIsCustom = () => false; }
})();

const fmtAED = n => "AED " + Number(n).toLocaleString("en-US");
window.BIDEMO = BIDEMO; window.fmtAED = fmtAED;
