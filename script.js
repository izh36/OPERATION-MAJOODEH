```javascript
// ================================
// DATA
// ================================

const messages = {
  1: {
    title: "#001 DEBRECEN",
    content: "Us two waking up ridiculously early, train ride to Debrecen, thesis defense."
  },

  2: {
    title: "#002 NYUGATI",
    content: "The enormous table from Nyugati and Semsem carrying it home."
  },

  3: {
    title: "#003 NAIL TECHNICIAN",
    content: 'Semsem becoming Majoodehs "professional" nail technician for approximately milyoon sa3a.'
  },

  4: {
    title: "#004 HUNGARY",
    content: "arriving Hungary and directly becoming friends."
  }
};


const memories = {
  1: {
    title: "MEMORY #001",
    content: "The neighbor's cat attacking Majoodeh."
  },

  2: {
    title: "MEMORY #002",
    content: "The baby pigeon at Leonardo and you making me go outside with it."
  },

  3: {
    title: "MEMORY #003",
    content: "Going for new years walk and talking pics in front of the minion and telephone booth."
  },

  4: {
    title: "MEMORY #004",
    content: "Your Holland transit when we enjoyed our time together."
  }
};


// ================================
// SCREEN ELEMENTS
// ================================

const classifiedScreen = document.getElementById("classified-screen");
const phoneScreen = document.getElementById("phone-screen");

const acceptBtn = document.getElementById("accept-btn");
const declineBtn = document.getElementById("decline-btn");

const terminalResponse = document.getElementById("terminal-response");


// ================================
// ACCEPT MISSION
// ================================

acceptBtn.addEventListener("click", () => {

  acceptBtn.disabled = true;
  declineBtn.disabled = true;

  const messages = [
    "AUTHENTICATING AGENT...",
    "IDENTITY VERIFIED.",
    "CLEARANCE GRANTED.",
    "OPENING SECURE DEVICE..."
  ];

  let index = 0;

  function nextMessage() {

    if (index >= messages.length) {

      setTimeout(() => {
        classifiedScreen.classList.remove("active");
        phoneScreen.classList.add("active");
        startClock();
      }, 700);

      return;
    }

    terminalResponse.textContent = messages[index];

    index++;

    setTimeout(nextMessage, 800);
  }

  nextMessage();
});


// ================================
// DECLINE
// ================================

declineBtn.addEventListener("click", () => {

  terminalResponse.textContent = "DECLINE REQUEST RECEIVED...";

  setTimeout(() => {
    terminalResponse.textContent = "REQUEST DENIED.";
  }, 800);

  setTimeout(() => {
    terminalResponse.textContent = "NICE TRY.";
  }, 1600);
});


// ================================
// REAL PHONE CLOCK
// ================================

function updateClock() {

  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();

  hours = String(hours).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");

  document.getElementById("phone-time").textContent =
    `${hours}:${minutes}`;
}


function startClock() {

  updateClock();

  setInterval(updateClock, 1000);
}


// ================================
// PHONE NAVIGATION
// ================================

const apps = document.querySelectorAll(".app");

apps.forEach(app => {

  app.addEventListener("click", () => {

    const target = app.dataset.view;

    if (target === "final-view") {

      showSystemAlert(
        "FINAL FILE LOCKED",
        "COMPLETE ALL OBJECTIVES"
      );

      return;
    }

    openView(target);
  });

});


function openView(viewId) {

  document.querySelectorAll(".phone-view").forEach(view => {
    view.classList.remove("active");
  });

  document.getElementById(viewId).classList.add("active");
}


// ================================
// BACK BUTTONS
// ================================

document.querySelectorAll(".back-btn").forEach(button => {

  button.addEventListener("click", () => {
    openView("home-view");
  });

});


document.getElementById("detail-back").addEventListener("click", () => {
  openView("home-view");
});


// ================================
// MESSAGE DETAILS
// ================================

document.querySelectorAll(".message-item").forEach(item => {

  item.addEventListener("click", () => {

    const id = item.dataset.message;
    const message = messages[id];

    document.getElementById("detail-title").textContent =
      message.title;

    document.getElementById("detail-content").innerHTML = `
      <div class="classified-detail">
        <span>MESSAGE RECORD</span>
        <div class="detail-number">${message.title}</div>
        <p>${message.content}</p>
      </div>
    `;

    openView("detail-view");
  });

});


// ================================
// MEMORY DETAILS
// ================================

document.querySelectorAll(".memory-item").forEach(item => {

  item.addEventListener("click", () => {

    const id = item.dataset.memory;
    const memory = memories[id];

    document.getElementById("detail-title").textContent =
      memory.title;

    document.getElementById("detail-content").innerHTML = `
      <div class="classified-detail">
        <span>MEMORY RECORD</span>
        <div class="detail-number">${memory.title}</div>
        <p>${memory.content}</p>
      </div>
    `;

    openView("detail-view");
  });

});


// ================================
// SYSTEM ALERT
// ================================

function showSystemAlert(title, message) {

  const alert = document.createElement("div");

  alert.className = "system-alert";

  alert.innerHTML = `
    <strong>${title}</strong>
    <span>${message}</span>
  `;

  document.body.appendChild(alert);

  setTimeout(() => {
    alert.classList.add("show");
  }, 20);

  setTimeout(() => {

    alert.classList.remove("show");

    setTimeout(() => {
      alert.remove();
    }, 300);

  }, 2200);
}
```
