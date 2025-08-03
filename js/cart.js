// =========================================
// JMB Udaipur - Shopping Cart Functionality
// Premium Cart Management System
// =========================================

// Cart State Management
class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.cartSidebar = document.getElementById('cartSidebar');
        this.cartOverlay = document.getElementById('cartOverlay');
        this.cartItems = document.getElementById('cartItems');
        this.cartTotal = document.getElementById('cartTotal');
        this.isOpen = false;
        
        this.bindEvents();
        this.updateCartUI();
    }
    
    // Load cart from localStorage
    loadCart() {
        return JSON.parse(localStorage.getItem('jmbCart') || '[]');
    }
    
    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('jmbCart', JSON.stringify(this.cart));
    }
    
    // Bind event listeners
    bindEvents() {
        // Close cart when clicking overlay
        if (this.cartOverlay) {
            this.cartOverlay.addEventListener('click', () => this.closeCart());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeCart();
            }
        });
    }
    
    // Toggle cart sidebar
    toggleCart() {
        if (this.isOpen) {
            this.closeCart();
        } else {
            this.openCart();
        }
    }
    
    // Open cart sidebar
    openCart() {
        if (this.cartSidebar && this.cartOverlay) {
            this.cartSidebar.classList.add('active');
            this.cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.isOpen = true;
            
            // Focus first interactive element
            const firstButton = this.cartSidebar.querySelector('button');
            if (firstButton) {
                firstButton.focus();
            }
        }
    }
    
    // Close cart sidebar
    closeCart() {
        if (this.cartSidebar && this.cartOverlay) {
            this.cartSidebar.classList.remove('active');
            this.cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
            this.isOpen = false;
        }
    }
    
    // Add item to cart
    addItem(product, quantity = 1) {
        const existingItem = this.cart.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                ...product,
                quantity: quantity
            });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.updateCartCount();
        
        return true;
    }
    
    // Remove item from cart
    removeItem(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.updateCartCount();
    }
    
    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveCart();
                this.updateCartUI();
                this.updateCartCount();
            }
        }
    }
    
    // Clear entire cart
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
        this.updateCartCount();
    }
    
    // Calculate cart total
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
    
    // Get cart item count
    getItemCount() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }
    
    // Update cart UI
    updateCartUI() {
        if (!this.cartItems || !this.cartTotal) return;
        
        if (this.cart.length === 0) {
            this.cartItems.innerHTML = `
                <div class="cart-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="m1 1 4 4 6 6"></path>
                        <path d="M7 7h13l-4 8H7l-4-8z"></path>
                    </svg>
                    <h3>Your cart is empty</h3>
                    <p>Add some delicious items to get started!</p>
                    <button class="btn btn-primary" onclick="cartManager.closeCart()">
                        Continue Shopping
                    </button>
                </div>
            `;
            this.cartTotal.textContent = '₹0';
        } else {
            this.cartItems.innerHTML = this.cart.map(item => this.createCartItemHTML(item)).join('');
            this.cartTotal.textContent = this.formatCurrency(this.getTotal());
        }
    }
    
    // Create cart item HTML
    createCartItemHTML(item) {
        return `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='images/products/placeholder.jpg'">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price} / ${item.weight || 'piece'}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">
                            −
                        </button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                            +
                        </button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="cartManager.removeItem(${item.id})" aria-label="Remove ${item.name}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3,6 5,6 21,6"></polyline>
                        <path d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"></path>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                </button>
            </div>
        `;
    }
    
    // Update cart count in header
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.getItemCount();
            cartCount.textContent = totalItems;
            cartCount.classList.add('updated');
            setTimeout(() => cartCount.classList.remove('updated'), 300);
        }
    }
    
    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
    
    // Get formatted cart summary for WhatsApp
    getCartSummary() {
        if (this.cart.length === 0) return '';
        
        let summary = '🍯 JMB UDAIPUR - Cart Order\n\n📋 Order Details:\n';
        
        this.cart.forEach(item => {
            summary += `• ${item.name} x ${item.quantity} = ₹${item.price * item.quantity}\n`;
        });
        
        summary += `\n💰 Total Amount: ${this.formatCurrency(this.getTotal())}\n`;
        summary += `📦 Total Items: ${this.getItemCount()}\n\n`;
        summary += `👤 Customer Details:\n`;
        summary += `📱 Phone: [Please provide]\n`;
        summary += `📧 Email: [Please provide]\n\n`;
        summary += `📍 Delivery Address:\n`;
        summary += `[Please provide complete address with pincode]\n\n`;
        summary += `🚚 Delivery: [Local/Outstation]\n\n`;
        summary += `Order ID: #JMB${Date.now()}`;
        
        return summary;
    }
    
    // Proceed to WhatsApp checkout
    proceedToWhatsApp() {
        if (this.cart.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }
        
        const orderSummary = this.getCartSummary();
        const whatsappUrl = `https://wa.me/911234567890?text=${encodeURIComponent(orderSummary)}`;
        window.open(whatsappUrl, '_blank');
        
        // Optional: Clear cart after order (uncomment if desired)
        // this.clearCart();
        // this.closeCart();
    }
    
    // Show notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                ${type === 'success' ? 
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>' :
                    '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
                }
                <span>${message}</span>
            </div>
        `;
        
        // Add notification styles if not already present
        if (!document.querySelector('style[data-notification-styles]')) {
            const style = document.createElement('style');
            style.setAttribute('data-notification-styles', 'true');
            style.textContent = `
                .notification {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    padding: 15px 20px;
                    border-radius: 10px;
                    box-shadow: var(--shadow-lg);
                    z-index: 1000;
                    animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.5s forwards;
                    max-width: 400px;
                }
                
                .notification-success {
                    background: var(--color-burgundy);
                    color: var(--color-cream);
                }
                
                .notification-error {
                    background: #dc3545;
                    color: white;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove after animation
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global cart manager instance
let cartManager;

// Initialize cart when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    cartManager = new CartManager();
});

// Global functions for HTML onclick handlers
function toggleCart() {
    if (cartManager) {
        cartManager.toggleCart();
    }
}

function proceedToWhatsApp() {
    if (cartManager) {
        cartManager.proceedToWhatsApp();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CartManager;
}