import { animate, stagger, utils, createTimeline } from '../lib/anime.esm.js';

// Particle system for background
class ParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.init();
    }

    init() {
        // Create initial particles
        for (let i = 0; i < 80; i++) {
            this.createParticle();
        }
        
        // Start animation loop
        this.animate();
        
        // Add mouse tracking
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.createTrailParticle();
        });
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.opacity = Math.random() * 0.5 + 0.2;
        particle.style.scale = Math.random() * 0.5 + 0.5;
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    createTrailParticle() {
        if (Math.random() > 0.7) {
            const trailParticle = document.createElement('div');
            trailParticle.className = 'trail-particle';
            trailParticle.style.left = this.mouseX + 'px';
            trailParticle.style.top = this.mouseY + 'px';
            this.container.appendChild(trailParticle);
            
            animate(trailParticle, {
                scale: [0, 1.5, 0],
                opacity: [0.8, 0.4, 0],
                x: this.mouseX + (Math.random() - 0.5) * 100,
                y: this.mouseY + (Math.random() - 0.5) * 100,
                duration: 1200,
                easing: 'easeOutExpo',
                complete: () => trailParticle.remove()
            });
        }
    }

    animate() {
        // Animate all particles with stagger
        animate(this.particles, {
            y: [0, -150, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.5, 0.5],
            rotate: [0, 360],
            duration: stagger(3000, { loop: true, direction: 'alternate' }),
            ease: 'inOutSine'
        });
    }
}

// Text animation system
class TextAnimator {
    constructor() {
        this.init();
    }

    init() {
        // Animate hero title with character-by-character reveal
        const heroTitle = document.getElementById('hero-title');
        if (heroTitle) {
            this.animateText(heroTitle, 100);
        }

        // Animate subtitle with word-by-word reveal
        const heroSubtitle = document.getElementById('hero-subtitle');
        if (heroSubtitle) {
            this.animateWords(heroSubtitle, 200);
        }
    }

    animateText(element, delay) {
        const text = element.textContent;
        element.textContent = '';
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.opacity = '0';
            span.style.transform = 'translateY(20px)';
            element.appendChild(span);
            
            animate(span, {
                opacity: [0, 1],
                y: [20, 0],
                duration: 800,
                delay: i * delay,
                ease: 'outExpo'
            });
        });
    }

    animateWords(element, delay) {
        const text = element.textContent;
        element.textContent = '';
        
        text.split(' ').forEach((word, i) => {
            const span = document.createElement('span');
            span.textContent = word;
            span.style.opacity = '0';
            span.style.transform = 'translateX(-30px)';
            span.style.display = 'inline-block';
            span.style.marginRight = '0.5rem';
            element.appendChild(span);
            
            animate(span, {
                opacity: [0, 1],
                x: [-30, 0],
                duration: 600,
                delay: i * delay,
                ease: 'outExpo'
            });
        });
    }
}

// Input field animations
class InputAnimator {
    constructor() {
        this.init();
    }

    init() {
        const inputField = document.querySelector('.input-field');
        const jobInput = document.getElementById('job-input');
        const submitBtn = document.querySelector('.submit-btn');
        const controlBtns = document.querySelectorAll('.control-btn');

        // Input field entrance animation
        animate(inputField, {
            scale: [0.8, 1],
            opacity: [0, 1],
            y: [50, 0],
            duration: 1000,
            delay: 800,
            ease: 'outExpo'
        });

        // Control buttons stagger animation
        animate(controlBtns, {
            scale: [0, 1],
            opacity: [0, 1],
            duration: 600,
            delay: stagger(100, { start: 1200 }),
            ease: 'backOut(1.7)'
        });

        // Submit button special animation
        animate(submitBtn, {
            scale: [0, 1],
            opacity: [0, 1],
            rotate: [180, 0],
            duration: 800,
            delay: 1600,
            ease: 'backOut(1.7)'
        });

        // Input focus animations
        jobInput.addEventListener('focus', () => {
            animate(inputField, {
                scale: [1, 1.02],
                boxShadow: ['0 0 0 0 rgba(99, 102, 241, 0)', '0 0 0 20px rgba(99, 102, 241, 0.1)'],
                duration: 300,
                ease: 'outExpo'
            });
        });

        jobInput.addEventListener('blur', () => {
            animate(inputField, {
                scale: [1.02, 1],
                boxShadow: ['0 0 0 20px rgba(99, 102, 241, 0.1)', '0 0 0 0 rgba(99, 102, 241, 0)'],
                duration: 300,
                ease: 'outExpo'
            });
        });

        // Button click animations
        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                controlBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                animate(btn, {
                    scale: [1, 0.8, 1.1, 1],
                    rotate: [0, -5, 5, 0],
                    duration: 400,
                    ease: 'easeInOut'
                });
            });
        });

        // Submit button click animation
        submitBtn.addEventListener('click', () => {
            const inputValue = jobInput.value.trim();
            if (inputValue) {
                // Button press animation
                animate(submitBtn, {
                    scale: [1, 0.9, 1.1, 1],
                    rotate: [0, -10, 10, 0],
                    duration: 300,
                    ease: 'easeInOut'
                });

                // Input field success animation
                animate(inputField, {
                    scale: [1, 1.05, 1],
                    borderColor: ['rgba(255, 255, 255, 0.1)', '#10b981', 'rgba(255, 255, 255, 0.1)'],
                    duration: 600,
                    ease: 'easeInOut'
                });

                // Success particles
                this.createSuccessParticles();
                
                // Reset input
                jobInput.value = '';
                jobInput.placeholder = 'Great! We\'re preparing your interview strategy...';
                
                setTimeout(() => {
                    jobInput.placeholder = 'Type where you\'re interviewing for what position (e.g., Senior PM at AWS)';
                }, 3000);
            }
        });

        // Enter key support
        jobInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitBtn.click();
            }
        });
    }

    createSuccessParticles() {
        const inputField = document.querySelector('.input-field');
        const rect = inputField.getBoundingClientRect();
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'success-particle';
            particle.style.left = rect.left + rect.width / 2 + 'px';
            particle.style.top = rect.top + rect.height / 2 + 'px';
            document.body.appendChild(particle);
            
            animate(particle, {
                x: rect.left + rect.width / 2 + (Math.random() - 0.5) * 200,
                y: rect.top + rect.height / 2 + (Math.random() - 0.5) * 200,
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                duration: 1000,
                delay: i * 50,
                ease: 'easeOutExpo',
                complete: () => particle.remove()
            });
        }
    }
}

// Floating elements animation
class FloatingAnimator {
    constructor() {
        this.init();
    }

    init() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach((el, i) => {
            animate(el, {
                y: [0, -20, 0],
                rotate: [0, 5, 0],
                duration: 3000 + i * 500,
                delay: i * 200,
                loop: true,
                direction: 'alternate',
                ease: 'easeInOutSine'
            });
        });
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
            // Initialize particle system
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            new ParticleSystem(particlesContainer);
        } else {
            console.log('Particles container not found');
        }

            // Initialize text animator
        new TextAnimator();

        // Initialize input animator
        new InputAnimator();

        // Initialize floating animations
        new FloatingAnimator();

        // Fallback: ensure elements are visible even if animations fail
        setTimeout(() => {
            const elements = document.querySelectorAll('.hero-title, .hero-subtitle, .input-container');
            elements.forEach(el => {
                if (el.style.opacity === '0' || getComputedStyle(el).opacity === '0') {
                    el.style.opacity = '1';
                }
            });
        }, 2000);
});

// Export for potential external use
export { ParticleSystem, TextAnimator, InputAnimator, FloatingAnimator };
