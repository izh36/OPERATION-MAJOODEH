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

acceptBtn.addEventListener("click", function() {

  acceptBtn.disabled = true;
  declineBtn.disabled = true;

  const sequence = [
    "AUTHENTICATING AGENT...",
    "IDENTITY VERIFIED.",
    "CLEARANCE GRANTED.",
    "OPENING SECURE DEVICE..."
  ];

  let index = 0;

  function nextMessage() {

    if (index >= sequence.length) {

      setTimeout(function() {
        classifiedScreen.classList.remove("active");
        phoneScreen.classList.add("active");
        startClock();
      }, 700);

      return;
    }

    terminalResponse.textContent = sequence[index];

    index++;

    setTimeout(nextMessage, 800);
  }

  nextMessage();
});


// ================================
// DECLINE
// ================================

declineBtn.addEventListener("click", function() {

  terminalResponse.textContent = "DECLINE REQUEST RECEIVED...";

  setTimeout(function() {
    terminalResponse.textContent = "REQUEST DENIED.";
  }, 800);

  setTimeout(function() {
    terminalResponse.textContent = "NICE TRY.";
  }, 1600);
});


// ================================
// REAL PHONE CLOCK
// ================================

function updateClock() {

  const now = new Date();

  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");

  document.getElementById("phone-time").textContent =
    hours + ":" + minutes;
}


function startClock() {

  updateClock();

  setInterval(updateClock, 1000);
}


// ================================
// PHONE NAVIGATION
// ================================

const apps = document.querySelectorAll(".app");

apps.forEach(function(app) {

  app.addEventListener("click", function() {

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

  document.querySelectorAll(".phone-view").forEach(function(view) {
    view.classList.remove("active");
  });

  document.getElementById(viewId).classList.add("active");
}


// ================================
// BACK BUTTONS
// ================================

document.querySelectorAll(".back-btn").forEach(function(button) {

  button.addEventListener("click", function() {
    openView("home-view");
  });

});


document.getElementById("detail-back").addEventListener("click", function() {
  openView("home-view");
});


// ================================
// MESSAGE DETAILS
// ================================

document.querySelectorAll(".message-item").forEach(function(item) {

  item.addEventListener("click", function() {

    const id = item.dataset.message;
    const message = messages[id];

    document.getElementById("detail-title").textContent =
      message.title;

    const detailContent = document.getElementById("detail-content");

    detailContent.innerHTML = "";

    const box = document.createElement("div");
    box.className = "classified-detail";

    const label = document.createElement("span");
    label.textContent = "MESSAGE RECORD";

    const number = document.createElement("div");
    number.className = "detail-number";
    number.textContent = message.title;

    const content = document.createElement("p");
    content.textContent = message.content;

    box.appendChild(label);
    box.appendChild(number);
    box.appendChild(content);

    detailContent.appendChild(box);

    openView("detail-view");
  });

});


// ================================
// MEMORY DETAILS
// ================================

document.querySelectorAll(".memory-item").forEach(function(item) {

  item.addEventListener("click", function() {

    const id = item.dataset.memory;
    const memory = memories[id];

    document.getElementById("detail-title").textContent =
      memory.title;

    const detailContent = document.getElementById("detail-content");

    detailContent.innerHTML = "";

    const box = document.createElement("div");
    box.className = "classified-detail";

    const label = document.createElement("span");
    label.textContent = "MEMORY RECORD";

    const number = document.createElement("div");
    number.className = "detail-number";
    number.textContent = memory.title;

    const content = document.createElement("p");
    content.textContent = memory.content;

    box.appendChild(label);
    box.appendChild(number);
    box.appendChild(content);

    detailContent.appendChild(box);

    openView("detail-view");
  });

});


// ================================
// SYSTEM ALERT
// ================================

function showSystemAlert(title, message) {

  const alert = document.createElement("div");

  alert.className = "system-alert";

  const titleElement = document.createElement("strong");
  titleElement.textContent = title;

  const messageElement = document.createElement("span");
  messageElement.textContent = message;

  alert.appendChild(titleElement);
  alert.appendChild(messageElement);

  document.body.appendChild(alert);

  setTimeout(function() {
    alert.classList.add("show");
  }, 20);

  setTimeout(function() {

    alert.classList.remove("show");

    setTimeout(function() {
      alert.remove();
    }, 300);

  }, 2200);
}
