// Main JavaScript for Wellworth Facilities Platform

document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".main-nav");
    const indicator = document.querySelector(".nav-indicator");
    const links = document.querySelectorAll(".nav-link");

    function moveIndicator(el) {
        if (!indicator) return;
        indicator.style.width = `${el.offsetWidth}px`;
        indicator.style.left = `${el.offsetLeft}px`;
    }

    const activeLink = document.querySelector(".nav-link.active");
    if (activeLink) moveIndicator(activeLink);

    links.forEach(link => {
        link.addEventListener("mouseenter", () => moveIndicator(link));
    });

    nav?.addEventListener("mouseleave", () => {
        if (activeLink) moveIndicator(activeLink);
    });
});

document.addEventListener('DOMContentLoaded', function () {

    /* ===============================
       MOBILE MENU
    =============================== */
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    mobileMenuBtn?.addEventListener('click', function () {
        mainNav.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    /* ===============================
       FAQ ACCORDION
    =============================== */
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function () {
            const item = this.parentElement;
            const answer = item.querySelector('.faq-answer');
            const icon = this.querySelector('i');

            document.querySelectorAll('.faq-item.active').forEach(open => {
                if (open !== item) {
                    open.classList.remove('active');
                    open.querySelector('.faq-answer').style.maxHeight = null;
                    open.querySelector('.faq-question i').style.transform = 'rotate(0deg)';
                }
            });

            item.classList.toggle('active');

            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    /* ===============================
       HELPER: VIEWPORT CHECK
    =============================== */
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    /* ===============================
       KPI COUNTER
    =============================== */
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = parseFloat(counter.dataset.target);
            const duration = 1500;
            const start = performance.now();

            function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                counter.textContent = Math.floor(progress * target);
                if (progress < 1) requestAnimationFrame(update);
            }

            requestAnimationFrame(update);
            counterObserver.unobserve(counter);
        });
    }, { threshold: 0.4 });

    counters.forEach(c => counterObserver.observe(c));

    // ===============================
// REQUEST A CONSULTATION → WHATSAPP (FINAL)
// ===============================

const WHATSAPP_NUMBER = "912212345678";

const consultationForm = document.getElementById('consultationForm');

if (consultationForm) {
    consultationForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const service = document.getElementById('service');
        const message = document.getElementById('message');

        let isValid = true;

        // Reset errors
        document.querySelectorAll('.form-group').forEach(g => {
            g.classList.remove('error', 'success');
            const err = g.querySelector('.error-msg');
            if (err) err.style.display = 'none';
        });

        // Name
        if (fullName.value.trim().length < 3) {
            showError(fullName, 'Enter full name');
            isValid = false;
        } else showSuccess(fullName);

        // Email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            showError(email, 'Invalid email');
            isValid = false;
        } else showSuccess(email);

        // Phone
        if (!/^[6-9]\d{9}$/.test(phone.value.trim())) {
            showError(phone, 'Invalid phone number');
            isValid = false;
        } else showSuccess(phone);

        // Service
        if (service.value === '') {
            showError(service, 'Select a service');
            isValid = false;
        } else showSuccess(service);

        // Message
        if (message.value.trim().length < 10) {
            showError(message, 'Minimum 10 characters');
            isValid = false;
        } else showSuccess(message);

        if (!isValid) return;

        // WhatsApp Message
        const whatsappMessage = `
New Consultation Request

Name: ${fullName.value}
Email: ${email.value}
Phone: ${phone.value}
Service: ${service.value}
Message: ${message.value}
        `.trim();

        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

        window.open(whatsappURL, "_blank");
        consultationForm.reset();
    });
}

// Helpers
function showError(input, msg) {
    const group = input.closest('.form-group');
    group.classList.add('error');
    const err = group.querySelector('.error-msg');
    if (err) {
        err.innerText = msg;
        err.style.display = 'block';
    }
}

function showSuccess(input) {
    const group = input.closest('.form-group');
    group.classList.add('success');
}


});


document.querySelectorAll('.mw-faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const currentItem = question.parentElement;
    const isOpen = currentItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.mw-faq-item').forEach(item => {
      item.classList.remove('active');
      item.querySelector('.mw-faq-answer').style.maxHeight = null;
    });

    // Open clicked item if it was closed
    if (!isOpen) {
      currentItem.classList.add('active');
      const answer = currentItem.querySelector('.mw-faq-answer');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});




 
// ===============================
// POPUP FORM LOGIC
// ===============================
const modal = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");

document.querySelectorAll(".openAuditForm").forEach(button => {
    button.addEventListener("click", () => {
        modalTitle.innerText = "Request a Customized Facility Solution";
        modal.classList.add("active");
    });
});


document.getElementById("openDemoForm")?.addEventListener("click", () => {
    modalTitle.innerText = "Request Platform Demo";
    modal.classList.add("active");
});

closeModal?.addEventListener("click", () => {
    modal.classList.remove("active");
});

modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});





document.addEventListener("DOMContentLoaded", function () {

    const popupForm = document.getElementById("popupForm");
    if (!popupForm) return;

    popupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = popupForm.querySelector('[name="fullName"]');
        const emailInput = popupForm.querySelector('[name="email"]');
        const phoneInput = popupForm.querySelector('[name="phone"]');
        const serviceInput = popupForm.querySelector('[name="service"]');
        const messageInput = popupForm.querySelector('[name="message"]');

        if (!nameInput || !emailInput || !phoneInput || !serviceInput || !messageInput) {
            console.error("Form field missing — check name attributes");
            return;
        }

        const whatsappText = `
New Enquiry Received 👇

Name: ${nameInput.value}
Email: ${emailInput.value}
Phone: ${phoneInput.value}
Service: ${serviceInput.value}

Message:
${messageInput.value}
        `.trim();

        const whatsappURL =
            `https://wa.me/919921985050?text=${encodeURIComponent(whatsappText)}`;

        // Send email (AJAX)
        fetch(popupForm.action, {
            method: "POST",
            body: new FormData(popupForm)
        });

        // Show Thank You popup
        document.getElementById("thankYouPopup").style.display = "flex";

        setTimeout(() => {
            window.open(whatsappURL, "_blank");
        }, 700);

        popupForm.reset();
    });
});

document.addEventListener("DOMContentLoaded", function () {

    const thankYouPopup = document.getElementById("thankYouPopup");
    const closeBtn = document.getElementById("closeThankYouBtn");

    if (closeBtn && thankYouPopup) {
        closeBtn.addEventListener("click", function () {
            thankYouPopup.style.display = "none";
        });
    }

    // Optional: close when clicking outside popup
    if (thankYouPopup) {
        thankYouPopup.addEventListener("click", function (e) {
            if (e.target === thankYouPopup) {
                thankYouPopup.style.display = "none";
            }
        });
    }
});







