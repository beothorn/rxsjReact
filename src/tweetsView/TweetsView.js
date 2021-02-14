import LikedCounter from './components/LikedCounter'
import TweetsVisibilityToggler from './components/TweetsVisibilityToggler'
import TweetList from './components/TweetList'

const TweetView = ({ dispatcher, likedCounter, tweetsVisibility, tweets }) => {

    return <div className="TweetView">
        <div id={"headerOptions"}>
            <LikedCounter count={likedCounter}/>
            <TweetsVisibilityToggler 
                dispatcher={dispatcher}
                selected={tweetsVisibility} 
            />
        </div>
        <TweetList 
            dispatcher={dispatcher}
            visibility={tweetsVisibility}
            tweets={tweets} 
        />
    </div>
}

export default TweetView