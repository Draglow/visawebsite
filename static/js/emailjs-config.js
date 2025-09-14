/**
 * EmailJS Configuration and Form Handling
 * This file handles the EmailJS integration for the visa registration form
 */

// EmailJS Configuration
(function() {
    // Initialize EmailJS with your public key
    // IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('oUuRG5T0EuyXJaK3Q');
})();

// EmailJS Service Configuration
const EMAILJS_CONFIG = {
    serviceID: 'service_kokgazs',        // Replace with your EmailJS service ID
    templateID: 'template_wmn6eqw',      // Replace with your EmailJS template ID
    publicKey: 'oUuRG5T0EuyXJaK3Q'         // Replace with your EmailJS public key
};

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmission);
        
        // Pre-fill country from URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCountry = urlParams.get('country');
        if (selectedCountry) {
            const countrySelect = document.getElementById('desired_country');
            if (countrySelect) {
                countrySelect.value = selectedCountry;
            }
        }
    }
});

/**
 * Handle form submission with EmailJS
 */
async function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitButton = document.getElementById('submitButton');
    const originalButtonText = submitButton.innerHTML;
    
    // Validate form before submission
    if (!validateForm()) {
        return false;
    }
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting Application...';
    
    try {
        // Collect form data
        const formData = collectFormData(form);
        
        console.log('Sending email with data:', formData);
        
        // Send email via EmailJS with proper error handling
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            formData
        );
        
        console.log('EmailJS Response:', response);
        
        if (response.status === 200) {
            // Success - redirect to thank you page
            showSuccessMessage('Application submitted successfully! Redirecting...');
            
            setTimeout(() => {
                window.location.href = 'thank-you.html';
            }, 2000);
        } else {
            throw new Error(`EmailJS returned status: ${response.status}`);
        }
        
    } catch (error) {
        console.error('EmailJS Error Details:', error);
        
        // Handle specific EmailJS errors
        let errorMessage = 'There was an error submitting your application. ';
        
        if (error.status === 412) {
            errorMessage += 'Email service authentication failed. Please contact support or try again later.';
            console.error('Gmail API Scope Error: You need to re-authenticate your Gmail service in EmailJS');
        } else if (error.status === 422) {
            errorMessage += 'Invalid template or missing required fields.';
        } else if (error.status === 429) {
            errorMessage += 'Too many requests. Please wait a moment and try again.';
        } else if (error.text && error.text.includes('Precondition Failed')) {
            errorMessage += 'Service configuration error. Please contact support.';
        } else {
            errorMessage += 'Please try again or contact support.';
        }
        
        // Show error message
        showErrorMessage(errorMessage);
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
}

/**
 * Collect and format form data for EmailJS
 */
function collectFormData(form) {
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to regular object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Format the data for email template
    return {
        // Personal Information
        full_name: data.full_name || '',
        email: data.email || '',
        phone_number: data.phone_number || '',
        date_of_birth: data.date_of_birth || '',
        gender: data.gender || '',
        marital_status: data.marital_status || '',
        nationality: data.nationality || '',
        
        // Passport Information
        passport_number: data.passport_number || '',
        passport_issue_date: data.passport_issue_date || '',
        passport_expiry_date: data.passport_expiry_date || '',
        
        // Visa & Employment Information
        desired_country: data.desired_country || '',
        job_category: data.job_category || '',
        education_level: data.education_level || '',
        work_experience: data.work_experience || '',
        current_occupation: data.current_occupation || '',
        expected_salary: data.expected_salary || '',
        language_skills: data.language_skills || '',
        
        // Emergency Contact
        emergency_contact_name: data.emergency_contact_name || '',
        emergency_contact_phone: data.emergency_contact_phone || '',
        emergency_contact_relationship: data.emergency_contact_relationship || '',
        
        // Additional Information
        additional_notes: data.additional_notes || '',
        
        // Metadata
        submission_date: new Date().toLocaleString(),
        application_id: generateApplicationId()
    };
}

/**
 * Generate a unique application ID
 */
function generateApplicationId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `VR-${timestamp}-${random}`.toUpperCase();
}

/**
 * Validate the entire form
 */
function validateForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return false;
    
    let isValid = true;
    const requiredFields = form.querySelectorAll('input[required], select[required]');
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate each required field
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    // Check terms and conditions
    const termsCheck = document.getElementById('termsCheck');
    if (termsCheck && !termsCheck.checked) {
        showFieldError(termsCheck, 'You must agree to the terms and conditions');
        isValid = false;
    }
    
    // Scroll to first error if validation failed
    if (!isValid) {
        const firstError = form.querySelector('.is-invalid');
        if (firstError) {
            firstError.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }
    
    return isValid;
}

/**
 * Validate individual field
 */
