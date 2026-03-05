document.addEventListener("DOMContentLoaded", () => {
  // Initialize all functionality
  initMobileMenu()
  initSliders()
  initFilters()
  initForms()
  initFAQ()
  initGallery()
  initSmoothScrolling()
  initAnimations()
  initNotifications()

  // Add loading states to buttons
  initButtonLoading()

  // Initialize calendar if on events page
  if (window.location.pathname.includes("events.html")) {
    initCalendar()
  }

  // Newsletter Subscription
  const newsletterForms = document.querySelectorAll(".newsletter-form")

  newsletterForms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault()

      const email = this.querySelector('input[type="email"]').value
      const submitBtn = this.querySelector("button")

      if (email && validateEmail(email)) {
        submitBtn.classList.add("loading")

        setTimeout(() => {
          showNotification("Successfully subscribed to newsletter!", "success")
          this.reset()
          submitBtn.classList.remove("loading")
        }, 1500)
      } else {
        showNotification("Please enter a valid email address.", "error")
      }
    })
  })

  // Social Media Links
  const socialLinks = document.querySelectorAll(".social-icon, .social-box")

  socialLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      showNotification("Social media integration coming soon!", "info")
    })
  })

  // Video Play Buttons
  const playButtons = document.querySelectorAll(".play-button")

  playButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      showNotification("Video player integration coming soon!", "info")
    })
  })

  // Accessibility Enhancements
  // Add skip link
  const skipLink = document.createElement("a")
  skipLink.href = "#main-content"
  skipLink.textContent = "Skip to main content"
  skipLink.className = "sr-only"
  skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 10000;
        border-radius: 4px;
    `

  skipLink.addEventListener("focus", function () {
    this.style.top = "6px"
  })

  skipLink.addEventListener("blur", function () {
    this.style.top = "-40px"
  })

  document.body.insertBefore(skipLink, document.body.firstChild)

  // Add main content ID if not exists
  const main = document.querySelector("main") || document.querySelector(".hero") || document.querySelector("section")
  if (main && !main.id) {
    main.id = "main-content"
  }

  // Performance Monitoring
  // Simple performance logging
  const loadTime = performance.now()
  console.log(`Page loaded in ${Math.round(loadTime)}ms`)

  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
})

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navMenu = document.querySelector(".nav-menu")

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active")
      navMenu.classList.toggle("active")

      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden"
      } else {
        document.body.style.overflow = ""
      }
    })

    // Close menu when clicking on links
    const navLinks = navMenu.querySelectorAll("a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active")
        navMenu.classList.remove("active")
        document.body.style.overflow = ""
      })
    })

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileMenuBtn.contains(e.target) && !navMenu.contains(e.target)) {
        mobileMenuBtn.classList.remove("active")
        navMenu.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }
}

// Slider Functionality
function initSliders() {
  // Impact Stories Slider
  initImpactSlider()

  // Testimonials Slider
  initTestimonialsSlider()
}

function initImpactSlider() {
  const slides = document.querySelectorAll(".impact-slide")
  const dots = document.querySelectorAll(".impact-slider .dot")
  const prevBtn = document.querySelector(".impact-slider .prev-btn")
  const nextBtn = document.querySelector(".impact-slider .next-btn")

  if (slides.length === 0) return

  let currentSlide = 0
  let slideInterval

  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    // Show current slide
    slides[index].classList.add("active")
    if (dots[index]) dots[index].classList.add("active")

    currentSlide = index
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length
    showSlide(next)
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length
    showSlide(prev)
  }

  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 5000)
  }

  function stopAutoPlay() {
    clearInterval(slideInterval)
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide()
      stopAutoPlay()
      startAutoPlay()
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide()
      stopAutoPlay()
      startAutoPlay()
    })
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
      stopAutoPlay()
      startAutoPlay()
    })
  })

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      prevSlide()
      stopAutoPlay()
      startAutoPlay()
    } else if (e.key === "ArrowRight") {
      nextSlide()
      stopAutoPlay()
      startAutoPlay()
    }
  })

  // Pause on hover
  const slider = document.querySelector(".impact-slider")
  if (slider) {
    slider.addEventListener("mouseenter", stopAutoPlay)
    slider.addEventListener("mouseleave", startAutoPlay)
  }

  // Initialize
  showSlide(0)
  startAutoPlay()
}

function initTestimonialsSlider() {
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".testimonials-slider .dot")
  const prevBtn = document.querySelector(".testimonials-slider .prev-btn")
  const nextBtn = document.querySelector(".testimonials-slider .next-btn")

  if (slides.length === 0) return

  let currentSlide = 0
  let slideInterval

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"))
    dots.forEach((dot) => dot.classList.remove("active"))

    slides[index].classList.add("active")
    if (dots[index]) dots[index].classList.add("active")

    currentSlide = index
  }

  function nextSlide() {
    const next = (currentSlide + 1) % slides.length
    showSlide(next)
  }

  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length
    showSlide(prev)
  }

  function startAutoPlay() {
    slideInterval = setInterval(nextSlide, 6000)
  }

  function stopAutoPlay() {
    clearInterval(slideInterval)
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide()
      stopAutoPlay()
      startAutoPlay()
    })
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide()
      stopAutoPlay()
      startAutoPlay()
    })
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index)
      stopAutoPlay()
      startAutoPlay()
    })
  })

  // Initialize
  showSlide(0)
  startAutoPlay()
}

// Filter Functionality
function initFilters() {
  // Gallery filters
  const galleryFilters = document.querySelectorAll(".gallery-filter .filter-btn")
  const galleryItems = document.querySelectorAll(".gallery-item")

  galleryFilters.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      // Update active button
      galleryFilters.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      // Filter items with animation
      galleryItems.forEach((item) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 10)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Projects filters
  const projectFilters = document.querySelectorAll(".projects-filter .filter-btn")
  const projectItems = document.querySelectorAll(".project-card")

  projectFilters.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter")

      projectFilters.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")

      projectItems.forEach((item) => {
        const category = item.getAttribute("data-category")

        if (filter === "all" || category === filter) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, 10)
        } else {
          item.style.opacity = "0"
          item.style.transform = "translateY(20px)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })
}

// Form Functionality
function initForms() {
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      const submitBtn = form.querySelector('button[type="submit"]')
      const formData = new FormData(form)

      // Add loading state
      if (submitBtn) {
        submitBtn.classList.add("loading")
        submitBtn.disabled = true
      }

      // Validate form
      if (validateForm(form)) {
        // Simulate form submission
        setTimeout(() => {
          showNotification("Form submitted successfully!", "success")
          form.reset()

          if (submitBtn) {
            submitBtn.classList.remove("loading")
            submitBtn.disabled = false
          }
        }, 2000)
      } else {
        if (submitBtn) {
          submitBtn.classList.remove("loading")
          submitBtn.disabled = false
        }
      }
    })

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea, select")
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this)
      })

      input.addEventListener("input", function () {
        if (this.classList.contains("error")) {
          validateField(this)
        }
      })
    })
  })

  // Donation amount selection
  const amountRadios = document.querySelectorAll('input[name="amount"]')
  const customAmountField = document.getElementById("custom-amount")

  if (amountRadios.length > 0 && customAmountField) {
    amountRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.value === "other") {
          customAmountField.parentElement.style.display = "block"
          customAmountField.setAttribute("required", "")
          customAmountField.focus()
        } else {
          customAmountField.parentElement.style.display = "none"
          customAmountField.removeAttribute("required")
          customAmountField.value = ""
        }
      })
    })
  }

  // Payment method selection
  const paymentRadios = document.querySelectorAll('input[name="payment-method"]')
  const creditCardDetails = document.querySelector(".credit-card-details")

  if (paymentRadios.length > 0 && creditCardDetails) {
    paymentRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.value === "credit-card") {
          creditCardDetails.style.display = "block"
        } else {
          creditCardDetails.style.display = "none"
        }
      })
    })
  }
}

function validateForm(form) {
  let isValid = true
  const requiredFields = form.querySelectorAll("[required]")

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false
    }
  })

  if (!isValid) {
    showNotification("Please fill in all required fields correctly.", "error")
  }

  return isValid
}

function validateField(field) {
  const value = field.value.trim()
  let isValid = true

  // Check if required field is empty
  if (field.hasAttribute("required") && !value) {
    isValid = false
  }

  // Email validation
  if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      isValid = false
    }
  }

  // Phone validation
  if (field.type === "tel" && value) {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(value.replace(/[\s\-$$$$]/g, ""))) {
      isValid = false
    }
  }

  // Update field appearance
  if (isValid) {
    field.classList.remove("error")
  } else {
    field.classList.add("error")
  }

  return isValid
}

// FAQ Functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")
    const answer = item.querySelector(".faq-answer")
    const toggle = item.querySelector(".faq-toggle i")

    if (question && answer) {
      question.addEventListener("click", () => {
        const isActive = item.classList.contains("active")

        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
            const otherToggle = otherItem.querySelector(".faq-toggle i")
            if (otherToggle) {
              otherToggle.className = "fas fa-plus"
            }
          }
        })

        // Toggle current item
        if (isActive) {
          item.classList.remove("active")
          if (toggle) toggle.className = "fas fa-plus"
        } else {
          item.classList.add("active")
          if (toggle) toggle.className = "fas fa-minus"
        }
      })
    }
  })
}

// Gallery Functionality
function initGallery() {
  const galleryLinks = document.querySelectorAll(".gallery-link")
  const lightbox = document.getElementById("gallery-lightbox")

  if (galleryLinks.length === 0 || !lightbox) return

  const lightboxImage = lightbox.querySelector(".lightbox-image")
  const lightboxCaption = lightbox.querySelector(".lightbox-caption")
  const closeBtn = lightbox.querySelector(".lightbox-close")
  const prevBtn = lightbox.querySelector(".lightbox-prev")
  const nextBtn = lightbox.querySelector(".lightbox-next")

  let currentIndex = 0
  const images = Array.from(galleryLinks).map((link) => ({
    src: link.getAttribute("href"),
    caption: link.querySelector(".gallery-info h3")?.textContent || "",
    date: link.querySelector(".gallery-info p")?.textContent || "",
  }))

  function showImage(index) {
    const image = images[index]
    lightboxImage.src = image.src
    lightboxImage.alt = image.caption
    lightboxCaption.innerHTML = `<h3>${image.caption}</h3><p>${image.date}</p>`
    currentIndex = index
  }

  function openLightbox(index) {
    showImage(index)
    lightbox.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  function closeLightbox() {
    lightbox.classList.remove("active")
    document.body.style.overflow = ""
  }

  function showNext() {
    const nextIndex = (currentIndex + 1) % images.length
    showImage(nextIndex)
  }

  function showPrev() {
    const prevIndex = (currentIndex - 1 + images.length) % images.length
    showImage(prevIndex)
  }

  // Event listeners
  galleryLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      openLightbox(index)
    })
  })

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox)
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", showNext)
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", showPrev)
  }

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return

    switch (e.key) {
      case "Escape":
        closeLightbox()
        break
      case "ArrowLeft":
        showPrev()
        break
      case "ArrowRight":
        showNext()
        break
    }
  })

  // Close on background click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox()
    }
  })

  // Load more functionality
  const loadMoreBtn = document.querySelector(".load-more .btn")
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      this.classList.add("loading")

      // Simulate loading more images
      setTimeout(() => {
        showNotification("More images loaded!", "success")
        this.style.display = "none"
      }, 1500)
    })
  }
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()

        const headerHeight = document.querySelector("header")?.offsetHeight || 0
        const targetPosition = target.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })
}

// Animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animateElements = document.querySelectorAll(`
        .event-card,
        .benefit-card,
        .objective-item,
        .project-card,
        .story-card,
        .committee-member,
        .impact-card,
        .method-card,
        .involvement-card
    `)

  animateElements.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
}

// Notifications
function initNotifications() {
  // This function is called by other functions when needed
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" style="background: none; border: none; color: inherit; font-size: 1.2rem; cursor: pointer; margin-left: 1rem;">&times;</button>
        </div>
    `

  // Add to page
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Button Loading States
function initButtonLoading() {
  const buttons = document.querySelectorAll(".btn")

  buttons.forEach((btn) => {
    if (btn.type === "submit") return // Skip submit buttons (handled in form validation)

    btn.addEventListener("click", function (e) {
      // Skip if it's a link to another page
      if (this.getAttribute("href") && !this.getAttribute("href").startsWith("#")) {
        return
      }

      // Add loading state for interactive buttons
      if (this.classList.contains("text-btn") || this.getAttribute("href")?.startsWith("#")) {
        this.classList.add("loading")

        setTimeout(() => {
          this.classList.remove("loading")
        }, 1000)
      }
    })
  })
}

