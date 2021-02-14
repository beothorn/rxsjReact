import Immutable from 'immutable'
import TweetsViewReducer from './TweetsViewReducer'

const initialState = Immutable.fromJS({
    likedCounter: 0,
    tweetsVisibility: "All",
    tweets: Immutable.fromJS([])
})

test('Initial state', () => {
    const actual = TweetsViewReducer(undefined, {type: "foo", payload: "bar"})
    expect(actual).toStrictEqual(initialState)
})

test('Add tweet', () => {
    const actual = TweetsViewReducer(initialState, {type: "TweesView/AddTweet", payload: {
        account: "Foo",
        timestamp: new Date(2020, 2, 25, 3, 35, 0).getTime(),
        content: "My name is Alex!",
        liked: false
    }})
    expect(actual.get("tweets").toJS()).toStrictEqual([{
        account: "Foo",
        timestamp: new Date(2020, 2, 25, 3, 35, 0).getTime(),
        content: "My name is Alex!",
        liked: false
    }])
})

test('Remove tweets older than', () => {
    let state = initialState.update("tweets", tweets => tweets.push({
        account: "Foo",
        timestamp: new Date(2020, 1, 1, 1, 1, 1).getTime(),
        content: "This is deleted",
        liked: false
    })).update("tweets", tweets => tweets.push({
        account: "Foo",
        timestamp: new Date(2020, 10, 10, 10, 10, 10).getTime(),
        content: "This is NOT deleted!",
        liked: false
    }))

    const actual = TweetsViewReducer(state, {type: "TweesView/RemoveTweets", payload: new Date(2020, 5, 5, 5, 5, 5).getTime()})

    expect(actual.get("tweets").toJS()).toStrictEqual([{
        account: "Foo",
        timestamp: new Date(2020, 10, 10, 10, 10, 10).getTime(),
        content: "This is NOT deleted!",
        liked: false
    }])
})

test('Clear tweets', () => {
    let state = initialState.update("tweets", tweets => tweets.push({
        account: "Foo",
        timestamp: new Date(2020, 1, 1, 1, 1, 1).getTime(),
        content: "This is deleted",
        liked: false
    })).update("tweets", tweets => tweets.push({
        account: "Foo",
        timestamp: new Date(2020, 10, 10, 10, 10, 10).getTime(),
        content: "This is NOT deleted!",
        liked: false
    }))

    state = state.set("likedCounter", 1)

    const actual = TweetsViewReducer(state, {type: "TweesView/ClearTweets"})

    expect(actual.get("likedCounter")).toBe(0)

    expect(actual.get("tweets").toJS()).toStrictEqual([])
})

test('Remove tweets older than', () => {
    let state = initialState.update("tweets", tweets => tweets.push({
        account: "Foo",
        timestamp: new Date(2020, 1, 1, 1, 1, 1).getTime(),
        content: "This is deleted",
        liked: true
    })).update("tweets", tweets => tweets.push({
        account: "Foo",
        timestamp: new Date(2020, 10, 10, 10, 10, 10).getTime(),
        content: "This is NOT deleted!",
        liked: false
    }))

    state = state.set("likedCounter", 1)

    const actual = TweetsViewReducer(state, {type: "TweesView/RemoveTweets", payload: new Date(2020, 5, 5, 5, 5, 5).getTime()})

    expect(actual.get("likedCounter")).toBe(0)

    expect(actual.get("tweets").toJS()).toStrictEqual([{
        account: "Foo",
        timestamp: new Date(2020, 10, 10, 10, 10, 10).getTime(),
        content: "This is NOT deleted!",
        liked: false
    }])
})

test('Like one tweet', () => {
    const timestamp = new Date(2020, 1, 1, 1, 1, 1).getTime()

    let state = initialState.update("tweets", tweets => tweets.push({
        account: "Foo",
        timestamp: timestamp,
        content: "This is going to get a like",
        liked: false
    }))

    const actual = TweetsViewReducer(state, {type: "TweesView/LikeTweet", payload: timestamp})

    expect(actual.get("likedCounter")).toBe(1)

    expect(actual.get("tweets").toJS()).toStrictEqual([{
        account: "Foo",
        timestamp: timestamp,
        content: "This is going to get a like",
        liked: true
    }])
})

test('Unlike one tweet', () => {
    const timestamp = new Date(2020, 1, 1, 1, 1, 1).getTime()

    let state = initialState.update("tweets", tweets => tweets.push({
        account: "Foo",
        timestamp: timestamp,
        content: "This is going to lose a like",
        liked: true
    }))

    state = state.set("likedCounter", 1)

    const actual = TweetsViewReducer(state, {type: "TweesView/UnlikeTweet", payload: timestamp})

    expect(actual.get("likedCounter")).toBe(0)

    expect(actual.get("tweets").toJS()).toStrictEqual([{
        account: "Foo",
        timestamp: timestamp,
        content: "This is going to lose a like",
        liked: false
    }])
})

test('Change visibility', () => {
    const actual = TweetsViewReducer(initialState, {type: "TweesView/ToggleView", payload: "Liked"})
    expect(actual.toJS().tweetsVisibility).toStrictEqual("Liked")
})

test('Tweets should be inserted on the beginning of the list', () => {
    let state = initialState
    state = TweetsViewReducer(state, {type: "TweesView/AddTweet", payload: {
        account: "Should be second",
        timestamp: 1,
        content: "Should be second",
        liked: false
    }})
    state = TweetsViewReducer(state, {type: "TweesView/AddTweet", payload: {
        account: "Should be first",
        timestamp: 2,
        content: "Because it is newer",
        liked: false
    }})

    expect(state.get("tweets").toJS()).toStrictEqual([{
            account: "Should be first",
            timestamp: 2,
            content: "Because it is newer",
            liked: false
        },{
            account: "Should be second",
            timestamp: 1,
            content: "Should be second",
            liked: false
        }
    ])
})