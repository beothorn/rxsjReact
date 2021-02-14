const tweetList =  ({ dispatcher, visibility, tweets }) => {
    
    let tweetsToShow = tweets

    if(visibility === "Liked"){
        tweetsToShow = tweets.filter( tweet => tweet["liked"])
    }

    const likeTweet = (timestamp) => dispatcher.next({
        type: "TweesView/LikeTweet",
        payload: timestamp
    })

    const unlikeTweet = (timestamp) => dispatcher.next({
        type: "TweesView/UnlikeTweet",
        payload: timestamp
    })

    if(tweetsToShow.size === 0) return <div id={"noTweetsMsg"}>No tweets</div>

    let tweetsRendered = tweetsToShow.map( tweet => {
        const likeButton = <button className="likeButton" data-testid={"like-button-"+tweet["timestamp"]} onClick={() => likeTweet(tweet["timestamp"])}>Like</button>
        const unlikeButton = <button className="unlikeButton" data-testid={"unlike-button-"+tweet["timestamp"]} onClick={() => unlikeTweet(tweet["timestamp"])}>Unlike</button>

        return <p className={tweet["liked"] ? "likedTweet" : "tweet"} key={tweet["timestamp"]}>
            <span className="accountHandler">{tweet["account"]}</span>
            <span className="tweetContent">{tweet["content"]}</span>
            <span className="tweetDate">tweeted at {new Date(tweet["timestamp"]).toLocaleString()}</span> 
            {(tweet.liked) ? unlikeButton : likeButton}
        </p>
    })

    return <div className="tweetList">
        <button id="clearAllButton" onClick={() => dispatcher.next({type: "TweesView/ClearTweets"})}>Clear All</button>
        {tweetsRendered}
    </div>
    
}
    

export default tweetList