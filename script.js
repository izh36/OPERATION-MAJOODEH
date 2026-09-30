// =========================================
// CLASSIFIED OPENING — BINARY RAIN
// =========================================

(function createBinaryRain() {

  const rain = document.querySelector(".binary-rain");

  if (!rain) {
    return;
  }

  const columnCount = 22;

  for (let i = 0; i < columnCount; i++) {

    const column = document.createElement("div");

    column.className = "binary-column";

    column.style.left =
      (i / columnCount * 100) + "%";

    column.style.animationDuration =
      (9 + Math.random() * 10) + "s";

    column.style.animationDelay =
      (-Math.random() * 12) + "s";

    const length =
      18 + Math.floor(Math.random() * 18);

    for (let j = 0; j < length; j++) {

      const bit = document.createElement("span");

      bit.textContent =
        Math.random() > 0.5 ? "1" : "0";

      column.appendChild(bit);

    }

    rain.appendChild(column);

  }

})();

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
    content: 'Semsem becoming Majoodehs "professional" nail technician for approximately milyoon sa3a.',
    clue: "nails"
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

      if (
        app.classList.contains("locked-app")
      ) {
        showSystemAlert(
          "FINAL FILE LOCKED",
          "COMPLETE ALL OBJECTIVES"
        );

        return;
      }

      document.getElementById("final-case-title").textContent =
        "🔓 CASE #999";

      document.getElementById("final-case-status").textContent =
        "STATUS: DECLASSIFIED";

      openView("final-view");

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

    if (
      message.clue === "nails" &&
      objective1Active &&
      !objective1Clues.nails
    ) {

      const clue = document.createElement("span");
      clue.className = "hidden-clue clue-deployed";
      clue.id = "clue-nails";
      clue.textContent = "💅";

      clue.addEventListener("click", function(event) {
        event.stopPropagation();
        collectClue("nails");
      });

      box.appendChild(clue);
    }

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

    if (
      id === "1" &&
      objective1Active &&
      !objective1Clues.cat
    ) {

      const clue = document.createElement("span");
      clue.className = "hidden-clue clue-deployed";
      clue.id = "clue-cat";
      clue.textContent = "🐈";

      clue.addEventListener("click", function(event) {
        event.stopPropagation();
        collectClue("cat");
      });

      box.appendChild(clue);
    }

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
// ================================
// OBJECTIVE #001
// ================================

let objective1Active = false;

let objective1Clues = {
  nails: false,
  cat: false,
  yoda: false,
  sunrise: false
};


function activateObjective1() {

  objective1Active = true;

  document.getElementById("activate-objective-btn").textContent =
    "OBJECTIVE ACTIVE";

  document.getElementById("activate-objective-btn").disabled = true;

  document.getElementById("objective-1-status").textContent =
    "ACTIVE";

 document.getElementById("clue-yoda").style.display = "inline-block";
document.getElementById("clue-yoda").classList.add("clue-deployed");

document.getElementById("clue-sunrise").style.display = "inline-block";
document.getElementById("clue-sunrise").classList.add("clue-deployed");

  showSystemNotification(
    "OBJECTIVE #001 ACTIVE",
    "4 AUTHENTICATION MARKERS DEPLOYED"
  );
}

function collectClue(type) {

  if (!objective1Active) {
    return;
  }

  if (objective1Clues[type]) {
    return;
  }

objective1Clues[type] = true;

let clueId = "clue-" + type;
let clue = document.getElementById(clueId);

if (clue) {
  clue.classList.add("clue-collected");
}

let progress = 0;

  Object.keys(objective1Clues).forEach(function(key) {
    if (objective1Clues[key]) {
      progress++;
    }
  });

  setTimeout(function() {

  showSystemNotification(
    "AUTHENTICATION MARKER RECOVERED",
    progress + " / 4 FOUND"
  );

}, 850);

  document.getElementById("objective-progress").textContent =
    progress + " / 4 MARKERS RECOVERED";

  if (progress === 4) {
    completeObjective1();
  }
}

function completeObjective1() {

updateClearance(33);
  
  document.getElementById("objective-1-status").textContent =
    "COMPLETE";

  document.getElementById("objective-1-card").classList.add(
    "objective-complete"
  );

  document.getElementById("objective-2-card").classList.remove(
    "objective-locked"
  );

  document.getElementById("objective-2-card").classList.add(
    "objective-active"
  );

  document.getElementById("objective-2-status").textContent =
    "AVAILABLE";

  showSystemNotification(
    "OBJECTIVE #001 COMPLETE",
    "OBJECTIVE #002 UNLOCKED"
  );

  setTimeout(function() {

    openView("objectives-view");

    setTimeout(function() {

      openObjective(2);

    }, 700);

  }, 1200);
}

