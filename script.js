// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ===== Mobile Menu Toggle =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
    });
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Typewriter Effect =====
const typewriter = document.getElementById('typewriter');
const words = [' Data Analyst Enthusiast', 'Passionate in Data Science', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriter.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // Pause before new word
    }
    
    setTimeout(type, typeSpeed);
}

// Start typewriter after a short delay
setTimeout(type, 1000);

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const counter = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== Skills Tabs =====
const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skills-panel');

skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetPanel = tab.getAttribute('data-tab');
        
        // Update active tab
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show target panel
        skillPanels.forEach(panel => {
            panel.classList.remove('active');
            if (panel.id === targetPanel) {
                panel.classList.add('active');
                // Trigger animations for newly visible panel
                animateSkillsInPanel(panel);
            }
        });
    });
});

// Animate circular progress and meters
function animateSkillsInPanel(panel) {
    // Animate circular skills
    const circularSkills = panel.querySelectorAll('.circular-skill');
    circularSkills.forEach((skill, index) => {
        const progress = skill.getAttribute('data-progress');
        const circle = skill.querySelector('.progress-ring-fill');
        if (circle) {
            const circumference = 339.292; // 2 * PI * 54
            const offset = circumference - (progress / 100) * circumference;
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 100 + (index * 150));
        }
    });
    
    // Animate meter fills
    const meterFills = panel.querySelectorAll('.meter-fill');
    meterFills.forEach((meter, index) => {
        const width = meter.getAttribute('data-width');
        setTimeout(() => {
            meter.style.width = width + '%';
        }, 100 + (index * 100));
    });
}

// Initial animation for active panel
const activePanel = document.querySelector('.skills-panel.active');
if (activePanel) {
    // Delay to allow page load
    setTimeout(() => {
        animateSkillsInPanel(activePanel);
    }, 500);
}

// ===== Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars with staggered effect
            if (entry.target.querySelector('.skill-progress')) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    const bar = item.querySelector('.skill-progress');
                    const progress = bar.getAttribute('data-progress');
                    
                    // Staggered animation delay
                    setTimeout(() => {
                        bar.style.width = progress + '%';
                        
                        // Add animated class for percent pop effect
                        setTimeout(() => {
                            item.classList.add('animated');
                        }, 1500);
                    }, 200 + (index * 150));
                });
            }
            
            // Animate counters
            if (entry.target.querySelector('.stat-number')) {
                statNumbers.forEach(stat => animateCounter(stat));
            }
        }
    });
}, observerOptions);

// Observe all elements with animation class
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Observe hero section for counter animation
const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Send form data to FormSubmit
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        showNotification('Failed to send message. Please try again or email directly.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// ===== Notification System =====
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroGrid = document.querySelector('.hero-grid');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
    
    if (heroGrid) {
        heroGrid.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ===== Project Filter =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const noResults = document.getElementById('noResults');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        let visibleCount = 0;
        
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            const shouldShow = filter === 'all' || category.includes(filter);
            
            // Add staggered animation delay
            card.style.transitionDelay = shouldShow ? `${index * 0.05}s` : '0s';
            
            if (shouldShow) {
                card.classList.remove('hide');
                card.classList.add('show');
                visibleCount++;
            } else {
                card.classList.add('hide');
                card.classList.remove('show');
            }
        });
        
        // Show/hide no results message
        if (visibleCount === 0) {
            noResults.classList.add('show');
        } else {
            noResults.classList.remove('show');
        }
        
        // Reset transition delays after animation
        setTimeout(() => {
            projectCards.forEach(card => {
                card.style.transitionDelay = '0s';
            });
        }, 500);
    });
});

// Initialize all cards as visible
projectCards.forEach(card => {
    card.classList.add('show');
});

// ===== Project Cards Tilt Effect =====
projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (card.classList.contains('hide')) return;
        
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        if (card.classList.contains('hide')) return;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to navbar
    navbar.classList.add('loaded');
    
    // Preload images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
        } else {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        }
    });
});

// ===== Scroll Progress Indicator =====
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = `${scrolled}%`;
});
