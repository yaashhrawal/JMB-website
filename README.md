# 🍯 JMB Udaipur - Premium Traditional Indian Confectionery Website

Celebrating 60+ Years of Sweet Traditions from the royal city of Udaipur.

## 🚀 Quick Start

### Method 1: Python Server (Recommended)
```bash
# Navigate to the website directory
cd /Users/mac/jmb-udaipur-website

# Start Python server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

### Method 2: Using the Custom Python Server
```bash
# Navigate to the website directory
cd /Users/mac/jmb-udaipur-website

# Run the custom server
python3 server.py
```

### Method 3: Node.js Server
```bash
# Navigate to the website directory
cd /Users/mac/jmb-udaipur-website

# Run the Node.js server
node server.js
```

### Method 4: PHP Server
```bash
# Navigate to the website directory
cd /Users/mac/jmb-udaipur-website

# Start PHP server
php -S localhost:8000
```

### Method 5: Direct File Access
If you don't have Python, Node.js, or PHP installed, you can open the website directly:
```bash
# Open directly in browser (may have CORS limitations)
open index.html
```

## 📋 Server URLs

Once the server is running, access these URLs:

- **Homepage:** http://localhost:8000
- **Products:** http://localhost:8000#products
- **Cart:** Click the cart icon in the navigation

## 🏗️ Project Structure

```
jmb-udaipur-website/
├── index.html              # Main homepage
├── css/
│   ├── main.css            # Core styles with premium design
│   ├── responsive.css      # Mobile-first responsive design
│   └── animations.css      # Smooth animations and transitions
├── js/
│   ├── main.js            # Core functionality and UI
│   ├── cart.js            # Shopping cart management
│   └── whatsapp-integration.js  # WhatsApp business integration
├── data/
│   └── products.json      # Product catalog and categories
├── server.py              # Python HTTP server
├── server.js              # Node.js HTTP server
├── start-server.sh        # Cross-platform server launcher
└── README.md              # This file
```

## ✨ Features

### 🎨 Premium Design
- **Color Palette:** Rich gold (#B8860B), burgundy (#8B0000), cream (#F5F5DC)
- **Typography:** Elegant Playfair Display serif headings, Inter sans-serif body
- **Instagram-Style Product Grid:** Masonry layout with hover effects
- **60+ Years Heritage Branding:** Premium traditional positioning

### 🛒 E-commerce Functionality
- **Product Catalog:** 12 premium products with detailed information
- **Shopping Cart:** Persistent storage, quantity management
- **WhatsApp Checkout:** Professional order formatting
- **Responsive Design:** Mobile-first, works on all devices

### 📱 WhatsApp Business Integration
- **Formatted Order Messages:** Professional templates with order details
- **Customer Information Collection:** Name, phone, email, address
- **Business Hours Detection:** Automatic business status
- **Order ID Generation:** Unique timestamps (#JMB format)

### 🏪 Product Categories
1. **Traditional Sweets:** Ghewar, Gulab Jamun, Kaju Katli, Rasgulla
2. **Namkeen & Snacks:** Bhujia, Mathri, Kachori varieties
3. **Premium Items:** Royal collections with silver leaf
4. **Gift Hampers:** Diwali, Wedding, Custom collections

## 🔧 Technical Specifications

### Performance
- **Pure HTML5, CSS3, JavaScript** (no frameworks)
- **Fast Loading:** Optimized for shared hosting
- **Mobile PageSpeed:** 85+ target score
- **Cross-browser Compatible:** Chrome, Firefox, Safari, Edge

### SEO Features
- **Meta Tags:** Complete title, description, keywords
- **Open Graph:** Social media sharing optimization
- **Structured Data:** Ready for search engine indexing
- **Semantic HTML5:** Clean, accessible markup

### Accessibility
- **WCAG Guidelines:** Accessible design principles
- **Keyboard Navigation:** Full keyboard support
- **Screen Reader Friendly:** Proper ARIA labels
- **Color Contrast:** High contrast for readability

## 📞 WhatsApp Integration Details

### Order Message Format
```
🍯 JMB UDAIPUR - NEW ORDER

📋 Order Details:
• Product Name x Quantity = ₹Price

