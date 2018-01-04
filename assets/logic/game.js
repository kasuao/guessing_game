/*this is a trivia game of sorts where players will try to guess the 
names of famous BYU athletes and coaches before they run out of guesses. I got a lot of help from another game
we created in our bootcamp so I can't take credit for a lot of the logic...I created this game to help me better 
understand the logic in that other game I borrowed it from.*/
// In this one I am housing all my logic and variables in a giant object for neatness.
var game = {
	namesToPick: {
		lavell: {
			hint: "Hall of fame BYU coach.",
			video: "https://www.youtube.com/embed/Dqy52PZiJO8"
		},
		chow: {
			hint: "Legendary OC who also coached at UCLA, USC, and in the NFL",
			video: "https://www.youtube.com/embed/gV88RulSAEY"
		},
		anae:{
			hint: "OC from the tree of Leach.",
			video: "https://www.youtube.com/embed/GhHWkaHvJNc"
		},
		grimes:{
			hint: "LSU OL coach who played under Andy Reid",
			video: "https://www.youtube.com/embed/1nUg9rtwHC4"
		},
		doman:{
			hint: "The dominator.",
			video: "https://www.youtube.com/embed/eHARVLfkva4"
		},
		detmer:{
			hint: "Heisman",
			video: "https://www.youtube.com/embed/T_Kbzr7WFnA"
		},
		young:{
			hint: "Legendary Niners QB",
			video: "https://www.youtube.com/embed/Cc1u-qTt71k"
		},
		unga:{
			hint: "Timpview product who was overlooked yet became a record setting RB under Bronco.",
			video: "https://www.youtube.com/embed/IslHdkd9pD8"
		},
		reid:{
			hint: "NFL head coach at Philadephia and Kansas City",
			video: "https://youtu.be/fVomXGYFsQM"
		},
		matich:{
			hint: "OL from the '84 championship who is currently an ESPN analyst",
			video: "https://www.youtube.com/embed/DDoSiPjeheI"
		},
		holmgren:{
			hint: "NFL head coach who led 2 teams to the superbowl and won one with Brett Favre as his QB",
			video: "https://www.youtube.com/embed/F7r4Ysi3X-0"
		},
		mili:{
			hint: "Athletic TE on the 96 football team that injured his knee in the WAC championship against Wyoming.",
			video: "https://www.youtube.com/embed/gXYiLMnbosE"
		},
		mcmahon:{
			hint: "80s QB who led the Chicago Bears to a superbowl victory.",
			video: "https://www.youtube.com/embed/65JuBLd2e2A"
		},
		mendenhall:{
			hint: "Post Lavell head coach who became one of the winningest coaches in history.",
			video: "https://www.youtube.com/embed/fKUCp-2edYA"
		},
		williams:{
			hint: "SwagDaddy...record setting RB",
			video: "https://www.youtube.com/embed/tubrdY1jr8o"
		},
		staley:{
			hint: "Doak Walker award",
			video: "https://www.youtube.com/embed/0gEdW0KoXpM"
		},
		bosco:{
			hint: "84 championship QB",
			video: "https://www.youtube.com/embed/XABaIzF3p38"
		},
		wilson:{
			hint: "QB drafted by the Oakland Raiders",
			video: "https://www.youtube.com/embed/A0pf_sJI5w0"
		},
		nielson:{
			hint: "QB drafted by the NFL's Houston Oilers and played with them for six years",
			video: "https://www.youtube.com/embed/Tx_Msbqk0go"
		},
		ainge:{
			hint: "Played on two NBA championship teams at Boston, 1984 and 86",
			video: "https://www.youtube.com/embed/GMTu8-3xMYQ"
		},
		bradley:{
			hint: "7 foot 6 inches...drafted by the Philadephia 76ers",
			video: "https://www.youtube.com/embed/0mMqkdLjss0"
		},
		lewis:{
			hint: "One of the best tightends who ended up playing for the Philadephia Eagles.",
			video: "https://www.youtube.com/embed/4Y45wJE7-N8"
		}
	},
	// end of namesToPick

	letterGuessed: null,
	nameInPlay: null, 
	lettersInPlay: [],
	matchedLetters: [],
	guessedLetters: [],
	totalGuesses: 0,
	guessesLeft: 0,
	wins: 0,
	losses: 0,
	modal: document.getElementById('myModal'),
	span: document.getElementById('closeModal'),
	// video: document.getElementById('video'),
	

	gameSetUp: function (){
		// must use Object.keys() method since we need to get an array out of the object namesToPick's properties.
		objKey = Object.keys(this.namesToPick);
		// now pick a random name
		this.nameInPlay = objKey[Math.floor(Math.random() * objKey.length)];
		// display hint
		$("#view-hint").html("Hint: " + this.namesToPick[this.nameInPlay].hint);
		console.log(this.namesToPick[this.nameInPlay].hint);

		this.lettersInPlay = this.nameInPlay.split(""); //creates an array of the letters in the chosen word.
		this.decideTotalGuesses(); //updates the guesses tracker
		this.rebuildNameSpaces(); // creates the blank spaces view on the DOM.
	},

	// when a user makes a guess it updates everything in game
	updatePage: function(letter){
		// console.log("updatePage function is being hit");
		if (this.guessesLeft === 0) {
			this.restartGame();
		}
		else{
			// update guessesLeft and guessedLetters when guess is wrong
			this.whenGuessWrong(letter);
			console.log(this.guessedLetters);
			// update matchedLetters and guessedLetters when guess is right
			this.whenGuessRight(letter);
			console.log(this.matchedLetters);
			this.rebuildNameSpaces();

			// this line decides what happens when you win
			if (this.tallyWin() === true) {
				// // should restart game when user closes the modal
				// this.restartGame();

				// if tallyWin is true open modal.
				// open modal.
				this.modal.style.display = "block";
				$("#alert").html("You Won!");
				// get video
				$("#video").html('<iframe width="560" height="315" src="' + this.namesToPick[this.nameInPlay].video + '" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>');

			};
		};
	},

	// this function decides what happens with the guess it wrong
	whenGuessWrong: function(letter){
		// console.log("whenGuessWrong function is being hit");
		// if letter is not in the arrays lettersInPlay or guessedLetters then
		if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersInPlay.indexOf(letter) === -1)) {
		// add it to guessedLetters and
			this.guessedLetters.push(letter);
		// -1 from guessesLeft.
			this.guessesLeft--;
		// update the the guessesLeft  and the guessedLetters on the DOM
			$("#guesses-left").html("You now have " + this.guessesLeft + " guesses left.");
			// the .join method joins items in an array. I use this method so I can put a comma between each item.
			$("#letters-guessed").html(this.guessedLetters.join(", "));
		}
		// when guessesLeft = 0 restart game
		if (this.guessesLeft === 0) {
			this.losses = this.losses + 1;
			console.log(this.losses);
			$("#losses").html(this.losses);
			this.modal.style.display = "block";
			$("#alert").html("Sorry you ran out of guesses.");
		}

	},
	// this function determines the total guesses...depends on the length of the word.
	decideTotalGuesses: function(){
		// I add .length to lettersInPlay to get a numeric value.
		this.totalGuesses = this.lettersInPlay.length + 4;
		// set guessLeft = to totalGuesses because that is what it will be to start the game.
		this.guessesLeft = this.totalGuesses;
		// render total guesses left.
		$("#guesses-left").html("You have " + this.guessesLeft + " guesses left.");
	},


	// this function decide what happens when the guess is right.
	whenGuessRight: function(letter){
	// loop through the lettersInPlay array and...
		for (var i = 0; i < this.lettersInPlay.length; i++) {
			// if guess is right and it hasn't been guessed already
			if ((letter === this.lettersInPlay[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
				// add the guessedLetter to the matchedLetter array.
				this.matchedLetters.push(letter);
			}
			
		}
		
	},



	rebuildNameSpaces: function(){
		var wordString = "";
		// loop through the nameaInPlay to create blanks.
		for (var i = 0; i < this.nameInPlay.length; i++) {
			// console.log(this.nameInPlay[i]);
			// TODO display correct guesses in their spaces.
			if (this.matchedLetters.indexOf(this.nameInPlay[i]) !== -1) {
	        wordString += this.nameInPlay[i];
				
			}else{
				// then creat blanks for each letter.
				wordString += " _ ";
			};
		};
		// display blanks on page:
		$("#name-view").html("<p>" + wordString + "</p>");
	},

	// this function restarts the game when a win or all guesses are used.
	restartGame: function(){
		this.letterGuessed= null;
		this.nameInPlay= null; 
		this.lettersInPlay= [];
		this.matchedLetters= [];
		this.guessedLetters= [];
		this.totalGuesses= 0;
		this.guessesLeft= 0;
		this.gameSetUp();
		this.rebuildNameSpaces();

		$("#letters-guessed").html("");
	},
	// this function determines what a win is
	tallyWin: function(){
		
		var win = false;
		// win = false when matchedLetters.length = 0
		if (this.matchedLetters.length === 0) {
			win = false;
		}else{
			win = true;

		}
		// win = false if letter is in lettersInPlay array but not in matchedLetters array.
		// compare each letter in the word using this function...
		for (var i = 0; i < this.lettersInPlay.length; i++) {
			// if the letters in the word are not in the matched letter array...
			if (this.matchedLetters.indexOf(this.lettersInPlay[i]) === -1) {
				// not a win yet.
				win = false;
			}
		}
		// if win = true.
		if (win) {
			this.wins = this.wins + 1;
			console.log(this.wins);
			$("#wins").html(this.wins);
			// return true as the output of the tallyWin function to trigger a restart.
			return true;
			// display in the dom a win.
		}
		// if this is the output of the tallyWins the game goes on.
		return false;
	}                                                                                                                                                                                                        
};
// end of game object

// start game
game.gameSetUp();
// enables keyboard input
document.onkeyup = function(event){
	// stores the keyboard input in the variable letterGuessed
	game.letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
	// console.log("guessed letter: " + game.letterGuessed); //testing...letterGuessed can only store one value at a time.
	game.updatePage(game.letterGuessed);
};
// close modal.
// when play again button is hit...
$("#playAgain").on('click', function(){
	// change the display style of the modal to "none" which will close the modal.
	game.modal.style.display = "none";
	// ...and restart game.
	game.restartGame();
});
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == game.modal) {
        game.modal.style.display = "none";
        game.restartGame();
    }
};


