/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-diamond", "fa-diamond", "fa-paper-plane-o", "fa-paper-plane-o", "fa-anchor","fa-anchor", "fa-bolt", "fa-bolt", "fa-cube","fa-cube",
 "fa-leaf", "fa-leaf", "fa-bicycle","fa-bicycle", "fa-bomb", "fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Create each card's HTMl
function createCardsHtml() {
  //shuffle the list of cards using the provided "shuffle" method below
  let allCards = shuffle(cards);
  //loop through each card and create its HTML
  allCards.forEach(function(card) {
    $(".deck").append('<li><i class="card fa ' + card + '"></i></li>');
  })
}



//list of open cards
let openCards = [];
let movesCount = 0;
let starsCount = 3;
let pairsFound = 0;

function openPairs() {
  // display the card's symbol
  $(".card").on("click", function() {
    //if card already open
     if ($(this).hasClass("open show")) {
        return; }
    $(this).toggleClass("open show");
  //  add the card to a *list* of "open" cards
    openCards.push($(this));
    //if the list already has another card, check to see if the two cards match
    if (openCards.length > 1) {
    //  if the cards do match, lock the cards in the open position
      if (openCards[0][0].classList[2] === openCards[1][0].classList[2]) {
         openCards[0][0].classList.add("match");
         openCards[1][0].classList.add("match");
         openCards = [];
         moves();
         pairsFound++;
         winner();
      }
      else {
        //if the cards do not match, remove the cards from the list and hide the card's symbol
            setTimeout(function () {
              $(".card").removeClass("open show");
               openCards = [];
               moves();
            }, 1000);
      }
    }
  })
}

//increment the move counter and display it on the page
function moves() {
  movesCount++;
  $("#moves").text(movesCount.toString());
  if (movesCount > 10 && movesCount <= 20) {
    starsCount = 2;
    $("#star1").removeClass("fa-star");
  } else if (movesCount > 20) {
    starsCount = 1;
    $("#star2").removeClass("fa-star");
}
}

//if all cards have matched, display a message with the final score
function winner() {
  if (pairsFound === 8) {

    var modal = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];

    $("#moves-count").text(movesCount);
    $("#stars-count").text(starsCount);

    modal.style.display = "block";

  }
}




//add each card's HTML to the page
createCardsHtml();
openPairs();


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
