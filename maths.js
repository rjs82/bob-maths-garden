var correctAnswer;
var score = 0;
var backgroundImages = [];

function nextQuestion() {
    const n1 = Math.floor(Math.random() * 5);  // 0<= random <1
    document.getElementById('n1').innerHTML = n1;  // integer 0-4
    const n2 = Math.floor(Math.random() * 6);
    document.getElementById('n2').innerHTML = n2;  // integer 0-5

    correctAnswer = n1 + n2;
}

function checkAnswer() {
    
    const userAnswer = predictImage();
    console.log(`True answer: ${correctAnswer}, User answer: ${userAnswer}`);

    if (userAnswer == correctAnswer){
        score++;
        console.log(`CORRECT, score = ${score}`);
        if (score < 7){
            backgroundImages.push(`url('images/background${score}.svg')`);
        }  else {
            score = 0;
            backgroundImages = [];
            alert('Congratulations, your garden is in full bloom and you have won');
        }
        document.body.style.backgroundImage = backgroundImages;

    } else {
        console.log('WRONG');
        alert(`Your answer ${userAnswer} was wrong\nThe correct answer was ${correctAnswer}`)
        if (score > 0) {  // prevent -ve scores
            score--;
//            backgroundImages.pop();
            setTimeout(reduceGarden, 1000);
            // could do this with an inline function
            // setTimeout(function(){code}, 1000)
//            document.body.style.backgroundImage = backgroundImages;
        }  
        
    }
}

function reduceGarden() {
    backgroundImages.pop();
    document.body.style.backgroundImage = backgroundImages;
}
