/* =====================================================
   SCREEN ELEMENTS
===================================================== */

const classifiedScreen = document.getElementById("classified-screen");
const phoneScreen = document.getElementById("phone-screen");

const acceptButton = document.getElementById("accept-btn");
const declineButton = document.getElementById("decline-btn");

const terminalResponse =
    document.getElementById("terminal-response");


/* =====================================================
   ACCEPT MISSION
===================================================== */

acceptButton.addEventListener("click", () => {

    acceptButton.disabled = true;
    declineButton.disabled = true;

    terminalResponse.textContent = "AUTHENTICATING AGENT...";

    setTimeout(() => {
        terminalResponse.textContent =
            "IDENTITY VERIFIED.";
    }, 700);

    setTimeout(() => {
        terminalResponse.textContent =
            "CLEARANCE GRANTED.";
    }, 1400);

    setTimeout(() => {
        terminalResponse.textContent =
            "OPENING SECURE DEVICE...";
    }, 1900);

    setTimeout(() => {

        classifiedScreen.classList.remove("active");
        phoneScreen.classList.add("active");

    }, 2500);

});


/* =====================================================
   DECLINE
===================================================== */

declineButton.addEventListener("click", () => {

    terminalResponse.textContent =
        "DECLINE REQUEST RECEIVED...";

    setTimeout(() => {

        terminalResponse.textContent =
            "REQUEST DENIED.";

    }, 900);

    setTimeout(() => {

        terminalResponse.textContent =
            "NICE TRY.";

    }, 1600);

});


/* =====================================================
   PHONE NAVIGATION
===================================================== */

const apps = document.querySelectorAll(".app[data-view]");
const views = document.querySelectorAll(".phone-view");

apps.forEach(app => {

    app.addEventListener("click", () => {

        const target = app.dataset.view;

        openView(target);

    });

});


function openView(viewName) {

    views.forEach(view => {
        view.classList.remove("active-view");
    });

    const targetView =
        document.getElementById(`${viewName}-view`);

    if (targetView) {
        targetView.classList.add("active-view");
    }

}


/* =====================================================
   BACK BUTTONS
===================================================== */

const backButtons =
    document.querySelectorAll(".back-btn");

backButtons.forEach(button => {

    button.addEventListener("click", () => {

        views.forEach(view => {
            view.classList.remove("active-view");
        });

        document
            .getElementById("home-view")
            .classList.add("active-view");

    });

});


/* =====================================================
   LOCKED FINAL FILE
===================================================== */

const finalApp =
    document.getElementById("final-app");

finalApp.addEventListener("click", () => {

    if (finalApp.classList.contains("locked")) {

        terminalAlert(
            "FINAL FILE LOCKED // COMPLETE ALL OBJECTIVES"
        );

    }

});


/* =====================================================
   TEMPORARY SYSTEM ALERT
===================================================== */

function terminalAlert(message) {

    const alertBox = document.createElement("div");

    alertBox.textContent = message;

    alertBox.style.position = "fixed";
    alertBox.style.left = "50%";
    alertBox.style.bottom = "35px";
    alertBox.style.transform = "translateX(-50%)";

    alertBox.style.width = "min(340px, 85%)";

    alertBox.style.padding = "14px";

    alertBox.style.background = "#111611";
    alertBox.style.border = "1px solid #59645b";

    alertBox.style.color = "#c6cec8";

    alertBox.style.fontFamily =
        '"DM Mono", monospace';

    alertBox.style.fontSize = "8px";
    alertBox.style.textAlign = "center";
    alertBox.style.letterSpacing = "1px";

    alertBox.style.zIndex = "9999";

    document.body.appendChild(alertBox);

    setTimeout(() => {

        alertBox.remove();

    }, 2200);

}
