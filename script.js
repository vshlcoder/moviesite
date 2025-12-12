// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(26, 26, 26, 0.98)';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // Add hover effects to cards
    const cards = document.querySelectorAll('.collection-card, .cast-member, .review-card, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Mobile menu toggle (if needed)
    const navMenu = document.querySelector('.nav-menu');
    const navContainer = document.querySelector('.nav-container');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    // Add mobile menu functionality
    function checkMobile() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navMenu.style.display = 'none';
            
            if (!navContainer.contains(mobileMenuBtn)) {
                navContainer.appendChild(mobileMenuBtn);
            }
        } else {
            mobileMenuBtn.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }
    
    mobileMenuBtn.addEventListener('click', function() {
        if (navMenu.style.display === 'none' || navMenu.style.display === '') {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'rgba(26, 26, 26, 0.98)';
            navMenu.style.padding = '1rem';
            navMenu.style.borderTop = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navMenu.style.display = 'none';
        }
    });
    
    window.addEventListener('resize', checkMobile);
    checkMobile();

    // Add click tracking for SEO keywords (optional analytics)
    const keywordElements = document.querySelectorAll('h1, h2, h3, .rating-badge, .amount');
    
    keywordElements.forEach(element => {
        element.addEventListener('click', function() {
            // You can add analytics tracking here
            console.log('Clicked on:', this.textContent);
        });
    });

    // Preload critical images
    const criticalImages = ['Dhurandar-306x393.jpg'];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Add loading states
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove any loading spinners or add loaded class
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => el.remove());
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Additional scroll-based functionality can go here
        }, 10);
    });
});

// Add CSS for mobile menu button
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .nav-container {
            position: relative;
        }
        
        .nav-menu {
            gap: 0.5rem;
        }
        
        .nav-menu a {
            padding: 0.5rem 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .mobile-menu-btn:hover {
            color: var(--primary-color);
        }
    }
    
    .loaded {
        opacity: 1 !important;
    }
