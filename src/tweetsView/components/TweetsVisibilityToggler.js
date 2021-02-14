const toggleSelected = "toggleSelected"
const toggleNotSelected = "toggleNotSelected"

const tweetsVisibilityToggler = ({ dispatcher, selected }) => 
    <p>Show: 
        <span className={selected === "All" ? toggleSelected : toggleNotSelected} onClick={
            () => dispatcher.next({type: "TweesView/ToggleView", payload: "All"})
        }>All</span>
        <span className={selected === "Liked" ? toggleSelected : toggleNotSelected} onClick={
            () => dispatcher.next({type: "TweesView/ToggleView", payload: "Liked"})
        }>Liked</span> 
    </p>

export default tweetsVisibilityToggler