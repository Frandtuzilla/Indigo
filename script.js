window.addEventListener('scroll', function() {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('get-involved-btn');
    button.addEventListener('click', function() {
        document.getElementById('volunteer-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    
    function toggleMenu() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    // Toggle menu when clicking hamburger
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            toggleMenu();
        }
    });

    // Prevent menu close when clicking inside
    navLinks.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Email form handler
document.addEventListener('DOMContentLoaded', function() {
    // Replace 'YOUR_PUBLIC_KEY' with your actual public key from EmailJS
    emailjs.init("ZDA4a-LpGbkCl-6LR");
    
    const form = document.forms['contact-form'];
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            
            // Loading indicator
            const loadingDiv = document.createElement('div');
            loadingDiv.style.position = 'fixed';
            loadingDiv.style.top = '50%';
            loadingDiv.style.left = '50%';
            loadingDiv.style.transform = 'translate(-50%, -50%)';
            loadingDiv.style.padding = '20px';
            loadingDiv.style.background = 'rgba(0,0,0,0.8)';
            loadingDiv.style.color = 'white';
            loadingDiv.style.borderRadius = '5px';
            loadingDiv.style.zIndex = '1000';
            loadingDiv.textContent = 'Sending...';
            document.body.appendChild(loadingDiv);
            
            // Prepare the template parameters
            const templateParams = {
                name: form.Name.value,
                email: form.Email.value,
                phone: form.Phone.value,
                address: form.Address.value,
                occupation: form.Occupation.value,
                message: form.Message.value
            };
            
            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs
            emailjs.send('service_lbgiadn', 'template_wiegugj', templateParams)
                .then(function(response) {
                    document.body.removeChild(loadingDiv);
                    alert('Thank you! Your application has been submitted successfully');
                    form.reset();
                }, function(error) {
                    document.body.removeChild(loadingDiv);
                    console.error('Error:', error);
                    alert('Failed to send message. Please try again.');
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'SEND';
                });
        });
    }
});