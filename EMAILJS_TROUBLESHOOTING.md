# EmailJS Gmail Authentication Error Fix

## Error Details
**Error Code:** 412 - Precondition Failed  
**Message:** `Gmail_API: Request had insufficient authentication scopes.`

This error occurs when your Gmail service in EmailJS doesn't have the proper authentication scopes to send emails.

## 🚨 IMMEDIATE FIX STEPS

### Step 1: Re-authenticate Your Gmail Service

1. **Go to EmailJS Dashboard**
   - Visit: https://dashboard.emailjs.com/
   - Login to your account

2. **Navigate to Email Services**
   - Click on "Email Services" in the left sidebar
   - Find your Gmail service (service_kokgazs)

3. **Re-connect Gmail Service**
   - Click on your Gmail service
   - Click "Connect Account" or "Re-authenticate" 
   - You'll be redirected to Google OAuth
   - **IMPORTANT:** Make sure to grant ALL requested permissions
   - Look for these specific scopes:
     - `https://www.googleapis.com/auth/gmail.send`
     - `https://www.googleapis.com/auth/gmail.compose`

4. **Test the Connection**
   - After re-authentication, click "Test" in your service
   - Send a test email to verify it works

### Step 2: Alternative - Create New Gmail Service

If re-authentication doesn't work:

1. **Delete Current Service**
   - Delete the existing Gmail service (service_kokgazs)

2. **Create New Gmail Service**
   - Click "Add New Service"
   - Select "Gmail"
   - Follow the setup wizard
   - **Grant ALL permissions when prompted**

3. **Update Configuration**
   - Note the new Service ID
   - Update your `emailjs-config.js` file with the new Service ID

### Step 3: Verify Email Template

1. **Check Template Variables**
   - Go to "Email Templates" in EmailJS dashboard
   - Open your template (template_wmn6eqw)
   - Ensure all these variables exist:
     ```
     {{full_name}}
     {{email}}
     {{phone_number}}
     {{desired_country}}
     {{job_category}}
     {{application_id}}
     {{submission_date}}
     ```

2. **Test Template**
   - Use the "Test" button in template editor
   - Send test email to verify formatting

## 🔧 COMMON SOLUTIONS

### Solution 1: Check Google Account Settings

1. **Enable Less Secure Apps** (if using older Gmail)
   - Go to: https://myaccount.google.com/security
   - Turn ON "Less secure app access"
   - **Note:** This might not be available for newer accounts

2. **Enable 2-Factor Authentication**
   - Sometimes required for API access
   - Generate App Password if needed

### Solution 2: Use Different Email Provider

If Gmail continues to cause issues, switch to:

1. **Outlook/Hotmail**
   - Often more reliable than Gmail
   - Fewer authentication issues

2. **Custom SMTP**
   - Use your hosting provider's SMTP
   - More control over authentication

### Solution 3: Update EmailJS Configuration

Update your `static/js/emailjs-config.js`:

```javascript
// EmailJS Service Configuration
const EMAILJS_CONFIG = {
    serviceID: 'YOUR_NEW_SERVICE_ID',        // Update if you created new service
    templateID: 'template_wmn6eqw',          // Your current template ID
    publicKey: 'oUuRG5T0EuyXJaK3Q'          // Your public key
};
```

## 🧪 TESTING STEPS

1. **Test in Browser Console**
   ```javascript
   // Open browser console and run:
   emailjs.send('service_kokgazs', 'template_wmn6eqw', {
       full_name: 'Test User',
       email: 'test@example.com',
       application_id: 'TEST-123'
   }).then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
   }, function(error) {
       console.log('FAILED...', error);
   });
   ```

2. **Check Network Tab**
   - Open browser DevTools
   - Go to Network tab
   - Submit form and check EmailJS requests

## 📋 VERIFICATION CHECKLIST

- [ ] Gmail service re-authenticated with full permissions
- [ ] Test email sent successfully from EmailJS dashboard
- [ ] Template variables match form fields
- [ ] Service ID and Template ID are correct
- [ ] Public key is valid
- [ ] Google account allows API access
- [ ] No rate limiting (try waiting 5 minutes between tests)

## 🆘 FALLBACK OPTIONS

### Option 1: Use Formspree
If EmailJS continues to fail, use Formspree.io instead:
- Free tier: 50 submissions/month
- No authentication issues
- Simple integration

### Option 2: Use Netlify Forms
If hosting on Netlify:
- Built-in form handling
- No external service needed
- Easy to set up

### Option 3: Contact EmailJS Support
- Email: support@emailjs.com
- Include your service ID and error details
- They can check backend authentication status

## 📞 IMMEDIATE SUPPORT

If you need immediate help:

1. **Check EmailJS Status Page**
   - Visit: https://status.emailjs.com/
   - Look for any service outages

2. **Try Different Browser**
   - Clear cache and cookies
   - Disable browser extensions
   - Try incognito/private mode

3. **Wait and Retry**
   - Sometimes it's a temporary API issue
   - Wait 30 minutes and try again

## 🔄 FINAL STEPS

After fixing the authentication:

1. Test the registration form completely
2. Verify emails are received
3. Check spam/junk folders
4. Test from different devices/browsers
5. Monitor for any recurring issues

The main issue is Gmail API authentication. Following the re-authentication steps should resolve the problem immediately.