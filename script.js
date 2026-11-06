
/* =====================================
   1. EVENT DATABASE
===================================== */

const events = [
    {
        id: 1,
        name: "Tech Innovation Summit",
        category: "Technology",
        date: "2026-12-12",
        venue: "KIIT Convention Centre, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900",
        description: "Explore artificial intelligence, robotics, emerging technologies and the future of innovation.",
        price: "Free"
    },
    {
        id: 2,
        name: "Global Music Festival",
        category: "Music",
        date: "2026-12-18",
        venue: "Janata Maidan, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=900",
        description: "Experience an unforgettable evening featuring live music, incredible artists and energetic performances.",
        price: "₹499"
    },
    {
        id: 3,
        name: "Startup Founders Meet",
        category: "Business",
        date: "2027-01-05",
        venue: "Mayfair Convention, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=900",
        description: "Meet entrepreneurs, investors and business leaders. Discover opportunities and build connections.",
        price: "₹299"
    },
    {
        id: 4,
        name: "AI & Machine Learning Workshop",
        category: "Education",
        date: "2027-01-12",
        venue: "KIIT Campus, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900",
        description: "Learn the fundamentals of AI, machine learning and practical applications through hands-on sessions.",
        price: "Free"
    },
    {
        id: 5,
        name: "Art & Culture Exhibition",
        category: "Art",
        date: "2027-01-20",
        venue: "Odisha State Museum, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=900",
        description: "Discover creative artworks, cultural performances and inspiring artistic expressions.",
        price: "₹199"
    },
    {
        id: 6,
        name: "Future of Web Development",
        category: "Technology",
        date: "2027-02-02",
        venue: "KIIT Auditorium, Bhubaneswar",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=900",
        description: "Discover modern web development, cloud technologies, JavaScript frameworks and career opportunities.",
        price: "₹149"
    }
];


/* =====================================
   2. SELECT HTML ELEMENTS
===================================== */

const eventGrid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.getElementById("filterButtons");
const eventCount = document.getElementById("eventCount");
const emptyMessage = document.getElementById("emptyMessage");

const modal = document.getElementById("eventModal");
const eventDetails = document.getElementById("eventDetails");
const closeModal = document.getElementById("closeModal");

const registrationForm = document.getElementById("registrationForm");
const selectedEvent = document.getElementById("selectedEvent");

let selectedCategory = "All";


/* =====================================
   3. FORMAT DATE
===================================== */

function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );
}


/* =====================================
   4. DISPLAY EVENT CARDS
===================================== */

function displayEvents(eventList) {

    eventGrid.innerHTML = "";

    eventCount.textContent =
        `${eventList.length} events`;

    emptyMessage.hidden = eventList.length !== 0;

    eventList.forEach(event => {

        const card = document.createElement("article");

        card.className = "event-card";

        card.innerHTML = `
            <img src="${event.image}"
                 alt="${event.name}"
                 loading="lazy">

            <div class="card-content">

                <span class="category-tag">
                    ${event.category}
                </span>

                <h3>${event.name}</h3>

                <p>${event.description}</p>

                <div class="event-meta">
                    <span>📅 ${formatDate(event.date)}</span>
                    <span>📍 ${event.venue}</span>
                </div>

                <div class="card-bottom">
                    <strong>${event.price}</strong>

                    <button class="details-btn"
                        data-event-id="${event.id}">
                        View Details ↗
                    </button>
                </div>

            </div>
        `;

        eventGrid.appendChild(card);

    });

}


/* =====================================
   5. SEARCH AND CATEGORY FILTER
===================================== */

function filterEvents() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const filteredEvents = events.filter(event => {

        const matchesCategory =
            selectedCategory === "All" ||
            event.category === selectedCategory;

        const matchesSearch =
            event.name.toLowerCase().includes(searchText) ||
            event.category.toLowerCase().includes(searchText) ||
            event.venue.toLowerCase().includes(searchText) ||
            event.description.toLowerCase().includes(searchText);

        return matchesCategory && matchesSearch;

    });

    displayEvents(filteredEvents);

}


// Search event while typing
searchInput.addEventListener("input", filterEvents);


