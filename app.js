// ---- App state (in-memory, resets on page reload — no backend/database) ----
let savedDestinationIds = [];
let itinerary = {}; // { "Day 1": [ {name, cost}, ... ] }
let bookedHotelIds = [];

// ---- Tab Navigation ----
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-section").forEach(s => s.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
    if (btn.dataset.tab === "itinerary") renderMyTrip();
  });
});

// ---- Toast ----
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2000);
}

// ---- Explore: render destination cards ----
function renderDestinations(list) {
  const grid = document.getElementById("destinationGrid");
  if (list.length === 0) {
    grid.innerHTML = `<div class="empty-state">No destinations match your search.</div>`;
    return;
  }
  grid.innerHTML = list.map(d => `
    <div class="card">
      <img src="${d.img}" alt="${d.name}" loading="lazy">
      <div class="card-body">
        <span class="tag">${d.category}</span>
        <h3>${d.name}</h3>
        <p>${d.desc}</p>
        <div class="card-footer">
          <span class="price">$${d.price}</span>
          <button onclick="saveDestination(${d.id})">Save to Trip</button>
        </div>
      </div>
    </div>
  `).join("");
}

function saveDestination(id) {
  if (!savedDestinationIds.includes(id)) {
    savedDestinationIds.push(id);
    updateCartCount();
    showToast("Added to your trip!");
  } else {
    showToast("Already in your trip.");
  }
}

function updateCartCount() {
  document.getElementById("cartCount").textContent = `(${savedDestinationIds.length + bookedHotelIds.length})`;
}

// ---- Search & filter ----
function applyFilters() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("filterCategory").value;
  const filtered = destinations.filter(d => {
    const matchesQuery = d.name.toLowerCase().includes(query) || d.desc.toLowerCase().includes(query);
    const matchesCategory = category === "all" || d.category === category;
    return matchesQuery && matchesCategory;
  });
  renderDestinations(filtered);
}

document.getElementById("searchInput").addEventListener("input", applyFilters);
document.getElementById("filterCategory").addEventListener("change", applyFilters);

// ---- Trip Planner ----
document.getElementById("addActivityBtn").addEventListener("click", () => {
  const day = document.getElementById("activityDay").value.trim();
  const name = document.getElementById("activityName").value.trim();
  const cost = parseFloat(document.getElementById("activityCost").value) || 0;

  if (!day || !name) {
    showToast("Please enter a day and activity name.");
    return;
  }

  if (!itinerary[day]) itinerary[day] = [];
  itinerary[day].push({ name, cost });

  document.getElementById("activityName").value = "";
  document.getElementById("activityCost").value = "";

  renderItinerary();
});

function renderItinerary() {
  const container = document.getElementById("itineraryDays");
  const days = Object.keys(itinerary);

  if (days.length === 0) {
    container.innerHTML = `<div class="empty-state">No activities added yet.</div>`;
    document.getElementById("totalBudget").textContent = "0";
    return;
  }

  let total = 0;
  container.innerHTML = days.map(day => {
    const activities = itinerary[day];
    const dayTotal = activities.reduce((sum, a) => sum + a.cost, 0);
    total += dayTotal;
    return `
      <div class="day-group">
        <h4>${day} <span style="color:#93a0b3; font-size:0.8rem;">($${dayTotal.toFixed(2)})</span></h4>
        ${activities.map((a, i) => `
          <div class="activity-item">
            <span>${a.name} — $${a.cost.toFixed(2)}</span>
            <button onclick="removeActivity('${day}', ${i})">Remove</button>
          </div>
        `).join("")}
      </div>
    `;
  }).join("");

  document.getElementById("totalBudget").textContent = total.toFixed(2);
}

function removeActivity(day, index) {
  itinerary[day].splice(index, 1);
  if (itinerary[day].length === 0) delete itinerary[day];
  renderItinerary();
}

// ---- Booking ----
function renderHotels() {
  const grid = document.getElementById("bookingGrid");
  grid.innerHTML = hotels.map(h => `
    <div class="card">
      <img src="${h.img}" alt="${h.name}" loading="lazy">
      <div class="card-body">
        <span class="tag">${h.location}</span>
        <h3>${h.name}</h3>
        <p>Rating: ${h.rating} / 5</p>
        <div class="card-footer">
          <span class="price">$${h.price}/night</span>
          <button onclick="bookHotel(${h.id})">${bookedHotelIds.includes(h.id) ? "Booked ✓" : "Book Now"}</button>
        </div>
      </div>
    </div>
  `).join("");
}

function bookHotel(id) {
  if (!bookedHotelIds.includes(id)) {
    bookedHotelIds.push(id);
    updateCartCount();
    renderHotels();
    showToast("Hotel booked (demo only, no charge)!");
  } else {
    showToast("Already booked.");
  }
}

// ---- Blog ----
function renderBlog() {
  const grid = document.getElementById("blogGrid");
  grid.innerHTML = blogPosts.map(p => `
    <div class="blog-card">
      <h3>${p.title}</h3>
      <div class="blog-meta">${p.date}</div>
      <p>${p.excerpt}</p>
    </div>
  `).join("");
}

// ---- My Trip Summary ----
function renderMyTrip() {
  const destContainer = document.getElementById("savedDestinations");
  const savedDests = destinations.filter(d => savedDestinationIds.includes(d.id));

  destContainer.innerHTML = `<h3>Saved Destinations</h3>` + (
    savedDests.length === 0
      ? `<div class="empty-state">No destinations saved yet.</div>`
      : `<div class="card-grid">` + savedDests.map(d => `
          <div class="card">
            <img src="${d.img}" alt="${d.name}">
            <div class="card-body">
              <h3>${d.name}</h3>
              <p>${d.desc}</p>
              <div class="card-footer">
                <span class="price">$${d.price}</span>
                <button class="secondary" onclick="removeSavedDestination(${d.id})">Remove</button>
              </div>
            </div>
          </div>
        `).join("") + `</div>`
  );

  const bookingContainer = document.getElementById("bookingSummary");
  const bookedHotels = hotels.filter(h => bookedHotelIds.includes(h.id));

  bookingContainer.innerHTML = `<h3 style="margin-top:30px;">Booked Hotels</h3>` + (
    bookedHotels.length === 0
      ? `<div class="empty-state">No hotels booked yet.</div>`
      : `<div class="card-grid">` + bookedHotels.map(h => `
          <div class="card">
            <img src="${h.img}" alt="${h.name}">
            <div class="card-body">
              <h3>${h.name}</h3>
              <p>${h.location}</p>
              <div class="card-footer">
                <span class="price">$${h.price}/night</span>
              </div>
            </div>
          </div>
        `).join("") + `</div>`
  );
}

function removeSavedDestination(id) {
  savedDestinationIds = savedDestinationIds.filter(d => d !== id);
  updateCartCount();
  renderMyTrip();
}

// ---- Init ----
renderDestinations(destinations);
renderHotels();
renderBlog();
renderItinerary();