function showSystemNotification(title, message) {

  const notification = document.getElementById("system-notification");
  const notificationTitle = document.getElementById("notification-title");
  const notificationMessage = document.getElementById("notification-message");

  notificationTitle.textContent = title;
  notificationMessage.textContent = message;

  notification.classList.add("show");

  setTimeout(function() {
    notification.classList.remove("show");
  }, 2200);
}
// ================================
// OBJECTIVE #002 — CONNECT
// ================================

let objective2Active = false;
let objective2Selected = null;
let objective2Matches = 0;

function activateObjective2() {

  objective2Active = true;

  document.getElementById("activate-objective-2-btn").textContent =
    "OBJECTIVE ACTIVE";

  document.getElementById("activate-objective-2-btn").disabled = true;

  document.getElementById("objective-2-status").textContent =
    "ACTIVE";

  document.getElementById("objective-2-puzzle").classList.add(
    "puzzle-active"
  );

  shuffleConnectionColumn(
    document.querySelector(".connection-left")
  );

  shuffleConnectionColumn(
    document.querySelector(".connection-right")
  );

  showSystemNotification(
    "OBJECTIVE #002 ACTIVE",
    "4 CONNECTIONS REQUIRED"
  );
}

function shuffleConnectionColumn(column) {

  const cards = Array.from(
    column.querySelectorAll(".connection-card")
  );

  for (let i = cards.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }

  cards.forEach(function(card) {
    column.appendChild(card);
  });
}

function openObjective(number) {

  if (number === 1) {

    openView("objective-detail-view");

    if (objective1Active) {
      document.getElementById("activate-objective-btn").textContent =
        "OBJECTIVE ACTIVE";

      document.getElementById("activate-objective-btn").disabled = true;
    }

    return;
  }

  if (number === 2) {

    const objective2Card =
      document.getElementById("objective-2-card");

    if (
      objective2Card.classList.contains("objective-locked")
    ) {
      return;
    }

    openView("objective-2-detail-view");

    if (objective2Active) {
      document.getElementById("activate-objective-2-btn").textContent =
        "OBJECTIVE ACTIVE";

      document.getElementById("activate-objective-2-btn").disabled = true;
    }

    return;
  }

  if (number === 3) {

    const objective3Card =
      document.getElementById("objective-3-card");

    if (
      objective3Card.classList.contains("objective-locked")
    ) {
      return;
    }

    openView("objective-3-detail-view");

if (!objective3Active) {
  resetObjective3();
}
    
    if (objective3Active) {
      document.getElementById("activate-objective-3-btn").textContent =
        "OBJECTIVE ACTIVE";

      document.getElementById("activate-objective-3-btn").disabled = true;
    }
  }
}

document.querySelectorAll(".connection-card").forEach(function(card) {

  card.addEventListener("click", function() {

    if (!objective2Active) {
      return;
    }

    if (card.classList.contains("matched")) {
      return;
    }

    if (!objective2Selected) {

      objective2Selected = card;

      card.classList.add("selected");

      return;
    }

    if (objective2Selected === card) {
      return;
    }

    if (
      objective2Selected.dataset.pair ===
      card.dataset.pair
    ) {

      objective2Selected.classList.remove("selected");
      objective2Selected.classList.add("matched");

      card.classList.add("matched");

      objective2Matches++;

      objective2Selected = null;

      document.getElementById("objective-2-progress").textContent =
        objective2Matches + " / 4 CONNECTIONS VERIFIED";

      showSystemNotification(
        "CONNECTION VERIFIED",
        objective2Matches + " / 4 MATCHED"
      );

      if (objective2Matches === 4) {
        completeObjective2();
      }

    } else {

      objective2Selected.classList.add("wrong");
      card.classList.add("wrong");

      setTimeout(function() {

        objective2Selected.classList.remove("selected");
        objective2Selected.classList.remove("wrong");
        card.classList.remove("wrong");

        objective2Selected = null;

      }, 500);

    }

  });

});

