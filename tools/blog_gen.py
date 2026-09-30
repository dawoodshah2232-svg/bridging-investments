#!/usr/bin/env python3
"""Bridging Investments — daily blog publisher.
Usage:
  python3 tools/blog_gen.py --slug my-slug --title "Title" --tag "Market" \
      --excerpt "Short excerpt." --date "30 Sep 2026" --read "6 min read" \
      --body-file /tmp/body.html
Writes blog/<slug>.html from the article template, prepends the post to
BIDEMO.posts in js/data.js, and adds the URL to sitemap.xml.
"""
import argparse, datetime, html, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE_URL = "https://dawoodshah2232-svg.github.io/bridging-investments"

def split_title(title):
    """Split a title into lead + highlighted tail for the grad-text span."""
    words = title.split()
    if len(words) <= 4:
        return html.escape(title), ""
    cut = max(2, len(words) // 3)
    lead = " ".join(words[:-cut])
    tail = " ".join(words[-cut:])
    return html.escape(lead), html.escape(tail)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", required=True)
    ap.add_argument("--title", required=True)
    ap.add_argument("--tag", required=True)
    ap.add_argument("--excerpt", required=True)
    ap.add_argument("--date", required=True, help='e.g. "30 Sep 2026"')
    ap.add_argument("--read", required=True, help='e.g. "6 min read"')
    ap.add_argument("--body-file", required=True, help="HTML fragment for inside <div class=prose>")
    ap.add_argument("--img", default="", help="site-relative cover image, e.g. assets/blog/my-slug.jpg")
    a = ap.parse_args()

    slug = re.sub(r"[^a-z0-9-]", "", a.slug.lower().replace("_", "-"))
    if not slug:
        sys.exit("bad slug")
    if (ROOT / f"blog/{slug}.html").exists():
        sys.exit(f"blog/{slug}.html already exists")

    body = Path(a.body_file).read_text(encoding="utf-8").strip()
    if "<script" in body.lower():
        sys.exit("body must not contain scripts")

    tpl = (ROOT / "blog/reservation-vs-ownership.html").read_text(encoding="utf-8")
    lead, tail = split_title(a.title)
    h1 = lead + (f' <span class="grad-text">{tail}.</span>' if tail else "")
    date_iso = datetime.datetime.strptime(a.date, "%d %b %Y").strftime("%Y-%m-%d")
    esc_title, esc_desc, esc_tag = html.escape(a.title), html.escape(a.excerpt), html.escape(a.tag)

    # head
    tpl = re.sub(r"<title>.*?</title>", f"<title>{esc_title} — Bridging Investments</title>", tpl, count=1)
    tpl = re.sub(r'<meta name="description" content=".*?">', f'<meta name="description" content="{esc_desc}">', tpl, count=1)
    tpl = re.sub(r'<meta property="og:title" content=".*?">', f'<meta property="og:title" content="{esc_title}">', tpl, count=1)
    tpl = re.sub(r'<meta property="og:description" content=".*?">', f'<meta property="og:description" content="{esc_desc}">', tpl, count=1)
    tpl = re.sub(r'<link rel="canonical" href=".*?">', f'<link rel="canonical" href="{BASE_URL}/blog/{slug}.html">', tpl, count=1)
    tpl = re.sub(r'"headline":".*?","datePublished":"\d{4}-\d{2}-\d{2}"',
                 f'"headline":"{esc_title}","datePublished":"{date_iso}"', tpl, count=1)
    # hero
    tpl = re.sub(r'<div class="kicker" style="margin-top:18px">.*?</div>',
                 f'<div class="kicker" style="margin-top:18px">{esc_tag} · {html.escape(a.read)}</div>', tpl, count=1)
    tpl = re.sub(r'<h1 style="font-size:clamp\(30px,5vw,52px\)">.*?</h1>',
                 f'<h1 style="font-size:clamp(30px,5vw,52px)">{h1}</h1>', tpl, count=1, flags=re.S)
    tpl = re.sub(r'<p>\d{2} \w{3} \d{4} · By the Bridging Investments team</p>',
                 f'<p>{html.escape(a.date)} · By the Bridging Investments team</p>', tpl, count=1)
    if a.img:
        byline = f'<p>{html.escape(a.date)} · By the Bridging Investments team</p>'
        tpl = tpl.replace(byline, byline + f'\n<img class="blog-hero" src="../{a.img}" alt="{esc_title}">', 1)
        tpl = re.sub(r'<meta property="og:image" content=".*?">',
                     f'<meta property="og:image" content="{BASE_URL}/{a.img}">', tpl, count=1)
    # body
    tpl = re.sub(r'<div class="prose">.*?</div>\n<div class="card"',
                 f'<div class="prose">\n{body}\n</div>\n<div class="card"', tpl, count=1, flags=re.S)

    (ROOT / f"blog/{slug}.html").write_text(tpl, encoding="utf-8")

    # data.js — prepend post entry
    dp = ROOT / "js/data.js"
    s = dp.read_text(encoding="utf-8")
    img_field = f', img: "{a.img}"' if a.img else ""
    entry = ('    { slug: "%s"%s, title: "%s", date: "%s", read: "%s", excerpt: "%s", tag: "%s" },\n'
             % (slug, img_field, a.title.replace('"', '\\"'), a.date, a.read.replace('"', '\\"'),
                a.excerpt.replace('"', '\\"'), a.tag.replace('"', '\\"')))
    s2 = s.replace("  posts: [\n", "  posts: [\n" + entry, 1)
    if s2 == s:
        sys.exit("posts array not found")
    dp.write_text(s2, encoding="utf-8")

    # sitemap.xml
    sp = ROOT / "sitemap.xml"
    sm = sp.read_text(encoding="utf-8")
    url = (f'<url><loc>{BASE_URL}/blog/{slug}.html</loc><lastmod>{date_iso}</lastmod>'
           f'<changefreq>yearly</changefreq><priority>0.6</priority></url>\n</urlset>')
    sm2 = sm.replace("</urlset>", url, 1)
    if sm2 == sm:
        sys.exit("sitemap update failed")
    sp.write_text(sm2, encoding="utf-8")

    print(f"published blog/{slug}.html")

if __name__ == "__main__":
    main()
