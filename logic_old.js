
/*
let playerCount = 1 + window.prompt("How many oppnents do you want to play agist")
*/
let playerCount = 3
const cards = [2,3,4,5,6,7,8,9,10,11,12,13,14]
const suits = ["Spades", "Clubs", "Hearts", "Diamonds"]

let river = []


class Player {
    constructor(name, pID){
        this.name = name
        this.cardsInHand = []
        this.pID = pID
        this.money
        this.winngHands = []
    }
    
}

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
                const newCard = new Card(cards[i], suits[ii])
                this.cardsInDeck.push(newCard)
            }
        }
    }
}

//Make the Deck
const MyDeck = new Deck()
//Make you as a player
let playerArray = []
const You = new Player("Test Player", 0)
playerArray.push(You)

//Make 2 opponets
const makeOpps = (pCount) =>{
    for (let i=1; i < pCount; i++){
        const newOpp = new Player("Opp" + String(i), i)
        playerArray.push(newOpp)
    }
}
makeOpps(playerCount)



//
MyDeck.makeDeck(cards, suits)

console.log(MyDeck);


const dealCards = () => { 
   
//Pass Cards to all of the players
    for (let i=0; i<playerCount; i++){
        for(let ii=0; ii<2; ii++){
            let randomCardIndex = Math.floor(Math.random() * MyDeck.cardsInDeck.length)
            playerArray[i].cardsInHand.push(MyDeck.cardsInDeck[randomCardIndex])
            MyDeck.cardsInDeck.splice(randomCardIndex, 1)
        }
    }

//Deal river cards
    for(let i=0; i<5; i++){
        let randomCardIndex = Math.floor(Math.random() * MyDeck.cardsInDeck.length)
        river.push(MyDeck.cardsInDeck[randomCardIndex])
        MyDeck.cardsInDeck.splice(randomCardIndex, 1)
    }
    
}

dealCards()

//TESTING GROUNDS
console.log(playerArray);
for(let i=0; i<playerArray; i++){
    console.log(playerArray[i].cardsInHand);
    console.log(MyDeck.cardsInDeck);
}
console.log(river);



/*SOULD BE NEW FILE*/



class MatchFinder{
    constructor(PLAYER, RIVER){
        this.RIVER = RIVER
        this.CARDS_IN_PLAY = [PLAYER.cardsInHand[0], PLAYER.cardsInHand[1], RIVER[0], RIVER[1], RIVER[2], RIVER[3], RIVER[4]]
        this.straightHighCard = {}
    }

    //StraightFinder
    straightFinder(){

        //Straight
        let straight = []
        //Created a sorted array of cards by vlaue
        let sortedCards_VALUE = []

        //returnableArray
        let returnable = []

        //Sort the Array of cards by value
        for(let i=2; i<15; i++){
            for(let ii=0; ii<7; ii++){
                if(this.CARDS_IN_PLAY[ii].value === i){
                    sortedCards_VALUE.push(this.CARDS_IN_PLAY[ii])
                }
            }
        }

        let previousValue = 0
        for(let i=0; i<sortedCards_VALUE.length; i++){
            if (i===0){
                previousValue = sortedCards_VALUE[i].value
            }else{
                if(sortedCards_VALUE[i].value === previousValue + 1){
                    straight.push(sortedCards_VALUE[i])
                }else if(straight.length < 5){
                    straight = []
                }
                previousValue = sortedCards_VALUE[i].value
            }
        }

        if(straight.length >= 5){
            returnable = straight
        }
        
        return returnable

    }


    
    //FlushFinder
    flushFinder(){
        //Created a sorted array of cards by vlaue
        let sortedCards_VALUE = []
        let diamonds = 0
        let hearts = 0
        let clubs = 0
        let spades = 0
        let straightSuit = ""
        //returnableArray
        let returnable = [/*High cards*/]

        //Sort the Array of cards by value
        for(let i=2; i<15; i++){
            for(let ii=0; ii<7; ii++){
                if(this.CARDS_IN_PLAY[ii].value === i){
                    sortedCards_VALUE.push(this.CARDS_IN_PLAY[ii])
                    switch(this.CARDS_IN_PLAY[ii].suit){
                        case "Hearts": {
                            hearts++;
                            if(hearts >=5){
                                straightSuit = "Hearts"
                            }
                            break;
                        }
                        case "Diamonds": {
                            diamonds++;
                            if(diamonds >=5){
                                straightSuit = "Diamonds"
                            }
                            break;
                        }
                        case "Clubs": {
                            clubs++;
                            if(clubs >=5){
                                straightSuit = "Clubs"
                            }
                            break;
                        }
                        case "Spades": {
                            spades++;
                            if(spades >=5){
                                straightSuit = "Spades"
                            }
                            break;
                        }
                        default: {
                            straightSuit = ""
                        }break;
                    } 
                }
            }
        }

        for(let i=0; i<sortedCards_VALUE.length; i++){
            if(sortedCards_VALUE[i].suit === straightSuit){
                returnable.push(sortedCards_VALUE[i])
            }
        }

        return returnable
    }


    //Pair, two pair, three of a kind and full house finder
    pairFinder(){
        let pairs1 = []
        let pairs2 = []
        let pairs3 = []
        let pairArrays = [pairs1, pairs2, pairs3]
        let currrentArray = 0
        let evaluatorArray = this.CARDS_IN_PLAY
        let currentCard = {}

        for(let i=0; i<this.CARDS_IN_PLAY.length; i++){

            let firstLoop = true
            currrentArray = 0
            for(let ii=0; ii<this.CARDS_IN_PLAY.length; ii++){
                debugger
                if(evaluatorArray[i] != evaluatorArray[ii]){
                    currentCard = evaluatorArray[i]
                    if(pairs1.length === 0){
                        currrentArray = 0
                        firstLoop = true
                    }else if(pairs2.length === 0){
                        currrentArray = 1
                        firstLoop = true
                    }else if(pairs3.length === 0){
                        currrentArray = 2
                        firstLoop = true
                    } else{
                        break
                        console.log("Somehting went wrong");
                    }
                    if(currentCard.value === evaluatorArray[ii].value){
                        if(firstLoop){
                            pairArrays[currrentArray].push(evaluatorArray[i], evaluatorArray[ii])
                            evaluatorArray.splice(evaluatorArray.indexOf(evaluatorArray[i]), 1)
                            evaluatorArray.splice(evaluatorArray.indexOf(evaluatorArray[ii-1]), 1)
                            firstLoop = false
                        } else{
                            pairArrays[currrentArray].push(evaluatorArray[ii])
                            evaluatorArray.splice(evaluatorArray.indexOf(evaluatorArray[ii], 1))
                        }
                    }
                }
            }
        }
        return pairArrays
    }





}

//REPLACE CARDS FOR TESTING

You.cardsInHand = [{value: 9, suit: "Hearts"},{value: 9, suit: "Diamonds"}]

river = [{value: 10, suit: "Hearts"},{value: 8, suit: "Hearts"},{value: 9, suit: "Spades"},{value: 13, suit: "Hearts"},{value: 10, suit: "Spades"}]

const MyMatchFinder = new MatchFinder(You, river)
console.log(MyMatchFinder.flushFinder())
console.log(MyMatchFinder.straightFinder());
console.log(MyMatchFinder.pairFinder());