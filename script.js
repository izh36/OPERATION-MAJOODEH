/* =========================
   SCREEN ELEMENTS
========================= */

const classifiedScreen = document.getElementById("classified-screen");
const phoneScreen = document.getElementById("phone-screen");

const acceptButton = document.getElementById("accept-btn");
const declineButton = document.getElementById("decline-btn");

const systemMessage = document.getElementById("system-message");


/* =========================
   ACCEPT MISSION
========================= */

acceptButton.addEventListener("click", () => {

    systemMessage.textContent = "AUTHENTICATING AGENT...";

    acceptButton.disabled = true;

    setTimeout(() => {
        systemMessage.textContent = "IDENTITY VERIFIED.";
    }, 700);

    setTimeout(() => {
        systemMessage.textContent = "ACCESSING SECURE ARCHIVE...";
    }, 1400);

    setTimeout(() => {

        classifiedScreen.classList.remove("active");
        phoneScreen.classList.add("active");

    }, 2200);

});


/* =========================
   DECLINE
========================= */

declineButton.addEventListener("click", () => {

    systemMessage.textContent =
        "ERROR: DECLINE OPTION NOT RECOMMENDED.";

    setTimeout(() => {

        systemMessage.textContent =
            "SYSTEM: NICE TRY.";

    }, 1200);

});
