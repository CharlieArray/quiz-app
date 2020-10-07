(function(){

let currentSlide;

//HTML elements stored as variables//
const quizContainer = document.getElementById('quiz');
let resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const store = [
  {
    question: "Like real estate, gold and cash, stocks are _____ and owning stock means you are _____ of the company.",
    answers: {
      a: "forms of money, part owner",
      b: "an asset class, part owner",
      c: "pieces of paper, part owner",
      d: "currency, part owner"
    },
    correctAnswer: "b"
  },
    

  {
    question: "What is the primary difference between the S&P 500 index vs DOW Jones Industrial (DJI) index?",
    answers: {
      a: "the DOW Jones stocks are more important because the index price is larger than S&P 500",
      b: "the S&P500 stocks are more important",
      c: "the S&P500 is market cap weighted index vs DJI which is price weighted index",
      d: "the DOW Jones stocks are more important"
    },
    correctAnswer: "c"
  },
    
  {
    question: "The reason people invest in asset classes such as stocks, real estate and gold is because ______ . ",
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
    question: "Does a stock with a low share price mean it has more potential upside to increase in value?",
    answers: {
      a: "yes, most likely",
      b: "no, not always"
    },
    correctAnswer: "b"
  },

  {
    question: "When investing over a long period of time, what is the most successful strategy?",
    answers: {
      a: "buying stock all at once",
      b: "dollar cost averaging (DCA), meaning you buy a fixed dollar amount of stock over x-period of time",
      c: "buying penny stocks",
      d: "never investing",
    },
    correctAnswer: "b"
  },

  {
    question: "Market cap is the ______ multiplied by the _____ to be traded by the public.",
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

// Function for hiding/unhiding WelcomeString and Quiz
function handleBeginQuizPrompt(){
  console.log('`handleBeginQuizSubmit` ran');
  $('#welcome').hide(); 
  $('#quiz').removeClass('hidden');
  $('#question_number').removeClass('hidden');
  $('#results').removeClass('hidden')
  $('#next').removeClass('hidden')
 };


  /********** RENDER FUNCTION(S) **********/
    
// Function to Render Store and Quiz Container Elements.
/* Note all store questions/answers are pushed to HTML 
  immediately when renderQuiz is ran, and cycled through via function showSlide(currentSlide) */
function renderQuiz(){
  console.log('`renderQuiz` ran');

  //stores HTML output of store questions/answers
  const output = [];

  // declare variable for Welcomestring function outside function
  const welcomeString = generateWelcomeString();


//hides quiz elements and adds welcomeString to HTML
$('#quiz').addClass('hidden');
$('#question_number').addClass('hidden');
$('#next').addClass('hidden');
$('#results').addClass('hidden')
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

//Render Quiz Function right away//
//renderQuiz();

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

      // $('correctAnswer').css('color','green');

      }

      /*
    else if(userAnswer != currentQuestion.correctAnswer){
      $('#question_number').append(":correct answer was");
      } 
      */

  });


  // show number of correct answers out of total
  resultsContainer = document.getElementById('results');

  resultsContainer.innerHTML = `${numCorrect} out of ${store.length} correct`;
  console.log(`${store.currentQuestion} out of ${store.length}`)
}

//Function to Show Slide
function showSlide(currentSlide) {

  console.log("current slide is "+currentSlide)

  var previousButton = document.getElementById("previous");
  var nextButton = document.getElementById("next");
  var slides = document.querySelectorAll(".slide");

  //Displays question number "x" out of "y" questions in Quiz
  $('#question_number').text("Question "+(currentSlide+1)+" out of 7");
  
  slides[currentSlide].classList.remove('active-slide');
  slides[currentSlide].classList.add('active-slide');
 
  // if on first slide hide previous button
  if(currentSlide === 0){
    previousButton.style.display = 'none';
  }
  else{
    previousButton.style.display = 'inline-block';
  }
  // if current slide is == last slide, display submitButton && hide nextButton
  if(currentSlide === slides.length-1){
    nextButton.style.display = 'none';
    submitButton.style.display = 'inline-block';
  }
  else{
    nextButton.style.display = 'inline-block';
    submitButton.style.display = 'none';
  }
  console.log('`showSlide (currentSlide)` ran')
}

//Function to Show Next Slide 
function showNextSlide() {
  showSlide(currentSlide + 1);
  console.log('`showNextSlide` ran');
}

//Function to Show Previous Slide 
function showPreviousSlide() {
  showSlide(currentSlide - 1);
  console.log('`showPreviousSlide` ran');
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
    renderQuiz();
  });
}

function handleNextSlide(){
  $('main').on('click', '#next', (event) =>{
    event.preventDefault();
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
  $('main').on('click', '#submit', (event) =>{
    event.preventDefault();
    showResults();
    renderQuiz();
  });
}


//Init function to run functions after document loaded

  function quizReady(){
    renderQuiz();
    handleBeginSlide();
    showFirstSlide();
    showResults();
    handlePreviousSlide();
    handleNextSlide();
    handleNextSlideShowResults();
    handleSubmitSlide();
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
    NEED HELP -Users should not be able to skip questions.
    COMPLETE-Users should also be able to see which question they're on (for instance, "7 out of 10") and their current score ("5 correct, 2 incorrect").
    -NEED HELP Upon submitting an answer, users should:
        -receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
        -be moved onto the next question (or interact with an element to move on).
    -Users should be shown their overall score at the end of the quiz. In other words, how many questions they got right out of the total questions asked.
    -Users should be able to start a new quiz.
        function startNewQuiz(){
          -define variables if variables/objects outside of function
          -conditional statement: if currentquestion == store.length && user hits next button, {1) unhide restartQuiz button) }
          } >>if user clicks on restartQuiz button, an event listener is triggered that executes a callback function that refreshes the page. 

    NEED HELP -Users should not be able to skip questions.

    NEED HELP Upon submitting an answer, users should:
        -receive textual feedback about their answer. If they were incorrect, they should be told the correct answer.
        -be moved onto the next question (or interact with an element to move on).
        
Technical requirements

Your quiz app must:

    -Include a render() function, that conditionally regenerates the view each time the store is updated.
    -Include single-purpose template generation functions.
    DONE?-Include single-purpose event handler functions.
    -Call all functions from a jQuery initializing function.
    -NOT add additional HTML elements to the boilerplate code's index.html file 
        (you may add attributes, e.g., classes and ids, to the existing HTML elements, or link stylesheets or additional scripts if necessary).
    -Render answer choices in a <form>.
    -Use semantic HTML, along with CSS and jQuery.
    -Follow a11y best practices.
    -Be fully usable by keyboard (which will be easy enough if you start with a form).
    -Use responsive design.
        Refer back to the previous checkpoints on responsive design and forms for any help with the HTML/CSS materials.

   */
  

