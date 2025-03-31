import {useSelector } from "react-redux";
import BottomNav from "../../components/BottomNav";
import Header from "../../components/Header";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import {QRCodeSVG} from "qrcode.react";
import { Dashboard, Info, LocalActivity, Person, Restore } from "@mui/icons-material";
import AppPrimaryBtn from "../../components/AppPrimaryBtn";
export default function PassHome(){
    
    const firestoreDb = getFirestore(firebaseApp);

    const getNewreUser = useSelector((state)=> state.newreUserData);
    const userId = getNewreUser?.uid;
    const [currentPass,setCurrentPass] = useState();
    const [fromRoute,setFromRoute] = useState();
    const [toRoute, setToRoute] = useState();
    const [passQrCode,setPassQrCode] = useState();
    const[validFrom, setValidFrom] = useState();
    const[validTo, setValidTo] = useState();
     

    function toTitleCase(str) {
        return str
          .toLowerCase()
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }


    const fetchUserData = async(uid)=>{
        try {
            const newreUserDetails = await getDoc(doc(firestoreDb, "User",uid));
            const newreUserDetailsData = newreUserDetails.data();
            setCurrentPass(toTitleCase(newreUserDetailsData.pass.at(-1).selectedPass));
            setFromRoute(newreUserDetailsData.pass.at(-1).busRoute.from)
            setToRoute(newreUserDetailsData.pass.at(-1).busRoute.to)
            setPassQrCode(newreUserDetailsData.pass.at(-1).passId);
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
    }, [userId]); // Runs when `userId` changes
    
    const navigate = useNavigate();

    const goToPass = () =>{
        navigate('/pass')
    }

    return(
        <div className="page pass-page">
            <Header/>
            <div className="pass-page-title">
                        <div className="pass-page-title-left">
                        <h2 className="text-subhead">Your Pass</h2>
                        <p className="text-normal">Show your ticket, while onboarding</p>
                        </div>
                        <Link to="/terms"><Info className="terms"/></Link>
            </div>
            <hr className="text-sep" />
            <div className="pass-ticket">
                <div class="pass-ticket-header">
                    <p className="pass-ticket-chip">Active Pass</p>
                    <p className="pass-ticket-title">{currentPass} Bus Pass</p>
                    <p className="pass-ticket-route">{fromRoute} - {toRoute}</p>
                </div>
            {passQrCode && <QRCodeSVG className="pass-ticket-qrcode" value={passQrCode} size={200}/>}
            <div className="pass-ticket-validity">
                <p className="pass-ticket-text">Name :<b>{getNewreUser.userName}</b></p>
                <p className="pass-ticket-text">Valid From: <b>{validFrom}</b></p>
                <p className="pass-ticket-text">Valid To: <b>{validTo}</b></p>
            </div>
            <p className="pass-ticket-terms">Show this QR code to the conductor for verification. </p> 
            </div>
            <br></br>
             <div className="pass-proceed-btn">
                <AppPrimaryBtn funcact={goToPass} btntext="Renew Pass"/>
            </div>
             <BottomNav 
                                  navPaths={["/home", "/passhome", "/history", "/profile"]}
                                  navLabels={["Home", "Pass", "History", "Profile"]}
                                  navIcons = {[<Dashboard/>, <LocalActivity/>,<Restore/>, <Person/>]}
                             />
        </div>
    )
}