// Modern JMB Udaipur Website - Professional E-commerce JavaScript
// Inspired by premium brands like Haldiram's, Bikaji, and Bombay Sweet Shop

// Sample product data for featured products
const featuredProducts = [
    {
        id: 1,
        name: "Premium Kaju Katli",
        description: "Traditional cashew sweet made with pure ghee and finest cashews",
        price: 899,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        badge: "Bestseller",
        category: "sweets"
    },
    {
        id: 2,
        name: "Royal Ghewar",
        description: "Authentic Rajasthani delicacy with malai and dry fruits",
        price: 749,
        originalPrice: 849,
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400",
        badge: "Traditional",
        category: "sweets"
    },
    {
        id: 3,
        name: "Special Bhujia Mix",
        description: "Crispy namkeen mixture with authentic spices and nuts",
        price: 299,
        originalPrice: 349,
        image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400",
        badge: "Hot Seller",
        category: "namkeen"
    },
    {
        id: 4,
        name: "Assorted Mithai Box",
        description: "Premium collection of 6 different traditional sweets",
        price: 1299,
        originalPrice: 1499,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
        badge: "Gift Pack",
        category: "sweets"
    },
    {
        id: 5,
        name: "Fresh Chocolate Barfi",
        description: "Rich chocolate barfi made with premium cocoa and milk",
        price: 649,
        originalPrice: 749,
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400",
        badge: "New",
        category: "sweets"
    },
    {
        id: 6,
        name: "Deluxe Gift Hamper",
        description: "Curated selection of sweets and namkeen for special occasions",
        price: 1899,
        originalPrice: 2199,
        image: "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=400",
        badge: "Premium",
        category: "gifts"
    }
];

// Shopping cart functionality
let cart = JSON.parse(localStorage.getItem('jmb-cart')) || [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    loadFeaturedProducts();
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
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <div class="product-badge">${product.badge}</div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">
                ₹${product.price.toLocaleString()}
                ${product.originalPrice > product.price ? `<span style="text-decoration: line-through; color: var(--text-light); font-size: 1rem; margin-left: 8px;">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                ${discount > 0 ? `<span style="color: #27AE60; font-size: 0.9rem; margin-left: 8px;">(${discount}% off)</span>` : ''}
            </div>
            <div class="product-actions">
                <button class="btn btn-outline" onclick="addToWishlist(${product.id})">
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
    const product = featuredProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem('jmb-cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
    showNotification(`${product.name} added to cart!`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('jmb-cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
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
        cartItems.innerHTML = '<div style="text-align: center; padding: 40px 0; color: var(--text-medium);">Your cart is empty</div>';
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
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
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
    const product = featuredProducts.find(p => p.id === productId);
    if (!product) return;

    let wishlist = JSON.parse(localStorage.getItem('jmb-wishlist')) || [];
    
    if (!wishlist.find(item => item.id === productId)) {
        wishlist.push(product);
        localStorage.setItem('jmb-wishlist', JSON.stringify(wishlist));
        showNotification(`${product.name} added to wishlist!`, 'success');
    } else {
        showNotification(`${product.name} is already in wishlist!`, 'info');
    }
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
    if (!query) return;

    // Simulate search functionality
    const results = featuredProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length > 0) {
        showNotification(`Found ${results.length} product(s) matching "${query}"`, 'success');
    } else {
        showNotification(`No products found for "${query}"`, 'info');
    }
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    if (email) {
        showNotification('Thank you for subscribing to our newsletter!', 'success');
        event.target.reset();
    }
}

// WhatsApp order functionality
function orderViaWhatsApp() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'info');
        return;
    }

    let message = 'Hello! I would like to order:\n\n';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        message += `• ${item.name} x${item.quantity} - ₹${itemTotal.toLocaleString()}\n`;
    });

    message += `\nTotal: ₹${total.toLocaleString()}\n\nPlease confirm availability and delivery details.`;

    const phoneNumber = '919429412345'; // Replace with actual WhatsApp number
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
}

// Checkout functionality
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'info');
        return;
    }

    showNotification('Redirecting to checkout...', 'info');
    // Here you would typically redirect to a checkout page
    setTimeout(() => {
        alert('Checkout functionality would be implemented here with payment gateway integration.');
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