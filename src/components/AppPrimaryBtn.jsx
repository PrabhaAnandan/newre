export default function AppPrimaryBtn(props){
    return(
        <button onClick={props.funcact} className="app-primary-btn">{props.btntext}</button>
    )
}