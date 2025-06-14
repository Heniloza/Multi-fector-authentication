#  Two Factor Authentication using QR Code

This project implements a **Two Factor Authentication (2FA)** system using QR code-based setup and **Time-based One-Time Password (TOTP)**, commonly used by apps like **Google Authenticator** or **Authy**.

---

##  Features

- Secure user authentication
- QR Code generation for TOTP setup
- TOTP verification using standard 2FA mobile apps
- Works with Google Authenticator, Microsoft Authenticator, Authy, etc.
- Built with Node.js / Express.js and a frontend for smooth QR code scanning

---

##  Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Authentication:** TOTP with `speakeasy`
- **QR Code Generator:** `qrcode` npm package

---

##  Installation

```bash
git clone https://github.com/your-username/two-factor-auth-qr.git
cd two-factor-auth-qr
npm install
npm start
