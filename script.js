// DOM Content Loaded Event
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
});

/**
 * Initialize all application features
 */
function initializeApp() {
  initializeTheme();
  initializeFAQ();
  initializeForm();
  initializeEventListeners();

  console.log("Web application initialized successfully");
}

/**
 * Theme Management - Dark/Light Mode Toggle
 */
function initializeTheme() {
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme") || "light";

  // Set initial theme
  setTheme(savedTheme);

  // Theme toggle event listener
  themeToggle.addEventListener("click", function () {
    const currentTheme = document.body.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    setTheme(newTheme);
  });
}

/**
 * Set the current theme and update UI
 * @param {string} theme - 'light' or 'dark'
 */
function setTheme(theme) {
  const themeToggle = document.getElementById("theme-toggle");

  document.body.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update button text
  themeToggle.textContent =
    theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode";

  console.log(`Theme changed to: ${theme}`);
}

/**
 * Initialize FAQ Section - Collapsible functionality
 */
function initializeFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqItem = this.parentElement;
      const answer = this.nextElementSibling;
      const toggle = this.querySelector(".faq-toggle");

      // Close all other FAQ items
      document.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== faqItem) {
          item.classList.remove("active");
          item.querySelector(".faq-answer").classList.remove("active");
          item.querySelector(".faq-toggle").textContent = "+";
        }
      });

      // Toggle current FAQ item
      const isActive = faqItem.classList.contains("active");

      if (isActive) {
        faqItem.classList.remove("active");
        answer.classList.remove("active");
        toggle.textContent = "+";
      } else {
        faqItem.classList.add("active");
        answer.classList.add("active");
        toggle.textContent = "−";
      }
    });
  });

  console.log("FAQ section initialized");
}

/**
 * Initialize Form Validation and Submission
 */
function initializeForm() {
  const form = document.getElementById("registration-form");
  const inputs = {
    name: document.getElementById("name"),
    email: document.getElementById("email"),
    password: document.getElementById("password"),
  };

  const errorElements = {
    name: document.getElementById("name-error"),
    email: document.getElementById("email-error"),
    password: document.getElementById("password-error"),
  };

  const successMessage = document.getElementById("form-success");

  // Real-time validation on input
  Object.keys(inputs).forEach((field) => {
    inputs[field].addEventListener("input", function () {
      validateField(field, this.value);
    });

    // Add focus effects
    inputs[field].addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    inputs[field].addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");
      validateField(field, this.value);
    });
  });

  // Form submission handler
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Validate all fields
    const isNameValid = validateField("name", inputs.name.value);
    const isEmailValid = validateField("email", inputs.email.value);
    const isPasswordValid = validateField("password", inputs.password.value);

    if (isNameValid && isEmailValid && isPasswordValid) {
      // Form is valid - show success message
      showFormSuccess();
      console.log("Form submitted successfully");
    } else {
      // Form is invalid - show error messages
      console.log("Form validation failed");
    }
  });

  /**
   * Validate individual form field
   * @param {string} field - Field name ('name', 'email', 'password')
   * @param {string} value - Field value
   * @returns {boolean} - Whether the field is valid
   */
  function validateField(field, value) {
    const input = inputs[field];
    const errorElement = errorElements[field];
    let isValid = false;
    let errorMessage = "";

    switch (field) {
      case "name":
        isValid = validateName(value);
        errorMessage = isValid
          ? ""
          : "Please enter a valid full name (at least 2 words, 2 characters each)";
        break;

      case "email":
        isValid = validateEmail(value);
        errorMessage = isValid ? "" : "Please enter a valid email address";
        break;

      case "password":
        isValid = validatePassword(value);
        errorMessage = isValid
          ? ""
          : "Password must be at least 8 characters with letters and numbers";
        break;
    }

    // Update UI based on validation result
    if (isValid) {
      input.classList.remove("error");
      input.classList.add("success");
      errorElement.textContent = "";
    } else {
      input.classList.remove("success");
      input.classList.add("error");
      errorElement.textContent = errorMessage;
    }

    return isValid;
  }

  /**
   * Validate full name
   * @param {string} name - Full name to validate
   * @returns {boolean} - Whether the name is valid
   */
  function validateName(name) {
    if (!name.trim()) return false;

    // Name should have at least 2 words, each at least 2 characters
    const nameRegex = /^[a-zA-Z]{2,}(?:\s+[a-zA-Z]{2,})+$/;
    return nameRegex.test(name.trim());
  }

  /**
   * Validate email address using regex
   * @param {string} email - Email to validate
   * @returns {boolean} - Whether the email is valid
   */
  function validateEmail(email) {
    if (!email.trim()) return false;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {boolean} - Whether the password is valid
   */
  function validatePassword(password) {
    if (!password) return false;

    // At least 8 characters, containing at least one letter and one number
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    return hasLetter && hasNumber && hasMinLength;
  }

  /**
   * Show form success message and reset form
   */
  function showFormSuccess() {
    successMessage.classList.remove("hidden");
    form.reset();

    // Remove validation classes
    Object.values(inputs).forEach((input) => {
      input.classList.remove("success", "error");
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.add("hidden");
    }, 5000);
  }

  console.log("Form validation initialized");
}

/**
 * Initialize additional event listeners
 */
function initializeEventListeners() {
  const ctaButton = document.getElementById("cta-btn");

  // CTA Button click event
  ctaButton.addEventListener("click", function () {
    // Scroll to form section
    document.getElementById("form").scrollIntoView({
      behavior: "smooth",
    });

    // Add visual feedback
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);

    console.log("CTA button clicked - scrolled to form section");
  });

  // Navigation smooth scrolling
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Add hover effects to interactive elements
  document
    .querySelectorAll("button, .faq-question, .nav-link")
    .forEach((element) => {
      element.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-2px)";
      });

      element.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });

  console.log("Event listeners initialized");
}

// Export functions for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    validateName,
    validateEmail,
    validatePassword,
    setTheme,
  };
}
