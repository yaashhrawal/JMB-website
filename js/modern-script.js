// Modern JMB Udaipur Website - Professional E-commerce JavaScript
// Inspired by premium brands like Haldiram's, Bikaji, and Bombay Sweet Shop

// Global variables for products and cart
let allProducts = [];
let featuredProducts = [];
let productCategories = [];

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('jmb-cart')) || [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    loadProductData();
    updateCartCount();
    initializeScrollEffects();
    initializeSearch();
    initializeMobileMenu();
    createFloatingElements();
    addSectionDividers();
});

// Initialize website functionality
function initializeWebsite() {
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1500);
            }
        });
    });

    // Initialize intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.category-card, .product-card, .feature-card, .review-card').forEach(el => {
        observer.observe(el);
    });
}

// Load products from JSON file
async function loadProductData() {
    try {
        const response = await fetch('data/products.json');
        const data = await response.json();
        
        allProducts = data.products;
        featuredProducts = data.products.filter(product => product.is_featured);
        productCategories = data.categories;
        
        loadFeaturedProducts();
        console.log('Products loaded successfully:', featuredProducts.length, 'featured products');
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to sample data if JSON fails
        loadSampleProducts();
    }
}

// Fallback sample products
function loadSampleProducts() {
    featuredProducts = [
        {
            id: 1,
            name: "Premium Ghewar",
            description: "Traditional Rajasthani sweet disc soaked in sugar syrup",
            price: 850,
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400",
            is_premium: true,
            category: "sweets",
            default_weight: "1kg"
        },
        {
            id: 2,
            name: "Royal Kaju Katli",
            description: "Diamond-shaped cashew fudge with edible silver leaf",
            price: 1200,
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
            is_premium: true,
            category: "sweets",
            default_weight: "500g"
        },
        {
            id: 3,
            name: "Special Namkeen Mix",
            description: "Crunchy blend of sev, peanuts, and traditional spices",
            price: 450,
            image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400",
            is_premium: false,
            category: "namkeen",
            default_weight: "1kg"
        },
        {
            id: 6,
            name: "Diwali Gift Hamper",
            description: "Curated collection of premium sweets and dry fruits",
            price: 2500,
            image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400",
            is_premium: true,
            category: "gift-hampers",
            default_weight: "2.5kg"
        }
    ];
    loadFeaturedProducts();
}

