import { fireEvent, render, screen } from '@testing-library/react'
import TweetList from './TweetList'
import Immutable from 'immutable'
import { Subject } from 'rxjs'

const renderList = (visibility, dispatcher) => {
    let tweets = Immutable.fromJS([])
    tweets = tweets.push({
        account: "Abed",
        timestamp: new Date(2020, 2, 25, 3, 24, 0).getTime(),
        content: "Cool. Cool cool cool.",
        liked: false
    })

    tweets = tweets.push({
        account: "Magnitude",
        timestamp: new Date(2020, 2, 25, 3, 30, 0).getTime(),
        content: "Pop pop!",
        liked: true
    })

    tweets = tweets.push({
        account: "Starburns",
        timestamp: new Date(2020, 2, 25, 3, 35, 0).getTime(),
        content: "My name is Alex!",
        liked: false
    })

    render(<TweetList 
        dispatcher={dispatcher}
        visibility={visibility}
        tweets={tweets}
    />)
}

test('When list is empty, show empty message', () => {
    render(<TweetList 
        visibility={"All"}
        tweets={Immutable.fromJS([])}
    />)
    expect(screen.getByText("No tweets")).toBeInTheDocument()
})

test('renders TweetList with one liked', () => {
    renderList("All")
    expect(screen.getByText("Abed")).toBeInTheDocument()
    expect(screen.getByText("Cool. Cool cool cool.")).toBeInTheDocument()
    expect(screen.getByText("tweeted at 25/03/2020 03:24:00")).toBeInTheDocument()

    expect(screen.getByText("Pop pop!")).toBeInTheDocument()
    expect(screen.getByText("Pop pop!").parentElement).toHaveClass("likedTweet")

    expect(screen.getByText("tweeted at 25/03/2020 03:30:00")).toBeInTheDocument()
    expect(screen.getByText("My name is Alex!")).toBeInTheDocument()
    expect(screen.getByText("tweeted at 25/03/2020 03:35:00")).toBeInTheDocument()
})

test('renders only liked', () => {
    renderList("Liked")

    expect(screen.queryByText("Cool. Cool cool cool.")).not.toBeInTheDocument()
    expect(screen.getByText("Pop pop!")).toBeInTheDocument()
    expect(screen.queryByText("My name is Alex!")).not.toBeInTheDocument()
})

test('like one tweet', done => {
    const dispatcher = new Subject()

    const timestamp = new Date(2020, 2, 25, 3, 24, 0).getTime()

    renderList("All", dispatcher)

    dispatcher.subscribe( action => {
        expect(action).toStrictEqual({
            type: "TweesView/LikeTweet",
            payload: timestamp
        })
        done()
    })

    fireEvent.click(screen.getByTestId("like-button-"+timestamp))
})

test('Unlike one tweet', done => {
    const dispatcher = new Subject()

    const timestamp = new Date(2020, 2, 25, 3, 30, 0).getTime()

    renderList("All", dispatcher)

    dispatcher.subscribe( action => {
        expect(action).toStrictEqual({
            type: "TweesView/UnlikeTweet",
            payload: timestamp
        })
        done()
    })

    fireEvent.click(screen.getByTestId("unlike-button-"+timestamp))
})


test('Clear tweets', done => {
    const dispatcher = new Subject()

    renderList("All", dispatcher)

    dispatcher.subscribe( action => {
        expect(action).toStrictEqual({type: "TweesView/ClearTweets"})
        done()
    })

    fireEvent.click(screen.getByText("Clear All"))
})