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

// const Player = class {
//     constructor(){
//         this.deck = []
//         this.aces = ["club_1", "diamond_1", "heart_1", "spade_1"]
//     }

//     checkAces(){

//         let test = this.aces.some(el => this.deck.includes(el))

//         return test
//     }

//     checkCard(array){
//         let score = 0
    
//         for(let i = 0; i< array.length; i++){
//             score += Cards[array[i]]
//             }
//         return score
//     }

//     deckScore(){
//         if(this.checkAces === true){
//             let filteredDeck = this.deck.filter(item => !this.aces.includes(item))
//             let score1 = this.checkCard(filteredDeck) + 1
//             let score2 = this.checkCard(filteredDeck) + 11

//             if(score1 > 21 || score2 > 21){
//                 return Math.min(score1, score2)
//             } else{
//                 return Math.max(score1, score2)
//             }

//         } else{
//             return this.checkCard(this.deck)
//         }
//     }
// }

// let deck = Object.keys(Cards)

// let player1 = new Player()

// let dealer = new Player()

//         console.log(filteredDeck)
//         console.log(checkCard(filteredDeck))
//         let score1 = checkCard(filteredDeck) + 1
//         let score2 = checkCard(filteredDeck) + 11
//         console.log(score1)
//         console.log(score2)

//         if(score1 > 21 || score2 > 21){
//             return Math.min(score1, score2)
//         } else{
//             return Math.max(score1, score2)
//         }

//     } else{
//         return checkCard(deck)
//     }
// }

// const deal = (player) => {
    
//     let draw1 =""
//     let draw2 =""

//     while (draw1 === draw2) {
//         draw1 = deck[Math.floor((Math.random()*deck.length))]
//         draw2 = deck[Math.floor((Math.random()*deck.length))]
//     }

//     let forRemove = [draw1, draw2]

//     deck = deck.filter(item => !forRemove.includes(item))

//     player.deck.push(draw1, draw2)
// }

// deal(player1)

// console.log(player1.deck, player1.deckScore())


let deck = []
const aces = ["club_1", "diamond_1", "heart_1", "spade_1"]


let checkAces = () =>{

    let test = aces.some(el => deck.includes(el))

    return test
}

let checkCard = (array) =>{
    let score = 0

    for(let i = 0; i< array.length; i++){
        score += Cards[array[i]]
        }
    return score
}

let deckScore = () =>{
    if(checkAces() === true){
        let filteredDeck = deck.filter(item => !aces.includes(item))
        let acesDeck = deck.filter(item => aces.includes(item))
        let scoreArray = []

        for(let i = 0; i < acesDeck.length + 1; i++){
            scoreArray.push(
                checkCard(filteredDeck) + i * 11 + (acesDeck.length - i) * 1
            )
        }
        return scoreArray
    }
}

deck = ["club_1", "diamond_king", "diamond_1"]

console.log(deckScore())