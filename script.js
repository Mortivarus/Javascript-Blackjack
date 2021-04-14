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

//Create a player class with a deck and pre-selected player type, as well as a predefined array for aces
const Player = class {
    constructor(playerType){
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

let deck = Object.keys(Cards)

let player1 = new Player("dealer")

let dealer = new Player()

let status = ""


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
}

//Draw a card from the deck. If the player type is a player, and the total score is 
const hit = (player) => {
    let draw = deck[Math.floor((Math.random()*deck.length))]
    deck = deck.filter(item => item != draw)
    player.deck.push(draw)

    if(player.playerType === "player" && player.deckScore > 21){
        status = "lose"
    }
}

const checkConditions = (player, dealer) => {
    if(dealer.deckScore < 16){
        return
    }

    if(player.deckScore() > 21){
        return status = "lose"
    } else if(dealer.deckScore() > 21 || player.deckScore() === 21){
        return status = "won"
    }


    
}


const pass = () => {

    while(dealer.deckScore() < 17){
        hit(dealer)
    }
    
    
    
    
    
}


