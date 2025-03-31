export default function AppSecondaryBtn(props){
    return(
        <button onClick={props.funcact} className="app-sec-btn">{props.btntext}</button>
    )
}