// Calendar Functionality (for events page)
function initCalendar() {
  const calendarNav = document.querySelectorAll(".calendar-nav")
  const currentMonthElement = document.querySelector(".current-month")

  if (calendarNav.length === 0 || !currentMonthElement) return

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  let currentMonth = 4 // May (0-indexed)
  let currentYear = 2023

  function updateCalendar() {
    currentMonthElement.textContent = `${months[currentMonth]} ${currentYear}`

    // Update calendar days (simplified)
    const calendarDays = document.querySelectorAll(".calendar-day:not(.calendar-day-header)")
    calendarDays.forEach((day, index) => {
      // Simple calendar update logic
      if (index < 31) {
        day.textContent = index + 1
        day.classList.remove("prev-month", "next-month")
      }
    })
  }

  calendarNav.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.classList.contains("prev")) {
        currentMonth--
        if (currentMonth < 0) {
          currentMonth = 11
          currentYear--
        }
      } else {
        currentMonth++
        if (currentMonth > 11) {
          currentMonth = 0
          currentYear++
        }
      }
      updateCalendar()
    })
  })

  // Event day clicks
  const eventDays = document.querySelectorAll(".calendar-day.has-event")
  eventDays.forEach((day) => {
    day.addEventListener("click", function () {
      const eventId = this.getAttribute("id")
      const eventDetails = document.getElementById(eventId + "-details")

      if (eventDetails) {
        eventDetails.scrollIntoView({ behavior: "smooth" })
        eventDetails.style.background = "#f8f9fa"

        setTimeout(() => {
          eventDetails.style.background = ""
        }, 2000)
      }
    })
  })
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Error Handling
window.addEventListener("error", (e) => {
  console.error("JavaScript Error:", e.error)
  showNotification("An error occurred. Please refresh the page.", "error")
})
