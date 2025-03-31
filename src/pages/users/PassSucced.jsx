import { useNavigate } from "react-router-dom";
import AppPrimaryBtn from "../../components/AppPrimaryBtn";
import { useSelector } from "react-redux";



export default function PassSucced(){


    const navigate = useNavigate();
    const getNewreUser = useSelector((state)=> state.newreUserData);
    const userName = getNewreUser?.userName;

    const gotoPassHome=()=>{
        navigate('/passhome');
    }

    return(
        <div className="pass-succed-cont">
            <h2>Payment Succeded!</h2>
            <br />
            <p >your pass is already generated {userName}, so please do check</p>
            <br></br>
            <br />
            <AppPrimaryBtn funcact={gotoPassHome} btntext="Okay"/>
        </div>
    )
}