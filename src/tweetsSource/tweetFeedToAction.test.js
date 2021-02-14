import { Subject } from 'rxjs'
import tweetFeedToAction from './tweetFeedToAction'

test('Raw tweet enters, action leaves', done => {

    const input = new Subject()
    const output = new Subject()

    tweetFeedToAction(input, output)

    output.subscribe( action => {
        expect(action).toStrictEqual({
            type: "TweesView/AddTweet",
            payload: {
                account: "Foo",
                content: "Ok",
                liked: false,
                timestamp: new Date(2020, 2, 25, 3, 30, 0).getTime(),
            }
        })
        done()
    })

    input.next({
        account: "Foo",
        content: "Ok",
        timestamp: new Date(2020, 2, 25, 3, 30, 0).getTime(),
    })
})