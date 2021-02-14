import Immutable from 'immutable'

const initialState = Immutable.fromJS({
    likedCounter: 0,
    tweetsVisibility: "All",
    tweets: Immutable.fromJS([])
})

const tweetsViewReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case "TweesView/AddTweet": 
            return state.update("tweets", tweets => tweets.insert(0, payload))
        case "TweesView/RemoveTweets": 
            let newStateAfterRemovingTweets = state.update("tweets", tweets => tweets.filter( tweet => tweet["timestamp"] > payload))
            let countLikes = newStateAfterRemovingTweets.get("tweets").filter(t => t.liked).size
            return newStateAfterRemovingTweets.set("likedCounter", countLikes)
        case "TweesView/ClearTweets": 
            return state.update("tweets", () => Immutable.fromJS([])).set("likedCounter", 0)
        case "TweesView/LikeTweet": 
        case "TweesView/UnlikeTweet": 
            let index = state.get("tweets").findIndex((tweet) => tweet["timestamp"] === payload)
            if(index === -1) return state
            let liked = true
            if(type === "TweesView/LikeTweet"){
                liked = true
            }
            if(type === "TweesView/UnlikeTweet"){
                liked = false
            }
            let newStateAfterChangeLikes = state.update("likedCounter", (count) => count + ((liked)?1:-1))
            return newStateAfterChangeLikes.update("tweets", 
                tweets => 
                    tweets.update(
                        tweets.findIndex((tweet) => tweet["timestamp"] === payload), 
                        (tweet) => ({...tweet, liked: liked})
                    )
            )
        case "TweesView/ToggleView": return state.set("tweetsVisibility", payload)
        default:
            break        
    }
    return state
}

export default tweetsViewReducer