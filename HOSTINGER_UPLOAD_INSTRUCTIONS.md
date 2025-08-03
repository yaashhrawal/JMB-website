# JMB Udaipur Website - Hostinger Upload Instructions

## Files Ready for Upload
All files are prepared in the `upload-package` folder with correct permissions.

## Upload Instructions for Hostinger

### Step 1: Access File Manager
1. Log into your Hostinger control panel
2. Navigate to "File Manager" 
3. Go to the `public_html` folder (this is your website's root directory)

### Step 2: Upload Files
Upload ALL files from the `upload-package` folder to your `public_html` directory:

```
public_html/
├── index.html          (Main homepage)
├── about.html          (About Us page)
├── contact.html        (Contact page)
├── stores.html         (Our Stores page)
├── .htaccess           (Server configuration)
├── css/
│   └── modern-style.css
└── js/
    ├── modern-script.js
    └── contact.js
```

### Step 3: File Permissions (If 403 Error Persists)
If you still get 403 errors, check file permissions in Hostinger File Manager:
- **Files**: Should be 644 (rw-r--r--)
- **Folders**: Should be 755 (rwxr-xr-x)

### Step 4: Test Your Website
1. Visit your domain in a browser
2. Test all pages: Home, About Us, Our Stores, Contact
3. Test the shopping cart functionality
4. Test the WhatsApp ordering feature

## Features Included

### Homepage (index.html)
- Premium e-commerce design
- Sample products with cart functionality
- Mobile-responsive layout
- Professional product categories

### About Us (about.html)
- Company history and timeline
- Mission and values
- Customer statistics
- Team information section

### Our Stores (stores.html)
- Interactive maps with store locations
- Store details and contact information
- Operating hours
- Directions and amenities

### Contact (contact.html)
- Contact form with validation
- UPI payment integration
- FAQ section
- Multiple contact methods

### JavaScript Features
- Shopping cart with local storage
- WhatsApp order integration
- UPI payment gateway
- Form validation
- Mobile-responsive navigation

## WhatsApp Integration
Orders are sent to WhatsApp with:
- Customer details
- Product information with quantities
- Total amount
- Order ID for tracking

## UPI Payment
- Mobile: Direct UPI app integration
- Desktop: QR code display
- Payment confirmation handling

## If Issues Persist
1. Clear browser cache
2. Check domain DNS settings
3. Verify all files uploaded correctly
4. Contact Hostinger support if needed

## Domain Configuration
Make sure your domain is properly pointed to Hostinger's nameservers:
- ns1.dns-parking.com
- ns2.dns-parking.com

The website should be fully functional once uploaded!