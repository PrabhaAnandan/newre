import { useSelector } from "react-redux";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { Dashboard, DoneAll, Info, LocalActivity, Person, Restore } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";

export default function History(){


    const firestoreDb = getFirestore(firebaseApp);

    const getNewreUser = useSelector((state)=>state.newreUserData);
    const userId = getNewreUser?.uid;
    const [userProfile,setUserProfile] = useState();


     const fetchUserData = async(uid)=>{
                try {
                    const newreUserDetails = await getDoc(doc(firestoreDb, "User",uid));
                    const newreUserDetailsData = newreUserDetails.data();
                    setUserProfile(newreUserDetailsData);
                    console.log("from the user history page");
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
                <div className="pass-page-title">
                        <div className="pass-page-title-left">
                        <h2 className="text-subhead">Pass History</h2>
                        <p className="text-normal">It will show your tickets</p>
                        </div>
                        <Link to="/terms"><Info className="terms"/></Link>
                </div>

                <div className="pass-history-details-cont">
                    {userProfile?.pass?.length > 0 ? (
                        [...userProfile.pass].reverse().map((passItem, index) => (
                            <div key={index} className="pass-history-details">
                                <div className="pass-history-details-left">
                                    <h2 className="pass-history-route-title">{passItem?.busRoute?.from} - {passItem?.busRoute?.to}</h2>
                                    <p className="pass-history-route-datetime">{passItem.date}, {passItem.time}</p>
                                </div>
                                <div className="pass-history-status-cont"><DoneAll className=" " /><p className="pass-history-status-text">Paid</p></div>
                            </div>
                        ))
                    ) : (
                        <p className="text-normal">No pass history available.</p>
                    )}
                </div>

                <BottomNav 
                     navPaths={["/home", "/passhome", "/history", "/profile"]}
                     navLabels={["Home", "Pass", "History", "Profile"]}
                     navIcons = {[<Dashboard/>, <LocalActivity/>,<Restore/>, <Person/>]}
                />

        </div>
    )
}