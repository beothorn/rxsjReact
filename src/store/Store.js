import { tap, scan, shareReplay } from 'rxjs/operators'
import { Subject } from 'rxjs'
import Immutable from 'immutable'

const DEBUG_ACTIONS = false
const DEBUG_STATE = false

const store = (reducers) => {
    let initialState = Immutable.fromJS({})

    for (const reducer in reducers) {
        initialState = initialState.set(reducer, reducers[reducer](undefined, {type:"LoadInitialState", payload:""}))
    }

    const dispatcher = new Subject()

    const reduce = (state, action) => {
        let newState = state
        for (const reducerName in reducers) {
            newState = newState.set(
                reducerName, 
                reducers[reducerName](state.get(reducerName), action)
            )
        }
        return newState
    }

    let stateObservable = dispatcher.pipe(
        tap(val =>{if(DEBUG_ACTIONS){
            console.log(`Action: ${JSON.stringify(val)}`)
        }}),
        scan(reduce, initialState),
        tap(val =>{if(DEBUG_STATE){
            console.log(`State: ${JSON.stringify(val)}`) 
        }}),
        shareReplay(1)
    )

    /*
      Before there are any observers, make this hot to render and test,
      this way when an observers subscribes, shareReplay already pipes
      the last state
    */
    stateObservable.subscribe( () => {})
    dispatcher.next({type:"HeatState", payload:""})

    return {dispatcher, stateObservable}
}

export default store