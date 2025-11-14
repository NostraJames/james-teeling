# EmailJS Setup Guide

Your contact form is now configured to send emails using EmailJS. Follow these steps to complete the setup:

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add an Email Service

1. In the EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. **Save your Service ID** (you'll need this later)

## Step 3: Create an Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact Form Message: {{subject}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. In the template settings, make sure these variables are defined:
   - `from_name`
   - `from_email`
   - `subject`
   - `message`
   - `to_email` (set to JamesJTeeling@gmail.com in the "To email" field)

5. **Save your Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the EmailJS dashboard
2. Find your **Public Key** (it looks like: `YOUR_PUBLIC_KEY_HERE`)
3. Copy this key

## Step 5: Update Your Configuration

1. Open the file: `script.js`
2. Find these lines near the top (around line 64-66):

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

3. Replace the placeholder values with your actual credentials:
   - Replace `YOUR_SERVICE_ID` with the Service ID from Step 2
   - Replace `YOUR_TEMPLATE_ID` with the Template ID from Step 3
   - Replace `YOUR_PUBLIC_KEY` with the Public Key from Step 4

Example:
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY = 'AbCdEfGhIjKlMnOp';
```

## Step 6: Test Your Form

1. Open your website in a browser
2. Navigate to the Contact section
3. Fill out the form and click "Send Message"
4. You should see a success message and receive an email at JamesJTeeling@gmail.com

## Troubleshooting

### Form doesn't send
- Check the browser console (F12) for error messages
- Verify all three credentials are correctly entered in `script.js`
- Make sure your email service is properly connected in the EmailJS dashboard

### Emails not received
- Check your spam/junk folder
- Verify the "To email" is set correctly in your EmailJS template
- Check the EmailJS dashboard for sent email logs

### "Failed to send" error
- Verify your Public Key is correct
- Make sure you've verified your email in EmailJS
- Check if you've exceeded the free tier limit (200 emails/month)

## Free Tier Limits

EmailJS free tier includes:
- 200 emails per month
- 2 email services
- 2 email templates
- Email history for 30 days

This is perfect for a personal portfolio site!

## Security Note

The Public Key is safe to expose in your client-side code. EmailJS uses it only to identify your account, not to send emails without authentication.

---

Need help? Check the [EmailJS Documentation](https://www.emailjs.com/docs/) or reach out to their support.
