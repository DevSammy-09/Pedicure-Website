# Live Preview While Editing HTML & CSS

This project runs on **PHP + MySQL** (the booking & contact forms call
`booking_submit.php` / `contact_submit.php`, which are served by **XAMPP's
Apache**). A plain live-preview tool cannot run PHP, so we use **Live Server in
proxy mode**: you get instant auto-refresh, and PHP/booking requests are
forwarded to Apache so everything keeps working.

The configuration is already done for you in `.vscode/settings.json`.

---

## One-time check
Open **XAMPP Control Panel** and make sure both are green / "Running":
- **Apache**
- **MySQL**

(If they aren't running, click **Start** next to each.)

---

## Start live preview
1. In VS Code, open `index.html` (or any page you want to edit).
2. Click **"Go Live"** in the blue bar at the **bottom-right** of VS Code.
   - (It's added by the *Live Server* extension you already have installed.)
3. Your browser opens at:
   `http://127.0.0.1:5500/index.html`

## Edit and watch it update
- Open `style.css` or any `.html` file.
- Make a change and **Save** (`Ctrl + S`).
- The browser **auto-refreshes** instantly — no manual reload needed.
- Because requests are proxied to Apache, the **booking form still saves to the
  database** while you preview.

---

## Where to edit what
| You want to change...            | Edit this file                          |
|----------------------------------|-----------------------------------------|
| Home page content/layout         | `index.html`                            |
| About page                       | `about.html`                            |
| Services page                    | `services.html`                         |
| Contact page                     | `contact.html`                          |
| Global styles (colors, fonts...) | `style.css`                             |
| Page-specific styles             | `css/about.css`, `css/service.css`, `css/contact.css`, `css/booking.css` |

Tip: In the browser, right-click an element → **Inspect** to find which CSS
class controls it, then search for that class in the CSS file.

---

## To stop live preview
Click **"Port : 5500"** in the bottom-right status bar (it replaces "Go Live"
while running).

---

## Troubleshooting
- **Page won't load / 502 error:** Apache isn't running. Start it in XAMPP.
- **Booking says "connect to server" or won't save:** MySQL isn't running.
  Start it in XAMPP.
- **My JS/CSS change didn't show:** do a hard refresh once (`Ctrl + F5`) to
  clear the browser cache, then normal saves will auto-refresh fine.
- **Always open the site via `http://127.0.0.1:5500/...` (Go Live) or
  `http://localhost/Pedicure%20Website%20Project/...`** — never by
  double-clicking the HTML file (that uses `file://` and PHP won't run).
