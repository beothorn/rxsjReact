import TweetsView from './tweetsView/TweetsView'
import React from "react"

const App = ({ dispatcher, app }) => {    
  return <div className="App">
      <h1>Twitterlike</h1>
          <TweetsView 
              dispatcher={dispatcher}
              likedCounter = {app.getIn(["tweetsView", "likedCounter"])}
              tweetsVisibility = {app.getIn(["tweetsView", "tweetsVisibility"])}
              tweets = {app.getIn(["tweetsView", "tweets"])}
          />
    </div>
}

export default App