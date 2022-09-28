
const cards = [2,3,4,5,6,7,8,9,10,11,12,13,14]
const suits = ["Spades", "Clubs", "Hearts","Diamonds"]

class Card {
    constructor(value, suit){
        this.value = value
        this.suit = suit
    }
}

class Deck {
    constructor(){
        this.cardsInDeck = []
    }
    makeDeck(cards, suits){
        for(let i=0; i<cards.length; i++){
            for(let ii=0; ii<suits.length; ii++){
                newCard = Card(cards[i], suits[ii])
            }
        }
    }
}