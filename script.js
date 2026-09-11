let currentResult = null;


const inputScreen =
    document.getElementById("inputScreen");

const loadingScreen =
    document.getElementById("loadingScreen");

const resultScreen =
    document.getElementById("resultScreen");

const decisionInput =
    document.getElementById("decisionInput");

const loadingText =
    document.getElementById("loadingText");

const decisionTitle =
    document.getElementById("decisionTitle");

const yourTimeline =
    document.getElementById("yourTimeline");

const otherTimeline =
    document.getElementById("otherTimeline");

const regretScore =
    document.getElementById("regretScore");

const regretBar =
    document.getElementById("regretBar");

const conclusion =
    document.getElementById("conclusion");



async function generateTimeline() {

    const decision =
        decisionInput.value.trim();


    if (!decision) {

        alert(
            "Please enter something to overthink 😂"
        );

        return;

    }


    inputScreen.classList.add("hidden");

    resultScreen.classList.add("hidden");

    loadingScreen.classList.remove("hidden");


    loadingText.innerText =
        "Searching alternate realities...";


    await wait(800);


    loadingText.innerText =
        "Calculating consequences...";


    await wait(800);


    loadingText.innerText =
        "Measuring unnecessary regret...";


    try {

        const response =
            await fetch("/api/overthink", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    decision: decision

                })

            });


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Something went wrong."
            );

        }


        currentResult = {

            originalDecision: decision,

            data: data

        };


        displayResult(data);

    }


    catch (error) {

        console.error(error);

        alert(
            "The alternate universe machine broke 😂\n\n" +
            error.message
        );


        loadingScreen.classList.add("hidden");

        inputScreen.classList.remove("hidden");

    }

}



function displayResult(data) {

    loadingScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");


    decisionTitle.innerText =
        data.decision;


    yourTimeline.innerHTML = "";

    otherTimeline.innerHTML = "";


    data.yourTimeline.forEach((event, index) => {

    const element = document.createElement("div");

    element.className = "event timeline-event";

    element.innerText = event;

    element.style.animationDelay = `${index * 0.25}s`;

    yourTimeline.appendChild(element);
});


    data.otherTimeline.forEach((event, index) => {

    const element = document.createElement("div");

    element.className = "event timeline-event";

    element.innerText = event;

    element.style.animationDelay = `${index * 0.35}s`;

    otherTimeline.appendChild(element);
});

  const score = Number(data.regret);

regretScore.innerText = "0";

let currentScore = 0;

const scoreAnimation = setInterval(() => {

    currentScore += Math.ceil(score / 20);

    if (currentScore >= score) {
        currentScore = score;
        clearInterval(scoreAnimation);
    }

    regretScore.innerText = currentScore;

}, 40);


    regretBar.style.width =
        "0%";


    setTimeout(() => {

        regretBar.style.width =
            data.regret + "%";

    }, 200);


    conclusion.innerText =
        data.conclusion;

}



async function goDeeper() {

    if (!currentResult) {

        return;

    }


    resultScreen.classList.add("hidden");

    loadingScreen.classList.remove("hidden");


    loadingText.innerText =
        "Opening another branch of reality...";


    await wait(1000);


    try {

        const response =
            await fetch("/api/overthink", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    decision:
                        currentResult.originalDecision,

                    previousTimeline:
                        currentResult.data

                })

            });


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Something went wrong."
            );

        }


        currentResult.data =
            data;


        displayResult(data);

    }


    catch (error) {

        console.error(error);

        alert(
            "The timeline collapsed 😂"
        );


        loadingScreen.classList.add("hidden");

        resultScreen.classList.remove("hidden");

    }

}



function startAgain() {

    currentResult = null;

    decisionInput.value = "";

    resultScreen.classList.add("hidden");

    loadingScreen.classList.add("hidden");

    inputScreen.classList.remove("hidden");

    regretBar.style.width = "0%";

}



function wait(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}