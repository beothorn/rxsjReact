import Store from "./Store"
import { Subject } from 'rxjs'
import Immutable from 'immutable'

test('Reducer must reduce', done => {
    let {dispatcher, stateObservable} = Store({
        subcomponentReducer: (state = Immutable.fromJS({"actionsLog": ""}), {type, payload}) => {
            const previous = state.get("actionsLog")
            return state.set("actionsLog", `${previous}(${type}: ${payload})`)
        }
    })

    dispatcher.next({
        type: "aaa",
        payload: "bar"
    })

    dispatcher.next({
        type: "bbb",
        payload: "foo"
    })

    stateObservable.subscribe( state => {
        expect(state.toJS()).toStrictEqual({
            subcomponentReducer: {
                "actionsLog": "(LoadInitialState: )(HeatState: )(aaa: bar)(bbb: foo)"
            }
        })
        done()
    })
})

test('We have a initial state from reducer', done => {
    let {dispatcher, stateObservable} = Store({
        subcomponentReducer: (state = Immutable.fromJS({"initial": "state"}), {type, payload}) => {
            return state
        }
    })

    stateObservable.subscribe( state => {
        expect(state.toJS()).toStrictEqual({
            subcomponentReducer: {
                "initial": "state"
            }
        })
        done()
    })
})