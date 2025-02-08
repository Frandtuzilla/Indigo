// Email form handler
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init("ZDA4a-LpGbkCl-6LR");
    
    // Create notification elements
    const notificationContainer = document.createElement('div');
    notificationContainer.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        transition: all 0.3s ease;
    `;
    document.body.appendChild(notificationContainer);

    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            padding: 16px 24px;
            margin-bottom: 10px;
            border-radius: 4px;
            font-weight: 500;
            font-size: 14px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
        `;

        // Set colors based on type
        if (type === 'success') {
            notification.style.backgroundColor = '#1f0954';  // Deep purple from your theme
            notification.style.color = 'white';
        } else {
            notification.style.backgroundColor = '#f8d7da';
            notification.style.color = '#721c24';
        }

        // Add message and close button
        notification.innerHTML = `
            <span>${message}</span>
            <button style="
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                padding: 0 0 0 16px;
                font-size: 18px;
                opacity: 0.7;
            ">×</button>
        `;

        // Add to container
        notificationContainer.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Add close button functionality
        const closeBtn = notification.querySelector('button');
        closeBtn.onclick = () => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        };

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Create loading spinner
    function createLoadingSpinner() {
        const spinner = document.createElement('div');
        spinner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        `;
        
        const spinnerContent = document.createElement('div');
        spinnerContent.style.cssText = `
            background: white;
            padding: 20px 40px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 15px;
        `;
        
        const loadingText = document.createElement('span');
        loadingText.textContent = 'Sending...';
        loadingText.style.cssText = `
            color: #1f0954;
            font-weight: 600;
        `;

        const spinner1 = document.createElement('div');
        spinner1.style.cssText = `
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #1f0954;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        `;

        // Add keyframes for spinner animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        spinnerContent.appendChild(spinner1);
        spinnerContent.appendChild(loadingText);
        spinner.appendChild(spinnerContent);
        return spinner;
    }

    const form = document.forms['contact-form'];
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            
            // Show loading spinner
            const loadingSpinner = createLoadingSpinner();
            document.body.appendChild(loadingSpinner);
            
            // Prepare the template parameters
            const templateParams = {
                name: form.Name.value,
                email: form.Email.value,
                phone: form.Phone.value,
                address: form.Address.value,
                occupation: form.Occupation.value,
                message: form.Message.value
            };
            
            emailjs.send('service_lbgiadn', 'template_wiegugj', templateParams)
                .then(function(response) {
                    showNotification('Thank you! Your application has been submitted successfully');
                    form.reset();
                }, function(error) {
                    console.error('Error:', error);
                    showNotification('Failed to send message. Please try again.', 'error');
                })
                .finally(() => {
                    submitButton.disabled = false;
                    document.body.removeChild(loadingSpinner);
                });
        });
    }
});