// Load featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    container.innerHTML = '';

    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Calculate discount if originalPrice exists
    let discountHtml = '';
    if (product.originalPrice && product.originalPrice > product.price) {
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        discountHtml = `
            <span style="text-decoration: line-through; color: var(--text-light); font-size: 1rem; margin-left: 8px;">₹${product.originalPrice.toLocaleString()}</span>
            <span style="color: #27AE60; font-size: 0.9rem; margin-left: 8px;">(${discount}% off)</span>
        `;
    }

    // Determine badge text
    const badge = product.badge || (product.is_premium ? 'Premium' : 'Popular');
    
    // Weight selection HTML
    const weightOptions = product.weight_options || ['500g', '1kg'];
    const defaultWeight = product.default_weight || weightOptions[0];
    
    const weightSelectHtml = weightOptions.length > 1 ? `
        <div class="weight-selector">
            <label for="weight-${product.id}">Weight:</label>
            <select id="weight-${product.id}" class="weight-select">
                ${weightOptions.map(weight => 
                    `<option value="${weight}" ${weight === defaultWeight ? 'selected' : ''}>${weight}</option>`
                ).join('')}
            </select>
        </div>
    ` : `<div class="product-weight">Weight: ${defaultWeight}</div>`;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'">
            <div class="product-badge">${badge}</div>
            ${product.rating ? `<div class="product-rating"><i class="fas fa-star"></i> ${product.rating}</div>` : ''}
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            ${weightSelectHtml}
            <div class="product-price">
                ₹${product.price.toLocaleString()}
                ${discountHtml}
            </div>
            <div class="product-actions">
                <button class="btn btn-outline" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                    <i class="fas fa-heart"></i>
                </button>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `;

    return card;
}

// Shopping cart functionality
function addToCart(productId) {
    // Find product in all products first, then featured products as fallback
    let product = allProducts.find(p => p.id === productId) || featuredProducts.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }

    // Get selected weight
    const weightSelect = document.getElementById(`weight-${productId}`);
    const selectedWeight = weightSelect ? weightSelect.value : (product.default_weight || '1kg');
    
    // Create unique item key for different weights
    const itemKey = `${productId}-${selectedWeight}`;
    const existingItem = cart.find(item => item.itemKey === itemKey);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${product.name} (${selectedWeight}) quantity updated!`, 'success');
    } else {
        cart.push({
            ...product,
            itemKey: itemKey,
            selectedWeight: selectedWeight,
            quantity: 1
        });
        showNotification(`${product.name} (${selectedWeight}) added to cart!`, 'success');
    }

    localStorage.setItem('jmb-cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function removeFromCart(itemKey) {
    cart = cart.filter(item => item.itemKey !== itemKey);
    localStorage.setItem('jmb-cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    showNotification('Item removed from cart', 'info');
}

function updateQuantity(itemKey, change) {
    const item = cart.find(item => item.itemKey === itemKey);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemKey);
    } else {
        localStorage.setItem('jmb-cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div style="text-align: center; padding: 40px 20px; color: var(--text-medium);">
                <i class="fas fa-shopping-cart" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <p>Your cart is empty</p>
                <p style="font-size: 14px;">Add some delicious items to get started!</p>
            </div>
        `;
        cartTotal.textContent = '₹0';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400'">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-weight">${item.selectedWeight}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString()} each</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity('${item.itemKey}', -1)" title="Decrease quantity">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.itemKey}', 1)" title="Increase quantity">+</button>
                </div>
                <div class="cart-item-total">Total: ₹${itemTotal.toLocaleString()}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.itemKey}')" title="Remove item">
                <i class="fas fa-times"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `₹${total.toLocaleString()}`;
}

// Cart sidebar toggle
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    if (cartSidebar && cartOverlay) {
        cartSidebar.classList.toggle('active');
        cartOverlay.classList.toggle('active');
        document.body.classList.toggle('cart-open');
        
        if (cartSidebar.classList.contains('active')) {
            updateCartDisplay();
        }
    }
}

// Wishlist functionality
function addToWishlist(productId) {
    const product = allProducts.find(p => p.id === productId) || featuredProducts.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }

    let wishlist = JSON.parse(localStorage.getItem('jmb-wishlist')) || [];
    
    if (!wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        localStorage.setItem('jmb-wishlist', JSON.stringify(wishlist));
        showNotification(`${product.name} added to wishlist!`, 'success');
        
        // Update heart icon to filled
        const heartBtn = event.target.closest('button');
        if (heartBtn) {
            heartBtn.innerHTML = '<i class="fas fa-heart" style="color: #e74c3c;"></i>';
            heartBtn.title = 'Remove from Wishlist';
            heartBtn.onclick = () => removeFromWishlist(productId);
        }
    } else {
        showNotification(`${product.name} is already in wishlist!`, 'info');
    }
}

function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('jmb-wishlist')) || [];
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('jmb-wishlist', JSON.stringify(wishlist));
    
    const product = allProducts.find(p => p.id === productId) || featuredProducts.find(p => p.id === productId);
    if (product) {
        showNotification(`${product.name} removed from wishlist`, 'info');
    }
    
    // Update heart icon to empty
    const heartBtn = event.target.closest('button');
    if (heartBtn) {
        heartBtn.innerHTML = '<i class="fas fa-heart"></i>';
        heartBtn.title = 'Add to Wishlist';
        heartBtn.onclick = () => addToWishlist(productId);
    }
}

function getWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('jmb-wishlist')) || [];
    return wishlist.length;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;

    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--white);
                color: var(--text-dark);
                padding: 16px 20px;
                border-radius: var(--radius-medium);
                box-shadow: var(--shadow-heavy);
                display: flex;
                align-items: center;
                gap: 12px;
                z-index: 10000;
                transform: translateX(400px);
                transition: var(--transition-medium);
                border-left: 4px solid var(--primary-color);
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success { border-left-color: #27AE60; }
            .notification-error { border-left-color: #E74C3C; }
            .notification-info { border-left-color: var(--primary-color); }
            
            .notification i {
                font-size: 18px;
            }
            
            .notification-success i { color: #27AE60; }
            .notification-error i { color: #E74C3C; }
            .notification-info i { color: var(--primary-color); }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value.trim());
        }, 300);
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch(this.value.trim());
        }
    });
}

function performSearch(query) {
    if (!query) {
        loadFeaturedProducts(); // Reset to featured products
        return;
    }

    // Search in all products
    const searchProducts = allProducts.length > 0 ? allProducts : featuredProducts;
    const results = searchProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        (product.name_hindi && product.name_hindi.includes(query)) ||
        (product.ingredients && product.ingredients.some(ingredient => 
            ingredient.toLowerCase().includes(query.toLowerCase())
        ))
    );

    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const container = document.getElementById('featuredProducts');
    if (!container) return;

    container.innerHTML = '';

    if (results.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-medium);">
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <h3>No products found for "${query}"</h3>
                <p>Try searching with different keywords or browse our categories</p>
                <button class="btn btn-primary" onclick="clearSearch()">View All Products</button>
            </div>
        `;
        showNotification(`No products found for "${query}"`, 'info');
        return;
    }

    results.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });

    showNotification(`Found ${results.length} product(s) matching "${query}"`, 'success');

    // Update section header
    const sectionHeader = document.querySelector('.featured-products .section-header h2');
    if (sectionHeader) {
        sectionHeader.textContent = `Search Results for "${query}" (${results.length} items)`;
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    loadFeaturedProducts();
    
    // Reset section header
    const sectionHeader = document.querySelector('.featured-products .section-header h2');
    if (sectionHeader) {
        sectionHeader.textContent = 'Featured Products';
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = createMobileMenuOverlay();
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking on overlay
        navOverlay.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            navOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
        
        // Close menu when clicking on nav links
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

function createMobileMenuOverlay() {
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(overlay);
    }
    return overlay;
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Store newsletter subscription (in real app, this would go to server)
        let subscribers = JSON.parse(localStorage.getItem('jmb-newsletter')) || [];
        
        if (subscribers.includes(email)) {
            showNotification('You are already subscribed to our newsletter!', 'info');
        } else {
            subscribers.push(email);
            localStorage.setItem('jmb-newsletter', JSON.stringify(subscribers));
            showNotification('Thank you for subscribing to our newsletter!', 'success');
            event.target.reset();
        }
    } else {
        showNotification('Please enter your email address', 'error');
    }
}

