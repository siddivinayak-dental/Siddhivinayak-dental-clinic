// WhatsApp Integration on Form Submission
document.getElementById("callbackForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form from submitting normally

  // Get input values
  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const email = document.getElementById("email").value.trim();

  // Validate inputs (optional)
  if (name && contact && email) {
    const message = `Hello, I need a Treatment:\n\n👤 Name: ${name}\n📞 Contact: ${contact}\n📧 Email: ${email}`;
    const phoneNumber = "919766105455"; // Your WhatsApp Number

    // Open WhatsApp with message
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  } else {
    alert("Please fill in all the details!");
  }
});


// Store all reviews here
let reviews = [];

document.getElementById("reviewForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("reviewerName").value.trim();
  const email = document.getElementById("reviewerEmail").value.trim();
  const rating = parseInt(document.getElementById("reviewerRating").value);
  const text = document.getElementById("reviewText").value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!name || !email || !rating || !text) {
    alert("Please fill in all fields.");
    return;
  }

  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Add review
  reviews.unshift({ name, email, rating, text });

  // Keep latest 5
  if (reviews.length > 5) reviews = reviews.slice(0, 5);

  // Reset form
  document.getElementById("reviewForm").reset();

  // Re-render
  renderReviews();
});

function renderReviews() {
  const reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";

  let totalRating = 0;

  reviews.forEach((review) => {
    totalRating += review.rating;

    const col = document.createElement("div");
    col.className = "col-md-6";

    col.innerHTML = `
      <div class="review-card">
        <h5>${review.name}</h5>
        <p class="review-email">${review.email}</p>
        <div class="review-rating mb-1">${"⭐".repeat(review.rating)}</div>
        <p>${review.text}</p>
      </div>
    `;
    reviewList.appendChild(col);
  });

  // Show total & average
  document.getElementById("reviewCount").textContent = reviews.length;
  const avg = reviews.length ? (totalRating / reviews.length).toFixed(1) : 0;
  document.getElementById("averageRating").textContent = avg;
}

// Open form with doctor details
function openAppointmentForm(doctorName, doctorPhone) {
  document.getElementById("doctorName").value = doctorName;
  document.getElementById("doctorPhone").value = doctorPhone;
  const modal = new bootstrap.Modal(document.getElementById("appointmentModal"));
  modal.show();
}

// On form submit
document.getElementById("appointmentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const doctorName = document.getElementById("doctorName").value;
  const doctorPhone = document.getElementById("doctorPhone").value;
  const patientName = document.getElementById("patientName").value.trim();
  const date = document.getElementById("appointmentDate").value;
  const time = document.getElementById("appointmentTime").value;

  if (!patientName || !date || !time) {
    alert("Please fill in all fields.");
    return;
  }

  const msg = `🦷 *New Appointment Request*\n\n👤 *Patient:* ${patientName}\n👨‍⚕️ *Doctor:* ${doctorName}\n📅 *Date:* ${date}\n⏰ *Time:* ${time}`;

  // Clinic WhatsApp
  const clinicPhone = "919766105455";
  const clinicLink = `https://wa.me/${clinicPhone}?text=${encodeURIComponent(msg)}`;
  window.open(clinicLink, "_blank");

  // Doctor WhatsApp
  const doctorLink = `https://wa.me/${doctorPhone}?text=${encodeURIComponent(msg)}`;
  window.open(doctorLink, "_blank");

  // Close modal
  bootstrap.Modal.getInstance(document.getElementById("appointmentModal")).hide();
});
