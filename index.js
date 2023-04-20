const apiKey = '93caa222c7msh540288fdd7507a1p183891jsnf79fb12f653b'; 
const baseUrl = 'https://love-calculator.p.rapidapi.com/getPercentage?fname=';


const result = document.getElementById("result-paragraph");
const advice = document.getElementById("advice-paragraph");
const loveButton = document.getElementById("calculateButton");
const lcForm = document.getElementById("LCform")
const loveGif = document.getElementById("love-gif");
const sadLoveGif = document.getElementById("sad-love-gif");

const goodAdvice = ["Work on your communication", "Learn how to compromise with your partner", 
"Seek couple counseling", "GGS","Spend more time together"];
const congrats = ["Congrats, you're in a healthy relationship!", "I'm happy for you", "Must be nice","Hope you're happy!"];

loveButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const formData = new FormData(lcForm);
    const firstName = formData.get('firstName');
    const secondName = formData.get('secondName');

    const newUrl = `${baseUrl}${firstName}&sname=${secondName}`

    fetch(newUrl, {
        "method": "GET", 
        "headers": {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "love-calculator.p.rapidapi.com",
            "mode": 'cors'
        }
    }) .then(response => response.json())
        .then(data => {
        console.log(data);
        result.innerHTML = `Your percentage: ${data["percentage"]}. ${data['result']}`;
        if (data['percentage'] < 50) {
            advice.innerHTML = `${goodAdvice[Math.floor(Math.random() * goodAdvice.length)]}`;
            sadLoveGif.src = "resources/imgs/sad milk mocha.gif";
            sadLoveGif.classList.remove("hidden");
            loveGif.classList.add("hidden");
        } else {
            advice.innerHTML = `${congrats[Math.floor(Math.random() * congrats.length)]}`;
            loveGif.src = "resources/imgs/happy milk mocha.gif";
            loveGif.classList.remove("hidden");
            sadLoveGif.classList.add("hidden");
        }


    }) .catch(err => {
        console.error(err);
    });
});

document.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
    e.target.remove();
    }
});


