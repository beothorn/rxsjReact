import { map } from 'rxjs/operators'

const tweetFeedToAction = (tweetFeed, dispatcher) => 
    tweetFeed.pipe(
        map( rawTweet => ({
            type:"TweesView/AddTweet", 
            payload: {...rawTweet, liked: false}
        }))
    ).subscribe(addTweetAction => {
        dispatcher.next(addTweetAction)
    })

export default tweetFeedToAction