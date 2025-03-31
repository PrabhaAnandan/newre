export default function SecondaryBtn(props){
    return(
        <button onClick={props.funcact} className="sec-btn">{props.btntext}</button>
    )
}