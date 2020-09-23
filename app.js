//HTML elements stored as variables//
const quizContainer = document.getElementById('quiz')
const quizResults = document.getElementById('results')
const quizSubmit = document.getElementById('submit')
const myQuestions = [
  {
    question: "What is the primary difference between the S&P 500 index vs DOW Jones Industrial (DJI) index?",
    answers: {
      a: "DOW Jones stocks are more important because the index price is larger than S&P 500",
      b: "S&P500 stocks are more important",
      c: "S&P500 is market cap weighted index vs DJI which is price weighted index",
      d: "DOW Jones stocks are more important"
    },
    correctAnswer: "c"
  },
    
  {
    question: "Like real estate, gold and cash, stocks are _____ and owning stock means you are _____ of the company.",
    answers: {
      a: "forms of money, part owner",
      b: "an asset class, part owner",
      c: "pieces of paper, part owner",
      d: "all the above"
    },
    correctAnswer: "b"
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
      a: "The company with the higher stock price is larger/more valuable",
      b: "The company with the larger market cap is larger/more valuable",
      c: "The company with the more recognizable name",
      d: "The company with the most amount of shares"
    },
    correctAnswer: "b"
  },
    
  {
    question: "Does a stock with a low share price mean it has more potential upside to increase in value?",
    answers: {
      a: "Yes always",
      b: "No"
    },
    correctAnswer: "b"
  },

  {
    question: "When investing over a long period of time, what is the most successful strategy?",
    answers: {
      a: "Buying stock all at once",
      b: "Dollar Cost Averaging (DCA), meaning you buy a fixed dollar amount of stock over x-period of time",
      c: "Buying penny stocks",
      d: "Never investing",
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

// Function for Quiz Visualization and Output of Quizzes/Answers
function buildQuiz(){
  //stores HTML output
  const output = [];

  myQuestions.forEach( (currentQuestion, questionNumber) => {

    //variable to store possible answers 
    const answers = [];

    // for each avaiable answer
    for(letter in currentQuestion.answers){
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
        </label>`
        );
    }

    // adds the question and answers to the output
    output.push(
      `<div class="question" > ${currentQuestion.question} </div>
      <div class="answers" > ${answers.join('')} </div>`
    );
  }
);

  //combines output list into one string of HTML and puts it on the page
  quizContainer.innerHTML = output.join('');
}
  

function showResults(){
  //variable to gather answer containers from quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  //variable to track users correct answers
  let numCorrect = 0;

  //loop through each question
  myQuestions.forEach( (currentQuestion, questionNumber) => {
    
    //finds selected answer
    const answerContainer = answerContainer[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if user answer is correct
    if(userAnswer === currentQuestion.correctAnswer){
      numCorrect++;

    //styling to make correct answers green
    answerContainers[questionNumber].style.color = 'green';
    }

  //else if statement if wrong answer 
  else{
    // color the answers red
    answerContainers[questionNumber].style.color = 'red';
  }
});

// show number of correct answers out of total
resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}



//Call Quiz Function right away//
buildQuiz();

submitButton.addEventListener('click', showResults);








  /**
   * 
   * Technical requirements:
   * 
   * Your app should include a render() function, that regenerates the view each time the store is updated. 
   * See your course material and access support for more details.
   *
   * NO additional HTML elements should be added to the index.html file.
   *
   * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
   *
   * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
   * 
   */
  
  /********** TEMPLATE GENERATION FUNCTIONS **********/
  
  // These functions return HTML templates
  
  /********** RENDER FUNCTION(S) **********/
  
  // This function conditionally replaces the contents of the <main> tag based on the state of the store
  
  /********** EVENT HANDLER FUNCTIONS **********/
  
  // These functions handle events (submit, click, etc)