function completeObjective2() {

updateClearance(66);
  
  document.getElementById("objective-2-status").textContent =
    "COMPLETE";

  document.getElementById("objective-2-card").classList.remove(
    "objective-active"
  );

  document.getElementById("objective-2-card").classList.add(
    "objective-complete"
  );

  document.getElementById("objective-3-card").classList.remove(
    "objective-locked"
  );

  document.getElementById("objective-3-card").classList.add(
    "objective-active"
  );

  document.getElementById("objective-3-status").textContent =
    "AVAILABLE";

  showSystemNotification(
    "OBJECTIVE #002 COMPLETE",
    "OBJECTIVE #003 UNLOCKED"
  );

  setTimeout(function() {

    openView("objectives-view");

    setTimeout(function() {

      openObjective(3);

    }, 700);

  }, 1200);
}
// ================================
// OBJECTIVE #003 — RECONSTRUCT
// ================================

let objective3Active = false;
let objective3CorrectCount = 0;

function activateObjective3() {

  objective3Active = true;
  objective3CorrectCount = 0;

  document.getElementById("activate-objective-3-btn").textContent =
    "OBJECTIVE ACTIVE";

  document.getElementById("activate-objective-3-btn").disabled = true;

  document.getElementById("objective-3-status").textContent =
    "ACTIVE";

  document.getElementById("objective-3-progress").textContent =
    "0 / 6 EVENTS VERIFIED";

  const cards = document.querySelectorAll(".timeline-card");

  cards.forEach(function(card) {

    card.classList.remove(
      "timeline-selected",
      "timeline-correct",
      "timeline-wrong",
      "timeline-rearranging"
    );

    card.removeAttribute("data-correct-number");

    const number = card.querySelector(".timeline-number");

    if (number) {
      number.remove();
    }

  });

  document.getElementById("objective-3-puzzle").classList.add(
    "puzzle-active"
  );

  shuffleTimeline();

  showSystemNotification(
    "OBJECTIVE #003 ACTIVE",
    "RECONSTRUCT THE ARCHIVE"
  );
}

function resetObjective3() {

  objective3Active = false;
  objective3CorrectCount = 0;

  const cards = document.querySelectorAll(".timeline-card");

  cards.forEach(function(card) {

    card.classList.remove(
      "timeline-selected",
      "timeline-correct",
      "timeline-wrong",
      "timeline-rearranging"
    );

    card.removeAttribute("data-correct-number");

    const number = card.querySelector(".timeline-number");

    if (number) {
      number.remove();
    }

  });

  document.getElementById("objective-3-progress").textContent =
    "0 / 6 EVENTS VERIFIED";

  document.getElementById("activate-objective-3-btn").textContent =
    "ACTIVATE OBJECTIVE";

  document.getElementById("activate-objective-3-btn").disabled = false;

}

function shuffleTimeline() {

  const puzzle =
    document.getElementById("objective-3-puzzle");

  const cards = Array.from(
    puzzle.querySelectorAll(".timeline-card")
  );

  for (let i = cards.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    const temp = cards[i];
    cards[i] = cards[j];
    cards[j] = temp;
  }

  cards.forEach(function(card) {
    puzzle.appendChild(card);
  });
}

document.querySelectorAll(".timeline-card").forEach(function(card) {

  card.addEventListener("click", function() {

    if (!objective3Active) {
      return;
    }

    if (card.classList.contains("timeline-correct")) {
      return;
    }

    const expectedOrder =
      objective3CorrectCount + 1;

    const cardOrder =
      Number(card.dataset.order);

    if (cardOrder === expectedOrder) {

      objective3CorrectCount++;

      card.classList.add("timeline-correct");

      const number =
        document.createElement("span");

      number.className =
        "timeline-number";

      number.textContent =
        objective3CorrectCount;

      card.insertBefore(
        number,
        card.firstChild
      );

      document.getElementById("objective-3-progress").textContent =
        objective3CorrectCount +
        " / 6 EVENTS VERIFIED";

      if (objective3CorrectCount < 6) {

        showSystemNotification(
          "EVENT VERIFIED",
          objective3CorrectCount + " / 6 CORRECT"
        );

      }

      if (objective3CorrectCount === 6) {

        objective3Active = false;

        animateTimelineCompletion();

      }

    } else {

      card.classList.add("timeline-wrong");

      setTimeout(function() {

        card.classList.remove("timeline-wrong");

      }, 500);

    }

  });

});

