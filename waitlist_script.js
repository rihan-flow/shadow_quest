const waitlist_form = document.getElementById("waitlistForm");

const emailInput = document.getElementById("emailInput");

const message = document.getElementById("message");


waitlist_form.addEventListener("submit",function (event) {

        event.preventDefault();

        const email = emailInput.value.trim();

        if (email === "") {

            message.textContent = "Please enter your email.";

            return;
        }


        if (!emailInput.checkValidity()) {

            message.textContent = "Please enter a valid email.";

            return;
        }

        message.innerHTML =
            `
            You're on the waitlist.
            
            <a href="quest/quest_index.html" class="questLink">
                Enter the Quest →
            </a>
            `;

        emailInput.value = "";
    }
);