// ===== Smooth Scrolling and Navigation ===== 
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const navbarToggler = document.querySelector('.navbar-toggler');
                navbarToggler.click();
            }
        });
    });

    // ===== Scroll Animations =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll('.section-title, .section-description, .product-card, .feature-item, .experience-step, .contact-item');
    
    animatedElements.forEach((element, index) => {
        // Add different animation classes based on element type and position
        if (element.classList.contains('section-title') || element.classList.contains('section-description')) {
            element.classList.add('fade-in');
        } else if (index % 2 === 0) {
            element.classList.add('slide-in-left');
        } else {
            element.classList.add('slide-in-right');
        }
        
        observer.observe(element);
    });

    // ===== Product Card Interactions =====
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ===== Order Form Handling =====
    const orderForm = document.querySelector('.order-form');
    const productSelect = orderForm.querySelector('select');
    const orderButton = orderForm.querySelector('button[type="submit"]');
    
    // Update order button price based on selected product
    productSelect.addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const price = selectedOption.text.match(/\$[\d.]+/)[0];
        
        orderButton.innerHTML = `
            <i class="fas fa-credit-card me-2"></i>
            Place Order - ${price}
        `;
    });
    
    // Handle form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const selectedProduct = productSelect.options[productSelect.selectedIndex].text;
        const grindType = this.querySelector('select:nth-of-type(2)').value;
        const quantity = this.querySelector('select:nth-of-type(3)').value;
        const email = this.querySelector('input[type="email"]').value;
        
        // Validate email
        if (!email || !email.includes('@')) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const originalButtonText = orderButton.innerHTML;
        orderButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
        orderButton.disabled = true;
        
        // Simulate order processing
        setTimeout(() => {
            alert(`Thank you for your order!\n\nProduct: ${selectedProduct}\nGrind: ${grindType}\nQuantity: ${quantity}\nEmail: ${email}\n\nYou will receive a confirmation email shortly.`);
            
            // Reset button
            orderButton.innerHTML = originalButtonText;
            orderButton.disabled = false;
            
            // Reset form
            this.reset();
            
            // Trigger price update
            productSelect.dispatchEvent(new Event('change'));
        }, 2000);
    });

    // ===== Dynamic Content Loading =====
    // Add real-time coffee facts
    const coffeeFacts = [
        "Coffee is the second most traded commodity in the world after oil.",
        "A coffee tree can live up to 100 years and produce beans for 50-60 years.",
        "The optimal water temperature for brewing coffee is between 195-205°F.",
        "Coffee beans are actually the seeds of coffee cherries.",
        "The word 'coffee' comes from the Arabic word 'qahwah'."
    ];
    
    let factIndex = 0;
    
    // Create coffee fact element if it doesn't exist
    function addCoffeeFact() {
        const heroContent = document.querySelector('.hero-content');
        
        if (!document.querySelector('.coffee-fact')) {
            const factElement = document.createElement('div');
            factElement.className = 'coffee-fact mt-3 p-3';
            factElement.style.cssText = `
                background: rgba(255,255,255,0.1);
                border-radius: 10px;
                border-left: 4px solid var(--gold);
                font-style: italic;
                opacity: 0;
                transition: opacity 0.5s ease;
            `;
            
            heroContent.appendChild(factElement);
        }
        
        const factElement = document.querySelector('.coffee-fact');
        factElement.style.opacity = '0';
        
        setTimeout(() => {
            factElement.innerHTML = `<i class="fas fa-lightbulb me-2"></i>${coffeeFacts[factIndex]}`;
            factElement.style.opacity = '1';
            factIndex = (factIndex + 1) % coffeeFacts.length;
        }, 500);
    }
    
    // Show first fact after page load
    setTimeout(addCoffeeFact, 3000);
    
    // Rotate facts every 8 seconds
    setInterval(addCoffeeFact, 8000);

    // ===== Social Media Integration =====
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const platform = this.querySelector('i').classList[1].split('-')[1];
            let url = '';
            
            switch(platform) {
                case 'instagram':
                    url = 'https://instagram.com/artisanroast';
                    break;
                case 'facebook':
                    url = 'https://facebook.com/artisanroast';
                    break;
                case 'twitter':
                    url = 'https://twitter.com/artisanroast';
                    break;
                case 'youtube':
                    url = 'https://youtube.com/artisanroast';
                    break;
            }
            
            // Open in new tab
            window.open(url, '_blank');
        });
    });

    // ===== Product Image Lazy Loading =====
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ===== Contact Form Enhancement =====
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('fa-phone')) {
                window.location.href = 'tel:+15551234273';
            } else if (icon.classList.contains('fa-envelope')) {
                window.location.href = 'mailto:hello@artisanroast.com';
            } else if (icon.classList.contains('fa-map-marker-alt')) {
                window.open('https://maps.google.com/?q=123+Coffee+Street+Seattle+WA', '_blank');
            }
        });
        
        // Add hover effect
        item.style.cursor = 'pointer';
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // ===== Scroll Progress Indicator =====
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        // Create progress bar if it doesn't exist
        if (!document.querySelector('.scroll-progress')) {
            const progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: ${scrollPercent}%;
                height: 3px;
                background: var(--gold);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        } else {
            document.querySelector('.scroll-progress').style.width = scrollPercent + '%';
        }
    }
    
    window.addEventListener('scroll', updateScrollProgress);

    // ===== Performance Optimization =====
    // Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(() => {
        updateScrollProgress();
        
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 10);
    
    window.addEventListener('scroll', debouncedScrollHandler);
});

// ===== Additional Utility Functions =====

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Local storage helper
const Storage = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Could not save to localStorage:', e);
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (e) {
            console.warn('Could not read from localStorage:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Could not remove from localStorage:', e);
        }
    }
};

// Track user preferences
document.addEventListener('DOMContentLoaded', function() {
    // Save user's last selected product
    const productSelect = document.querySelector('.order-form select');
    const savedProduct = Storage.get('lastSelectedProduct');
    
    if (savedProduct && productSelect) {
        productSelect.value = savedProduct;
        productSelect.dispatchEvent(new Event('change'));
    }
    
    if (productSelect) {
        productSelect.addEventListener('change', function() {
            Storage.set('lastSelectedProduct', this.value);
        });
    }
    
    // Track page views
    const pageViews = Storage.get('pageViews') || 0;
    Storage.set('pageViews', pageViews + 1);
    
    // Show returning customer message
    if (pageViews > 1) {
        setTimeout(() => {
            const welcomeMessage = document.createElement('div');
            welcomeMessage.className = 'welcome-back';
            welcomeMessage.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--gold);
                color: var(--coffee-brown);
                padding: 1rem;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                animation: slideInRight 0.5s ease;
            `;
            welcomeMessage.innerHTML = `
                <i class="fas fa-coffee me-2"></i>
                Welcome back, coffee lover!
                <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;margin-left:10px;">
                    <i class="fas fa-times"></i>
                </button>
            `;
            
            document.body.appendChild(welcomeMessage);
            
            setTimeout(() => {
                if (welcomeMessage.parentElement) {
                    welcomeMessage.remove();
                }
            }, 5000);
        }, 2000);
    }
});
