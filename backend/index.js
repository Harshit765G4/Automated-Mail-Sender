// 1. Import necessary packages
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail'); // Import SendGrid

// 2. Create an Express application
const app = express();
const PORT = 3000;

// --- IMPORTANT: ADD YOUR API KEY HERE ---
// It's best practice to use environment variables for this, but for simplicity, we'll paste it here for now.

// sgMail.setApiKey('also keep actual key');

const sendGridAPI = process.env.SENDGRID_API_KEY;

// 3. Set up middleware
app.use(express.json());
app.use(cors());

// 4. Define our main API endpoint
app.post('/send-email', async (req, res) => { // Make the function async
    const { emails, subject, message } = req.body;

    // The 'from' email must be the one you verified with SendGrid
    const fromEmail = 'gargharshit084@gmail.com'; // <-- CHANGE THIS

    // Create the message object for SendGrid
    const msg = {
        to: emails, // This can be an array of emails
        from: fromEmail,
        subject: subject,
        html: `<p>${message}</p>`, // Use html for better formatting
    };

    try {
        // Use the sgMail object to send the email
        await sgMail.send(msg);
        console.log('✅ Emails sent successfully!');
        res.status(200).json({
            status: 'success',
            message: `Emails sent successfully to ${emails.length} recipients!`,
        });
    } catch (error) {
        console.error('❌ Error sending email:', error);
        // If there's an error, log the details from SendGrid
        if (error.response) {
            console.error(error.response.body);
        }
        res.status(500).json({
            status: 'error',
            message: 'There was an error sending the email.',
        });
    }
});

// 5. Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});