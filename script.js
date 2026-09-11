// ==========================================
// THE OTHER POSSIBILITY
// ==========================================


// ------------------------------------------
// DECISION DATABASE
// ------------------------------------------

const decisions = [

    {

        question: "What should you eat?",

        option1: "🍕 Pizza",

        option2: "🍔 Burger",

        story1:
        "You ate the pizza. It was actually pretty good. You went home feeling satisfied.",

        story2:
        "You ate the burger. It was tasty and you felt completely satisfied with your decision.",

        alternate1: "🍔 Burger",

        alternate2: "🍕 Pizza",

        alternateStory1:
        "The burger was unexpectedly amazing. You discovered a new favourite place and immediately wondered why you didn't choose it.",

        alternateStory2:
        "The pizza was incredible. Perfect cheese, perfect crust. Suddenly you started questioning your entire decision.",

        regret1: 87,

        regret2: 73

    },


    {

        question: "What should you drink?",

        option1: "☕ Tea",

        option2: "☕ Coffee",

        story1:
        "You had a nice cup of tea and continued your day peacefully.",

        story2:
        "You had coffee and immediately felt slightly more productive.",

        alternate1: "☕ Coffee",

        alternate2: "☕ Tea",

        alternateStory1:
        "The coffee gave you exactly the energy you needed. You suddenly became convinced this was the better choice.",

        alternateStory2:
        "The tea was surprisingly relaxing. You started wondering why you chose coffee in the first place.",

        regret1: 68,

        regret2: 79

    },


    {

        question: "What should you do tonight?",

        option1: "😴 Sleep",

        option2: "🎮 Play Games",

        story1:
        "You went to sleep early. You woke up feeling slightly more responsible than usual.",

        story2:
        "You played games for a while. You told yourself you would stop after one more match.",

        alternate1: "🎮 Play Games",

        alternate2: "😴 Sleep",

        alternateStory1:
        "You played one match. Then another. Then somehow it was 2 AM. You had fun though.",

        alternateStory2:
        "You went to sleep early and woke up feeling surprisingly energetic.",

        regret1: 91,

        regret2: 84

    },


    {

        question: "What should you do this weekend?",

        option1: "🏠 Stay Home",

        option2: "🌆 Go Out",

        story1:
        "You stayed home, relaxed, watched some videos and enjoyed a peaceful day.",

        story2:
        "You went out and had a nice time with your friends.",

        alternate1: "🌆 Go Out",

        alternate2: "🏠 Stay Home",

        alternateStory1:
        "You went out and somehow ended up having one of the best days you've had in weeks.",

        alternateStory2:
        "You stayed home and discovered that doing absolutely nothing was exactly what you needed.",

        regret1: 82,

        regret2: 76

    },


    {

        question: "What should you do right now?",

        option1: "📚 Study",

        option2: "📱 Scroll Instagram",

        story1:
        "You studied for a while. You felt productive and slightly proud of yourself.",

        story2:
        "You opened Instagram for five minutes. Forty minutes later, you were still scrolling.",

        alternate1: "📱 Scroll Instagram",

        alternate2: "📚 Study",

        alternateStory1:
        "You found a hilarious reel that made your entire day better. Was it worth it? Probably not.",

        alternateStory2:
        "You studied for an hour and actually finished something important.",

        regret1: 94,

        regret2: 89

    }

];


// ------------------------------------------
// CURRENT DECISION
// ------------------------------------------

let currentDecision = 0;

let selectedChoice = null;


// ------------------------------------------
// HTML ELEMENTS
// ------------------------------------------

const questionScreen =
    document.getElementById("questionScreen");

const resultScreen =
    document.getElementById("resultScreen");

const otherScreen =
    document.getElementById("otherScreen");


const question =
    document.getElementById("question");

const choice1 =
    document.getElementById("choice1");

const choice2 =
    document.getElementById("choice2");


const yourChoice =
    document.getElementById("yourChoice");

const yourStory =
    document.getElementById("yourStory");


const otherChoice =
    document.getElementById("otherChoice");

const otherStory =
    document.getElementById("otherStory");


const regretBar =
    document.getElementById("regretBar");

const regretText =
    document.getElementById("regretText");


// ------------------------------------------
// LOAD A DECISION
// ------------------------------------------

function loadDecision() {

    const decision = decisions[currentDecision];


    question.innerText =
        decision.question;


    choice1.innerText =
        decision.option1;


    choice2.innerText =
        decision.option2;

}


// ------------------------------------------
// MAKE A CHOICE
// ------------------------------------------

function makeChoice(choice) {

    selectedChoice = choice;


    const decision =
        decisions[currentDecision];


    if (choice === 0) {

        yourChoice.innerText =
            decision.option1;

        yourStory.innerText =
            decision.story1;

    }


    else {

        yourChoice.innerText =
            decision.option2;

        yourStory.innerText =
            decision.story2;

    }


    questionScreen.classList.add("hidden");

    resultScreen.classList.remove("hidden");

}


// ------------------------------------------
// OTHER POSSIBILITY
// ------------------------------------------

function showOtherPossibility() {

    const decision =
        decisions[currentDecision];


    if (selectedChoice === 0) {

        otherChoice.innerText =
            decision.alternate1;

        otherStory.innerText =
            decision.alternateStory1;

        regretText.innerText =
            decision.regret1 + "% regret";

        regretBar.style.width =
            decision.regret1 + "%";

    }


    else {

        otherChoice.innerText =
            decision.alternate2;

        otherStory.innerText =
            decision.alternateStory2;

        regretText.innerText =
            decision.regret2 + "% regret";

        regretBar.style.width =
            decision.regret2 + "%";

    }


    resultScreen.classList.add("hidden");

    otherScreen.classList.remove("hidden");

}


// ------------------------------------------
// RESTART
// ------------------------------------------

function restart() {

    currentDecision++;

    if (currentDecision >= decisions.length) {

        currentDecision = 0;

    }


    resultScreen.classList.add("hidden");

    otherScreen.classList.add("hidden");

    questionScreen.classList.remove("hidden");


    regretBar.style.width = "0%";


    loadDecision();

}


// ------------------------------------------
// START
// ------------------------------------------

loadDecision();