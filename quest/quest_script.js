const screens = document.querySelectorAll(".questScreen");

const mapSteps = document.querySelectorAll(".mapStep");

let currentStep = 1;
let selectedEmotion = "";
let shadowFigure = "";
let integrationChoice = "";

/*------SHOW QUEST STEP------*/

function showStep(stepNumber) {

    screens.forEach(function (screen) {
        screen.classList.remove("active");
        });

    const nextScreen = document.querySelector(
        `[data-screen="${stepNumber}"]`
        );

    if (!nextScreen) { return; }

    nextScreen.classList.add("active");

    mapSteps.forEach(function (step) {
        
        step.classList.remove("active");
        });

    const activeMapStep = document.querySelector(
        `.mapStep[data-step="${stepNumber}"]`
        );
    
    if (activeMapStep) {
        activeMapStep.classList.add("active");

        /*------mobile map scroll adjustment------*/

        if (window.innerWidth <= 700) {

            const map = document.querySelector(".questMap");

            const mapRect = map.getBoundingClientRect();

            const stepRect = activeMapStep.getBoundingClientRect();

            const leftPadding = 20;
            const rightPadding = 20;

            if (stepRect.left < mapRect.left + leftPadding) {

                map.scrollBy( { left:
                    stepRect.left - (mapRect.left + leftPadding),
                    behavior: "smooth"
                });

            }
            else if (stepRect.right > mapRect.right - rightPadding) {

                map.scrollBy( { left:
                    stepRect.right - (mapRect.right - rightPadding),
                    behavior: "smooth"
                });

            }
        }
    }

    currentStep = stepNumber;

    window.scrollTo( { top: 0, behavior: "smooth"} );
}

/*------NEXT BUTTONS------*/

const continueButtons = document.querySelectorAll(
    ".continueButton[data-next]"
    );

continueButtons.forEach(function (button) {

    button.addEventListener("click", function() {

        if (button.disabled) { return; }

        const nextStep = Number(button.dataset.next);

        showStep(nextStep);

        });
});

/*------EMOTION SELECTION------*/

const emotionButtons = document.querySelectorAll(".choiceButton");

const emotionContinue = document.querySelector(
    `[data-screen="2"] .continueButton`);

emotionButtons.forEach(function (button) {

    button.addEventListener("click", function() {

        emotionButtons.forEach(function(item) {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedEmotion = button.textContent.trim();

        emotionContinue.classList.remove("hidden");

    });
});

/*------SHADOW FIGURE------*/

const figureInput = document.getElementById("figureInput");

const figureContinue = document.getElementById("figureContinue");

const figureName = document.getElementById("figureName");

const finalFigureName = document.getElementById("finalFigureName");

const mapFigureName = document.getElementById("mapFigureName");


figureInput.addEventListener("input",function () {

    shadowFigure = figureInput.value.trim();

    if (shadowFigure !== "") {

        figureName.textContent = shadowFigure;

        finalFigureName.textContent = shadowFigure;

        mapFigureName.textContent = shadowFigure;

        figureContinue.disabled = false;
    }
        
    else {

        figureName.textContent = "The Figure";

        finalFigureName.textContent = "Shadow Figure";

        mapFigureName.textContent = "Your new figure";

        figureContinue.disabled = true;

    }

});

/*------INTEGRATION------*/

const integrationButtons = document.querySelectorAll(".integrationChoice");

const integrationContinue = document.querySelector('[data-screen="6"] .continueButton');

integrationButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        integrationButtons.forEach(function (item) {

            item.classList.remove("selected");

        });

        button.classList.add("selected");

        integrationChoice = button.textContent.trim();

        integrationContinue.classList.remove("hidden");

    });

});

/*------FINAL EMOTION------*/

const finalEmotion = document.getElementById("finalEmotion");

const mapFigureEmotion = document.getElementById("mapFigureEmotion");

function updateEmotionDisplay() {

    if (selectedEmotion === "") { return; }

    finalEmotion.textContent = selectedEmotion + " · met during this Quest.";

    mapFigureEmotion.textContent =selectedEmotion + " · met during this Quest.";
}


emotionButtons.forEach(function (button) {

    button.addEventListener("click", updateEmotionDisplay);

});

/*------PSYCHE MAP------*/

const mapButton = document.getElementById("mapButton");

const questContent = document.getElementById("questContent");

const psycheMap = document.getElementById("psycheMap");


mapButton.addEventListener("click",function () {

    questContent.style.display = "none";

    psycheMap.classList.add("active");

});

/*------RETURN FROM MAP------*/

const returnButton = document.getElementById("returnButton");

returnButton.addEventListener("click",function () {

    psycheMap.classList.remove("active");

    questContent.style.display ="block";

    showStep(7);

});

/*------EXIT / SAFETY------*/

const exitButton = document.getElementById("exitButton");

const exitScreen = document.getElementById("exitScreen");

exitButton.addEventListener("click", function () {

    questContent.style.display ="none";

    psycheMap.classList.remove("active");

    exitScreen.classList.add("active");

});

/*------RESTART------*/

const restartButton =document.getElementById("restartButton");

restartButton.addEventListener("click",function () {

    exitScreen.classList.remove("active");

    psycheMap.classList.remove("active");

    questContent.style.display = "block";

        /*------Reset the quest------*/

        currentStep = 1;

        selectedEmotion = "";

        shadowFigure = "";

        integrationChoice = "";

        /*------Reset selections------*/

        emotionButtons.forEach(function (button) {

            button.classList.remove("selected");
        });

        integrationButtons.forEach(function (button) {

            button.classList.remove("selected");
        });

        /*------Reset input------*/

        figureInput.value = "";
        figureContinue.disabled = true;

        /*------Reset continue buttons------*/

        emotionContinue.classList.add("hidden");

        integrationContinue.classList.add("hidden");

        /*------Reset displayed content------*/

        figureName.textContent = "The Figure";

        finalFigureName.textContent = "Shadow Figure";

        finalEmotion.textContent = "A figure you chose to meet.";

        mapFigureName.textContent = "Your new figure";

        mapFigureEmotion.textContent = "Met during this Quest.";

        showStep(1);

});