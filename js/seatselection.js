/* ===========================
   SKYBOUND - BOOKING JS
   =========================== */

// ---- CONFIG ----
const CABIN_CONFIG = {
  economy: {
    columns: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    aisleAfter: 3, // gap after column index 3 (C/D split)
    rows: [12, 13, 14, 15],
    basePrice: 845.00,
    seatLabel: 'Economy Seat',
    // Pre-occupied seats: "row-col"
    occupied: ['12-B','12-E','13-A','13-B','13-D','13-G','13-H','14-D','14-E','15-B']
  },
  business: {
    columns: ['A', 'B', 'C', 'D', 'E', 'F'],
    aisleAfter: 2,
    rows: [1, 2, 3, 4],
    basePrice: 1650.00,
    seatLabel: 'Business Seat',
    occupied: ['1-B','2-C','2-D','3-A','4-E','4-F']
  },
  first: {
    columns: ['A', 'B', 'C', 'D'],
    aisleAfter: 1,
    rows: [1, 2],
    basePrice: 3200.00,
    seatLabel: 'First Class Seat',
    occupied: ['1-B','2-C']
  }
};

const ADDON_PRICES = {
  luggage: 45.00,
  meal: 35.00,
  boarding: 25.00
};

const TAX_FEE = 122.40;

// ---- STATE ----
let currentCabin = 'economy';
let selectedSeat = '12A'; // default matches screenshot

// ---- INIT ----
document.addEventListener('DOMContentLoaded', function () {
  renderSeatMap(currentCabin);
  updateSummary();
});

// ---- SWITCH CABIN ----
function switchCabin(cabin) {
  currentCabin = cabin;
  selectedSeat = null;

  // Update tab UI
  ['economy', 'business', 'first'].forEach(c => {
    const tab = document.getElementById('tab-' + c);
    tab.classList.toggle('active', c === cabin);
  });

  renderSeatMap(cabin);
  updateSummary();
}

// ---- RENDER SEAT MAP ----
function renderSeatMap(cabin) {
  const config = CABIN_CONFIG[cabin];
  const { columns, aisleAfter, rows, occupied } = config;

  const seatClass = cabin === 'first' ? 'first-seat' : cabin === 'business' ? 'business-seat' : '';

  // Column Header
  const headerEl = document.getElementById('columnHeader');
  headerEl.innerHTML = '';

  // Row number spacer
  const rowSpacer = document.createElement('div');
  rowSpacer.className = 'row-spacer';
  headerEl.appendChild(rowSpacer);

  columns.forEach((col, i) => {
    if (i === aisleAfter + 1) {
      const spacer = document.createElement('div');
      spacer.className = 'aisle-gap';
      headerEl.appendChild(spacer);
    }
    const label = document.createElement('div');
    label.className = 'col-label';
    label.textContent = col;
    headerEl.appendChild(label);
  });

  // Seat Rows
  const rowsEl = document.getElementById('seatRows');
  rowsEl.innerHTML = '';

  rows.forEach(rowNum => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'seat-row';

    // Row number
    const rowLabel = document.createElement('div');
    rowLabel.className = 'seat-row-num';
    rowLabel.textContent = rowNum;
    rowDiv.appendChild(rowLabel);

    columns.forEach((col, i) => {
      if (i === aisleAfter + 1) {
        const gap = document.createElement('div');
        gap.className = 'aisle-gap';
        rowDiv.appendChild(gap);
      }

      const seatId = `${rowNum}-${col}`;
      const seatEl = document.createElement('div');
      seatEl.className = 'seat ' + seatClass;
      seatEl.id = 'seat-' + seatId;
      seatEl.setAttribute('data-seat', `${rowNum}${col}`);

      if (occupied.includes(seatId)) {
        seatEl.classList.add('occupied');
        seatEl.title = 'Occupied';
      } else {
        seatEl.onclick = () => selectSeat(rowNum, col, cabin);
        seatEl.title = `Seat ${rowNum}${col}`;
      }

      // Pre-select default seat for economy
      if (selectedSeat === `${rowNum}${col}`) {
        seatEl.classList.add('selected');
      }

      rowDiv.appendChild(seatEl);
    });

    rowsEl.appendChild(rowDiv);
  });
}

