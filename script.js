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


const Player = {
    deck:[],
    checkCard(){
        score = 0
        for(i = 0; i< this.deck.length; i++){
            score += Cards[this.deck[i]]
            }
        return score
        },
}

let deck = Object.keys(Cards)

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

deal(Player)

console.log(Player.deck, Player.checkCard())