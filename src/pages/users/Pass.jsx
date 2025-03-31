import { useSelector } from "react-redux";
import Header from "../../components/Header";
import BottomNav from "../../components/BottomNav";
import { Dashboard, History, Info, LocalActivity, Person, Restore} from "@mui/icons-material";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useState } from "react";
import {passPrice} from "../../config/passPrice";
import { chennaiBusRoutes} from "../../config/chennaiRoutes";
import PrimaryBtn from "../../components/PrimaryBtn";
import { firebaseApp } from "../../config/firebase";
import { arrayUnion, doc, getFirestore, updateDoc } from "firebase/firestore";
import SecondaryBtn from "../../components/SecondaryBtn";
import CryptoJS from "crypto-js";
import AppPrimaryBtn from "../../components/AppPrimaryBtn";
import AppSecondaryBtn from "../../components/AppSecondaryBtn";


export default function Pass(){

    const firestoreDb = getFirestore(firebaseApp)


    const navigate = useNavigate();

    const getNewreUser = useSelector((state)=>state.newreUserData);
    const [userKind,setUserKind] = useState('school');
    const [routePoint, setRoutePoint] = useState('twoPoint');
    const[busRoute, setBusRoute] = useState('');
    const [selectedPass, setSelectedPass] = useState('');
    
    function calculateFutureDate(startDate, period) {
        let date = new Date(startDate);
    
        switch (period.toLowerCase()) {
            case "monthly":
                date.setMonth(date.getMonth() + 1);
                break;
            case "quaterly":
                date.setMonth(date.getMonth() + 3);
                break;
            case "annual":
                date.setFullYear(date.getFullYear() + 1);
                break;
            default:
                throw new Error("Invalid period. Use 'monthly', 'quaterly', or 'annual'.");
        }
        return date.toISOString().split('T')[0]; // Returns "YYYY-MM-DD"
    }


    
    const encrytData = (data) =>{
        const secretKey = "b7!A$df1@Gz9xLqP4mT8vW#Y2sR6NcKd";
        const jsonData = JSON.stringify(data);
        const hashedData = CryptoJS.AES.encrypt(jsonData,secretKey).toString();
        console.log("hashedData",hashedData);
        return hashedData;
      }


    const passSelected = async (event) => {
        event.preventDefault();
        if (!getNewreUser?.uid) {
            console.error("User UID not found");
            return;
        }

        const now = new Date();
        const date = now.toISOString().split('T')[0]; // YYYY-MM-DD format
        const time = now.toTimeString().split(' ')[0]; // HH:MM:SS format
        const validTo = calculateFutureDate(date, selectedPass);

        const passInformation = {
                    name:getNewreUser.userName,
                    uid:getNewreUser.uid,
                    userKind: userKind,
                   routePoint: routePoint,
                     busRoute: busRoute,
                     selectedPass: selectedPass,
                    date:date,
                     time:time,
                     validTo:validTo,
                 };

        const passId = encrytData(passInformation);

        const passData = {
            name:getNewreUser.userName,
            uid:getNewreUser.uid,
            userKind: userKind,
           routePoint: routePoint,
             busRoute: busRoute,
             selectedPass: selectedPass,
            date:date,
             time:time,
             validTo:validTo,
             passId:passId,
         };

        try {
            console.log("The user", getNewreUser.uid)
            const userDocRef = doc(firestoreDb, "User", getNewreUser.uid);
            await updateDoc(userDocRef, {
                pass: arrayUnion(passData) // Adds new pass data while keeping existing data
            });

            console.log("Pass updated successfully:", passData);
            navigate('/passsucced');
        } catch (error) {
            console.error("Error updating pass:", error);
        }
    };

    const gotoPassHome=()=>{
        navigate('/passhome');
    }


        
        return(
            <div className="page pass-page">
                    <Header/>
                    <div className="pass-page-title">
                        <div className="pass-page-title-left">
                        <h2 className="text-subhead">Apply your pass</h2>
                        <p className="text-normal">Select the pass as per your need</p>
                        </div>
                        <Link to="/terms"><Info className="terms"/></Link>
                    </div>
                    <hr className="text-sep" />
                    <div className="pass-page-form">
                    <div className="pass-form-select-wrapper userKind">
                        <label htmlFor="isStudent" className="pass-form-label ">How are you?</label>
                        <select className="pass-form-select" required  name="userKind" onChange={(e)=>setUserKind(e.target.value)}>
                        <option className="pass-form-option" value="school">I'm a School Student</option>
                            <option className="pass-form-option" value="college">I'm a College Student</option>
                            <option className="pass-form-option" value="general">I'm a General Bus Commuter</option>
                        </select>
                    </div>
                    <div className="pass-form-select-wrapper routePoints">
                        <label htmlFor="isStudent" className="pass-form-label ">How many bus you may exchane?</label>
                        <select className="pass-form-select" required  name="routePoint" 
                            onChange={(e)=>{
                                setRoutePoint(e.target.value);
                                setBusRoute(null);
                        }}>
                        <option className="pass-form-option" value="twoPoint">Two Buses</option>
                            <option className="pass-form-option" value="threePoint">Three Buses</option>
                        </select>
                    </div>

                    <div className="pass-price-wrapper passPrice">
                        <label htmlFor="selectPass" className="pass-price-title-label ">Select your pass</label>
                        <div className="pass-price-btn-cont">
                        <div className={`pass-price-btn ${selectedPass === "monthly" ? "active" : ""}`}
                             onClick={() => setSelectedPass("monthly")}>
                            <img className="pass-price-img" src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f4a7/512.gif" alt="💧" width="32" height="32" />
                            <p className="pass-price-value">₹{passPrice?.[userKind]?.[routePoint]?.monthly || "N/A"}/-</p>
                            <p className="pass-price-label">Monthly</p>
                        </div>
                        <div className={`pass-price-btn ${selectedPass === "quaterly" ? "active" : ""}`}
                             onClick={() => setSelectedPass("quaterly")}>
                            <img className="pass-price-img" src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f331/512.gif" alt="🌱" width="32" height="32" />
                            <p className="pass-price-value">₹{passPrice?.[userKind]?.[routePoint]?.quaterly || "N/A"}/-</p>
                            <p className="pass-price-label" >Quaterly</p>
                        </div>
                        <div className={`pass-price-btn ${selectedPass === "annual" ? "active" : ""}`}
                             onClick={() => setSelectedPass("annual")}>
                            <img className="pass-price-img" src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f490/512.gif" alt="💐" width="32" height="32" />
                            <p className="pass-price-value" >₹{passPrice?.[userKind]?.[routePoint]?.annual || "N/A"}/-</p>
                            <p className="pass-price-label" >Annualy</p>
                        </div>
                        </div>
                    </div>

                {routePoint === "twoPoint" && (
                    <div className="pass-form-select-wrapper twoRoutePoints pointsWrapper">
                        <label htmlFor="twoRoutePoints" className="pass-form-label pass-select-label">
                        Select your Bus Routes
                        </label>
                        <select
                            className="pass-form-select"
                            required
                            onChange={(e) => setBusRoute(chennaiBusRoutes.twoPoint[e.target.value])}
                        >
                            <option value="">Select a Route</option>
                            {chennaiBusRoutes.twoPoint.map((route, index) => (
                                <option key={index} value={index}>
                                    {route.from} → {route.to}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {routePoint === "threePoint" && (
                    <div className="pass-form-select-wrapper threeRoutePoints ">
                        <label htmlFor="threeRoutePoints" className="pass-form-label pass-select-label">
                            Select your Bus Routes
                        </label>
                        <select
                            className="pass-form-select"
                            required
                            onChange={(e) => setBusRoute(chennaiBusRoutes.threePoint[e.target.value])}
                        >
                            <option value="">Select a Route</option>
                            {chennaiBusRoutes.threePoint.map((route, index) => (
                                <option key={index} value={index}>
                                    {route.from} → {route.via} → {route.to}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="pass-proceed-btn">
                <AppSecondaryBtn funcact={gotoPassHome} btntext="Cancel"/>
                    <AppPrimaryBtn funcact={passSelected} btntext="Proceed"/>
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