`;

document.head.appendChild(style);

// Download Button and Popup Functionality
document.addEventListener('DOMContentLoaded', function() {
    const downloadBtn = document.getElementById('downloadBtn');
    const downloadPopup = document.getElementById('downloadPopup');
    const closePopup = document.getElementById('closePopup');
    const countdownTimer = document.getElementById('countdownTimer');
    const countdownText = document.getElementById('countdownText');
    const secondTaskSection = document.getElementById('secondTaskSection');
    const secondCountdownTimer = document.getElementById('secondCountdownTimer');
    const secondCountdownText = document.getElementById('secondCountdownText');
    const likePostBtn = document.getElementById('likePostBtn');
    const finalDownloadBtn = document.getElementById('finalDownloadBtn');

    let countdownInterval;
    let currentCount = 0;

    // Download button click event
    downloadBtn.addEventListener('click', function() {
        // Open Instagram link immediately in new tab
        window.open('https://www.instagram.com/p/DSBMMuQk-Dp/?img_index=1&igsh=NW5jZXZ2aHg1emg4', '_blank');
        
        // Then open the countdown popup on main page
        openDownloadPopup();
    });

    // Close popup events
    closePopup.addEventListener('click', function() {
        closeDownloadPopup();
    });



    // Close popup when clicking outside
    downloadPopup.addEventListener('click', function(e) {
        if (e.target === downloadPopup) {
            closeDownloadPopup();
        }
    });

    // Like post button click event
    if (likePostBtn) {
        likePostBtn.addEventListener('click', function() {
            // Open Instagram post in new tab
            window.open('https://www.instagram.com/p/DQ1DM85DLPt/?utm_source=ig_web_copy_link&igsh=NTc4MTIwNjQ2YQ%3D%3D', '_blank');
            
            // Add visual feedback when user clicks
            this.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            this.innerHTML = '<span class="like-icon">✓</span> Instagram Opened! Please Like the Post';
            this.style.pointerEvents = 'none'; // Disable further clicks
            
            // Show download ready section after a short delay
            setTimeout(() => {
                showDownloadReady();
            }, 2000);
        });
    }

    // Final download button click event
    if (finalDownloadBtn) {
        finalDownloadBtn.addEventListener('click', function() {
            // Add visual feedback
            this.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
            this.innerHTML = '<span class="download-icon-final">⏳</span> Preparing Download...';
            this.style.pointerEvents = 'none';
            
            // Here you can add the next step functionality
            console.log('Final download button clicked - ready for next instructions');
            
            // Placeholder for next step - you can tell me what should happen here
            setTimeout(() => {
                alert('Ready for next step! Please tell me what should happen when user clicks Download Your Movie button.');
            }, 1500);
        });
    }





    // Open download popup function
    function openDownloadPopup() {
        downloadPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        startCountdown();
    }

    // Close download popup function
    function closeDownloadPopup() {
        downloadPopup.classList.remove('active');
        document.body.style.overflow = 'auto';
        resetCountdown();
    }



    // Start countdown function
    function startCountdown() {
        currentCount = 0;
        countdownTimer.textContent = `${currentCount}/10`;
        countdownText.textContent = `${currentCount}/10`;
        
        countdownInterval = setInterval(() => {
            currentCount++;
            countdownTimer.textContent = `${currentCount}/10`;
            countdownText.textContent = `${currentCount}/10`;
            
            if (currentCount >= 10) {
                clearInterval(countdownInterval);
                completeCountdown();
            }
        }, 1000);
    }

    // Reset countdown function
    function resetCountdown() {
        clearInterval(countdownInterval);
        currentCount = 0;
        countdownTimer.textContent = `${currentCount}/10`;
        countdownText.textContent = `${currentCount}/10`;
        
        // Reset visibility
        document.querySelector('.countdown-section').style.display = 'block';
        document.querySelector('.instagram-profile-section').style.display = 'block';
        secondTaskSection.style.display = 'none';
        document.querySelector('.instagram-link-section').style.display = 'block';
        document.getElementById('downloadReadySection').style.display = 'none';
        
        // Reset text content
        document.querySelector('.countdown-section p').textContent = 'Processing download 0/10';
        
        // Reset like button
        if (likePostBtn) {
            likePostBtn.style.background = 'linear-gradient(135deg, #E4405F, #C13584, #833AB4)';
            likePostBtn.innerHTML = '<span class="like-icon">❤️</span> Click Here & Like the Post';
            likePostBtn.style.pointerEvents = 'auto';
        }
        
        // Reset final download button
        if (finalDownloadBtn) {
            finalDownloadBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049, #388e3c)';
            finalDownloadBtn.innerHTML = '<span class="download-icon-final">⬇</span> Download Your Movie';
            finalDownloadBtn.style.pointerEvents = 'auto';
        }
    }

    // Complete first countdown function
    function completeCountdown() {
        // Play success sound (optional)
        playSuccessSound();
        
        // Show completion message
        countdownTimer.textContent = "✓";
        countdownText.textContent = "10/10";
        document.querySelector('.countdown-section p').textContent = "First step complete!";
        
        // Hide first countdown section and show second task
        setTimeout(() => {
            document.querySelector('.countdown-section').style.display = 'none';
            document.querySelector('.instagram-profile-section').style.display = 'none';
            secondTaskSection.style.display = 'block';
            startSecondCountdown();
        }, 1500);
    }

    // Show second task (no countdown)
    function startSecondCountdown() {
        // Just show the second task, no countdown needed
        // The completion will be triggered when user clicks the like button
    }

    // Show download ready section
    function showDownloadReady() {
        // Play success sound (optional)
        playSuccessSound();
        
        // Hide the like button section and show download ready section
        document.querySelector('.instagram-link-section').style.display = 'none';
        document.getElementById('downloadReadySection').style.display = 'block';
    }

    // Play success sound function (optional)
    function playSuccessSound() {
        // Create audio context for success sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (error) {
            // Fallback if audio context is not supported
            console.log('Audio not supported');
        }
    }

    // Keyboard events
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (downloadPopup.classList.contains('active')) {
                closeDownloadPopup();
            }

        }
    });

    // Add pulse animation to download button
    setInterval(() => {
        if (!downloadPopup.classList.contains('active')) {
            downloadBtn.style.animation = 'pulse 2s ease-in-out';
            setTimeout(() => {
                downloadBtn.style.animation = '';
            }, 2000);
        }
    }, 10000);

    // Add CSS for pulse animation
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(255, 107, 53, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 107, 53, 0);
            }
        }
    `;
    document.head.appendChild(pulseStyle);

    // Track download attempts for analytics (optional)
    let downloadAttempts = 0;
    
    downloadBtn.addEventListener('click', function() {
        downloadAttempts++;
        console.log('Download attempts:', downloadAttempts);
        
        // You can send this data to analytics
        // gtag('event', 'download_attempt', {
        //     'movie_name': 'Dhurandhar',
        //     'attempt_number': downloadAttempts
        // });
    });

    // Add loading state to buttons
    function addLoadingState(button) {
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="loading-spinner"></span> Loading...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
        }, 2000);
    }

    // Add loading spinner CSS
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        .loading-spinner {
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(loadingStyle);
});
// Jump to Download Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const jumpToDownloadBtn = document.getElementById('jumpToDownloadBtn');
    const downloadSection = document.getElementById('download-section');

    if (jumpToDownloadBtn && downloadSection) {
        jumpToDownloadBtn.addEventListener('click', function() {
            // Smooth scroll to download section
            downloadSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Add a highlight effect to the download section
            downloadSection.style.animation = 'highlightSection 2s ease';
            
            // Remove animation after it completes
            setTimeout(() => {
                downloadSection.style.animation = '';
            }, 2000);

            // Optional: Track jump to download clicks
            console.log('User jumped to download section');
        });

        // Add hover effect with sound (optional)
        jumpToDownloadBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        jumpToDownloadBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }
});

// Add CSS for highlight animation
const jumpStyle = document.createElement('style');
jumpStyle.textContent = `
    @keyframes highlightSection {
        0% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7);
        }
        50% {
            transform: scale(1.02);
            box-shadow: 0 0 0 20px rgba(255, 107, 53, 0.3);
        }
        100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(255, 107, 53, 0);
        }
    }
`;
document.head.appendChild(jumpStyle);