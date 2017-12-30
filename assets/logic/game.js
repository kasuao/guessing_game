/*this is a trivia game of sorts where players will try to guess the 
names of famous BYU athletes and coaches before they run out of guesses*/
// In this one I am housing all my logic and variables in a giant object for neatness and to get around scope.
var game = {
	namesToPick: {
		lavell: {
			hint: "Hall of fame BYU coach."
		},
		chow: {
			hint: "Legendary OC who also coached at UCLA, USC, and in the NFL"
		},
		anae:{
			hint: "OC from the tree of Leach."
		},
		grimes:{
			hint: "LSU OL coach who played under Andy Reid"
		},
		doman:{
			hint: "The dominator."
		},
		detmer:{
			hint: "Heisman"
		},
		young:{
			hint: "Legendary Niners QB"
		},
		unga:{
			hint: "Timpview product who was overlooked yet became a record setting RB under Bronco."
		},
		reid:{
			hint: "NFL head coach at Philadephia and Kansas City"
		},
		matich:{
			hint: "OL from the '84 championship who is currently an ESPN analyst"
		},
		holmgren:{
			hint: "NFL head coach who led 2 teams to the superbowl and won one with Brett Favre as his QB"
		},
		mili:{
			hint: "Athletic TE on the '96 football team that injured his knee in the WAC championship against Wyoming."
		},
		mcmahon:{
			hint: "80s QB who led the Chicago Bears to a superbowl victory."
		},
		bronco:{
			hint: "Post Lavell head coach who became one of the winningest coaches in history."
		},
		williams:{
			hint: "SwagDaddy...record setting RB"
		},
		staley:{
			hint: "Doak Walker award"
		},
		bosco:{
			hint: "'84 championship QB"
		},
		wilson:{
			hint: "QB drafted by the Oakland Raiders"
		},
		nielson:{
			hint: "QB drafted by the NFL's Houston Oilers and played with them for six years"
		},
		ainge:{
			hint: "Played on two NBA championship teams at Boston, 1984 and 86"
		},
		bradley:{
			hint: "7 foot 6 inches...drafted by the Philadephia 76ers"
		},
		lewis:{
			hint: "One of the best tightends who ended up playing for the Philadephia Eagles."
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
				// restart game.
				this.restartGame();
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
			console.log("guessed letters array: " + this.guessedLetters);
		// -1 from guessesLeft.
			this.guessesLeft--;
		// update the the guessesLeft  and the guessedLetters on the DOM
			$("#guesses-left").html("You now have " + this.guessesLeft + " guesses left.");
			$("#letters-guessed").html(this.guessedLetters);
		}
		// when guessesLeft = 0 restart game
		if (this.guessesLeft === 0) {
			this.losses = this.losses + 1;
			console.log(this.losses);
			$("#losses").html(this.losses);
			this.restartGame();
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
		$("#name-view").html("<h3>" + wordString + "</h3>");
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
