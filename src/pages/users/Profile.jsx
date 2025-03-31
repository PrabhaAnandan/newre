import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import { Dashboard, Info, LocalActivity, Person, Restore, Verified } from "@mui/icons-material";
import BottomNav from "../../components/BottomNav";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import AppSecondaryBtn from "../../components/AppSecondaryBtn";

export default function Profile() {
    const firestoreDb = getFirestore(firebaseApp);
    const getNewreUser = useSelector((state) => state.newreUserData);
    const userId = getNewreUser?.uid;

    const navigate = useNavigate();


    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async (uid) => {
        try {
            const newreUserDetails = await getDoc(doc(firestoreDb, "User", uid));
            if (newreUserDetails.exists()) {
                setUserProfile(newreUserDetails.data());
            } else {
                console.error("User data not found.");
            }
        } catch (error) {
            console.error("From fetchUserData(): ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchUserData(userId);
        } else {
            setLoading(false);
        }
    }, [userId]);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (!userProfile) {
        return <h2>User profile not found</h2>;
    }


    const gotoLandingPage=()=>{
        navigate('/');
    }

    return (
        <div className="page pass-page">
            <Header />
            <div className="pass-page-title">
                <div className="pass-page-title-left">
                    <h2 className="text-subhead">Profile Details</h2>
                    <p className="text-normal">Newre user profile details</p>
                </div>
                <Link to="/terms"><Info className="terms" /></Link>
            </div>
            <div className="pass-profile-details-cont">
                <div className="pass-profile-details"><label className="pass-history-route-datetime">User Name:</label><h2 className="pass-history-route-title">{userProfile.userName}</h2></div>
                <div className="pass-profile-details"><label className="pass-history-route-datetime" >User Id:</label><h2 className="pass-history-route-title">{userProfile.uid}</h2></div>
                <div className="pass-profile-details"><label className="pass-history-route-datetime" >Email:</label><h2 className="pass-history-route-title">{userProfile.email}</h2></div>
                <div className="pass-profile-details"><label className="pass-history-route-datetime">Date of Birth:</label><h2 className="pass-history-route-title">{userProfile.dob}</h2></div>
                <div className="pass-profile-details"><label className="pass-history-route-datetime">Gender:</label><h2 className="pass-history-route-title">{userProfile.gender}</h2></div>
                <div className="pass-profile-details"><label className="pass-history-route-datetime">Phone Number:</label><h2 className="pass-history-route-title">{userProfile.phoneNo}</h2></div>
                <div className="pass-profile-details"><label className="pass-history-route-datetime">Password:</label><h2 className="pass-history-route-title">{userProfile.password}</h2></div>
            </div>
            <AppSecondaryBtn funcact={gotoLandingPage} btntext="Logout"/>
            <BottomNav 
                                 navPaths={["/home", "/passhome", "/history", "/profile"]}
                                 navLabels={["Home", "Pass", "History", "Profile"]}
                                 navIcons = {[<Dashboard/>, <LocalActivity/>,<Restore/>, <Person/>]}
                            />
        </div>
    );
}
