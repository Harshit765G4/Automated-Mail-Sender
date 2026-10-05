# 📧 Automated Mail Sender

A modern **bulk email sending web application** built with a lightweight frontend and an **Express.js + SendGrid** backend.

The application provides an interactive mail-composition interface where you can enter multiple recipients, validate and deduplicate email addresses, compose a subject and message, and send the email through the SendGrid API.

---

## ✨ Features

- 📬 Send email to multiple recipients at once
- ✍️ Compose subject and message from a web interface
- 📋 Paste recipient lists using commas, spaces, semicolons, or new lines
- ♻️ Automatically remove duplicate email addresses
- ✅ Optional email-format validation
- 👀 Live recipient preview chips
- 📊 Live recipient, subject-length, and message-length counters
- 📈 Send-readiness progress indicator
- ⏳ Loading state while sending
- ✅ Success/error modal feedback
- 🎉 Success animation with confetti
- 🎨 Modern glassmorphism-style interface
- 🌈 Tailwind CSS-based UI
- ✨ GSAP-powered entrance animations
- 📤 SendGrid integration through an Express API

---

## 🏗️ Architecture

```text
                    Browser
                      │
                      │ POST /send-email
                      ▼
               Express.js Backend
                      │
                      ▼
                SendGrid API
                      │
                      ▼
                Email Delivery
```

### Email Flow

1. Enter one or more recipient email addresses.
2. The frontend parses the entered recipient list.
3. Duplicate addresses can be removed automatically.
4. Email format can optionally be validated.
5. Enter the subject and message.
6. Click **Send Mail**.
7. The browser sends a JSON request to the backend.
8. Express passes the message to SendGrid.
9. SendGrid handles the email delivery.
10. The UI displays the result to the user.

---

## 🛠️ Tech Stack

### Frontend
- HTML5
- JavaScript
- Tailwind CSS
- GSAP
- Canvas Confetti
- Google Fonts

### Backend
- Node.js
- Express.js
- CORS
- SendGrid Mail API

### Email Service
- **Twilio SendGrid**

---

## 📁 Project Structure

```text
Automated-Mail-Sender/
│
├── backend/
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── index.html
└── README.md
```

---

## 🔌 Backend API

### Send Email

```http
POST /send-email
Content-Type: application/json
```

### Request Body

```json
{
  "emails": [
    "user1@example.com",
    "user2@example.com"
  ],
  "subject": "Hello from Automated Mail Sender",
  "message": "This is an automated email."
}
```

### Success Response

```json
{
  "status": "success",
  "message": "Emails sent successfully to 2 recipients!"
}
```

### Error Response

```json
{
  "status": "error",
  "message": "There was an error sending the email."
}
```

---

## ⚙️ SendGrid Configuration

The backend reads the SendGrid API key from the environment variable:

```text
SENDGRID_API_KEY
```

The sender address in the current implementation is:

```text
gargharshit084@gmail.com
```

This address must be verified in SendGrid before sending mail successfully.

> The sender address is currently hard-coded in `backend/index.js`. For production use, move it into an environment variable.

---

## 🚀 Getting Started

### Prerequisites

Install:

- **Node.js**
- **npm**
- A **SendGrid account**
- A SendGrid API key with permission to send mail

---

### 1. Clone the repository

```bash
git clone https://github.com/Harshit765G4/Automated-Mail-Sender.git
cd Automated-Mail-Sender
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

The backend uses:

- `express`
- `cors`
- `@sendgrid/mail`

---

## 🔐 Configure the SendGrid API Key

### Windows PowerShell

For the current terminal session:

```powershell
$env:SENDGRID_API_KEY="YOUR_SENDGRID_API_KEY"
```

### Windows Command Prompt

```cmd
set SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY
```

### Linux/macOS

```bash
export SENDGRID_API_KEY="YOUR_SENDGRID_API_KEY"
```

Then start the backend from the same terminal session.

---

## ▶️ Start the Backend

From the `backend` directory:

```bash
node index.js
```

The API will run on:

```text
http://localhost:3000
```

Expected output:

```text
✅ Server is running on http://localhost:3000
```

---

## 🌐 Run the Frontend

The frontend is contained in:

```text
index.html
```

It sends requests to:

```text
http://localhost:3000/send-email
```

For local development, serve the project through a local HTTP server rather than relying on direct `file://` access.

For example, with VS Code, use a local server such as **Live Server** to open `index.html`.

---

## 📝 Recipient Handling

The frontend accepts email addresses separated by:

- Commas
- Spaces
- Semicolons
- New lines
- Pasted CSV-style lists

Example:

```text
user1@example.com,
user2@example.com
user3@example.com
```

The application can then:

```text
Raw input
   ↓
Parse recipients
   ↓
Deduplicate
   ↓
Validate format
   ↓
Send to backend
```

Only the first 30 recipients are displayed as preview chips; the interface displays a `+N more` indicator when there are additional recipients.

---

## 🎨 User Interface

The frontend includes several interactive elements:

### Campaign Overview

Displays:

- Number of detected recipients
- Subject length
- Message length
- Recipient preview
- Send-readiness progress

### Compose Mail

Contains:

- Recipient input
- Subject field
- Message editor
- Deduplication toggle
- Validation toggle
- Send button

### Feedback

The interface provides:

- Loading animation
- Success modal
- Error modal
- Confetti animation after successful sending

---

## ⚠️ Important Notes

- The application currently sends **one SendGrid message with the recipient array provided in `to`**.
- The sender email must be verified with SendGrid.
- The frontend assumes the backend is available on port **3000**.
- The current backend enables CORS globally.
- The SendGrid API key must be supplied through `SENDGRID_API_KEY`.
- The sender email is currently hard-coded in the backend source.

---

## 🔐 Security Considerations

Never commit an actual SendGrid API key to GitHub.

Use environment variables:

```text
SENDGRID_API_KEY
```

For production deployments, also consider:

- 🔑 Keeping sender identities in environment variables
- 🛡️ Adding authentication before exposing the mail endpoint
- 🚦 Rate limiting requests
- 📧 Restricting recipient counts
- 🧹 Validating and sanitizing all input server-side
- 📊 Adding request logging and monitoring
- 🚫 Preventing the endpoint from becoming an open spam relay
- 🔒 Using HTTPS
- 🔐 Restricting CORS to trusted origins
- 🗝️ Rotating SendGrid credentials regularly

> A publicly accessible unauthenticated bulk-mail endpoint can be abused for spam and should not be deployed as-is.

---

## 🔮 Future Improvements

- 🔐 User authentication
- 📊 Delivery statistics and campaign history
- 👥 Saved recipient groups
- 📎 File attachments
- 📝 Rich HTML email templates
- 🧩 Reusable message templates
- 📅 Scheduled sending
- 📈 SendGrid event tracking
- 📤 CSV file upload
- 🔍 Email list search and filtering
- 🌐 Configurable backend URL
- ⚙️ Environment-based sender configuration
- 🧪 Automated tests
- 🐳 Docker deployment
- ☁️ Production deployment configuration

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Test the frontend and backend locally.
5. Commit your changes.
6. Open a pull request.

---

## 📄 License

This repository currently does not contain a dedicated `LICENSE` file.

Add an appropriate open-source license before distributing the project publicly.

---

## 👨‍💻 Author

**Harshit Garg**

GitHub: [@Harshit765G4](https://github.com/Harshit765G4)

Repository: [Automated Mail Sender](https://github.com/Harshit765G4/Automated-Mail-Sender)

---

⭐ If you find this project useful, consider giving it a star!
