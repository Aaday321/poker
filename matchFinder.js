export class MatchFinder{
    constructor(PLAYER, RIVER){


        this.RIVER = RIVER
        this.CARDS_IN_PLAY = [PLAYER.cardsInHand[0], PLAYER.cardsInHand[1], RIVER[0], RIVER[1], RIVER[2], RIVER[3], RIVER[4]]
        this.straightHighCard = {}
    }

    //StraightFinder
    straightFinder(){

       
        //Created a sorted array of cards by vlaue
        let sortedCards_VALUE = []
        //sequence counter
        let seqCounter = 0

        //returnableArray
        const returnable = [/*High cards*/]

        //Sort the Array of cards by value
        for(let i=2; i<14; i++){
            for(let ii=0; i<7; ii++){
                if(this.CARDS_IN_PLAY[ii] === i){
                    sortedCards_VALUE.push(this.CARDS_IN_PLAY[ii])
                    seqCounter++
                    if(seqCounter >= 5){
                        /*Save High card index*/
                        this.straightHighCard =  this.CARDS_IN_PLAY[ii]
                    }
                } else if(this.CARDS_IN_PLAY[ii] != i && seqCounter < 5){
                    seqCounter = 0
                } 
            }
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
        const straightSuit = ""
        //sequence counter
        let seqCounter = 0
        //returnableArray
        const returnable = [/*High cards*/]

        //Sort the Array of cards by value
        for(let i=2; i<14; i++){
            for(let ii=0; i<7; ii++){
                if(this.CARDS_IN_PLAY[ii] === i){
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
                            hearts++;
                            if(hearts >=5){
                                straightSuit = "Diamonds"
                            }
                            break;
                        }
                        case "Clubs": {
                            hearts++;
                            if(hearts >=5){
                                straightSuit = "Clubs"
                            }
                            break;
                        }
                        case "Spades": {
                            hearts++;
                            if(hearts >=5){
                                straightSuit = "Spades"
                            }
                            break;
                        }
                        default: break;
                    } 
                }
            }
        }

        for(let i=sortedCards_VALUE.length; i>0; i--){
            if(sortedCards_VALUE[i].suit === straightSuit){
                returnable.push(sortedCards_VALUE)
            }
        }

        return returnable
    }
}