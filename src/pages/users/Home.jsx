import { useSelector } from "react-redux"
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { AccessTimeFilled, History, Info, LocalActivity, LocationOn, Person, Verified, Dashboard, Restore } from "@mui/icons-material";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";
import { useEffect, useState } from "react";
import AppPrimaryBtn from "../../components/AppPrimaryBtn";


export default function Home (){



     const firestoreDb = getFirestore(firebaseApp);
    
    const navigate = useNavigate();

        const getNewreUser = useSelector((state)=> state.newreUserData);
        const userId = getNewreUser?.uid;
        const [currentPass,setCurrentPass] = useState();
        const [fromRoute,setFromRoute] = useState();
        const [toRoute, setToRoute] = useState();
        const[userName, setUserName] = useState();
        const[validFrom, setValidFrom] = useState("0000-00-00");
        const[validTo, setValidTo] = useState("0000-00-00");
        const[totalDays,setTotalDays] = useState();
         
    
        function toTitleCase(str) {
            return str
              .toLowerCase()
              .split(" ")
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          }

          function getDaysCount(fromDate, toDate) {
            // Ensure the format is strictly "YYYY-MM-DD"
            if (!/^\d{4}-\d{2}-\d{2}$/.test(fromDate) || !/^\d{4}-\d{2}-\d{2}$/.test(toDate)) {
              throw new Error("Invalid date format! Use YYYY-MM-DD.");
            }
          
            const from = new Date(fromDate);
            const to = new Date(toDate);
          
            // Calculate difference in milliseconds and convert to days
            const diffTime = Math.abs(to - from);
            return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          }

          const now = new Date();
          const todayDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    
        const fetchUserData = async(uid)=>{
            try {
                const newreUserDetails = await getDoc(doc(firestoreDb, "User",uid));
                const newreUserDetailsData = newreUserDetails.data();
                setCurrentPass(toTitleCase(newreUserDetailsData.pass.at(-1).selectedPass));
                setFromRoute(newreUserDetailsData.pass.at(-1).busRoute.from)
                setToRoute(newreUserDetailsData.pass.at(-1).busRoute.to)
                setValidFrom(newreUserDetailsData.pass.at(-1).date);
                setValidTo(newreUserDetailsData.pass.at(-1).validTo);
    
    
    
            } catch (error) {
                console.error("From fetchUserData(): ", error);
            }
        }
    
       useEffect(() => {
            if (userId) {
                fetchUserData(userId);
            }
        }, [userId]);

        const goToPass = () =>{
            navigate('/pass')
        }
        const goToQRCode = () =>{
            navigate('/passhome')
        }
        
    return(
        <div className="page pass-page">
                <Header/>
                <div className="pass-card-cont">
                    <div className="pass-page-title">
                            <div className="pass-page-title-left">
                            <h2 className="text-subhead">Hi,{getNewreUser.userName} </h2>
                            <p className="text-normal">Welcome to the Newre App</p>
                            </div>
                            <Link to="/terms"><Info className="terms"/></Link>
                    </div>
                    <div className="pass-card">
                            <p className="pass-card-title">{currentPass} Bus Pass</p>
                            <p className="pass-card-icon-cont pass-card-route" >
                                <LocationOn className="pass-card-icon"/>{fromRoute} - {toRoute}</p>
                            <div className="pass-card-detail-cont">
                                <div className="pass-card-validTo pass-card-detail">
                                    <p className="pass-card-icon-cont pass-card-subtext"><Verified className="pass-card-icon"/> Valid until</p>
                                    <p className="pass-card-hightext">{validTo}</p>
                                </div>
                                <div className="pass-card-daysRemain pass-card-detail">
                                    <p className="pass-card-icon-cont pass-card-subtext"><AccessTimeFilled className="pass-card-icon"/> Days Remaining</p>
                                    <p className="pass-card-hightext">{getDaysCount(todayDate,validTo)} Days</p>
                                </div>
                            </div>
                            <p className="pass-card-validity pass-card-subtext">Bus Pass Validity for {getDaysCount(validFrom,validTo)} Days</p>

                    </div>
                    <br></br>
                    <div className="pass-proceed-btn">
                        <AppPrimaryBtn funcact={goToQRCode} btntext="Show QR Pass"/>
                        <AppPrimaryBtn funcact={goToPass} btntext="Renew Pass"/>
                    </div>
                </div>
                <BottomNav 
                    navPaths={["/home", "/passhome", "/history", "/profile"]}
                    navLabels={["Home", "Pass", "History", "Profile"]}
                    navIcons = {[<Dashboard/>, <LocalActivity/>,<Restore/>, <Person/>]}
                />

        </div>
    )
}