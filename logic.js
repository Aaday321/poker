
/*
let playerCount = 1 + window.prompt("How many oppnents do you want to play agist")
*/
let playerCount = 3
const cards = [2,3,4,5,6,7,8,9,10,11,12,13,14]
const suits = ["Spades", "Clubs", "Hearts", "Diamonds"]
const matchFinders = []

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
    setColorAndFace() {/*
        switch (this.suit) {
            case "Diamonds": this.color = "Red"; break;
            case "Hearts": this.color = "Red"; break;
            case "Spades": this.color = "Black"; break;
            case "Clubs": this.color = "Black"; break;
            default: this.color = "";
        }*/
        switch (this.value) {
            case 14: {
                this.face = 'A';
                break;
            }
            case 11: {
                this.face = 'J';
                break;
            }
            case 12: {
                this.face = 'Q';
                break;
            }
            case 13: {
                this.face = 'K';
                break;
            }
        }
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
                newCard.setColorAndFace()
                this.cardsInDeck.push(newCard)
            }
        }
    }
}

//Make the Deck
const MyDeck = new Deck()
//Make you as a player
let playerArray = []
const You = new Player("YOU", 0)
playerArray.push(You)

//Make 2 opponets
const makeOpps = (pCount) =>{
    for (let i=1; i < pCount; i++){
        const newOpp = new Player("OPPENENT " + String(i), i)
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
        //Array for every card number
        let arrayGroup = []
        let [array2, array3, array4, array5, array6, array7, array8, array9, array10, array11, array12, array13, array14] = [[],[],[],[],[],[],[],[],[],[],[],[],[]]

        arrayGroup.push(array2, array3, array4, array5, array6, array7, array8, array9, array10, array11, array12, array13, array14)

        let currrentArray = 0

        for(let i=0; i<this.CARDS_IN_PLAY.length; i++){
            switch(this.CARDS_IN_PLAY[i].value){
                case 2: array2.push(this.CARDS_IN_PLAY[i]); continue;
                case 3: array3.push(this.CARDS_IN_PLAY[i]); continue;
                case 4: array4.push(this.CARDS_IN_PLAY[i]); continue;
                case 5: array5.push(this.CARDS_IN_PLAY[i]); continue;
                case 6: array6.push(this.CARDS_IN_PLAY[i]); continue;
                case 7: array7.push(this.CARDS_IN_PLAY[i]); continue;
                case 8: array8.push(this.CARDS_IN_PLAY[i]); continue;
                case 9: array9.push(this.CARDS_IN_PLAY[i]); continue;
                case 10: array10.push(this.CARDS_IN_PLAY[i]); continue;
                case 11: array11.push(this.CARDS_IN_PLAY[i]); continue;
                case 12: array12.push(this.CARDS_IN_PLAY[i]); continue;
                case 13: array13.push(this.CARDS_IN_PLAY[i]); continue;
                case 14: array14.push(this.CARDS_IN_PLAY[i]); continue;
            }
        }
        for(let i=0; i<arrayGroup.length; i++){
            if(arrayGroup[i].length >= 2){
                pairArrays[currrentArray] = arrayGroup[i]
                currrentArray++
            }
        }
        return pairArrays
    }


}

//REPLACE CARDS FOR TESTING
/*
You.cardsInHand = [{value: 4, suit: "Hearts"},{value: 5, suit: "Hearts"}]

river = [{value: 6, suit: "Hearts"},{value: 7, suit: "Clubs"},{value: 8, suit: "Hearts"},{value: 7, suit: "Hearts"},{value: 7, suit: "Spades"}]
*/

//opp MatchFinders
const makeMatchFinders = () =>{
    for (let i=0; i < playerArray.length; i++){
        const newMatchFinder = new MatchFinder(playerArray[i], river)
        matchFinders.push(newMatchFinder)
    }
}

makeMatchFinders(playerArray.length)

for(let i=0; i<playerArray.length; i++){
    console.log(`${playerArray[i].name}:`)
    console.log("   Flush:" ,matchFinders[i].flushFinder());
    console.log("   Straight:", matchFinders[i].straightFinder());
    console.log("Pairs", matchFinders[i].pairFinder());
}


const pullHands = (PLAYER) =>{
    
    //ALL VARIS
    const FLUSH_CARDS = matchFinders[PLAYER.pID].flushFinder()
    const STRAIGHT_CARDS = matchFinders[PLAYER.pID].straightFinder()
    const PAIRS_ARRAY = matchFinders[PLAYER.pID].pairFinder()


    //STRIGHT FLUSH START
    let straightFlush = []

    if(FLUSH_CARDS.length > 0){
        let previousValue = 0
        for(let i=0; i<FLUSH_CARDS.length; i++){  
            if (i===0){
                previousValue = FLUSH_CARDS[i].value
                straightFlush.push(FLUSH_CARDS[i])
            }else{
                if(FLUSH_CARDS[i].value === previousValue + 1){
                    straightFlush.push(FLUSH_CARDS[i])
                }else if(straightFlush.length < 5){
                    straightFlush = []
                }
                previousValue = FLUSH_CARDS[i].value
            }
        }
    }

    if(straightFlush.length >= 5){
        console.log("Player has Straight Flush")
        //THEN PLAYER HAS 4 OF A STRIGHT
    }
    //STRAIGHT FLUSH END


    //4 OF A KIND START
    for(let i=0; i<PAIRS_ARRAY.length; i++){
        if (PAIRS_ARRAY[i].length === 4){
            console.log("Player Has 4 of a kind")
            //THEN PLAYER HAS 4 OF A KIND
        }
    }
    //4 OF A KIND END
    
    if(FLUSH_CARDS.length >= 5){
        console.log("Player Has a Flush")
        //THEN PLAYER HAS 4 OF A KIND
    }

    if(STRAIGHT_CARDS.length >= 5){
        console.log("Player Has a Stright")
        //THEN PLAYER HAS 4 OF A KIND
    }  

    

    
}


console.log(pullHands(You)); 
