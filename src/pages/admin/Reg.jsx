import { Link } from "react-router-dom";
import LoginHeader from "../../components/LoginHeader";
import RegForm from "../../components/RefFrom";


export default function Reg(){
    return(
        <div className="form">
        <RegForm role='Admin'/>
        <Link className="jumptopage" to='/admin/login'>Already have a account?, then sign in!</Link>
        <LoginHeader/>
        </div>
    )
}