// Category filter
filterButtons.addEventListener("click", function(e) {

    if (!e.target.matches(".filter-btn")) return;

    document.querySelectorAll(".filter-btn")
        .forEach(btn => btn.classList.remove("active"));

    e.target.classList.add("active");

    selectedCategory = e.target.dataset.category;

    filterEvents();

});


/* =====================================
   6. OPEN EVENT DETAILS
===================================== */

function openEvent(eventId) {

    const event = events.find(e => e.id === eventId);

    if (!event) return;

    eventDetails.innerHTML = `
        <img src="${event.image}" alt="${event.name}">

        <span class="category-tag">${event.category}</span>

        <h2>${event.name}</h2>

        <p>${event.description}</p>

        <p>📅 <strong>${formatDate(event.date)}</strong></p>

        <p>📍 ${event.venue}</p>

        <p>🎟️ ${event.price}</p>
    `;

    selectedEvent.value = event.name;

    registrationForm.reset();
    selectedEvent.value = event.name;

    document.querySelectorAll(".error").forEach(el => {
        el.textContent = "";
    });

    document.getElementById("successMessage").textContent = "";

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

}


// Event delegation for dynamically created cards
eventGrid.addEventListener("click", function(e) {

    const button = e.target.closest("[data-event-id]");

    if (!button) return;

    openEvent(Number(button.dataset.eventId));

});


/* =====================================
   7. CLOSE EVENT MODAL
===================================== */

function hideModal() {

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", function(e) {

    if (e.target === modal) {
        hideModal();
    }

});

document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {
        hideModal();
    }

});


/* =====================================
   8. FORM VALIDATION
===================================== */

registrationForm.addEventListener("submit", function(e) {

    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => {
        el.textContent = "";
    });

    document.getElementById("successMessage").textContent = "";

    let valid = true;


    // Name validation
    if (!/^[\p{L}][\p{L}\s.'-]{1,49}$/u.test(name)) {

        document.getElementById("nameError").textContent =
            "Enter a valid name (at least 2 characters).";

        valid = false;

    }


    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {

        document.getElementById("emailError").textContent =
            "Enter a valid email address.";

        valid = false;

    }


    // Indian phone number validation
    if (!/^[6-9]\d{9}$/.test(phone)) {

        document.getElementById("phoneError").textContent =
            "Enter a valid 10-digit Indian mobile number.";

        valid = false;

    }


    if (!selectedEvent.value) {
        valid = false;
    }


    // Stop if validation fails
    if (!valid) return;


    /* =====================================
       9. SAVE REGISTRATION IN LOCAL STORAGE
    ===================================== */

    const registration = {
        name: name,
        email: email,
        phone: phone,
        event: selectedEvent.value,
        registrationDate: new Date().toISOString()
    };

    let registrations =
        JSON.parse(localStorage.getItem("eventRegistrations")) || [];

    registrations.push(registration);

    localStorage.setItem(
        "eventRegistrations",
        JSON.stringify(registrations)
    );


    // Show confirmation
    const successMessage =
        document.getElementById("successMessage");

    successMessage.textContent =
        `✓ Registration successful! Thank you, ${name}.`;

    registrationForm.reset();

    selectedEvent.value = registration.event;

});


/* =====================================
   10. DARK / LIGHT MODE
===================================== */

const themeToggle = document.getElementById("themeToggle");

// Restore saved theme
const savedTheme = localStorage.getItem("eventoraTheme");

if (savedTheme === "light") {
    document.body.classList.add("light");
}

function updateThemeButton() {

    themeToggle.textContent =
        document.body.classList.contains("light") ? "☀" : "☾";

}

updateThemeButton();


themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("light");

    const currentTheme =
        document.body.classList.contains("light") ? "light" : "dark";

    localStorage.setItem("eventoraTheme", currentTheme);

    updateThemeButton();

});


/* =====================================
   11. MOBILE NAVIGATION
===================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function() {

    navLinks.classList.toggle("open");

});

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", function() {
        navLinks.classList.remove("open");
    });

});


/* =====================================
   12. INITIALIZE WEBSITE
===================================== */

displayEvents(events);