// WhatsApp order functionality
function orderViaWhatsApp() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'info');
        return;
    }

    // Get current date and time
    const now = new Date();
    const orderDate = now.toLocaleDateString('en-IN');
    const orderTime = now.toLocaleTimeString('en-IN');
    
    // Build detailed order message
    let message = `🍯 *JMB Udaipur - New Order Request*\n\n`;
    message += `📅 Date: ${orderDate}\n`;
    message += `🕐 Time: ${orderTime}\n\n`;
    message += `📦 *Order Details:*\n`;
    message += `${'='.repeat(30)}\n\n`;

    let total = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        message += `${index + 1}. *${item.name}*\n`;
        message += `   📏 Weight: ${item.selectedWeight}\n`;
        message += `   💰 Price: ₹${item.price.toLocaleString()} per unit\n`;
        message += `   🔢 Quantity: ${item.quantity}\n`;
        message += `   💵 Subtotal: ₹${itemTotal.toLocaleString()}\n\n`;
    });

    message += `${'='.repeat(30)}\n`;
    message += `📊 *Order Summary:*\n`;
    message += `🛒 Total Items: ${itemCount}\n`;
    message += `💰 *Grand Total: ₹${total.toLocaleString()}*\n\n`;
    
    message += `📍 *Delivery Information Needed:*\n`;
    message += `• Full Name\n`;
    message += `• Complete Address\n`;
    message += `• Phone Number\n`;
    message += `• Preferred Delivery Time\n\n`;
    
    message += `💳 *Payment Options:*\n`;
    message += `• Cash on Delivery\n`;
    message += `• UPI Payment\n`;
    message += `• Card Payment\n\n`;
    
    message += `📝 *Special Instructions:*\n`;
    message += `(Please mention any special requirements)\n\n`;
    
    message += `✨ Thank you for choosing JMB Udaipur!\n`;
    message += `🚚 We will confirm your order and delivery details shortly.`;

    // JMB Udaipur WhatsApp number (replace with actual number)
    const phoneNumber = '919429412345';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Show success message
    showNotification('Redirecting to WhatsApp for order confirmation...', 'success');
    
    // Optional: Clear cart after successful order initiation
    setTimeout(() => {
        if (confirm('Order sent to WhatsApp! Would you like to clear your cart?')) {
            cart = [];
            localStorage.setItem('jmb-cart', JSON.stringify(cart));
            updateCartCount();
            updateCartDisplay();
            toggleCart(); // Close cart sidebar
        }
    }, 2000);
}

// Checkout functionality
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'info');
        return;
    }

    // For now, redirect to WhatsApp ordering
    showNotification('Proceeding with WhatsApp checkout...', 'info');
    setTimeout(() => {
        orderViaWhatsApp();
    }, 1000);
}

// Scroll effects and animations
function initializeScrollEffects() {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScrollY = currentScrollY;
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }

    // Counter animation for statistics
    const counters = document.querySelectorAll('[data-count]');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current).toLocaleString();
        }
    }, 16);
}

// Add CSS for scroll animations if not already present
if (!document.querySelector('#scroll-animations')) {
    const style = document.createElement('style');
    style.id = 'scroll-animations';
    style.textContent = `
        .category-card, .product-card, .feature-card, .review-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .category-card.animate-in, .product-card.animate-in, 
        .feature-card.animate-in, .review-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .header.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
        }
        
        .btn.loading {
            pointer-events: none;
            opacity: 0.7;
        }
        
        .btn.loading::after {
            content: '';
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid transparent;
            border-top: 2px solid currentColor;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-left: 8px;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
            .nav-links {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--white);
                box-shadow: var(--shadow-heavy);
                flex-direction: column;
                padding: 20px;
                transform: translateY(-100vh);
                transition: var(--transition-medium);
            }
            
            .nav-links.active {
                transform: translateY(0);
            }
            
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Floating particles for premium feel
function createFloatingElements() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: linear-gradient(45deg, #FFD700, #FFA500);
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 20 + 10}s infinite linear;
        `;
        hero.appendChild(particle);
    }
}

// Add decorative section dividers
function addSectionDividers() {
    const sections = document.querySelectorAll('.section-header');
    sections.forEach(section => {
        const divider = document.createElement('div');
        divider.className = 'section-divider';
        section.appendChild(divider);
    });
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', initializeWebsite);