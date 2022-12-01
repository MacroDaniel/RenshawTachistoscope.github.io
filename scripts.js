// Functions





const invalidChars = [
	"-",
	"+",
	"e"
]

// HTML NODES
const QUESTION = document.querySelector("#QUESTION")
const NUMBER_INPUTS = document.querySelectorAll(".inputNumber")









// Events

NUMBER_INPUTS.forEach( function(element) {
	element.addEventListener("keydown",(event)=>{
		if(invalidChars.includes(event.key)){
			event.preventDefault()
		}
	})
});