// ---- SELECT SEAT ----
function selectSeat(row, col, cabin) {
  // Deselect previous
  if (selectedSeat) {
    const prev = document.querySelector('.seat.selected');
    if (prev) prev.classList.remove('selected');
  }

  selectedSeat = `${row}${col}`;
  const el = document.getElementById(`seat-${row}-${col}`);
  if (el) el.classList.add('selected');

  updateSummary();
}

// ---- UPDATE ADD-ONS ----
function updateAddons() {
  updateSummary();
}

// ---- UPDATE SUMMARY ----
function updateSummary() {
  const config = CABIN_CONFIG[currentCabin];

  // Seat label
  const seatLabel = document.getElementById('seat-label');
  const seatPrice = document.getElementById('seat-price');
  if (selectedSeat) {
    seatLabel.textContent = `${config.seatLabel} (${selectedSeat})`;
  } else {
    seatLabel.textContent = `${config.seatLabel} (select a seat)`;
  }
  seatPrice.textContent = `$${config.basePrice.toFixed(2)}`;

  // Addons
  const hasLuggage = document.getElementById('check-luggage').checked;
  const hasMeal = document.getElementById('check-meal').checked;
  const hasBoarding = document.getElementById('check-boarding').checked;

  const luggageRow = document.getElementById('luggage-row');
  const mealRow = document.getElementById('meal-row');
  const boardingRow = document.getElementById('boarding-row');

  luggageRow.style.display = hasLuggage ? '' : 'none';
  mealRow.style.display = hasMeal ? '' : 'none';
  boardingRow.style.display = hasBoarding ? '' : 'none';

  // Total
  let total = config.basePrice + TAX_FEE;
  if (hasLuggage) total += ADDON_PRICES.luggage;
  if (hasMeal) total += ADDON_PRICES.meal;
  if (hasBoarding) total += ADDON_PRICES.boarding;

  document.getElementById('total-cost').textContent = `$${total.toFixed(2)}`;
  document.getElementById('modal-total').textContent = `$${total.toFixed(2)}`;
}

// ---- PROCEED TO PAYMENT ----
function proceedToPayment() {
  if (!selectedSeat) {
    showToast('Please select a seat to continue.', 'warning');
    return;
  }
  const modal = new bootstrap.Modal(document.getElementById('paymentModal'));
  modal.show();
}

// ---- CONFIRM PAYMENT ----
function confirmPayment() {
  const cardNum = document.getElementById('cardNumber').value.replace(/\s/g, '');
  const expiry = document.getElementById('expiry').value;

  if (cardNum.length < 16) {
    showToast('Please enter a valid 16-digit card number.', 'danger');
    return;
  }
  if (expiry.length < 5) {
    showToast('Please enter a valid expiry date.', 'danger');
    return;
  }

  // Close payment modal
  bootstrap.Modal.getInstance(document.getElementById('paymentModal')).hide();

  // Show success after short delay
  setTimeout(() => {
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
  }, 400);
}

// ---- CARD FORMAT HELPERS ----
function formatCard(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 3) {
    input.value = val.substring(0, 2) + ' / ' + val.substring(2);
  } else {
    input.value = val;
  }
}

// ---- TOAST NOTIFICATION ----
function showToast(message, type = 'primary') {
  // Remove existing
  const existing = document.getElementById('sb-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'sb-toast';
  toast.className = `alert alert-${type} shadow`;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    min-width: 280px;
    text-align: center;
    font-size: 14px;
    font-family: "Poppins", sans-serif;
    animation: slideUp 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