function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous errors
    field.classList.remove('is-invalid');
    hideFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        errorMessage = 'This field is required';
        isValid = false;
    }
    // Email validation
    else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    // Phone number validation
    else if (field.name === 'phone_number' && value) {
        // Allow various phone number formats
        const phoneRegex = /^[\+]?[0-9\-\s\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            errorMessage = 'Please enter a valid phone number';
            isValid = false;
        }
    }
    // Passport number validation
    else if (field.name === 'passport_number' && value) {
        if (value.length < 6) {
            errorMessage = 'Passport number must be at least 6 characters';
            isValid = false;
        }
    }
    // Full name validation
    else if (field.name === 'full_name' && value) {
        if (value.length < 2) {
            errorMessage = 'Name must be at least 2 characters';
            isValid = false;
        }
        const nameRegex = /^[a-zA-Z\s\u1200-\u137F]+$/; // Allow Ethiopian characters
        if (!nameRegex.test(value)) {
            errorMessage = 'Name can only contain letters and spaces';
            isValid = false;
        }
    }
    // Date validations
    else if (field.type === 'date' && value) {
        const selectedDate = new Date(value);
        const today = new Date();
        
        if (field.name === 'date_of_birth') {
            // Must be at least 18 years old
            const eighteenYearsAgo = new Date();
            eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
            
            if (selectedDate > eighteenYearsAgo) {
                errorMessage = 'You must be at least 18 years old';
                isValid = false;
            }
        } else if (field.name === 'passport_expiry_date') {
            // Passport must be valid for at least 6 months
            const sixMonthsFromNow = new Date();
            sixMonthsFromNow.setMonth(today.getMonth() + 6);
            
            if (selectedDate < sixMonthsFromNow) {
                errorMessage = 'Passport must be valid for at least 6 months';
                isValid = false;
            }
        } else if (field.name === 'passport_issue_date') {
            // Issue date cannot be in the future
            if (selectedDate > today) {
                errorMessage = 'Issue date cannot be in the future';
                isValid = false;
            }
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let errorDiv = field.parentNode.querySelector('.error-message');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message text-danger small mt-1';
        field.parentNode.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

/**
 * Hide field error
 */
function hideFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
    field.classList.remove('is-invalid');
}

/**
 * Clear all form errors
 */
function clearAllErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.style.display = 'none');
    
    const invalidFields = document.querySelectorAll('.is-invalid');
    invalidFields.forEach(field => field.classList.remove('is-invalid'));
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    const alertContainer = document.getElementById('alertContainer');
    if (alertContainer) {
        alertContainer.innerHTML = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i>${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    const alertContainer = document.getElementById('alertContainer');
    if (alertContainer) {
        alertContainer.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        alertContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

/**
 * Setup EmailJS Instructions
 * 
 * To complete the EmailJS setup:
 * 
 * 1. Go to https://www.emailjs.com/ and create a free account
 * 
 * 2. Create a new service (Gmail, Outlook, etc.)
 * 
 * 3. Create an email template with the following variables:
 *    {{full_name}}, {{email}}, {{phone_number}}, {{date_of_birth}},
 *    {{gender}}, {{marital_status}}, {{nationality}}, {{passport_number}},
 *    {{passport_issue_date}}, {{passport_expiry_date}}, {{desired_country}},
 *    {{job_category}}, {{education_level}}, {{work_experience}},
 *    {{current_occupation}}, {{expected_salary}}, {{language_skills}},
 *    {{emergency_contact_name}}, {{emergency_contact_phone}},
 *    {{emergency_contact_relationship}}, {{additional_notes}},
 *    {{submission_date}}, {{application_id}}
 * 
 * 4. Update the EMAILJS_CONFIG object above with your:
 *    - serviceID (from your EmailJS service)
 *    - templateID (from your EmailJS template)
 *    - publicKey (from your EmailJS account settings)
 * 
 * 5. Sample Email Template:
 *    Subject: New Visa Application - {{application_id}}
 *    
 *    Body:
 *    New visa application received on {{submission_date}}
 *    
 *    Application ID: {{application_id}}
 *    
 *    Personal Information:
 *    - Full Name: {{full_name}}
 *    - Email: {{email}}
 *    - Phone: {{phone_number}}
 *    - Date of Birth: {{date_of_birth}}
 *    - Gender: {{gender}}
 *    - Marital Status: {{marital_status}}
 *    - Nationality: {{nationality}}
 *    
 *    Passport Information:
 *    - Passport Number: {{passport_number}}
 *    - Issue Date: {{passport_issue_date}}
 *    - Expiry Date: {{passport_expiry_date}}
 *    
 *    Visa & Employment:
 *    - Desired Country: {{desired_country}}
 *    - Job Category: {{job_category}}
 *    - Education Level: {{education_level}}
 *    - Work Experience: {{work_experience}}
 *    - Current Occupation: {{current_occupation}}
 *    - Expected Salary: {{expected_salary}}
 *    - Language Skills: {{language_skills}}
 *    
 *    Emergency Contact:
 *    - Name: {{emergency_contact_name}}
 *    - Phone: {{emergency_contact_phone}}
 *    - Relationship: {{emergency_contact_relationship}}
 *    
 *    Additional Notes:
 *    {{additional_notes}}
 */