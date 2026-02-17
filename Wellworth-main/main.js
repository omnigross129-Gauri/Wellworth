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
    const thankYouPopup = document.getElementById("thankYouPopup");
    const closeBtn = document.getElementById("closeThankYouBtn");

    let storedWhatsappURL = ""; // ✅ IMPORTANT

    if (!popupForm) return;

    popupForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const nameInput = popupForm.querySelector('[name="fullName"]');
        const emailInput = popupForm.querySelector('[name="email"]');
        const phoneInput = popupForm.querySelector('[name="phone"]');
        const serviceInput = popupForm.querySelector('[name="service"]');
        const messageInput = popupForm.querySelector('[name="message"]');

        let isValid = true;

        // Reset errors
        popupForm.querySelectorAll(".form-group").forEach(group => {
            group.classList.remove("error");
            const err = group.querySelector(".error-msg");
            if (err) {
                err.innerText = "";
                err.style.display = "none";
            }
        });

        // NAME
        if (nameInput.value.trim().length < 3) {
            showError(nameInput, "Enter full name (min 3 characters)");
            isValid = false;
        }

        // EMAIL
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
            showError(emailInput, "Enter valid email");
            isValid = false;
        }

        // PHONE (allow +91)
        if (!/^(\+91)?[6-9]\d{9}$/.test(phoneInput.value.trim())) {
            showError(phoneInput, "Enter valid mobile number");
            isValid = false;
        }

        // SERVICE
        if (serviceInput.value === "") {
            showError(serviceInput, "Select a service");
            isValid = false;
        }

        // MESSAGE
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, "Minimum 10 characters required");
            isValid = false;
        }

        if (!isValid) return;

        // ===============================
        // If valid → Continue
        // ===============================

        const whatsappText = `
New Enquiry Received 👇

Name: ${nameInput.value}
Email: ${emailInput.value}
Phone: ${phoneInput.value}
Service: ${serviceInput.value}

Message:
${messageInput.value}
        `.trim();

        storedWhatsappURL =
            `https://wa.me/919921985050?text=${encodeURIComponent(whatsappText)}`;

        // Send email
        fetch(popupForm.action, {
            method: "POST",
            body: new FormData(popupForm)
        });

        // Show Thank You popup
        if (thankYouPopup) {
            thankYouPopup.style.display = "flex";
        }

        popupForm.reset();
    });

    // THANK YOU POPUP CLOSE
    if (closeBtn && thankYouPopup) {
        closeBtn.addEventListener("click", function () {
            thankYouPopup.style.display = "none";

            if (storedWhatsappURL) {
                window.open(storedWhatsappURL, "_blank");
                storedWhatsappURL = "";
            }
        });
    }

});




function showError(input, message) {
    const group = input.closest(".form-group");
    const errorMsg = group.querySelector(".error-msg");

    group.classList.add("error");

    if (errorMsg) {
        errorMsg.innerText = message;
        errorMsg.style.display = "block";
    }
}





document.addEventListener("DOMContentLoaded", function () {

    const consultationForm = document.getElementById("consultationForm");
    const thankYouPopup = document.getElementById("consultThankYouPopup");
    const whatsappBtn = document.getElementById("consultWhatsappBtn");

    let storedWhatsappURL = "";

    if (!consultationForm) return;

    consultationForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = consultationForm.querySelector("#fullName");
        const email = consultationForm.querySelector("#email");
        const phone = consultationForm.querySelector("#phone");
        const service = consultationForm.querySelector("#services");
        const message = consultationForm.querySelector("#message");

        let isValid = true;

        // Reset errors
        consultationForm.querySelectorAll(".form-group").forEach(group => {
            group.classList.remove("error");
            const err = group.querySelector(".error-msg");
            if (err) {
                err.innerText = "";
                err.style.display = "none";
            }
        });

        // Name
        if (fullName.value.trim().length < 3) {
            showError(fullName, "Enter full name (min 3 characters)");
            isValid = false;
        }

        // Email
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
            showError(email, "Enter valid email");
            isValid = false;
        }

        // Phone
        let phoneValue = phone.value.trim();
        phoneValue = phoneValue.replace(/\D/g, "");

        if (phoneValue.length === 12 && phoneValue.startsWith("91")) {
            phoneValue = phoneValue.substring(2);
        }

        if (!/^[6-9]\d{9}$/.test(phoneValue)) {
            showError(phone, "Enter valid Indian mobile number");
            isValid = false;
        }

        // Service
        if (service.value === "") {
            showError(service, "Select a service");
            isValid = false;
        }

        // Message
        if (message.value.trim().length < 10) {
            showError(message, "Minimum 10 characters required");
            isValid = false;
        }

        if (!isValid) return;

        // Create WhatsApp URL
        const whatsappText = `
New Consultation Request 👇

Name: ${fullName.value}
Email: ${email.value}
Phone: ${phone.value}
Service: ${service.value}

Message:
${message.value}
        `.trim();

        storedWhatsappURL =
            `https://wa.me/919921985050?text=${encodeURIComponent(whatsappText)}`;

        // Show Thank You popup
        thankYouPopup.classList.add("active");

        consultationForm.reset();
    });

    // WhatsApp button click
    if (whatsappBtn) {
        whatsappBtn.addEventListener("click", function () {
            if (storedWhatsappURL) {
                window.open(storedWhatsappURL, "_blank");
            }

            thankYouPopup.classList.remove("active");
        });
    }

});