function animateTimelineCompletion() {

  const puzzle =
    document.getElementById("objective-3-puzzle");

  const cards =
    Array.from(
      puzzle.querySelectorAll(".timeline-card")
    );

  cards.forEach(function(card) {

    card.classList.add(
      "timeline-rearranging"
    );

  });

  showSystemNotification(
    "ARCHIVE RECONSTRUCTED",
    "REORDERING CHRONOLOGICALLY"
  );

  setTimeout(function() {

    cards.sort(function(a, b) {

      return Number(a.dataset.order) -
        Number(b.dataset.order);

    });

    cards.forEach(function(card) {
      puzzle.appendChild(card);
    });

    cards.forEach(function(card) {
      card.classList.remove(
        "timeline-rearranging"
      );
    });

    document.getElementById("objective-3-progress").textContent =
      "6 / 6 EVENTS VERIFIED";

    setTimeout(function() {

      completeObjective3();

    }, 900);

  }, 1400);

}

function completeObjective3() {

updateClearance(100);
  
  document.getElementById("objective-3-status").textContent =
    "COMPLETE";

  document.getElementById("objective-3-card").classList.remove(
    "objective-active"
  );

  document.getElementById("objective-3-card").classList.add(
    "objective-complete"
  );

  showSystemNotification(
    "OBJECTIVE #003 COMPLETE",
    "CLEARANCE: 100%"
  );

  setTimeout(function() {

    showSystemNotification(
      "FINAL FILE UNLOCKED",
      "CASE #999 DECLASSIFIED"
    );

  }, 2200);

  setTimeout(function() {

    document.getElementById("final-case-title").textContent =
      "🔓 CASE #999";

    document.getElementById("final-case-status").textContent =
      "STATUS: DECLASSIFIED";


document.getElementById("main-final-app").classList.remove(
  "locked-app"
);

document.getElementById("main-final-icon").textContent =
  "🔓";

document.getElementById("main-final-label").textContent =
  "CASE #999";

document.getElementById("main-final-status").textContent =
  "DECLASSIFIED";
    
    openView("final-view");

  }, 4200);

}

function updateClearance(percent) {

  document.getElementById("terminal-clearance").textContent =
    percent + "%";

  document.getElementById("phone-clearance").textContent =
    percent + "%";
}
// =========================================
// PHONE HOME — STRANGE APP BEHAVIOURS
// =========================================

