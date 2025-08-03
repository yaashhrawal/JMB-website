// Contact Page JavaScript

// Contact form submission
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Add loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Validate form
    if (!validateContactForm(form)) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        return;
    }
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Success
        showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        clearFormValidation(form);
        
        // Store contact submission (for demo purposes)
        storeContactSubmission(formData);
        
        // Remove loading state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
    }, 2000);
}

// Validate contact form
function validateContactForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const formGroup = field.closest('.form-group');
        clearFieldValidation(formGroup);
        
        if (!field.value.trim()) {
            showFieldError(formGroup, 'This field is required');
            isValid = false;
        } else if (field.type === 'email' && !isValidEmail(field.value)) {
            showFieldError(formGroup, 'Please enter a valid email address');
            isValid = false;
        } else {
            showFieldSuccess(formGroup);
        }
    });
    
    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show field error
function showFieldError(formGroup, message) {
    formGroup.classList.add('error');
    formGroup.classList.remove('success');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

// Show field success
function showFieldSuccess(formGroup) {
    formGroup.classList.add('success');
    formGroup.classList.remove('error');
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear field validation
function clearFieldValidation(formGroup) {
    formGroup.classList.remove('error', 'success');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

// Clear all form validation
function clearFormValidation(form) {
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(clearFieldValidation);
}

// Store contact submission (demo)
function storeContactSubmission(formData) {
    const contacts = JSON.parse(localStorage.getItem('jmb-contacts')) || [];
    
    const submission = {
        id: Date.now(),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        subscribe: formData.get('subscribe') === 'on',
        timestamp: new Date().toISOString()
    };
    
    contacts.push(submission);
    localStorage.setItem('jmb-contacts', JSON.stringify(contacts));
    
    // If subscribed to newsletter, add to newsletter list
    if (submission.subscribe) {
        let subscribers = JSON.parse(localStorage.getItem('jmb-newsletter')) || [];
        if (!subscribers.includes(submission.email)) {
            subscribers.push(submission.email);
            localStorage.setItem('jmb-newsletter', JSON.stringify(subscribers));
        }
    }
}

// FAQ functionality
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            
            if (this.hasAttribute('required')) {
                if (!this.value.trim()) {
                    showFieldError(formGroup, 'This field is required');
                } else if (this.type === 'email' && !isValidEmail(this.value)) {
                    showFieldError(formGroup, 'Please enter a valid email address');
                } else {
                    showFieldSuccess(formGroup);
                }
            }
        });
        
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup.classList.contains('error') && this.value.trim()) {
                clearFieldValidation(formGroup);
            }
        });
    });
});

// UPI Payment Integration
function initializeUPIPayment() {
    // UPI payment configuration
    const upiConfig = {
        merchantId: 'JMB@upi',
        merchantName: 'JMB Udaipur',
        transactionNote: 'JMB Order Payment'
    };
    
    return upiConfig;
}

// Generate UPI payment link
function generateUPILink(amount, orderId) {
    const config = initializeUPIPayment();
    
    // UPI URL format
    const upiUrl = `upi://pay?pa=${config.merchantId}&pn=${encodeURIComponent(config.merchantName)}&am=${amount}&cu=INR&tn=${encodeURIComponent(config.transactionNote + ' - ' + orderId)}`;
    
    return upiUrl;
}

// Process UPI payment
function processUPIPayment(amount, orderId) {
    const upiLink = generateUPILink(amount, orderId);
    
    // Check if user is on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Open UPI app directly
        window.location.href = upiLink;
        
        // Show payment status after a delay
        setTimeout(() => {
            const confirmed = confirm('Payment completed? Click OK if payment was successful, Cancel if failed.');
            if (confirmed) {
                handlePaymentSuccess(orderId);
            } else {
                handlePaymentFailure(orderId);
            }
        }, 10000);
    } else {
        // Show UPI QR code for desktop
        showUPIQRCode(upiLink, amount, orderId);
    }
}

