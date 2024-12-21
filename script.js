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