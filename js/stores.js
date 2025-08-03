// Stores Page JavaScript with Map Integration

// Store data
const stores = [
    {
        id: 1,
        name: "JMB City Palace Road",
        address: "Near City Palace Main Gate, City Palace Road, Udaipur, Rajasthan 313001",
        lat: 24.5854,
        lng: 73.6857,
        phone: "+91 294 241 2345",
        timings: "Mon-Sat: 9:00 AM - 9:00 PM<br>Sunday: 10:00 AM - 8:00 PM",
        type: "flagship"
    },
    {
        id: 2,
        name: "JMB Hathi Pole",
        address: "Hathi Pole Bazaar, Near Clock Tower, Udaipur, Rajasthan 313001",
        lat: 24.5796,
        lng: 73.6836,
        phone: "+91 294 241 3456",
        timings: "Mon-Sat: 10:00 AM - 8:00 PM<br>Sunday: 11:00 AM - 7:00 PM",
        type: "regular"
    },
    {
        id: 3,
        name: "JMB Celebration Mall",
        address: "Celebration Mall, Bhuwana Bypass Rd, Udaipur, Rajasthan 313001",
        lat: 24.5991,
        lng: 73.7339,
        phone: "+91 294 241 4567",
        timings: "Mon-Sun: 11:00 AM - 10:00 PM",
        type: "regular"
    },
    {
        id: 4,
        name: "JMB Fatehpura",
        address: "Fatehpura Circle, Near Saheliyon Ki Bari, Udaipur, Rajasthan 313001",
        lat: 24.6052,
        lng: 73.6889,
        phone: "+91 294 241 5678",
        timings: "Mon-Sat: 9:30 AM - 8:30 PM<br>Sunday: 10:00 AM - 7:00 PM",
        type: "regular"
    },
    {
        id: 5,
        name: "JMB Airport Road",
        address: "Airport Road, Near Maharana Pratap Airport, Udaipur, Rajasthan 313001",
        lat: 24.6177,
        lng: 73.8961,
        phone: "+91 294 241 6789",
        timings: "Mon-Sun: 8:00 AM - 10:00 PM",
        type: "new"
    }
];

let map;
let markers = [];
let selectedStoreId = null;

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    setupStoreCards();
});

// Initialize Leaflet map
function initializeMap() {
    // Initialize map centered on Udaipur
    map = L.map('storeMap').setView([24.5854, 73.6857], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for each store
    stores.forEach(store => {
        const icon = getMarkerIcon(store.type);
        const marker = L.marker([store.lat, store.lng], { icon: icon })
            .addTo(map)
            .bindPopup(createPopupContent(store));
        
        marker.storeId = store.id;
        markers.push(marker);

        // Handle marker click
        marker.on('click', function() {
            selectStore(store.id);
        });
    });

    // Fit map to show all markers
    const group = new L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.1));
}

// Get custom marker icon based on store type
function getMarkerIcon(type) {
    const iconOptions = {
        flagship: {
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzMCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBoMGMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNWMwIDExLjI1IDE1IDI1IDE1IDI1czE1LTEzLjc1IDE1LTI1YzAtOC4yODQtNi43MTYtMTUtMTUtMTV6IiBmaWxsPSIjRkZENzAwIi8+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjgiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+',
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        },
        regular: {
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzMCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBoMGMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNWMwIDExLjI1IDE1IDI1IDE1IDI1czE1LTEzLjc1IDE1LTI1YzAtOC4yODQtNi43MTYtMTUtMTUtMTV6IiBmaWxsPSIjRkY2QjM1Ii8+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjgiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+',
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        },
        new: {
            iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCAzMCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE1IDBoMGMtOC4yODQgMC0xNSA2LjcxNi0xNSAxNWMwIDExLjI1IDE1IDI1IDE1IDI1czE1LTEzLjc1IDE1LTI1YzAtOC4yODQtNi43MTYtMTUtMTUtMTV6IiBmaWxsPSIjMjdBRTYwIi8+CjxjaXJjbGUgY3g9IjE1IiBjeT0iMTUiIHI9IjgiIGZpbGw9IiNGRkZGRkYiLz4KPC9zdmc+',
            iconSize: [30, 40],
            iconAnchor: [15, 40],
            popupAnchor: [0, -40]
        }
    };

    return L.icon(iconOptions[type] || iconOptions.regular);
}

// Create popup content for markers
function createPopupContent(store) {
    return `
        <div class="popup-content">
            <h4>${store.name}</h4>
            <p><i class="fas fa-map-marker-alt"></i> ${store.address}</p>
            <p><i class="fas fa-phone"></i> ${store.phone}</p>
            <p><i class="fas fa-clock"></i> ${store.timings}</p>
            <button class="btn btn-primary btn-sm" onclick="getDirections(${store.lat}, ${store.lng})">
                <i class="fas fa-directions"></i> Get Directions
            </button>
        </div>
    `;
}

// Setup store card interactions
function setupStoreCards() {
    const storeCards = document.querySelectorAll('.store-card');
    
    storeCards.forEach(card => {
        card.addEventListener('click', function() {
            const storeId = parseInt(this.getAttribute('data-store-id'));
            selectStore(storeId);
        });
    });
}

// Select a store and update UI
function selectStore(storeId) {
    selectedStoreId = storeId;
    
    // Update card active state
    document.querySelectorAll('.store-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-store-id="${storeId}"]`).classList.add('active');
    
    // Find store and center map
    const store = stores.find(s => s.id === storeId);
    if (store) {
        map.setView([store.lat, store.lng], 16);
        
        // Open popup for selected marker
        const marker = markers.find(m => m.storeId === storeId);
        if (marker) {
            marker.openPopup();
        }
    }
}

// Show store on map
function showOnMap(lat, lng, storeId) {
    selectStore(storeId);
}

// Get directions to store
function getDirections(lat, lng) {
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
}

// Search stores functionality
function searchStores() {
    const searchTerm = document.getElementById('storeSearch').value.toLowerCase();
    const storeCards = document.querySelectorAll('.store-card');
    
    let visibleCount = 0;
    
    storeCards.forEach(card => {
        const storeText = card.textContent.toLowerCase();
        if (storeText.includes(searchTerm) || searchTerm === '') {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no stores found
    const storeCardsContainer = document.getElementById('storeCards');
    const noResultsMessage = storeCardsContainer.querySelector('.no-results');
    
    if (visibleCount === 0) {
        if (!noResultsMessage) {
            const message = document.createElement('div');
            message.className = 'no-results';
            message.style.cssText = 'text-align: center; padding: 40px; color: var(--text-medium);';
            message.innerHTML = `
                <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <h3>No stores found</h3>
                <p>Try searching with different keywords</p>
            `;
            storeCardsContainer.appendChild(message);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Handle enter key in search
document.getElementById('storeSearch')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchStores();
    }
});