// Show UPI QR Code for desktop
function showUPIQRCode(upiLink, amount, orderId) {
    // Create modal for QR code
    const modal = document.createElement('div');
    modal.className = 'upi-modal';
    modal.innerHTML = `
        <div class="upi-modal-content">
            <div class="upi-header">
                <h3>Pay with UPI</h3>
                <button class="upi-close" onclick="closeUPIModal()">&times;</button>
            </div>
            <div class="upi-body">
                <div class="upi-amount">
                    <h4>Amount: ₹${amount.toLocaleString()}</h4>
                    <p>Order ID: ${orderId}</p>
                </div>
                <div class="upi-qr-container">
                    <div id="upiQRCode"></div>
                    <p>Scan this QR code with any UPI app</p>
                </div>
                <div class="upi-apps">
                    <p>Or pay directly with:</p>
                    <div class="upi-app-buttons">
                        <button class="upi-app-btn" onclick="window.open('${upiLink}', '_blank')">
                            <i class="fas fa-mobile-alt"></i> UPI App
                        </button>
                        <button class="upi-app-btn" onclick="copyUPILink('${upiLink}')">
                            <i class="fas fa-copy"></i> Copy UPI Link
                        </button>
                    </div>
                </div>
                <div class="upi-actions">
                    <button class="btn btn-primary" onclick="handlePaymentSuccess('${orderId}')">
                        Payment Completed
                    </button>
                    <button class="btn btn-outline" onclick="handlePaymentFailure('${orderId}')">
                        Payment Failed
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Generate QR code (you would typically use a QR code library)
    generateQRCode(upiLink, 'upiQRCode');
    
    // Show modal
    setTimeout(() => modal.classList.add('show'), 100);
}

// Generate QR code (placeholder - in real implementation, use a QR library)
function generateQRCode(text, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div style="width: 200px; height: 200px; border: 2px solid #ddd; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin: 0 auto; background: #f9f9f9;">
            <div style="text-align: center;">
                <i class="fas fa-qrcode" style="font-size: 80px; color: #666; margin-bottom: 8px;"></i>
                <p style="font-size: 12px; color: #666; margin: 0;">QR Code for UPI Payment</p>
            </div>
        </div>
    `;
}

// Copy UPI link
function copyUPILink(upiLink) {
    navigator.clipboard.writeText(upiLink).then(() => {
        showNotification('UPI link copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = upiLink;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('UPI link copied to clipboard!', 'success');
    });
}

// Close UPI modal
function closeUPIModal() {
    const modal = document.querySelector('.upi-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    }
}

// Handle payment success
function handlePaymentSuccess(orderId) {
    closeUPIModal();
    showNotification('Payment successful! Your order has been confirmed.', 'success');
    
    // Clear cart
    cart = [];
    localStorage.setItem('jmb-cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    
    // Store payment record
    const payments = JSON.parse(localStorage.getItem('jmb-payments')) || [];
    payments.push({
        orderId: orderId,
        amount: getTotalAmount(),
        status: 'success',
        method: 'UPI',
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('jmb-payments', JSON.stringify(payments));
}

// Handle payment failure
function handlePaymentFailure(orderId) {
    closeUPIModal();
    showNotification('Payment failed. Please try again or contact support.', 'error');
    
    // Store payment record
    const payments = JSON.parse(localStorage.getItem('jmb-payments')) || [];
    payments.push({
        orderId: orderId,
        amount: getTotalAmount(),
        status: 'failed',
        method: 'UPI',
        timestamp: new Date().toISOString()
    });
    localStorage.setItem('jmb-payments', JSON.stringify(payments));
}

// Get total cart amount
function getTotalAmount() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Add UPI modal styles
const upiModalStyles = `
<style>
.upi-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
}

.upi-modal.show {
    opacity: 1;
    visibility: visible;
}

.upi-modal-content {
    background: white;
    border-radius: 16px;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

.upi-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 24px;
    border-bottom: 1px solid #eee;
}

.upi-header h3 {
    margin: 0;
    color: var(--text-dark);
}

.upi-close {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.upi-body {
    padding: 24px;
}

.upi-amount {
    text-align: center;
    margin-bottom: 24px;
    padding: 16px;
    background: var(--light-gray);
    border-radius: 8px;
}

.upi-amount h4 {
    margin: 0 0 8px 0;
    color: var(--primary-color);
    font-size: 1.5rem;
}

.upi-qr-container {
    text-align: center;
    margin-bottom: 24px;
}

.upi-qr-container p {
    margin-top: 16px;
    color: var(--text-medium);
}

.upi-apps {
    text-align: center;
    margin-bottom: 24px;
}

.upi-app-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    margin-top: 16px;
}

.upi-app-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border: 1px solid var(--border-light);
    background: white;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.upi-app-btn:hover {
    background: var(--light-gray);
}

.upi-actions {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.upi-actions .btn {
    flex: 1;
}

@media (max-width: 768px) {
    .upi-modal-content {
        width: 95%;
        margin: 20px;
    }
    
    .upi-app-buttons {
        flex-direction: column;
    }
    
    .upi-actions {
        flex-direction: column;
    }
}
</style>
`;

// Add UPI modal styles to head
document.head.insertAdjacentHTML('beforeend', upiModalStyles);