#!/usr/bin/env python3
"""Generate sample/demo PDF documents for the Bridging Investments portal.
Every page is watermarked SAMPLE DEMO - illustrative only, not a legal instrument."""
import os
from fpdf import FPDF

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "docs")
os.makedirs(OUT, exist_ok=True)

ORANGE = (232, 121, 12)
GOLD = (201, 162, 39)
NAVY = (11, 18, 32)
INK = (24, 32, 48)
MUTED = (107, 120, 140)
LINE = (226, 232, 240)
BANNER_BG = (255, 243, 224)

DISCLAIMER = ("SAMPLE DEMO DOCUMENT - ILLUSTRATIVE ONLY. This document is a demonstration sample "
              "generated for the Bridging Investments client demo. It is not a legal instrument, "
              "not an offer, and creates no rights or obligations. Capital at risk.")

_ASCII = str.maketrans({"\u2022": "-", "\u2014": "-", "\u2013": "-", "\u2018": "'",
                        "\u2019": "'", "\u201c": '"', "\u201d": '"', "\u2026": "..."})

def asc(t):
    return t.translate(_ASCII) if isinstance(t, str) else t

class Doc(FPDF):
    def __init__(self, title, subtitle, meta):
        super().__init__()
        self.doc_title = title
        self.doc_sub = subtitle
        self.doc_meta = meta
        self.set_auto_page_break(True, 22)

    def header(self):
        if self.page_no() == 1:
            return
        self.set_fill_color(*NAVY)
        self.rect(0, 0, 210, 14, "F")
        self.set_xy(10, 4)
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(255, 255, 255)
        self.cell(120, 6, "Bridging Investments  |  SAMPLE DEMO DOCUMENT")
        self.set_xy(-60, 4)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*GOLD)
        self.cell(50, 6, self.doc_meta, align="R")

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-18)
        self.set_draw_color(*LINE)
        self.line(10, self.get_y(), 200, self.get_y())
        self.set_font("Helvetica", "", 7)
        self.set_text_color(*MUTED)
        self.multi_cell(0, 3.5, DISCLAIMER)
        self.set_xy(10, -9)
        self.cell(90, 4, "Integrity hash: %s" % self.doc_meta.split("|")[0].strip())
        self.set_xy(-60, -9)
        self.cell(50, 4, "Page %d" % self.page_no(), align="R")

    def cover(self, project, version, date, ref):
        self.add_page()
        self.set_fill_color(*NAVY)
        self.rect(0, 0, 210, 297, "F")
        # orange rule
        self.set_fill_color(*ORANGE)
        self.rect(0, 64, 210, 2, "F")
        self.set_xy(18, 76)
        self.set_font("Helvetica", "B", 26)
        self.set_text_color(*ORANGE)
        self.multi_cell(174, 11, asc(self.doc_title))
        self.set_x(18)
        self.set_font("Helvetica", "", 13)
        self.set_text_color(255, 255, 255)
        self.multi_cell(174, 7, asc(self.doc_sub))
        self.set_xy(18, 150)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(*GOLD)
        for line in [project, "Version %s  |  %s" % (version, date), "Ref %s" % ref]:
            self.cell(0, 7, asc(line), new_x="LMARGIN", new_y="NEXT")
        # demo badge
        self.set_xy(18, 210)
        self.set_fill_color(*BANNER_BG)
        self.set_draw_color(*ORANGE)
        self.rect(18, 208, 174, 26, "DF")
        self.set_xy(24, 211)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(*ORANGE)
        self.cell(0, 6, "SAMPLE - DEMO DOCUMENT")
        self.set_xy(24, 218)
        self.set_font("Helvetica", "", 8.5)
        self.set_text_color(*INK)
        self.multi_cell(162, 4.5, asc("Illustrative only. Not an offer, not advice, not a legal instrument. Capital at risk."))

    def h1(self, t):
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(*NAVY)
        self.cell(0, 9, asc(t), new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*ORANGE)
        self.set_line_width(0.8)
        self.line(10, self.get_y(), 52, self.get_y())
        self.ln(4)

    def h2(self, t):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(*INK)
        self.cell(0, 7, asc(t), new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def p(self, t):
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(*INK)
        self.multi_cell(0, 5.2, asc(t))
        self.ln(2)

    def bullets(self, items):
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(*INK)
        for b in items:
            self.set_x(self.l_margin)
            self.cell(5, 5.2, "-")
            self.multi_cell(0, 5.2, asc(b), new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def table(self, head, rows):
        self.set_font("Helvetica", "B", 9)
        self.set_fill_color(*NAVY)
        self.set_text_color(255, 255, 255)
        n = len(head)
        w = [190.0 / n] * n
        for i, h in enumerate(head):
            self.cell(w[i], 7, asc(" " + h), fill=True)
        self.ln()
        self.set_font("Helvetica", "", 9)
        self.set_text_color(*INK)
        alt = False
        for r in rows:
            if alt:
                self.set_fill_color(248, 250, 252)
            for i, c in enumerate(r):
                self.cell(w[i], 6.5, asc(" " + str(c)), fill=alt)
            self.ln()
            alt = not alt
        self.ln(3)

    def warnbox(self, t):
        self.set_fill_color(*BANNER_BG)
        self.set_draw_color(*ORANGE)
        y = self.get_y()
        self.set_xy(10, y)
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(*ORANGE)
        self.multi_cell(190, 5.2, asc("PLEASE READ - " + t), border=0)
        h = self.get_y() - y + 2
        self.rect(10, y - 1, 190, h)
        self.ln(4)


def aed(n):
    return "AED %s" % f"{n:,}"


def build(spec):
    d = Doc(spec["title"], spec["subtitle"], spec["meta"])
    d.cover(spec["project"], spec["version"], spec["date"], spec["ref"])
    for block in spec["body"]:
        kind = block[0]
        if kind == "h1":
            d.add_page()
            d.h1(block[1])
        elif kind == "h2":
            d.h2(block[1])
        elif kind == "p":
            d.p(block[1])
        elif kind == "bullets":
            d.bullets(block[1])
        elif kind == "table":
            d.table(block[1], block[2])
        elif kind == "warn":
            d.warnbox(block[1])
    path = os.path.join(OUT, spec["file"])
    d.output(path)
    print("wrote", spec["file"], os.path.getsize(path) // 1024, "KB")


YACHT = "Dubai Charter Yacht (BI-YT-01)"
PROP = "Business Bay Commercial Tower, Levels 12-14 (BI-CP-02)"
REST = "JBR Flagship Restaurant (BI-RS-03)"
FALCON = "Project Falcon - FX Brokerage Equity (BI-FX-04)"

SPECS = [
 dict(file="yacht-offering-terms-v1-2.pdf", title="Offering Terms", subtitle="Dubai Charter Yacht - private placement of charter-yacht participation units",
      meta="a3f9c21d | 12 Sep 2026", project=YACHT, version="v1.2", date="12 Sep 2026", ref="BI-YT-01/OT/1.2",
 body=[
  ("h1","1. The offer"),
  ("p","BI Yacht One Ltd (the Issuer) offers up to 100 participation units at AED 20,000 per unit (the Offer). A reservation made through the Bridging Investments portal is an expression of interest only and does not constitute ownership, a binding subscription, or a concluded contract."),
  ("h2","Key terms"),
  ("table",["Term","Detail"],[["Issuer","BI Yacht One Ltd"],["Asset","Motor yacht, Dubai registered"],["Unit price",aed(20000)],["Units offered","100"],["Minimum / maximum","1 / 10 units"],["Offer version","v1.2 dated 12 Sep 2026"],["Long-stop date","30 Nov 2026"]]),
  ("h1","2. Use of proceeds (illustrative budget)"),
  ("table",["Item","AED"],[["Yacht purchase","1,500,000"],["Survey, registration & insurance setup","100,000"],["Refit & charter launch","150,000"],["Working capital & maintenance reserve","200,000"],["Legal setup & disclosed closing fees","50,000"],["TOTAL","2,000,000"]]),
  ("h1","3. Reservation, funding and issuance"),
  ("bullets",["A reservation locks the offered unit price for 72 hours while payment is arranged.","Ownership is issued only after cleared funds, signed subscription documents, and legal registration.","If the funding call is not met by the long-stop date, reservations lapse and any amounts held are returned."]),
  ("warn","Capital at risk. You may get back less than you invest. Charter income is seasonal and never guaranteed. This sample document is illustrative only."),
 ]),
 dict(file="yacht-risk-acknowledgement.pdf", title="Risk Acknowledgement", subtitle="Dubai Charter Yacht - confirmation that the investor understands the risks",
      meta="77b10e9a | 14 Jun 2026", project=YACHT, version="v1.0", date="14 Jun 2026", ref="BI-YT-01/RA/1.0",
 body=[
  ("h1","1. Statement of understanding (sample)"),
  ("p","By signing, the investor confirms they have read the offering terms and understand the risks below. This is a sample acknowledgement for demonstration purposes."),
  ("h2","Principal risks"),
  ("bullets",["Charter revenue is seasonal and not guaranteed.","The yacht is a single physical asset - damage or downtime reduces income.","Holdings are illiquid; no public market exists for the units.","Capital is at risk; you may get back less than you invest.","Distributions depend on actual net cash generated and are never fixed."]),
  ("h1","2. Signatures (sample block)"),
  ("table",["Field","Detail"],[["Investor name","Ahmed Khan (sample)"],["Investor ID","INV-2041"],["Date signed","14 Jun 2026"],["Status","SAMPLE - not a real signature"]]),
  ("warn","Never invest money you cannot afford to lose. Seek independent financial advice before any real commitment."),
 ]),
 dict(file="yacht-survey-summary.pdf", title="Independent Survey Summary", subtitle="Dubai Charter Yacht - marine surveyor's condition summary (sample)",
      meta="5c1d88f2 | 28 Aug 2026", project=YACHT, version="v1.0", date="28 Aug 2026", ref="BI-YT-01/SV/1.0",
 body=[
  ("h1","1. Survey scope (sample)"),
  ("p","This summary illustrates the form of an independent marine survey. A licensed marine surveyor inspected hull, machinery, safety equipment and documentation. This sample contains illustrative findings only."),
  ("h2","Illustrative findings"),
  ("table",["Area","Sample finding"],[["Hull & structure","Satisfactory for age; antifouling due within 6 months"],["Main engines","Service history complete; 120h since overhaul"],["Safety equipment","Meets commercial charter coding (sample)"],["Documentation","Registration and insurance in order (sample)"]]),
  ("h1","2. Surveyor's illustrative opinion"),
  ("p","On the basis of the sample inspection described above, the vessel is presented as suitable, subject to the noted maintenance items, for the intended commercial charter use. Valuations and opinions in a live transaction would be issued by the appointed surveyor directly."),
  ("warn","Sample content. A real survey would be commissioned independently and addressed to the issuer's counsel."),
 ]),
 dict(file="yacht-operator-agreement-summary.pdf", title="Operator Agreement Summary", subtitle="Dubai Charter Yacht - key commercial terms with the charter operator (sample)",
      meta="9e77a410 | 02 Sep 2026", project=YACHT, version="v1.0", date="02 Sep 2026", ref="BI-YT-01/OA/1.0",
 body=[
  ("h1","1. Parties and term (sample)"),
  ("table",["Term","Sample detail"],[["Operator","Harbourline Charter Services LLC (sample)"],["Term","3 years from legal closing"],["Scope","Day charters, events and term hire out of Dubai Harbour"]]),
  ("h1","2. Commercial summary (sample)"),
  ("bullets",["Operator markets, crews and maintains the yacht under an approved operating budget.","Net charter revenue (after operating costs and disclosed management fees) flows to the issuer monthly.","Either party may terminate for material breach with 90 days' notice (sample).","Full agreement is disclosed in the data room before any funding call."]),
  ("warn","Sample summary only. The executed agreement governs; summaries do not override it."),
 ]),
 dict(file="yacht-valuation-sep-2026.pdf", title="Valuation Report", subtitle="Dubai Charter Yacht - indicative market valuation, September 2026 (sample)",
      meta="b31f60de | 15 Sep 2026", project=YACHT, version="Sep 2026", date="15 Sep 2026", ref="BI-YT-01/VL/2026-09",
 body=[
  ("h1","1. Basis of valuation (sample)"),
  ("p","Indicative market valuation prepared on a sample basis using comparable recent sales of similar motor yachts in the GCC charter market. Illustrative only."),
  ("h2","Illustrative valuation"),
  ("table",["Component","AED (sample)"],[["Hull & machinery","1,350,000"],["Refit & equipment uplift","150,000"],["Indicative market value","1,500,000"]]),
  ("h1","2. Limiting conditions"),
  ("bullets",["Sample figures; a live valuation would be addressed to the issuer by a qualified valuer.","Market values move; the figure above is a point-in-time illustration.","Valuation is not a promise of resale price or of investment return."]),
  ("warn","Capital at risk. Past or illustrated values do not predict future performance."),
 ]),
 dict(file="property-offering-terms-v1-0.pdf", title="Offering Terms", subtitle="Business Bay Commercial Tower - private placement of rental-income participation units",
      meta="d4e812aa | 15 Sep 2026", project=PROP, version="v1.0", date="15 Sep 2026", ref="BI-CP-02/OT/1.0",
 body=[
  ("h1","1. The offer"),
  ("p","BI Property Two Ltd (the Issuer) offers up to 250 participation units at AED 20,000 per unit (the Offer), referencing three tenanted office floors in Business Bay, Dubai. Reservations are expressions of interest only."),
  ("h2","Key terms"),
  ("table",["Term","Detail"],[["Issuer","BI Property Two Ltd"],["Asset","Office floors 12-14, Business Bay"],["Unit price",aed(20000)],["Units offered","250"],["Occupancy (stated)","94% (sample)"],["Offer version","v1.0 dated 15 Sep 2026"],["Long-stop date","15 Dec 2026"]]),
  ("h1","2. Use of proceeds (illustrative budget)"),
  ("table",["Item","AED"],[["Property acquisition (3 floors)","4,250,000"],["Transfer & registration fees","170,000"],["Fit-out & common-area upgrade","280,000"],["Leasing & legal costs","140,000"],["Working capital & service-charge reserve","160,000"],["TOTAL","5,000,000"]]),
  ("h1","3. Distributions"),
  ("bullets",["Net rental income, after service charges, management fees and reserves, is distributed per the monthly reporting cycle.","Distributions are variable and depend on tenants paying on time.","The holding period is planned at 5 years; units are illiquid."]),
  ("warn","Capital at risk. Rental income and property values can fall. This sample document is illustrative only."),
 ]),
 dict(file="property-risk-acknowledgement.pdf", title="Risk Acknowledgement", subtitle="Business Bay Commercial Tower - confirmation that the investor understands the risks",
      meta="f20c55b1 | 14 Jun 2026", project=PROP, version="v1.0", date="14 Jun 2026", ref="BI-CP-02/RA/1.0",
 body=[
  ("h1","1. Statement of understanding (sample)"),
  ("p","The investor confirms they understand the risks of commercial property participation. Sample acknowledgement for demonstration."),
  ("h2","Principal risks"),
  ("bullets",["Rental income depends on tenants paying on time; voids reduce distributions.","Property values can fall; sale proceeds are not guaranteed.","Holdings are illiquid with a planned 5-year holding period.","Capital is at risk; you may get back less than you invest."]),
  ("h1","2. Signatures (sample block)"),
  ("table",["Field","Detail"],[["Investor name","Ahmed Khan (sample)"],["Investor ID","INV-2041"],["Date signed","14 Jun 2026"],["Status","SAMPLE - not a real signature"]]),
  ("warn","Never invest money you cannot afford to lose."),
 ]),
 dict(file="property-title-review.pdf", title="Title & Encumbrance Review", subtitle="Business Bay Commercial Tower - sample conveyancer's title summary",
      meta="6a90d3e7 | 20 Aug 2026", project=PROP, version="v1.0", date="20 Aug 2026", ref="BI-CP-02/TI/1.0",
 body=[
  ("h1","1. Title summary (sample)"),
  ("p","Illustrative summary of the form of a conveyancer's title review for the three office floors. Sample content only."),
  ("table",["Item","Sample finding"],[["Registered owner","As per title deed sample"],["Title deed nos.","Illustrative"],["Mortgages / charges","None disclosed (sample)"],["Service-charge arrears","None disclosed (sample)"]]),
  ("h1","2. Reliance"),
  ("p","A live transaction would rely on the conveyancer's formal opinion addressed to the issuer, not on this sample summary."),
  ("warn","Sample document. Independent legal advice is essential before any real commitment."),
 ]),
 dict(file="property-tenancy-schedule.pdf", title="Tenancy Schedule (Redacted)", subtitle="Business Bay Commercial Tower - sample rent roll with tenant names redacted",
      meta="c8b14f02 | 25 Aug 2026", project=PROP, version="v1.0", date="25 Aug 2026", ref="BI-CP-02/TS/1.0",
 body=[
  ("h1","1. Rent roll (sample, redacted)"),
  ("table",["Floor / unit","Area (sq ft, sample)","Annual rent AED (sample)"],[["Level 12 - Unit A","4,200","462,000"],["Level 12 - Unit B","3,800","418,000"],["Level 13 - whole","8,100","891,000"],["Level 14 - Unit A","4,050","445,500"],["Level 14 - Unit B (vacant)","3,900","-"]]),
  ("h1","2. Notes"),
  ("bullets",["Tenant identities redacted in this sample; disclosed in the data room under NDA.","Stated occupancy 94% is a sample figure.","Rents shown are contracted headline rents, not net distributable income."]),
  ("warn","Sample figures. Actual tenancy may differ; verify against the data room."),
 ]),
 dict(file="property-valuation-aug-2026.pdf", title="Valuation Report", subtitle="Business Bay Commercial Tower - indicative valuation, August 2026 (sample)",
      meta="a17e93c4 | 18 Aug 2026", project=PROP, version="Aug 2026", date="18 Aug 2026", ref="BI-CP-02/VL/2026-08",
 body=[
  ("h1","1. Basis of valuation (sample)"),
  ("p","Indicative valuation on a sample basis using the income approach with comparable Business Bay office transactions. Illustrative only."),
  ("table",["Component","AED (sample)"],[["Stabilised net operating income","412,000 p.a."],["Capitalisation rate (sample)","7.5%"],["Indicative value (3 floors)","5,000,000"]]),
  ("h1","2. Limiting conditions"),
  ("bullets",["Sample figures; a live valuation would be issued by a qualified valuer.","Yields move with the market; the figure above is point-in-time.","Valuation is not a promise of resale price or return."]),
  ("warn","Capital at risk. Illustrated values do not predict future performance."),
 ]),
 dict(file="restaurant-evaluation-note.pdf", title="Evaluation Note (Summary)", subtitle="JBR Flagship Restaurant - investment committee evaluation summary (sample)",
      meta="e5f20719 | 22 Sep 2026", project=REST, version="draft", date="22 Sep 2026", ref="BI-RS-03/EV/draft",
 body=[
  ("h1","1. Status"),
  ("p","The JBR flagship restaurant opportunity is UNDER EVALUATION. No offer has been approved and no terms are final. This note summarises the sample evaluation for demonstration."),
  ("h2","Sample evaluation areas"),
  ("table",["Area","Sample status"],[["Revenue reconciliation","In progress"],["Operator selection","Shortlist of 3 (sample)"],["Licensing path","Under review"],["Site lease terms","Heads of terms drafted (sample)"]]),
  ("h1","2. Illustrative budget"),
  ("table",["Item","AED"],[["Fit-out & kitchen","1,800,000"],["Licences & approvals","320,000"],["Launch working capital","780,000"],["Reserve","300,000"],["TOTAL","3,200,000"]]),
  ("warn","No investment is being offered. Restaurant revenue is volatile and operator-dependent."),
 ]),
 dict(file="restaurant-risk-acknowledgement.pdf", title="Risk Acknowledgement", subtitle="JBR Flagship Restaurant - draft risk summary for evaluation-stage review",
      meta="3d6a81bc | 22 Sep 2026", project=REST, version="draft", date="22 Sep 2026", ref="BI-RS-03/RA/draft",
 body=[
  ("h1","1. Evaluation-stage risks (sample)"),
  ("bullets",["Still under evaluation - no offer has been approved.","Restaurant revenue is volatile and operator-dependent.","Licensing and lease terms are not yet final.","Capital is at risk in any hospitality investment."]),
  ("warn","Sample document for the evaluation stage only. Nothing here is an offer."),
 ]),
 dict(file="falcon-evaluation-note.pdf", title="Evaluation Note (Summary)", subtitle="Project Falcon - FX brokerage equity, regulatory review stage (sample)",
      meta="8b42c0d5 | 25 Sep 2026", project=FALCON, version="draft", date="25 Sep 2026", ref="BI-FX-04/EV/draft",
 body=[
  ("h1","1. Status"),
  ("p","Project Falcon is under REGULATORY REVIEW. Brokerage equity requires separate regulatory approval before any offer can be made. No terms exist at this stage."),
  ("h2","Review gates (sample)"),
  ("table",["Gate","Sample status"],[["Licensing assessment","Pending"],["Financial review","Pending"],["Governance review","Pending"]]),
  ("warn","Not an approved product. Subscriptions are never trader deposits. Nothing here is an offer."),
 ]),
 dict(file="subscription-agreement-rsv-88097.pdf", title="Subscription Agreement", subtitle="Reservation RSV-88097 - sample subscription agreement (2 units, yacht)",
      meta="e40c19bb | 02 Sep 2026", project=YACHT, version="v1.2", date="02 Sep 2026", ref="RSV-88097/SA/1.0",
 body=[
  ("h1","1. Subscription (sample)"),
  ("table",["Field","Sample detail"],[["Reservation","RSV-88097"],["Project","Dubai Charter Yacht (BI-YT-01)"],["Units","2"],["Value",aed(40000)],["Offer version","v1.2"],["Status","SAMPLE - illustrative only"]]),
  ("h1","2. Key clauses (sample summary)"),
  ("bullets",["Subscription is conditional on cleared funds and signed documents.","Units are issued only after legal closing; reservation alone confers no ownership.","The investor confirms the risk acknowledgement and offering terms v1.2."]),
  ("warn","Sample agreement. A live subscription would be executed with legal counsel."),
 ]),
 dict(file="share-certificate-crt-2026-0912.pdf", title="Share Certificate", subtitle="CRT-2026-0912 - sample participation certificate (illustrative)",
      meta="92de44f0 | 20 Aug 2026", project=YACHT, version="issued", date="20 Aug 2026", ref="CRT-2026-0912",
 body=[
  ("h1","Certificate (sample)"),
  ("table",["Field","Sample detail"],[["Certificate no.","CRT-2026-0912"],["Holder","Ahmed Khan (sample)"],["Project","Dubai Charter Yacht (BI-YT-01)"],["Units","5"],["Issued","20 Aug 2026"],["Status","SAMPLE - not a real certificate"]]),
  ("p","This sample certificate illustrates the format of a participation certificate. It confers no rights and is not transferable."),
  ("warn","Sample only. Real certificates are issued after cleared funds, signed documents and legal registration."),
 ]),
 dict(file="monthly-report-aug-2026-property.pdf", title="Monthly Report - August 2026", subtitle="Business Bay Commercial Tower - sample monthly investor report",
      meta="11aa78cd | 15 Sep 2026", project=PROP, version="v1.0", date="15 Sep 2026", ref="BI-CP-02/MR/2026-08",
 body=[
  ("h1","1. Headline figures (sample)"),
  ("table",["Metric","AED (sample)"],[["Gross revenue","412,000"],["Operating costs","(313,600)"],["Net income","98,400"],["Distribution declared","84,000"],["Reserve retained","14,400"]]),
  ("h1","2. Commentary (sample)"),
  ("p","Occupancy held at the stated 94% through August. One unit turned over and was re-let within the month (sample narrative). Service-charge reconciliations remain in progress."),
  ("h1","3. Reconciliation to cash (sample)"),
  ("table",["Line","AED"],[["Net accounting profit","30,000"],["Add back: depreciation (non-cash)","10,000"],["Debt principal repaid","(8,000)"],["Capital expenditure","(6,000)"],["Increase in cash reserve","(6,000)"],["Cash available for distribution","20,000"]]),
  ("warn","Sample report. Figures are illustrative and unaudited."),
 ]),
]

if __name__ == "__main__":
    for s in SPECS:
        build(s)
    print("done:", len(SPECS), "documents")
