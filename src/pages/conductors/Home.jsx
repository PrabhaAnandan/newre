import { Link } from "react-router-dom";
import Header from "../../components/Header";
import AppPrimaryBtn from "../../components/AppPrimaryBtn";
import BottomNav from "../../components/BottomNav";
import { Dashboard, Info, Person, Restore, Verified } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";

export default function Home (){

    const firestoreDb = getFirestore(firebaseApp);

    const getNewreUser = useSelector((state)=>state.newreUserData);
    const userId = getNewreUser?.uid;

    const [userProfile,setUserProfile] = useState();
    
    
         const fetchUserData = async(uid)=>{
                    try {
                        const newreUserDetails = await getDoc(doc(firestoreDb, "Conductor",uid));
                        const newreUserDetailsData = newreUserDetails.data();
                        setUserProfile(newreUserDetailsData);
                        console.log("from the con history page");
                        console.log(newreUserDetailsData)       
                    } catch (error) {
                        console.error("From fetchUserData(): ", error);
                    }
                }
            
               useEffect(() => {
                    if (userId) {
                        fetchUserData(userId);
                    }
                }, [userId]);


    return(
        <div className="page pass-page">
                <Header/>
                <div className="pass-card-cont">
                    <div className="pass-page-title">
                            <div className="pass-page-title-left">
                            <h2 className="text-subhead">Hi,{getNewreUser.userName}</h2>
                            <p className="text-normal">Welcome to the Newre App</p>
                            </div>
                            <Link to="/conductor/terms"><Info className="terms"/></Link>
                    </div>
                    <div className="pass-card">
                    <p className="pass-card-icon">Total count of the verification</p>
                    <h2 className="pass-con-card-title">
                        {userProfile?.passverify?.length ?? 0}
                    </h2>
                </div>

                </div>
                <BottomNav 
                    navPaths={["/conductor/home", "/conductor/passverify", "/conductor/history", "/conductor/profile"]}
                    navLabels={["Home", "Verify", "History", "Profile"]}
                    navIcons = {[<Dashboard/>, <Verified/>,<Restore/>, <Person/>]}
                />

        </div>
    )
}