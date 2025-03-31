export default function PrimaryBtn(props){
    return(
        <button onClick={props.funcact} className="primary-btn">{props.btntext}</button>
    )
}