💰 Total Amount: ₹XXXX
📦 Total Items: X

👤 Customer Details:
Name: [Customer Name]
Phone: [Phone Number]
Email: [Email Address]

📍 Delivery Address:
[Complete Address with Pincode]

🚚 Delivery: [Local/Outstation]

Order ID: #JMB[Timestamp]
```

### Business Information
- **Business Number:** +91 123 456 7890 (Update in js/whatsapp-integration.js)
- **Business Hours:** Mon-Sat 9AM-9PM, Sun 10AM-8PM
- **Location:** Heritage Store, City Palace Road, Udaipur

## 🎯 Brand Positioning

### Heritage Story
- **Founded:** 1960s in the royal city of Udaipur
- **Legacy:** 60+ years of authentic recipes
- **Expansion:** Now serving customers across India
- **Quality:** Premium ingredients, traditional methods

### Key Messages
- "Celebrating 60+ Years of Sweet Traditions"
- "Premium Traditional Indian Confectionery"
- "From our kitchen to your celebrations"
- "Expanding traditional taste beyond Udaipur"

## 🔒 Security & Privacy

- **No Personal Data Storage:** All data stored locally in browser
- **HTTPS Ready:** Works with SSL certificates
- **GDPR Compliant:** Privacy-conscious design
- **Secure Forms:** Client-side validation

## 🚀 Deployment

### For Hostinger or Shared Hosting:
1. Upload all files to your domain's public_html folder
2. Update WhatsApp business number in `js/whatsapp-integration.js`
3. Replace placeholder images with actual product photos
4. Test all functionality on the live site

### For Domain Setup:
1. Point domain to hosting server
2. Install SSL certificate
3. Set up Google Analytics (optional)
4. Configure error pages (404, 500)

## 📝 Customization

### Update Business Information:
- **WhatsApp Number:** Edit `js/whatsapp-integration.js` line 6
- **Business Hours:** Edit `js/whatsapp-integration.js` line 180+
- **Contact Details:** Edit footer section in `index.html`

### Add Products:
- **Product Data:** Edit `data/products.json`
- **Product Images:** Add to `images/products/` folder
- **Categories:** Update categories array in `data/products.json`

### Styling Changes:
- **Colors:** Update CSS variables in `css/main.css` lines 12-20
- **Fonts:** Update font imports in `index.html` head section
- **Layout:** Modify grid settings in `css/main.css`

## 📊 Analytics Integration

To add Google Analytics, insert this code in the `<head>` section of `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

## 🆘 Troubleshooting

### Server Won't Start
1. Check if Python 3 is installed: `python3 --version`
2. Try alternative port: `python3 -m http.server 8001`
3. Check for port conflicts: `lsof -ti:8000`

### Images Not Loading
1. Ensure images are in the correct `images/` folder structure
2. Check file extensions match (jpg, png, webp)
3. Update image paths in `data/products.json`

### WhatsApp Not Working
1. Verify business number format in `js/whatsapp-integration.js`
2. Test on mobile device for app integration
3. Check browser console for JavaScript errors

### Styling Issues
1. Clear browser cache
2. Check CSS file paths in `index.html`
3. Verify responsive breakpoints in `css/responsive.css`

## 📱 Mobile Testing

Test the website on various devices:
- **iPhone:** Safari, Chrome
- **Android:** Chrome, Samsung Browser
- **Tablets:** iPad, Android tablets
- **Desktop:** Chrome, Firefox, Safari, Edge

## 🔄 Updates & Maintenance

### Regular Updates:
- **Product Catalog:** Update `data/products.json` seasonally
- **Prices:** Review and update pricing quarterly
- **Images:** Replace with high-quality product photos
- **Content:** Update heritage story and testimonials

### Performance Monitoring:
- **Page Speed:** Use Google PageSpeed Insights
- **Mobile Usability:** Use Google Mobile-Friendly Test
- **Accessibility:** Use WAVE Web Accessibility Evaluator

---

## 📞 Support

For technical support or customization requests, refer to the code comments or create detailed documentation for your development team.

**Built with ❤️ for JMB Udaipur - Celebrating 60+ Years of Sweet Traditions**