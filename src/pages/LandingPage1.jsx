import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../components/PrimaryBtn";




function AdminCard() {
    const navigate = useNavigate();
    return (
        <div 
            className="card admin-card"
            onClick={() => navigate('/admin/login')}
        >
            <h2>Admin</h2>
            <p>Click to navigate</p>
        </div>
    );
}

function ConductorCard() {
    const navigate = useNavigate();
    return (
        <div 
            className="card conductor-card"
            onClick={() => navigate('/conductor/login')}
        >
            <h2>Conductor</h2>
            <p>Click to navigate</p>
        </div>
    );
}

function UserCard() {
    const navigate = useNavigate();
    return (
        <div 
            className="card user-card"
            onClick={() => navigate('/login')}
        >
            <h2>User</h2>
            <p>Click to navigate</p>
        </div>
    );
}


export default function LandingPage1(){

    const navigate = useNavigate();
    const goToLogin = () =>{
        navigate('/login')
    }
    const goToConLogin = () =>{
        navigate('/conductor/login')
    }
    const goToAdminLogin = () =>{
        navigate('/admin/login')
    }

    return(
        
        <div className="landing-page">
            <div className="role-selection-container">
            <div className="card-grid">
                <AdminCard/>
                <UserCard/>
                <ConductorCard/>
        <PrimaryBtn  funcact={goToLogin} btntext="User Login"/>
        <PrimaryBtn  funcact={goToConLogin} btntext="Conductor Login"/>
        <PrimaryBtn  funcact={goToAdminLogin} btntext="Admin Login"/>
        </div>
        </div>
        </div>
    )
}

