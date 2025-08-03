// =========================================
// JMB Udaipur - Main JavaScript
// Premium Traditional Indian Confectionery
// =========================================

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    loadProducts();
    initMobileMenu();
    initScrollEffects();
    initIntersectionObserver();
    initParallaxEffects();
    initCounterAnimation();
    updateCartCount();
    addScrollToTopButton();
}

// Sample Product Data
const sampleProducts = [
    {
        id: 1,
        name: "Premium Ghewar",
        description: "Traditional Rajasthani sweet disc soaked in sugar syrup, topped with rabri and dry fruits",
        price: 850,
        category: "sweets",
        image: "images/products/ghewar.jpg",
        weight: "1 Kg",
        shelfLife: "7 days"
    },
    {
        id: 2,
        name: "Kaju Katli",
        description: "Diamond-shaped cashew fudge with silver leaf, a royal delicacy",
        price: 1200,
        category: "sweets",
        image: "images/products/kaju-katli.jpg",
        weight: "1 Kg",
        shelfLife: "15 days"
    },
    {
        id: 3,
        name: "Special Namkeen Mix",
        description: "Crunchy blend of sev, peanuts, and traditional spices",
        price: 450,
        category: "namkeen",
        image: "images/products/namkeen-mix.jpg",
        weight: "1 Kg",
        shelfLife: "30 days"
    },
    {
        id: 4,
        name: "Gulab Jamun",
        description: "Soft milk solid balls soaked in rose-flavored sugar syrup",
        price: 600,
        category: "sweets",
        image: "images/products/gulab-jamun.jpg",
        weight: "1 Kg",
        shelfLife: "5 days"
    },
    {
        id: 5,
        name: "Premium Mathri",
        description: "Crispy, flaky traditional snack perfect with tea",
        price: 380,
        category: "namkeen",
        image: "images/products/mathri.jpg",
        weight: "1 Kg",
        shelfLife: "20 days"
    },
    {
        id: 6,
        name: "Diwali Gift Hamper",
        description: "Curated collection of premium sweets and dry fruits",
        price: 2500,
        category: "gift-hampers",
        image: "images/products/gift-hamper.jpg",
        weight: "2.5 Kg",
        shelfLife: "Varies"
    }
];

// Load Featured Products
function loadProducts() {
    const productGrid = document.getElementById('featuredProductsGrid');
    if (!productGrid) return;
    
    const featuredProducts = sampleProducts.slice(0, 6);
    productGrid.innerHTML = '';
    
    featuredProducts.forEach((product, index) => {
        const productCard = createProductCard(product);
        productCard.style.animationDelay = `${index * 0.1}s`;
        productCard.classList.add('animate-fadeInUp');
        productGrid.appendChild(productCard);
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" onerror="this.src='images/products/placeholder.jpg'">
            <span class="premium-badge">Premium</span>
        </div>
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">₹${product.price} / ${product.weight}</div>
            <div class="product-actions">
                <button class="btn btn-primary btn-add-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
                <button class="btn btn-whatsapp" onclick="orderOnWhatsApp(${product.id})">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// Enhanced Scroll Effects
function initScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header hide/show on scroll with smooth animation
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease-in-out';
        } else {
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease-in-out';
        }
        
        lastScrollTop = scrollTop;
        
        // Add background blur and shadow on scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
}

// Enhanced Intersection Observer for Smooth Animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                    entry.target.classList.add('animate-in');
                    
                    // Special animations for different element types
                    if (entry.target.classList.contains('product-card')) {
                        entry.target.style.animationDelay = `${index * 0.1}s`;
                        entry.target.classList.add('slide-up');
                    }
                    
                    if (entry.target.classList.contains('category-card')) {
                        entry.target.style.animationDelay = `${index * 0.15}s`;
                        entry.target.classList.add('fade-scale');
                    }
                    
                    if (entry.target.classList.contains('timeline-item')) {
                        entry.target.classList.add('slide-left');
                    }
                    
                    if (entry.target.classList.contains('testimonial-card')) {
                        entry.target.style.animationDelay = `${index * 0.2}s`;
                        entry.target.classList.add('bounce-in');
                    }
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observe elements with enhanced selectors
    const elementsToObserve = [
        '.product-card',
        '.category-card', 
        '.timeline-item',
        '.testimonial-card',
        '.stat-item',
        '.section-title',
        '.section-subtitle'
    ];
    
    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
}

// Update Cart Count
function updateCartCount() {
    const cart = getCart();
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.classList.add('updated');
        setTimeout(() => cartCount.classList.remove('updated'), 300);
    }
}

// Get Cart from LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem('jmbCart') || '[]');
}

