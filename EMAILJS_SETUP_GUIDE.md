# EmailJS Setup Guide for Visa Registration Website

## Overview
Your Django-based visa registration website has been successfully converted to use EmailJS for form submissions. This eliminates the need for a backend server while maintaining the same beautiful form design and functionality.

## Files Created/Modified

### New Static HTML Files:
- `index.html` - Home page (converted from Django template)
- `register.html` - Registration form page
- `thank-you.html` - Thank you confirmation page

### New JavaScript File:
- `static/js/emailjs-config.js` - EmailJS configuration and form handling

### Modified Files:
- `static/js/main.js` - Updated to work with static HTML (form validation moved to emailjs-config.js)

## EmailJS Setup Instructions

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note the **Service ID** (you'll need this later)

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

**Template Name:** `visa_application_template`

**Subject:** `New Visa Application - {{application_id}}`

**Email Body:**
```
New visa application received on {{submission_date}}

Application ID: {{application_id}}

PERSONAL INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Full Name: {{full_name}}
• Email: {{email}}
• Phone: {{phone_number}}
• Date of Birth: {{date_of_birth}}
• Gender: {{gender}}
• Marital Status: {{marital_status}}
• Nationality: {{nationality}}

PASSPORT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Passport Number: {{passport_number}}
• Issue Date: {{passport_issue_date}}
• Expiry Date: {{passport_expiry_date}}

VISA & EMPLOYMENT INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Desired Country: {{desired_country}}
• Job Category: {{job_category}}
• Education Level: {{education_level}}
• Work Experience: {{work_experience}}
• Current Occupation: {{current_occupation}}
• Expected Salary: {{expected_salary}}
• Language Skills: {{language_skills}}

EMERGENCY CONTACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Name: {{emergency_contact_name}}
• Phone: {{emergency_contact_phone}}
• Relationship: {{emergency_contact_relationship}}

ADDITIONAL NOTES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
{{additional_notes}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This email was automatically generated from the EthioGlobal visa registration website.
```

4. Save the template and note the **Template ID**

### Step 4: Get Your Public Key
1. In your EmailJS dashboard, go to "Account"
2. Find your **Public Key** (also called User ID)
3. Copy this key

### Step 5: Configure the JavaScript
1. Open `static/js/emailjs-config.js`
2. Replace the placeholder values in the `EMAILJS_CONFIG` object:

```javascript
const EMAILJS_CONFIG = {
    serviceID: 'your_service_id_here',        // From Step 2
    templateID: 'your_template_id_here',      // From Step 3
    publicKey: 'your_public_key_here'         // From Step 4
};
```

3. Also update the initialization call:
```javascript
emailjs.init('your_public_key_here');
```

## Testing the Setup

### Step 1: Serve the Files
Since these are now static HTML files, you can serve them using:

**Option 1: Python HTTP Server**
```bash
cd /path/to/your/visa/directory
python -m http.server 8000
```
Then visit: `http://localhost:8000`

**Option 2: Live Server (VS Code Extension)**
Install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

**Option 3: Any Web Server**
Upload the files to any web hosting service that supports static files.

### Step 2: Test the Form
1. Open the website in your browser
2. Navigate to the registration page
3. Fill out the form completely
4. Submit the form
5. Check if you receive the email
6. Verify all form data appears correctly in the email

## Features Maintained

✅ **Same Beautiful Design** - All original styling and animations preserved
✅ **Form Validation** - Client-side validation with error messages
✅ **Country Pre-selection** - URL parameters still work (e.g., `register.html?country=USA`)
✅ **Responsive Design** - Mobile-friendly layout maintained
✅ **Loading States** - Animated submission buttons
✅ **Success/Error Handling** - User feedback for form submission
✅ **Multi-language Support** - Amharic and English labels
✅ **Professional Email Format** - Well-structured email notifications

## EmailJS Free Plan Limits

- **200 emails/month** for free accounts
- **50 emails/month** for unverified accounts
- Upgrade to paid plans for higher limits
- Monitor usage in your EmailJS dashboard

## Troubleshooting

### Common Issues:

1. **Form not submitting**
   - Check browser console for errors
   - Verify EmailJS configuration is correct
   - Ensure internet connection is stable

2. **Emails not received**
   - Check spam/junk folders
   - Verify email service configuration
   - Test with different email addresses
   - Check EmailJS dashboard for delivery status

3. **Template variables not showing**
   - Ensure template variable names match exactly
   - Check for typos in template and JavaScript
   - Verify all form field names are correct

4. **CORS errors**
   - EmailJS handles CORS automatically
   - If issues persist, check EmailJS service status

### Debug Mode:
Enable console logging by adding to `emailjs-config.js`:
```javascript
// Add after form submission success
console.log('Form data sent:', formData);
console.log('EmailJS response:', response);
```

## Security Considerations

✅ **Public Key Safe** - EmailJS public keys are designed to be exposed
✅ **No Backend Required** - Eliminates server security concerns
✅ **Client-side Validation** - Input sanitization and validation
✅ **HTTPS Recommended** - Use HTTPS in production for secure transmission

## Production Deployment

1. **Domain Verification** - Add your domain to EmailJS allowed origins
2. **HTTPS Setup** - Deploy on HTTPS-enabled hosting
3. **Monitoring** - Monitor EmailJS dashboard for delivery rates
4. **Backup Plan** - Consider fallback email addresses
5. **Rate Limiting** - EmailJS automatically handles rate limiting

## Support

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **EmailJS Support**: Contact through their dashboard
- **Form Issues**: Check browser developer tools console

Your visa registration website is now fully functional without requiring Django backend infrastructure while maintaining all the original features and design!