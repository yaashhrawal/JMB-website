// =========================================
// JMB Udaipur - WhatsApp Integration
// Professional Order Management via WhatsApp
// =========================================

class WhatsAppIntegration {
    constructor() {
        this.businessNumber = '911234567890'; // Replace with actual business number
        this.businessName = 'JMB Udaipur';
        this.defaultMessage = `Hello ${this.businessName}, I would like to place an order.`;
    }
    
    // Generate order message for cart
    generateCartOrderMessage(cart) {
        if (!cart || cart.length === 0) {
            return this.defaultMessage;
        }
        
        const orderItems = cart.map(item => 
            `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
        ).join('\n');
        
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        return `🍯 ${this.businessName.toUpperCase()} - NEW ORDER

📋 Order Details:
${orderItems}

💰 Total Amount: ₹${total.toLocaleString('en-IN')}
📦 Total Items: ${itemCount}

👤 Customer Information:
Name: [Please provide your name]
Phone: [Please provide your phone number]
Email: [Please provide your email]

📍 Delivery Details:
Complete Address: [Please provide full address]
City: [City name]
State: [State name]
PIN Code: [6-digit PIN code]
Landmark: [Optional landmark for easy delivery]

🚚 Delivery Preference:
□ Standard Delivery (3-5 days)
□ Express Delivery (1-2 days) - Additional charges apply
□ Same Day Delivery (if available in your area)

📝 Special Instructions:
[Any special requests or instructions]

🎁 Occasion: [Birthday/Anniversary/Festival/Other]

Order ID: #JMB${Date.now()}
Order Date: ${new Date().toLocaleDateString('en-IN')}

Thank you for choosing ${this.businessName}! 🙏`;
    }
    
    // Generate message for single product
    generateProductMessage(product) {
        return `🍯 ${this.businessName.toUpperCase()} - PRODUCT INQUIRY

📋 Product Details:
${product.name}
💰 Price: ₹${product.price}/${product.weight || 'piece'}
📝 Description: ${product.description}

👤 I would like to know more about this product and place an order.

Customer Details:
Name: [Your name]
Phone: [Your phone number]
Location: [Your city]

Order ID: #JMB${Date.now()}

Thank you! 🙏`;
    }
    
    // Generate bulk order inquiry message
    generateBulkOrderMessage() {
        return `🍯 ${this.businessName.toUpperCase()} - BULK ORDER INQUIRY

👤 Customer Details:
Business Name: [Your business/organization name]
Contact Person: [Your name]
Phone: [Your phone number]
Email: [Your email]

📋 Order Requirements:
Product Categories: [Sweets/Namkeen/Bakery/Mixed]
Quantity Required: [Approximate quantity in kg]
Budget Range: [Your budget range]
Event Date: [Required by date]
Event Type: [Wedding/Corporate/Festival/Other]

📍 Delivery Details:
City: [Delivery city]
Venue: [Delivery address/venue]
Contact at venue: [Contact person and phone]

📝 Special Requirements:
[Any specific products, packaging, or custom requirements]

🎯 Looking for:
□ Best pricing for bulk quantity
□ Custom packaging options
□ Delivery coordination
□ Product recommendations

Order ID: #JMBBULK${Date.now()}

Thank you for considering ${this.businessName}! 🙏`;
    }
    
    // Generate gift hamper customization message
    generateGiftHamperMessage() {
        return `🍯 ${this.businessName.toUpperCase()} - CUSTOM GIFT HAMPER

🎁 Gift Hamper Requirements:
Occasion: [Birthday/Anniversary/Diwali/Wedding/Corporate/Other]
Budget: [Your budget range]
Recipients: [Number of hampers needed]

📋 Preferred Items:
□ Traditional Sweets (specify favorites)
□ Premium Dry Fruits
□ Namkeen/Snacks
□ Special Mithai
□ Seasonal Specialities

📦 Packaging Preferences:
□ Elegant Gift Box
□ Traditional Packaging
□ Corporate Branding (if applicable)
□ Personalized Message Card

👤 Customer Details:
Name: [Your name]
Phone: [Your phone number]
Email: [Your email]

📍 Delivery Information:
Address: [Complete delivery address]
Delivery Date: [Required by date]
Time Preference: [Morning/Afternoon/Evening]

📝 Special Message:
[Message for the gift card]

🎯 Additional Services:
□ Same-day delivery (if available)
□ Scheduled delivery
□ Multiple delivery addresses
□ Corporate invoicing

Order ID: #JMBGIFT${Date.now()}

Thank you for choosing ${this.businessName} for your special moments! 🎁`;
    }
    
    // Send cart order to WhatsApp
    sendCartOrder(cart) {
        const message = this.generateCartOrderMessage(cart);
        this.openWhatsApp(message);
    }
    
    // Send product inquiry to WhatsApp
    sendProductInquiry(product) {
        const message = this.generateProductMessage(product);
        this.openWhatsApp(message);
    }
    
    // Send bulk order inquiry
    sendBulkOrderInquiry() {
        const message = this.generateBulkOrderMessage();
        this.openWhatsApp(message);
    }
    
    // Send gift hamper inquiry
    sendGiftHamperInquiry() {
        const message = this.generateGiftHamperMessage();
        this.openWhatsApp(message);
    }
    
    // Send general inquiry
    sendGeneralInquiry(customMessage = '') {
        const message = customMessage || this.defaultMessage;
        this.openWhatsApp(message);
    }
    
    // Open WhatsApp with message
    openWhatsApp(message) {
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${this.businessNumber}?text=${encodedMessage}`;
        
        // Check if device is mobile
        if (this.isMobileDevice()) {
            // Open WhatsApp app on mobile
            window.location.href = whatsappUrl;
        } else {
            // Open WhatsApp Web on desktop
            window.open(whatsappUrl, '_blank');
        }
        
        // Track the event (you can integrate with analytics here)
        this.trackWhatsAppEvent(message);
    }
    
    // Check if device is mobile
    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    // Track WhatsApp events (integrate with your analytics)
    trackWhatsAppEvent(message) {
        // Google Analytics tracking (if available)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'whatsapp_order', {
                'event_category': 'engagement',
                'event_label': 'WhatsApp Order Initiation',
                'value': 1
            });
        }
        
        // Console log for debugging
        console.log('WhatsApp order initiated:', {
            timestamp: new Date().toISOString(),
            messageLength: message.length,
            orderType: this.detectOrderType(message)
        });
    }
    
    // Detect order type from message
    detectOrderType(message) {
        if (message.includes('BULK ORDER')) return 'bulk';
        if (message.includes('GIFT HAMPER')) return 'gift';
        if (message.includes('PRODUCT INQUIRY')) return 'product';
        if (message.includes('NEW ORDER')) return 'cart';
        return 'general';
    }
    
    // Validate Indian phone number
    isValidIndianPhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }
    
    // Format Indian phone number for WhatsApp
    formatPhoneForWhatsApp(phone) {
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned.length === 10 && this.isValidIndianPhone(cleaned)) {
            return `91${cleaned}`;
        }
        return null;
    }
    
    // Get business hours status
    isBusinessOpen() {
        const now = new Date();
        const currentHour = now.getHours();
        const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday
        
        // Business hours: Mon-Sat 9AM-9PM, Sun 10AM-8PM
        if (currentDay === 0) { // Sunday
            return currentHour >= 10 && currentHour < 20;
        } else { // Monday to Saturday
            return currentHour >= 9 && currentHour < 21;
        }
    }
    
    // Get business hours message
    getBusinessHoursMessage() {
        if (this.isBusinessOpen()) {
            return "We're currently open! We'll respond to your message shortly.";
        } else {
            return "We're currently closed. Our business hours are:\nMon-Sat: 9:00 AM - 9:00 PM\nSun: 10:00 AM - 8:00 PM\n\nWe'll respond to your message during business hours.";
        }
    }
    
    // Add business hours to message
    addBusinessHoursInfo(message) {
        return `${message}\n\n⏰ ${this.getBusinessHoursMessage()}`;
    }
}

// Global WhatsApp integration instance
const whatsappIntegration = new WhatsAppIntegration();

// Global functions for easy access
function sendWhatsAppOrder() {
    if (typeof cartManager !== 'undefined' && cartManager.cart.length > 0) {
        whatsappIntegration.sendCartOrder(cartManager.cart);
    } else {
        whatsappIntegration.sendGeneralInquiry();
    }
}

function sendProductWhatsApp(productId) {
    // This function should be called with product data
    // Implementation depends on how products are stored globally
    console.log('Product WhatsApp order for ID:', productId);
}

function sendBulkOrderWhatsApp() {
    whatsappIntegration.sendBulkOrderInquiry();
}

function sendGiftHamperWhatsApp() {
    whatsappIntegration.sendGiftHamperInquiry();
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WhatsAppIntegration;
}