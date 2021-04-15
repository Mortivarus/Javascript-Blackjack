//Object with all cards and card values
const Cards = {
	club_1: [1, 11],
    club_2: 2,
    club_3: 3, 
    club_4: 4,
    club_5: 5,
    club_6: 6,
    club_7: 7,
    club_8: 8,
    club_jack: 10,
    club_king: 10, 
    club_queen: 10, 
	diamond_1: [1, 11],
    diamond_2: 2,
    diamond_3: 3, 
    diamond_4: 4,
    diamond_5: 5,
    diamond_6: 6,
    diamond_7: 7,
    diamond_8: 8,
    diamond_jack: 10,
    diamond_king: 10, 
    diamond_queen: 10, 
	heart_1: [1, 11],
    heart_2: 2,
    heart_3: 3, 
    heart_4: 4,
    heart_5: 5,
    heart_6: 6,
    heart_7: 7,
    heart_8: 8,
    heart_jack: 10,
    heart_king: 10, 
    heart_queen: 10, 
	spade_1: [1, 11],
    spade_2: 2,
    spade_3: 3, 
    spade_4: 4,
    spade_5: 5,
    spade_6: 6,
    spade_7: 7,
    spade_8: 8,
    spade_jack: 10,
    spade_king: 10, 
    spade_queen: 10
}

const addCardtoHTML = (card, player) =>{
    let img = document.createElement("img")
    img.className = "column" 
    img.src = `cards/${card}.png`
    let src = document.getElementById(`${player.playerType}Deck`)
    src.appendChild(img)
}




//Create a player class with a deck and pre-selected player type, as well as a predefined array for aces
const Player = class {
    constructor(name, playerType){
        this.name = name
        this.deck = []
        this.aces = ["club_1", "diamond_1", "heart_1", "spade_1"]
        this.playerType = playerType
    }

    //Check if the deck has aces
    checkAces(){ 
        let test = this.aces.some(el => this.deck.includes(el))
        return test
    }

    //Loop over an array and calculate the score 
    checkCard(array){
        let score = 0
    
        for(let i = 0; i< array.length; i++){
            score += Cards[array[i]]
            }
        return score
    }

    //If an array has aces, calculate all the possible scores. If player type is a player, return the highest value under 21, otherwise return the highest value 
    deckScore(){ 
        if(this.checkAces() === true){
            let filteredDeck = this.deck.filter(item => !this.aces.includes(item))
            let acesDeck = this.deck.filter(item => this.aces.includes(item))
            let scoreArray = []
            
            for(let i = 0; i < acesDeck.length + 1; i++){
                scoreArray.push(
                    this.checkCard(filteredDeck) + i * 11 + (acesDeck.length - i) * 1
                )
            }

            if(this.playerType === "player"){
                return Math.max(...scoreArray.filter(item => item < 22))
            } else if(this.playerType === "dealer"){
                return Math.max(...scoreArray)
            }
            
        } else{
            return this.checkCard(this.deck)
        }
    }
}

let deck = Object.keys(Cards) //Create a deck array based on the cards object

let player1 = new Player("Player 1", "player") //Make a new player of type "player"

let dealer = new Player("the Dealer", "dealer") //Make a new player of type "dealer"

var status = ""

//Update the shown deck and score
const updateDeckAndScore = (player) =>{
    document.getElementById(`${player.playerType}Deck`).innerHTML = player.deck
    document.getElementById(`${player.playerType}Score`).innerHTML = player.deckScore()

}

//Draw two cards from the deck and add them to the player deck
const deal = (player) => {
    let draw1 =""
    let draw2 =""

    while (draw1 === draw2) {
        draw1 = deck[Math.floor((Math.random()*deck.length))]
        draw2 = deck[Math.floor((Math.random()*deck.length))]
    }

    let forRemove = [draw1, draw2]
    deck = deck.filter(item => !forRemove.includes(item))
    player.deck.push(draw1, draw2)
    
    if(player.playerType === "player"){
        updateDeckAndScore(player)
    } else if(player.playerType === "dealer"){
        document.getElementById("dealerDeck").innerHTML = player.deck[0]
    }
    
    return console.log(`Cards have been dealt to ${player.name}`)

}

//Check the win/lose conditions
const checkConditions = (player, dealer) => {
    if(player.deckScore() > 21){ //If the player's score is more than 21, they lose
        return status = "lose"
    } else if(dealer.deckScore() < 16){ //If the player is not out and the dealer still needs to hit, end function
        return
    } else if(dealer.deckScore() > 21 || player.deckScore() === 21){ //If the dealer has more than 21 points or the player has 21 points, the player wins
        return status = "won"
    } else if(player.deckScore() > dealer.deckScore()){ //If the player has a higher score than the dealer, they win
        return status = "won"
    } else{ //If the player has a lower score than the dealer, they lose (remainder category)
        return status = "lose"
    }
}

//Draw a card from the deck. If the player type is a player, and the total score is more than 21, return the 'lose' status
const hit = (player) => {
    let draw = deck[Math.floor((Math.random()*deck.length))]
    deck = deck.filter(item => item != draw)
    player.deck.push(draw)

    checkConditions(player, dealer)
    updateDeckAndScore(player)
}

//Player passes, dealer gets a card until he has 17 or more points
const pass = () => {
    while(dealer.deckScore() < 17){
        hit(dealer)
        checkConditions(player1, dealer)
    }
    updateDeckAndScore(dealer)
    checkConditions(player1, dealer) 
}

addCardtoHTML("spade_7", player1)

addCardtoHTML("spade_7", player1)

// addCardtoHTML("spade_7", playerCard3)

// addCardtoHTML("spade_7", "playerCard4")

addCardtoHTML("spade_8", dealer)

addCardtoHTML("spade_7", dealer)