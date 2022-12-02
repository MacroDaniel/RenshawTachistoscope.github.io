//! INTERVAL
window.accurateInterval = function(time, fn) {
    var cancel, nextAt, timeout, wrapper, _ref;
    nextAt = new Date().getTime() + time;
    timeout = null;
    if (typeof time === 'function') _ref = [time, fn], fn = _ref[0], time = _ref[1];
    wrapper = function() {
        nextAt += time;
        timeout = setTimeout(wrapper, nextAt - new Date().getTime());
        return fn();
    };
    cancel = function() {
        return clearTimeout(timeout);
    };
    setTimeout(wrapper, nextAt - new Date().getTime());
    return {
        cancel: cancel
    };
};


//! Functions
function generateRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
} // random int


function generateRandomQuestion() {
    let q = "";
    for (let i = 0; i < INPUT_DIGIT_AMOUNT.value; i++) {
        q += generateRandomInteger(0, 9)
    }
    return q
}


function selectDifficulty(difficulty) {
    if (difficulty === "Metamarphosis") {
        INPUT_DIGIT_AMOUNT.value = 6
    }
    if (difficulty === "Radioactive") {
        INPUT_DIGIT_AMOUNT.value = 7
    }
    if (difficulty === "Esper") {
        INPUT_DIGIT_AMOUNT.value = 8
    }
    if (difficulty === "Amatsukami") {
        INPUT_DIGIT_AMOUNT.value = 9
    }
    if (difficulty === "Kotoamatsukami") {
        INPUT_DIGIT_AMOUNT.value = 10
    }
} // difficulty select


function playGame() {
    ANSWER.value = ""
    if (streak == 1) {

    }
    if (streak == 2) {

    }
    if (streak == 3) {

    }
    if (streak == 4) {

    }
    if (streak == 5) {

    }

    word = generateRandomQuestion()
    word.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        QUESTION.appendChild(characterSpan)
    })
    let gameShow = accurateInterval(3000, function() {
        QUESTION.style.display = "inline"
        let gameHide = accurateInterval(Number(INPUT_LIFETIME.value), function() {
            QUESTION.style.display = "none"
            let wait = accurateInterval(500, function() {
                ANSWER.style.display = "inline"
                ANSWER.focus()
                SUBMIT_BUTTON.style.display = "inline"
                wait.cancel()
            })
            gameHide.cancel()
        })
        gameShow.cancel()
    })
}

function rightOrWrong() {
    for (var i = 0; i < arrayAnswer.length; i++) {
        if (arrayAnswer[i].innerHTML !== arrayValue[i]) {
            arrayAnswer[i].classList.add("incorrect")
            arrayAnswer[i].classList.remove("correct")
            correct = false
            arrayAnswer[i].innerText = arrayValue[i]
        } else {
            arrayAnswer[i].classList.add("correct")
            arrayAnswer[i].classList.remove("incorrect")
        }
        if (i === arrayAnswer.length - 1) {
            endGame(correct)
        }
    }
}


function endGame(bool) {
    if (bool) {
        audioCorrect.play()
        FEED.innerHTML = ""
        QUESTION.innerHTML = ""
        streak += 1
        playGame()
    }
    if (!bool) {
        audioWrong.play()
        streak = 0
        QUESTION.innerHTML = ""
        correct = true

        const ul = document.createElement("ul")
        const liCorrect = document.createElement("li")
        const liWrong = document.createElement("li")
        ul.classList.add("lists")
        


        FEED.appendChild(ul)
        ul.appendChild(liCorrect)
        ul.appendChild(liWrong)
        liCorrect.style.fontSize = '3rem'
        

    

        for (let i = 0; i < arrayAnswer.length; ++i) {
            liWrong.append(arrayAnswer[i])
        }
        liCorrect.innerText = word
        liCorrect.style.color = 'green'


        let wait = accurateInterval(3000, function() {
            FEED.innerHTML = ""

            wait.cancel()
            playGame()
        })

    }
}


//! Variables
const invalidChars = [
    "-",
    "+",
    "e",
    "."
]
let playing = false
const audioCorrect = new Audio('correct.mp3')
const audioWrong = new Audio('wrong.mp3')
let arrayValue
let arrayAnswer
let correct = true
let word
let streak = 0




//! HTML NODES
const MAIN_MENU = document.querySelector("#MAIN_MENU")
const DIFFICULTY_SELECTION = document.querySelector("#DIFFICULTY_SELECTION")
const QUESTION = document.querySelector("#QUESTION")
const ANSWER = document.querySelector("#ANSWER")
const NUMBER_INPUTS = document.querySelectorAll(".inputNumber")
const SUBMIT_FORM = document.querySelector("#SUBMIT_FORM")
const INPUT_LIFETIME = document.querySelector("#INPUT_LIFETIME")
const INPUT_DIGIT_AMOUNT = document.querySelector("#INPUT_DIGIT_AMOUNT")
const SUBMIT_BUTTON = document.querySelector("#SUBMIT_BUTTON")
const FEED = document.querySelector("#FEED")



//! Events
DIFFICULTY_SELECTION.addEventListener("change", (e) => {
    if (e.target.value !== "Free Play") {
        INPUT_LIFETIME.readOnly = true
        INPUT_DIGIT_AMOUNT.readOnly = true
        INPUT_LIFETIME.value = 100
        playing = true
    } else {
        INPUT_LIFETIME.readOnly = false
        INPUT_DIGIT_AMOUNT.readOnly = false
        INPUT_LIFETIME.value = ""
        INPUT_DIGIT_AMOUNT.value = ""
        playing = false
    }
    selectDifficulty(e.target.value)
}) // difficulty selector


NUMBER_INPUTS.forEach(function(element) {
    element.addEventListener("keydown", (event) => {
        if (invalidChars.includes(event.key)) {
            event.preventDefault()
        } // prevent e,+,- in input numbers
    })
    element.addEventListener("keyup", (event) => {
        if (event.srcElement === INPUT_DIGIT_AMOUNT) {
            if (INPUT_DIGIT_AMOUNT.value > 25) {
                INPUT_DIGIT_AMOUNT.value = 25
            }
        } //max 25 digits

    })
})


SUBMIT_FORM.addEventListener("click", (e) => {
    e.preventDefault()
    if (INPUT_LIFETIME.value === "" || INPUT_DIGIT_AMOUNT.value === "" || INPUT_LIFETIME.value === 0 || INPUT_DIGIT_AMOUNT.value===0) {

    } else {
        MAIN_MENU.style.display = "none" //hide main menu

        playGame()
    }

})

SUBMIT_BUTTON.addEventListener("click", (e) => {

    if (!arrayValue || arrayValue.length !== word.length) {
        e.preventDefault()
        alert(word.length + " digits is requiered") //! tmp
    } else {
        SUBMIT_BUTTON.style.display = "none"
        ANSWER.style.display = "none"
        rightOrWrong()
    }

})



ANSWER.addEventListener("input", () => {
    arrayAnswer = QUESTION.querySelectorAll("span")
    arrayValue = ANSWER.value.split('')

})
ANSWER.addEventListener("keypress",(e)=>{
    if(e.key==="Enter"){
        e.preventDefault()
        SUBMIT_BUTTON.click()
    }

})