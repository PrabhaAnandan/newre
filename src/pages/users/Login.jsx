import { Link } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import LoginHeader from "../../components/LoginHeader";


export default function Login(){
    return(
        <div className="form">
        <LoginForm role="User"/>
        <Link className="jumptopage" to='/reg'>Don't have a account? Then, Register here!</Link>
        <LoginHeader/>
        </div>
    )
}