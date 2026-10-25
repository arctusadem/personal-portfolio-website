"""Generate the public, ATS-readable two-page resume from verified site content.

Requires reportlab. After generation render both pages and check the layout.
"""
import json
from html import escape
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, KeepTogether
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[1]
site = json.loads((ROOT / "src/content/site.json").read_text(encoding="utf-8"))
output = ROOT / "public/resume/Bruno-Salgado-Resume.pdf"
output.parent.mkdir(parents=True, exist_ok=True)
ink = colors.HexColor("#182c32")
accent = colors.HexColor("#09695d")
body = ParagraphStyle("Body", fontName="Helvetica", fontSize=10.5, leading=15, textColor=ink, spaceAfter=6)
small = ParagraphStyle("Small", parent=body, fontSize=9.5, leading=13, spaceAfter=5)
section = ParagraphStyle("Section", parent=body, fontName="Helvetica-Bold", fontSize=11, leading=15, textColor=accent, spaceBefore=13, spaceAfter=8)
role = ParagraphStyle("Role", parent=body, fontName="Helvetica-Bold", fontSize=11, leading=15, spaceAfter=3)
bullet = ParagraphStyle("Bullet", parent=body, leftIndent=10, firstLineIndent=-8, spaceAfter=4)
story = []

def p(text, style=body):
    return Paragraph(escape(text).replace("\n", "<br/>"), style)

def link(label, url):
    return f'<a href="{escape(url, quote=True)}" color="#09695d">{escape(label)}</a>'

def heading(text):
    story.append(p(text.upper(), section))

def add_role(item):
    pieces = [p(item["title"], role), p(f'{item["company"]} | {item["period"]} | {item["location"]}', small), p(item["summary"])]
    pieces.extend(p("- " + line, bullet) for line in item["outcomes"])
    pieces.append(Spacer(1, 8))
    story.append(KeepTogether(pieces))

story += [p(site["profile"]["name"], ParagraphStyle("Name", parent=body, fontName="Helvetica-Bold", fontSize=26, leading=31, spaceAfter=6)), p(site["profile"]["role"], role), p("Based in Brazil | Remote preferred | Open to opportunities in Canada", small)]
story.append(Paragraph(" | ".join([link(site["profile"]["email"], "mailto:"+site["profile"]["email"]), link("brunosalgado.dev", site["profile"]["siteUrl"])]), small))
story.append(Paragraph(" | ".join([link("LinkedIn: bruno-cesar-rocha-salgado", site["profile"]["linkedinUrl"]), link("GitHub: arctusadem", site["profile"]["githubUrl"])]), small))
heading("Profile")
story.append(p(site["resumeSummary"]))
heading("Experience")
for item in site["experience"]["roles"][:3]:
    add_role(item)
story.append(PageBreak())
story.append(p("Bruno Salgado | Experience continued", role))
for item in site["experience"]["roles"][3:]:
    add_role(item)
heading("Technical skills")
for category in site["skills"][:5]:
    story.append(Paragraph(f'<b>{escape(category["name"])}:</b> {escape(", ".join(category["items"]))}', small))
heading("Independent engineering project")
story.append(Paragraph(link("Payment orchestration - Java / Spring Boot / PostgreSQL", "https://brunosalgado.dev/projects/payment-orchestration-platform#java-demo"), role))
story.append(p("Local Docker demonstration with durable request idempotency, a provider stub, outbox/inbox and PostgreSQL concurrency tests. Independently built with fictional payments; no employer code or real payment processing.", small))
heading("Education")
for item in site["education"]:
    story.append(p(f'{item["qualification"]} | {item["institution"]} | {item["period"]}', small))
heading("Languages")
story.append(p(" | ".join(site["languages"]), small))

def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 9)
    canvas.setFillColor(colors.HexColor("#53676c"))
    canvas.drawString(42, 27, "Bruno Salgado | brunosalgado.dev")
    canvas.drawRightString(A4[0]-42, 27, f"{doc.page} / 2")
    canvas.restoreState()

doc = SimpleDocTemplate(str(output), pagesize=A4, rightMargin=42, leftMargin=42, topMargin=35, bottomMargin=42, title="Bruno Salgado - Tech Lead / Senior Backend Engineer", author="Bruno Salgado", pageCompression=1)
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print(output)
