import { interval, merge } from 'rxjs'
import { map } from 'rxjs/operators'

const createTweetSource = (frequency, account, attribute) => {
    return interval(frequency).pipe(map(i => ({
        account,
        timestamp: Date.now(),
        content: `${attribute} Tweet number ${i + 1}`
    })));
}
const tweets = merge(
    createTweetSource(5000, 'AwardsDarwin', 'Facepalm'),
    createTweetSource(3000, 'iamdevloper', 'Expert'),
    createTweetSource(5000, 'CommitStrip', 'Funny')
);

export default tweets