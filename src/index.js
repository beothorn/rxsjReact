import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Store from './store/Store'
import tweetFeedToAction from './tweetsSource/tweetFeedToAction'
import removeOlderTweets from './tweetsSource/removeOlderTweets'
import tweetsView from './tweetsView/TweetsViewReducer'
import Tweets from './DataSource'

const {dispatcher, stateObservable} = Store({
    tweetsView
})

tweetFeedToAction(Tweets, dispatcher)
removeOlderTweets(1000, 30000, dispatcher)

stateObservable.subscribe( app =>
    ReactDOM.render(
        <React.StrictMode>
            <App 
                dispatcher={dispatcher}
                app={app}
            />
        </React.StrictMode>,
        document.getElementById('root')
    )
)