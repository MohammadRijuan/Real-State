let properties = [];
let selectedFloor = "all";
let selectedRooms = "all";
let showingAll = false;

// Fetch JSON data
fetch('./folder/table.json')
  .then(res => res.json())
  .then(data => {
    properties = data;
    displayProperties(properties.slice(0, 10));
  })
  .catch(err => console.error("Error fetching JSON:", err));


// Display properties in table
function displayProperties(data) {
  const tbody = document.getElementById('property-tbody');
  tbody.innerHTML = '';
  data.forEach((p) => {

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${p.completion}</td>
      <td>${p.type}</td>
      <td>${p.unit_number}</td>
      <td>${p.floor}</td>
      <td>${p.number_of_rooms}</td>
      <td>${p.unit_area}</td>
      <td>${p.loggie_terrace}</td>
      <td>${p.total}</td>
      <td>${p.discounted_price_with_VAT}</td>
      <td class="availability">${p.availability}</td>
      <td><button>360°</button></td>
    `;
    tbody.appendChild(tr);
  });
  addAvailabilityClick();
}

// active room
document.querySelectorAll('.room-number a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();

    document.querySelectorAll('.room-number a').forEach(a => a.classList.remove('active'));

    link.classList.add('active');

    selectedRooms = link.dataset.room;
    filterProperties();
  });
});



// Handle filters
document.getElementById('floor-select').addEventListener('change', e => {
  selectedFloor = e.target.value;
  filterProperties();
});

document.querySelectorAll('.room-number a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    selectedRooms = link.dataset.room;
    filterProperties();
  });
});


// Filter logic
function filterProperties() {
  let filtered = properties;

  if (selectedFloor !== "all")
    filtered = filtered.filter(p => p.floor === Number(selectedFloor));

  if (selectedRooms !== "all")
    filtered = filtered.filter(p => p.number_of_rooms === Number(selectedRooms));

  if (!showingAll) filtered = filtered.slice(0, 10);
  displayProperties(filtered);
}


// Modal logic
const modal = document.getElementById('availabilityModal');
document.getElementById('closeModal').addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

document.getElementById('submitBtn').addEventListener('click', () => {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (name && email) {
    alert(`Thank you, ${name}! We will contact you at ${email}.`);
    modal.style.display = 'none';
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
  } else alert('Please enter both name and email.');
});

function addAvailabilityClick() {
  document.querySelectorAll('.availability').forEach(cell => {
    cell.addEventListener('click', () => {
      const status = cell.textContent.trim().toLowerCase();
      if (status === "on sale") {
        modal.style.display = 'block';
      }
    });
  });


}



const viewAllBtn = document.querySelector('.apartment-btn button');

if (viewAllBtn) {
  viewAllBtn.addEventListener('click', () => {
    showingAll = !showingAll;

    if (showingAll) {
      // Show all
      viewAllBtn.textContent = "View Less Apartments";
      displayProperties(properties);
    } else {
      // Show only 10 
      viewAllBtn.textContent = "View All Apartments";
      displayProperties(properties.slice(0, 10));
    }
  });
}
