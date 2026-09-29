# EmailJS Contact Form Setup Guide

## Overview

This guide will help you set up the beautiful custom EmailJS contact form with the email template.

## Features Implemented

### Contact Form (Contact.jsx)

✅ **Beautiful UI Design**

- Modern gradient backgrounds
- Smooth animations and transitions
- Icon indicators for input fields
- Focus state animations
- Loading spinner on submit button
- Real-time character counter for message field (500 char limit)
- Success/Error status messages with icons

✅ **Form Fields**

- **Name** - With user icon
- **Email** - With envelope icon
- **Message** - Text area with 500 character limit

✅ **Enhanced UX**

- Visual feedback on field focus
- Form validation
- Disabled submit button while loading
- Auto-clear form on successful submission
- Status messages with 5-second auto-hide
- Contact cards with hover effects

### Email Template (contact-us.html)

✅ **Professional Design**

- Gradient header with branding
- Organized field sections with badges
- Color-coded labels
- Responsive design for all devices
- Social media links
- Direct reply button
- Footer with contact information

## Setup Steps

### Step 1: Update EmailJS Template Variables

In your EmailJS dashboard, create or update your contact form template with these variables:

```
{{from_name}}    - Sender's name
{{from_email}}   - Sender's email address
{{to_name}}      - Receiver's name
{{subject}}      - "Contact Form Inquiry"
{{message}}      - Contact message
```

### Step 2: Template Content Setup

Use the HTML template from `email-template/contact-us.html` in your EmailJS template:

1. Go to **EmailJS Dashboard** → **Templates**
2. Create a new template or edit existing one
3. Copy the content from `email-template/contact-us.html`
4. Paste it into the email body template
5. Make sure these variables are used:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{to_name}}`
   - `{{subject}}`
   - `{{message}}`

### Step 3: Verify Environment Variables

Ensure your `.env.local` file has:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_CONTACT_US_TEMPLATE_ID=your_contact_template_id_here
NEXT_PUBLIC_EMAILJS_PRAYER_REQUEST_TEMPLATE_ID=your_prayer_request_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 4: Test the Form

1. Navigate to your contact page `/contact`
2. Fill in the form with test data
3. Click "Send Message"
4. Verify the email arrives in your inbox

## Customization Options

### Change Colors

Edit the gradient colors in `Contact.jsx`:

- Current gradient: `from-blue-500 to-blue-600`
- Update in button, input focus, and other elements

Update in `contact-us.html`:

- Change `#667eea` and `#764ba2` to your desired colors

### Change Character Limit

In `Contact.jsx`, find `handleChange` function:

```javascript
if (name === "message" && value.length > 500) {
  return;
}
```

Change `500` to your desired limit

### Add More Fields

1. Add new state in Contact.jsx:

```javascript
const [form, setForm] = useState({
  name: "",
  email: "",
  message: "",
  phone: "", // Optional
});
```

2. Add new input field in the form

3. Update EmailJS template variables to include the new field

4. Update email template HTML to display the new field

## Security Notes

⚠️ **Important:**

- Never expose your private EmailJS keys in client code - use `.env.local`
- The email template contains user data - ensure proper email security
- Add rate limiting to prevent spam (consider adding backend validation)
- Consider adding reCAPTCHA for additional protection

## Troubleshooting

### Form not sending?

- Check console for errors (F12)
- Verify all environment variables are set
- Confirm EmailJS service ID and template ID are correct
- Check EmailJS quota hasn't been exceeded

### Email not arriving?

- Check spam/junk folder
- Verify sender email in EmailJS settings
- Check email template variables match form data

### Styling issues?

- Clear browser cache (Ctrl+Shift+Delete)
- Verify Tailwind CSS is properly configured
- Check for conflicting CSS classes

## API Reference

### handleChange(e)

Handles form input changes with character limit for message field.

### handleSubmit(e)

Sends email via EmailJS with form data:

- `from_name`: User's name
- `from_email`: User's email
- `to_name`: Receiver's name
- `message`: User's message
- `subject`: "Contact Form Inquiry"

### focusedField State

Tracks which field is currently focused for visual feedback.

## Support

For EmailJS support, visit: https://www.emailjs.com/docs/
For Tailwind CSS: https://tailwindcss.com/docs/

---

**Last Updated:** 2026-06-29
**Version:** 1.0
