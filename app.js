(function(){

let currentSlide;

//HTML elements stored as variables//
const quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

const store = [
  {
    question: "Like real estate, gold and cash, stocks are _____ and owning stock <br> means you are _____ of the company.",
    answers: {
      a: "forms of money, part owner",
      b: "an asset class, part owner",
      c: "pieces of paper, part owner",
      d: "currency, part owner"
    },
    correctAnswer: "b"
  },
    

  {
    question: "What is the primary difference between <br> the S&P 500 index vs DOW Jones Industrial (DJI) index?",
    answers: {
      a: "the DOW Jones is more important because the index price is larger than S&P 500",
      b: "the S&P500 stocks are more important",
      c: "the S&P500 is market cap weighted index vs DJI which is price weighted index",
      d: "the DOW Jones stocks are more important"
    },
    correctAnswer: "c"
  },
    
  {
    question: "The reason people invest in asset classes <br> such as stocks, real estate and gold is because ______ . ",
    answers: {
      a: "asset classes are a store of value",
      b: "asset classes appreciate in value",
      c: "asset classes are a hedge against inflation",
      d: "all the above"
    },
    correctAnswer: "d"
  },
    
  {
    question: "When looking at two different companies by their stock, how can you tell which company is larger/more valuable?",
    answers: {
      a: "the company with the higher stock price is larger/more valuable",
      b: "the company with the larger market cap is larger/more valuable",
      c: "the company with the more recognizable name",
      d: "the company with the most amount of shares"
    },
    correctAnswer: "b"
  },
    
  {
    question: "The Securities and Exchange Commission (SEC), classifies stocks under ____ as penny stocks.",
    answers: {
      a: "$5.00",
      b: "$1.00",
      c: "$0.99",
      d: "$10.00"
    },
    correctAnswer: "a"
  },

  {
    question: "When investing over a long period of time, <br> what is the most successful strategy?",
    answers: {
      a: "buying stock all at once",
      b: "dollar cost averaging (DCA), meaning buying fixed dollar amounts of stock over time",
      c: "buying penny stocks",
      d: "never investing",
    },
    correctAnswer: "b"
  },

  {
    question: "Market cap is the ______ multiplied by <br> the _____ to be traded by the public.",
    answers: {
      a: "company, value",
      b: "dollars, value",
      c: "stock price, shares available",
      d: "all the above"
    },
    correctAnswer: "c"
  }


];

/********** TEMPLATE GENERATION FUNCTIONS **********/
/*  
function pushElementsToHTML(){
  return `
  <span id="question_number"></span> 
    <div class="quiz-container">
      <div id="quiz"></div>
    </div>
    <button id="previous">Previous Question</button>
    <button id="next">Next Question</button>
    <button id="submit">Submit Quiz</button>
  <div id="results"></div>
  `;
}
*/

//Function to display in HTML 'Begin Quiz' Prompt/Button
function generateWelcomeString() {
  return `
  <div id ="welcome" class="welcome">
    <form>
      <p>
        Welcome User. Begin the quiz by pressing the button.
      </p>
      <button type="button"id="beginQuiz" autofocus>Begin Quiz</button>
    </form>
  </div>
    `;
}

// Function for hiding WelcomeString and unhiding quiz elements
function handleBeginQuizPrompt(){
  console.log('`handleBeginQuizSubmit` ran');
  $('#welcome').hide(); 
  $('#quiz').removeClass('hidden');
  $('#question_number').removeClass('hidden');
  $('#results').removeClass('hidden')
  $('#previous').removeClass('hidden')
  $('#next').removeClass('hidden')
  $('#resultsFinal').addClass('hidden');
 };

// Function to hide quiz elements & display results >> called by handleSubmitSlide  
 function submitQuizResults(){
  
    //function hides the quiz and quiz buttons
    $('#quiz').addClass('hidden');
    $('#question_number').addClass('hidden');
    $('#previous').addClass('hidden');
    $('#next').addClass('hidden');
    $('#results').addClass('hidden');
 }

//Function to display in HTML 'Quiz Results' Prompt with Restart Button
function generateFinalResults() {
  return `
  <div id ="resultsFinal" class="resultsFinal">
    <form>
      <p>
        Your quiz results are: <span id="resultSpan"></span> <br>Press the restart button to retake quiz.
      </p>
      <button type="button"id="restartQuiz" autofocus>Restart Quiz</button>
    </form>
  </div>
    `;
}

  /********** RENDER FUNCTION(S) **********/
    
// Function to Render Store and Quiz Container Elements.
/* Note: all store questions/answers are pushed to HTML 
  immediately when renderQuiz is called, and cycled via function showSlide(currentSlide) */
function renderQuiz(){
  console.log('`renderQuiz` ran');

//IN PROGESS//
  //let quizElements = pushElementsToHTML();
  //$('main').prepend(quizElements);
  
  //stores HTML output of store questions/answers
  const output = [];

  
  // declare variable for Welcomestring function outside function
  const welcomeString = generateWelcomeString();

  // declare variable for Final Results Div function outside function
  const resultsString = generateFinalResults();


//hides quiz elements and adds welcomeString to HTML
//$('main').append(quizElements);
$('main').prepend(resultsString);
$('.resultsFinal').addClass('hidden');
$('#quiz').addClass('hidden');
$('#question_number').addClass('hidden');
$('#next').addClass('hidden');
$('#results').addClass('hidden');
$('main').prepend(welcomeString);


  store.forEach( (currentQuestion, questionNumber) => {

    //variable to store possible answers 
    const answers = [];

    // for each avaiable answer
    for(letter in currentQuestion.answers){
      answers.push(
        `<form>
          <input type="radio" name="invest" id="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
        </form>`
        );
    }

    // adds the question and answers to the output
    output.push(
      `<div class="slide">
        <div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>
      </div>`
    );
  }
);

  //combines output list into one string of HTML and puts it on the page
  quizContainer.innerHTML = output.join('');
}


// Function to calculate results of Quiz
function showResults(){
  console.log('`showResults` ran');

  let quizContainer = document.getElementById('quiz');

  //variable to gather answer containers from quiz
  let answerContainers = quizContainer.querySelectorAll('.answers');

  //variable to track users correct answers
  let numCorrect = 0;

  //loop through each question
  store.forEach( (currentQuestion, questionNumber) => {
    
    //finds selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[id=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    
    // if user answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      numCorrect++;
      }

  });


  // show number of correct answers out of total 
  //resultContainer is container on each question slide , resultSpan is final Quiz Result output
  resultsContainer = document.getElementById('results');
  resultSpan = document.getElementById('resultSpan')
  resultSpan.innerHTML = `<b>${numCorrect} out of ${store.length} correct<b>`;
  resultsContainer.innerHTML = `${numCorrect} out of ${store.length} correct`;

  console.log(`${numCorrect} out of ${store.length} correct`)
}

//Function to Show Current Slide
/*utilizes slide vs active slide CSS property to hide/unhide current question*/

function showSlide(currentSlide) {

  console.log("current slide is "+currentSlide)

  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");

  //Displays question number "x" out of "y" questions in Quiz
  // Set to less than or equal to 6 because question #1 starts on slide 0//
  if (currentSlide <= 6){
  $('#question_number').text("Question "+(currentSlide+1)+" out of 7");
  }
  
  //changes class of current slide to active //
  slides[currentSlide].classList.add('active-slide');

  // if on first slide hide previous button
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  // if current slide is == last slide, display submitButton && hide nextButton
  if(currentSlide === 6){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
  console.log('`showSlide (currentSlide)` ran')
}

//STILL IN PROGRESS 
//Function to Show Feedback to User
function feedbackSlide(){

//define variables
userAnswer = (answerContainer.querySelector(selector) || {}).value;
currentQuestion.correctAnswer


store.forEach( (currentQuestion) => {
  
  //correct answer
  userAnswer = (answerContainer.querySelector(selector) || {}).value;
//hide div id "quiz"
$('#quiz').addClass('hidden');
//create feedback div
$('main').prepend(`<div id ="feedback" class="feedback"></div>`)

//if correct, display "That is the correct answer"
if(userAnswer === currentQuestion.correctAnswer){
  $('#feedback').text("That is the correct answer");
  }
//if wrong, display the correct answer
else($('#feedback').text("currentQuestion.correctAnswer"))

//provide "continue button"

//event listener for continue button
//hitting continue button hides feedback div, 

//unhides div id "quiz"

  });
}


//Function to Show Next Slide 
function showNextSlide() {
  currentSlide = currentSlide + 1;
  showSlide(currentSlide);
  console.log('`showNextSlide` ran');
}

//Function to Show Previous Slide 
function showPreviousSlide() {
  currentSlide = currentSlide - 1;
  showSlide(currentSlide);
  hideForwardSlide()
  console.log('`showPreviousSlide` ran');
}

//Function to hide Forward Slide if Previous Slide is Initiated
function hideForwardSlide(){
  var slides = document.querySelectorAll(".slide");
  slides[currentSlide+1].classList.remove('active-slide');
}
 
 // Function to Show First Slide
 function showFirstSlide(){
  currentSlide = 0;
  showSlide(currentSlide); 
  console.log('`showFirstSlide` ran');
 }


/********** EVENT HANDLER FUNCTIONS **********/
// These functions handle events (submit, click, etc)


//Setting Up Event Listener
function handlePreviousSlide(){
  $('main').on('click', '#previous', (event) =>{
    event.preventDefault();
    showPreviousSlide();
    //renderQuiz();
  });
}

function handleNextSlide(){
  $('main').on('click', '#next', (event) =>{
    event.preventDefault();
    //feedbackSlide();
    showNextSlide();
    //renderQuiz();
  });
}

function handleNextSlideShowResults(){
  $('main').on('click', '#next', (event) =>{
    event.preventDefault();
    showResults();
    //renderQuiz();
  });
}

function handleBeginSlide(){
  console.log('`handleBeginSlide` ran');
  $('main').on('click', '#beginQuiz', (event) =>{
    event.preventDefault();
    handleBeginQuizPrompt();
    //renderQuiz();
  });
}

function handleSubmitSlide(){
  console.log('`handleSubmitSlide` ran');
  $('main').on('click', '#submit', (event) =>{
    event.preventDefault();
    showResults();
    submitQuizResults();
    $('#resultsFinal').removeClass('hidden');
    $('#submit').addClass('hidden');
  });
}

function handleResetSlide(){
  $('main').on('click', '#restartQuiz', (event) =>{
    location.reload(true)
  });
}

//Init function to run functions after document loaded

  function quizReady(){
    renderQuiz();
    handleBeginSlide();
    showFirstSlide();
    showResults();
    submitQuizResults()
    handlePreviousSlide();
    hideForwardSlide();
    handleNextSlide();
    handleNextSlideShowResults();
    handleSubmitSlide();
    handleResetSlide();
  }
  
  quizReady();

})();


  /**
 Project Requirements

While you're building your quiz app, you'll need to keep in mind what your app must do and how it should be built.
User experience requirements

The following requirements cover what the app must do, from the user's perspective.

    COMPLETE-The starting screen should have a button that users can click to start the quiz.
    COMPLETE-Users should be prompted through a series of at least 5 multiple choice questions that they can answer.
        COMPLETE-Users should be asked questions 1 after the other.
        COMPLETE-Users should only be prompted with 1 question at a time.
   1) NEED HELP -Users should not be able to skip questions.
    COMPLETE-Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
   2) -NEED HELP Upon submitting an answer, users should:
        -receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
        -be moved onto the next question (or interact with an element to move on).
   DONE -Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
   DONE -Users should be able to start a new quiz.
      

        
Technical requirements

Your quiz app must:

    COMPLETE- Include a render() function, that conditionally regenerates the view each time the store is updated.
    -Include single-purpose template generation functions.
    COMPLETE -Include single-purpose event handler functions.
    COMPLETE -Call all functions from a jQuery initializing function.
   3) -NOT add additional HTML elements to the boilerplate code's index.html file 
        (you may add attributes, e.g., classes and ids, to the existing HTML elements, or link stylesheets or additional scripts if necessary).
   6) -Render answer choices in a <form>.
   7) -Use semantic HTML, along with CSS and jQuery.
   8) -Follow a11y best practices.
    -Be fully usable by keyboard (which will be easy enough if you start with a form).
    -Use responsive design.
        Refer back to the previous checkpoints on responsive design and forms for any help with the HTML/CSS materials.

   */
  

