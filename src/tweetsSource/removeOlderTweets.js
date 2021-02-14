import { interval } from 'rxjs'
import { map } from 'rxjs/operators'

let removeOlderTweets = (everyIntervalMillis, olderThanMillis, outputObservable) => {
    interval(everyIntervalMillis).pipe(map(i => ({
        type: "TweesView/RemoveTweets",
        payload: new Date().getTime() - olderThanMillis
    }))).subscribe( action => outputObservable.next(action))
}

export default removeOlderTweets