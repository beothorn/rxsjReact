import { fireEvent, render, screen } from '@testing-library/react'
import TweetsVisibilityToggler from './TweetsVisibilityToggler'
import { Subject } from 'rxjs'

test('renders TweetsVisibilityToggler with liked selected', () => {
    render(<TweetsVisibilityToggler selected="Liked"/>)
    expect(screen.getByText("Liked")).toHaveClass("toggleSelected")
    expect(screen.getByText("All")).toHaveClass("toggleNotSelected")
})

test('renders TweetsVisibilityToggler with all selected', () => {
    render(<TweetsVisibilityToggler selected="All"/>)
    expect(screen.getByText("Liked")).toHaveClass("toggleNotSelected")
    expect(screen.getByText("All")).toHaveClass("toggleSelected")
})

test('Toggle TweetsVisibilityToggler to liked', done => {
    const dispatcher = new Subject()
    render(<TweetsVisibilityToggler 
        dispatcher={dispatcher}
        selected="All"
    />)

    dispatcher.subscribe( action => {
        expect(action).toStrictEqual({
            type: "TweesView/ToggleView",
            payload: "Liked"
        })
        done()
    })

    fireEvent.click(screen.getByText("Liked"))
})

test('Toggle TweetsVisibilityToggler to all', done => {
    const dispatcher = new Subject()
    render(<TweetsVisibilityToggler 
        dispatcher={dispatcher}
        selected="Liked"
    />)

    dispatcher.subscribe( action => {
        expect(action).toStrictEqual({
            type: "TweesView/ToggleView",
            payload: "All"
        })
        done()
    })

    fireEvent.click(screen.getByText("All"))
})