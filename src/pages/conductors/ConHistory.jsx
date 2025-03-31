import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Dashboard, DoneAll, Info, Person, Restore, Verified } from "@mui/icons-material";
import AppPrimaryBtn from "../../components/AppPrimaryBtn";
import BottomNav from "../../components/BottomNav";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function ConHistory(){

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
                    <div className="pass-page-title">
                                            <div className="pass-page-title-left">
                                            <h2 className="text-subhead">Pass History</h2>
                                            <p className="text-normal">It will show your tickets</p>
                                            </div>
                                            <Link to="/conductor/terms"><Info className="terms"/></Link>
                                    </div>
                    
                                    <div className="pass-history-details-cont">
                                        {userProfile?.passverify?.length > 0 ? (
                                            [...userProfile.passverify].reverse().map((passItem, index) => (
                                                <div key={index} className="pass-history-details">
                                                    <div className="pass-history-details-left">
                                                        <h2 className="pass-history-route-title">{passItem?.name} - {passItem?.selectedPass}</h2>
                                                        <p className="pass-history-route-datetime">{passItem.date}, {passItem.time}</p>
                                                    </div>
                                                    <div className="pass-history-status-cont"><DoneAll className=" " /><p className="pass-history-status-text">Checked</p></div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-normal">No pass history available.</p>
                                        )}
                                    </div>

                    <BottomNav
                        navPaths={["/conductor/home", "/conductor/passverify", "/conductor/history", "/conductor/profile"]}
                        navLabels={["Home", "Verify", "History", "Profile"]}
                        navIcons = {[<Dashboard/>, <Verified/>,<Restore/>, <Person/>]}
                    />
    
            </div>
        )
}