(function startStrangePhoneBehaviour() {

  const home = document.getElementById("home-view");

  if (!home) {
    return;
  }

  const apps = Array.from(
    home.querySelectorAll(".app")
  );

  if (apps.length < 6) {
    return;
  }

  const messageApp = apps[0];
  const memoryApp = apps[1];
  const objectApp = apps[2];
  const objectiveApp = apps[3];
  const sunriseApp = apps[4];
  const finalApp = apps[5];


  // -----------------------------------------
  // MESSAGE — phantom notification
  // -----------------------------------------

  function strangeMessage() {

    messageApp.classList.add(
      "app-strange-message",
      "strange-active"
    );

    messageApp.dataset.strange =
      "1 NEW MESSAGE";

    setTimeout(function() {

      messageApp.classList.remove(
        "app-strange-message",
        "strange-active"
      );

      delete messageApp.dataset.strange;

    }, 900);

  }


  // -----------------------------------------
  // MEMORIES — the eye
  // -----------------------------------------

  function strangeMemory() {

    const icon =
      memoryApp.querySelector(".app-icon");

    if (!icon) {
      return;
    }

    const original =
      icon.textContent;

    memoryApp.classList.add(
      "app-strange-memory"
    );

    icon.textContent = "👁";

    memoryApp.classList.add(
      "strange-active"
    );

    memoryApp.dataset.strange =
      "YOU REMEMBER";

    setTimeout(function() {

      icon.textContent = original;

      memoryApp.classList.remove(
        "app-strange-memory",
        "strange-active"
      );

      delete memoryApp.dataset.strange;

    }, 850);

  }


  // -----------------------------------------
  // OBJECTS — corrupted archive
  // -----------------------------------------

  function strangeObject() {

    objectApp.classList.add(
      "app-strange-object",
      "strange-active"
    );

    objectApp.dataset.strange =
      "ARCHIVE CORRUPTED";

    setTimeout(function() {

      objectApp.classList.remove(
        "app-strange-object",
        "strange-active"
      );

      delete objectApp.dataset.strange;

    }, 800);

  }


  // -----------------------------------------
  // OBJECTIVES — tracking
  // -----------------------------------------

  function strangeObjective() {

    objectiveApp.classList.add(
      "app-strange-objective",
      "strange-active"
    );

    objectiveApp.dataset.strange =
      "TRACKING...";

    setTimeout(function() {

      objectiveApp.classList.remove(
        "app-strange-objective",
        "strange-active"
      );

      delete objectiveApp.dataset.strange;

    }, 850);

  }


  // -----------------------------------------
  // SUNRISE — signal interference
  // -----------------------------------------

  function strangeSunrise() {

    const icon =
      sunriseApp.querySelector(".app-icon");

    if (!icon) {
      return;
    }

    const original =
      icon.textContent;

    sunriseApp.classList.add(
      "app-sunrise-glitch"
    );

    icon.textContent = "☀︎";

    setTimeout(function() {

      icon.textContent = original;

      sunriseApp.classList.remove(
        "app-sunrise-glitch"
      );

    }, 950);

  }


  // -----------------------------------------
  // CASE #999 — unauthorized access
  // -----------------------------------------

  function strangeFinal() {

    finalApp.classList.add(
      "app-final-glitch",
      "strange-active"
    );

    finalApp.dataset.strange =
      "ACCESSING...";

    setTimeout(function() {

      finalApp.classList.remove(
        "app-final-glitch",
        "strange-active"
      );

      delete finalApp.dataset.strange;

    }, 1100);

  }


  // -----------------------------------------
  // Random event scheduler
  // -----------------------------------------

  function scheduleStrangeEvent() {

    const events = [
      strangeMessage,
      strangeMemory,
      strangeObject,
      strangeObjective,
      strangeSunrise,
      strangeFinal
    ];

    const event =
      events[
        Math.floor(
          Math.random() * events.length
        )
      ];

    event();

    setTimeout(
      scheduleStrangeEvent,
      5000 + Math.random() * 7000
    );

  }


  // Give the phone a moment before
  // anything strange starts happening.

  setTimeout(function() {

    home.classList.add(
      "apps-compromised"
    );

    scheduleStrangeEvent();

  }, 3500);

})();
// =========================================
// HOME SCREEN — BINARY RAIN
// =========================================

(function createHomeBinaryRain() {

  const rain =
    document.querySelector(".home-binary-rain");

  if (!rain) {
    return;
  }

  const columnCount = 18;

  for (let i = 0; i < columnCount; i++) {

    const column =
      document.createElement("div");

    column.className =
      "home-binary-column";

    column.style.left =
      (i / columnCount * 100) + "%";

    column.style.animationDuration =
      (11 + Math.random() * 12) + "s";

    column.style.animationDelay =
      (-Math.random() * 14) + "s";

    const length =
      16 + Math.floor(
        Math.random() * 20
      );

    for (let j = 0; j < length; j++) {

      const bit =
        document.createElement("span");

      bit.textContent =
        Math.random() > 0.5
          ? "1"
          : "0";

      column.appendChild(bit);

    }

    rain.appendChild(column);

  }

})();
// =========================================
// RANDOM CREEPY POPUPS
// =========================================

function startCreepyPopups() {

  const popup =
    document.getElementById("creepy-popup");

  const home =
    document.getElementById("home-view");

  if (!popup || !home) {
    return;
  }

  const messages = [
    "Are you okay BUBU??",
    "Let's play game"
  ];

  function showCreepyPopup() {

    const randomMessage =
      messages[
        Math.floor(
          Math.random() * messages.length
        )
      ];

    popup.textContent =
      randomMessage;

    const randomX =
      25 + Math.random() * 50;

    const randomY =
      58 + Math.random() * 25;

    popup.style.left =
      randomX + "%";

    popup.style.top =
      randomY + "%";

    popup.classList.remove("show");

    void popup.offsetWidth;

    popup.classList.add("show");

    setTimeout(function() {

      popup.classList.remove("show");

    }, 750);

  }


  /*
    First popup.
    This should appear 3 seconds
    after the phone screen is available.
  */

  setTimeout(function() {

    showCreepyPopup();

  }, 3000);


  /*
    Keep generating random popups.
  */

  setInterval(function() {

    showCreepyPopup();

  }, 7000 + Math.random() * 5000);

}


/*
  Start once the page has loaded.
*/

if (document.readyState === "loading") {

  document.addEventListener(
    "DOMContentLoaded",
    startCreepyPopups
  );

} else {

  startCreepyPopups();

}
