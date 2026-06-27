# Sash Weight Calculator

A tiny, free, open-source calculator that estimates the **lead sash weight** needed to balance a traditional box sash window — from the sash size, the glazing type and the timber section. Results in both **kilograms and pounds**.

No build step, no dependencies, no tracking, no network calls. It's a single static page that runs entirely in the browser.

👉 **[Live demo](https://leadsashwindowweights.github.io/sash-weight-calculator/)**

## Why

Box sash windows are balanced by cast weights — usually lead — that hang in the box frame and counterbalance each sliding sash. If you're restoring a window or replacing missing weights, you need to know roughly how heavy each weight should be. This tool gives a quick first estimate so you can size weights (and budget for the lead) before buying.

## How it works

```
sash area (m²) = width(mm)/1000 × height(mm)/1000
glass weight   = glass(kg/m²) × sash area × 0.88   # glass ≈ 88% of the opening
timber weight  = timber(kg/m²) × sash area
total sash     = glass weight + timber weight
each weight    = total sash ÷ 2                    # two weights, one per side
```

The two counterweights together roughly equal the sash weight, so the lead you need to buy ≈ the **total sash weight**.

Built-in glazing presets (annealed soda-lime glass ≈ 2.5 kg/m² per mm of thickness):

| Glazing | kg/m² |
| --- | --- |
| 3 mm single | 7.5 |
| 4 mm single | 10 |
| 6 mm single | 15 |
| Double-glazed unit | ≈ 21 |

Timber-section presets add a flat allowance for the sash frame and putty (slim 5, standard Victorian 7, heavy 10 kg/m²). Both glazing and timber can be set to a custom value.

## Limitations

This is an **estimate**, not a measurement.

- It assumes glass covers ~88% of the sash opening and adds a flat timber allowance rather than modelling the exact joinery.
- The **top sash** usually needs slightly heavier weights than the bottom so it stays up — add a little for the upper sash.
- Where possible, **weigh the existing sash** and confirm sizes before ordering. No warranty is given.

## Cost estimate

The calculator can multiply the total weight by a £/kg lead price to give a rough cost. Lead is a commodity and prices move week to week, so the default is only indicative. For current UK supplier prices compared on a like-for-like £/kg basis, see **[leadsashwindowweights.co.uk](https://leadsashwindowweights.co.uk/)** — and the guide [*What Influences the Cost of a Lead Sash Weight?*](https://leadsashwindowweights.co.uk/blog/what-influences-lead-weight-cost/) for why the same weight can vary in price by 2–3.5×.

## Run it locally

It's plain HTML/CSS/JS — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

Push to GitHub and enable **Settings → Pages → Deploy from branch → `main` / root**. The site is fully static, so it works on GitHub Pages, Netlify, Cloudflare Pages, or any static host.

## Contributing

Issues and pull requests are welcome — better glazing/timber presets, a lbs-first mode, or translations. Keep it dependency-free and tracker-free.

## License

[MIT](LICENSE) — free to use, copy, modify and distribute.

---

Maintained by the team behind **[Lead Sash Window Weights](https://leadsashwindowweights.co.uk/)**, an independent UK price-comparison resource for lead sash weights.
