import { Link } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader";
import RegForm from "../../components/RefFrom";


export default function Reg(){
    return(
        <div className="form">
        <RegForm role='Conductor'/>
        <Link className="jumptopage" to='/conductor/login'>Already have a account?, then sign in!</Link>
        <LoginHeader/>
        </div>
    )
}