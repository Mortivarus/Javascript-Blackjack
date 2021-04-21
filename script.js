//Object with all cards and card values
const Cards = {
	club_1: 0,
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
	diamond_1: 0,
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
	spade_1: 0,
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


const dealHitBtn = document.getElementById("dealHit")

const passBtn = document.getElementById("pass")

const banner = document.getElementById("banner")


const addCardtoHTML = (card, player) =>{
    let img = document.createElement("img")
    img.className = "column"
    img.id = card
    img.src = `cards/${card}.png`
    let src = document.getElementById(`${player.playerType}Deck`)
    src.appendChild(img)
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
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
                if(scoreArray.filter(item => item < 22).length > 0){
                    return Math.max(...scoreArray.filter(item => item < 22))
                } else {
                    return Math.min(...scoreArray)
                }
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

    if(player.playerType === "dealer"){
        removeAllChildNodes(dealerDeck)
    } else if(player.playerType === "player"){
        removeAllChildNodes(playerDeck)
    }

    player.deck.forEach(element => {
        addCardtoHTML(element, player)
    });
    
    document.getElementById(`${player.playerType}Score`).innerHTML = player.deckScore()

    if(status === "win" || status === "loss"){
        banner.innerHTML = `Game over, it's a ${status}!`
    }

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
        player.deck.forEach((element) => {addCardtoHTML(element, player)})
        document.getElementById(`${player.playerType}Score`).innerHTML = player.deckScore()
    } else if(player.playerType === "dealer"){
        addCardtoHTML(player.deck[0], player)
        addCardtoHTML("back", player)
    }
}

//Check the win/lose conditions
const checkConditions = (player, dealer) => {
    if(player.deckScore() > 21){ //If the player's score is more than 21, they lose
        status = "loss"
        return
    } else if(dealer.deckScore() < 16){ //If the player is not out and the dealer still needs to hit, end function
        return
    } else if(dealer.deckScore() > 21 || player.deckScore() === 21){ //If the dealer has more than 21 points or the player has 21 points, the player wins
        status = "win"
        return
    } else if(player.deckScore() > dealer.deckScore()){ //If the player has a higher score than the dealer, they win
        status = "win"
        return
    } else{ //If the player has a lower score than the dealer, they lose (remainder category)
        status = "loss"
        return
    }
}

//Draw a card from the deck. If the player type is a dealer, check the win/lose conditions
const hit = (player) => {
    let draw = deck[Math.floor((Math.random()*deck.length))]
    deck = deck.filter(item => item != draw)
    player.deck.push(draw)
    updateDeckAndScore(player)

    if(player.playerType === "dealer"){
        checkConditions(player, dealer)
    } else {
        return
    }
}

//Player passes, dealer gets a card until he has 17 or more points
const pass = () => {
    while(dealer.deckScore() < 17){
        hit(dealer)
    }
    checkConditions(player1, dealer)
    updateDeckAndScore(dealer)

}

const dealHitTrigger = () => {
    if(dealHit.innerHTML === "Deal"){
        deal(dealer)
        deal(player1)
        dealHit.innerHTML = "Hit"
    } else if(dealHit.innerHTML === "Hit") {
        if(player1.deckScore() > 22 || status === "loss" || status === "win"){
            return
        } else {
            hit(player1)
        }
    }
}

dealHitBtn.addEventListener("click", dealHitTrigger)

passBtn.addEventListener("click", pass)