// Add to Cart
function addToCart(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('jmbCart', JSON.stringify(cart));
    updateCartCount();
    updateCartUI();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Order on WhatsApp (Single Product)
function orderOnWhatsApp(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    const message = `🍯 JMB UDAIPUR - New Order

📋 Product: ${product.name}
💰 Price: ₹${product.price} / ${product.weight}
📝 Description: ${product.description}

👤 I would like to order this premium item.

Order ID: #JMB${Date.now()}`;
    
    const whatsappUrl = `https://wa.me/911234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Enhanced Modern Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icons = {
        success: '<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>',
        error: '<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>',
        info: '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>'
    };
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    ${icons[type]}
                </svg>
            </div>
            <span class="notification-text">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add modern notification styles
    if (!document.querySelector('#modern-notifications-style')) {
        const style = document.createElement('style');
        style.id = 'modern-notifications-style';
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 30px;
                right: 30px;
                background: var(--bg-card);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: var(--color-white);
                padding: 1rem 1.5rem;
                border-radius: var(--radius-lg);
                box-shadow: var(--shadow-xl);
                z-index: 10000;
                max-width: 400px;
                animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1), 
                          slideOutUp 0.4s cubic-bezier(0.4, 0, 0.2, 1) 4s forwards;
            }
            
            .notification-success {
                border-left: 4px solid var(--color-accent);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 1rem;
            }
            
            .notification-icon {
                color: var(--color-accent);
                flex-shrink: 0;
            }
            
            .notification-text {
                flex: 1;
                font-weight: 500;
                line-height: 1.4;
            }
            
            .notification-close {
                background: transparent;
                border: none;
                color: var(--color-gray-light);
                cursor: pointer;
                padding: 0.25rem;
                border-radius: var(--radius-sm);
                transition: all var(--transition-fast);
            }
            
            .notification-close:hover {
                background: rgba(255, 255, 255, 0.1);
                color: var(--color-white);
            }
            
            @keyframes slideInUp {
                from {
                    transform: translateY(100%) scale(0.9);
                    opacity: 0;
                }
                to {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutUp {
                from {
                    transform: translateY(0) scale(1);
                    opacity: 1;
                }
                to {
                    transform: translateY(-100%) scale(0.9);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Newsletter Subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Here you would normally send this to your server
    console.log('Newsletter subscription:', email);
    
    showNotification('Thank you for subscribing to our newsletter!');
    event.target.reset();
}

// Smooth Scroll to Section
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Lazy Load Images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Modern Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-background, .story-image');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Animated Counter for Statistics
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
}

// Scroll to Top Button
function addScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.className = 'scroll-to-top';
    scrollButton.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 20h-2V8l-5.5 5.5-1.42-1.42L12 4.16l7.92 7.92-1.42 1.42L13 8v12z"/>
        </svg>
    `;
    
    // Add styles for scroll button
    const scrollButtonStyle = document.createElement('style');
    scrollButtonStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient-accent);
            border: none;
            border-radius: 50%;
            color: var(--color-white);
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all var(--transition-medium);
            z-index: 1000;
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-3px) scale(1.1);
            box-shadow: var(--shadow-glow);
        }
    `;
    
    document.head.appendChild(scrollButtonStyle);
    document.body.appendChild(scrollButton);
    
    // Show/hide scroll button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Enhanced Product Loading with Stagger Animation
function loadProductsWithAnimation() {
    const productGrid = document.getElementById('featuredProductsGrid');
    if (!productGrid) return;
    
    const featuredProducts = sampleProducts.slice(0, 6);
    productGrid.innerHTML = '';
    
    featuredProducts.forEach((product, index) => {
        setTimeout(() => {
            const productCard = createProductCard(product);
            productCard.classList.add('product-enter');
            productGrid.appendChild(productCard);
            
            // Trigger animation after a small delay
            setTimeout(() => {
                productCard.classList.add('product-enter-active');
            }, 50);
        }, index * 100);
    });
}

// Smooth Page Transitions
function initPageTransitions() {
    // Add page transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'page-transition-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--gradient-premium);
        z-index: 9999;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--color-white);
        font-size: 1.5rem;
        font-weight: 600;
    `;
    
    document.body.appendChild(overlay);
}

// Enhanced Mobile Menu with Modern Animations
function enhanceMobileMenu() {
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
            transform: scale(0);
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 100%;
                left: 0;
                width: 100%;
                background: var(--bg-card);
                backdrop-filter: blur(20px);
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all var(--transition-medium);
                flex-direction: column;
                padding: var(--spacing-lg);
                box-shadow: var(--shadow-xl);
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .nav-link {
                padding: var(--spacing-md);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                width: 100%;
                text-align: center;
            }
            
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                background: transparent;
                box-shadow: none;
                border: none;
                margin-top: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
    document.addEventListener('DOMContentLoaded', enhanceMobileMenu);
} else {
    lazyLoadImages();
    enhanceMobileMenu();
}