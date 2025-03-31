import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Dashboard, Gavel, Info, Person, QrCode2, Restore,Verified } from "@mui/icons-material";
import AppPrimaryBtn from "../../components/AppPrimaryBtn";
import BottomNav from "../../components/BottomNav";
import {useEffect, useRef, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import CryptoJS from "crypto-js";
import { firebaseApp } from "../../config/firebase";
import { arrayUnion, doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

export default function PassVerify(){


   const firestoreDb = getFirestore(firebaseApp);

   const getNewreUser = useSelector((state)=>state.newreUserData);

  const [scannedData, setScannedData] = useState(null);
  const [decryptedData, setDecryptedData] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);
  const [passVerifed,setPassVerified] = useState(null);


  const addVerifiedPass = async(decryptedData)=>{
    // event.preventDefault();
    if (!getNewreUser?.uid) {
      console.error("User UID not found");
      return;   
  }
   try {
              console.log("The user", getNewreUser.uid)
              const userDocRef = doc(firestoreDb, "Conductor", getNewreUser.uid);
              await updateDoc(userDocRef, {
                  passverify:arrayUnion(decryptedData) // Adds new pass data while keeping existing data
              });
  
              console.log("Pass updated successfully:", decryptedData);
          } catch (error) {
              console.error("Error updating pass:", error);
          }


  }

  
  const getVerifiedPass = async(decryptedData) =>{
   try {
    const  passScannedUserId = decryptedData.uid;
    const newreUserDetails = await getDoc(doc(firestoreDb, "User",passScannedUserId));
     const newreUserDetailsData = newreUserDetails.data();
    
     const latestPassDb = newreUserDetailsData.pass.at(-1).selectedPass;
     const validFromDb = newreUserDetailsData.pass.at(-1).date;
     const validToDb = newreUserDetailsData.pass.at(-1).validTo;
    const latestPassQr = decryptedData.selectedPass;
    const validFromQr = decryptedData.date;
    const validToQr = decryptedData.validTo;
    const currentDate = new Date().toISOString().split("T")[0];
    if (
      (latestPassDb === latestPassQr) &&
    (validFromDb === validFromQr) &&
     (validToDb === validToQr) //&&
    // ( validFromDb >= currentDate)
  ) {
      addVerifiedPass(decryptedData);
      console.log("Verified");
      setPassVerified("Valid");

  } else {
      console.log("Not Verified");
      setPassVerified("Not Valid");
  }

     console.log("The user in the from db", newreUserDetailsData)
     console.log("The user in the QR",decryptedData);
   } catch (error) {
    console.error("from addVerifiedPass()",error);
   } 
  }




  const secretKey = "b7!A$df1@Gz9xLqP4mT8vW#Y2sR6NcKd";

  const decryptData = (encryptedText) => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
      const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedText ? JSON.parse(decryptedText) : null;
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  };

  const handleVerify = async()=>{
      if (!scannedData) {
        console.log("❌ No QR Code scanned.");
        return;
      }

      const decrypted = decryptData(scannedData);
      if (decrypted) {
        console.log("the handleverify",decrypted);
        setDecryptedData(decrypted);
        getVerifiedPass(decrypted);
      //   setVerificationMessage("✅ QR Code is valid.");
      } else {
        setDecryptedData(null);
      //   setVerificationMessage("❌ Invalid QR Code.");
      }
  }

  const startScanner = () => {
    if (isScanning || scannerRef.current) return;

    setIsScanning(true);

    const scanner = new Html5QrcodeScanner("qr-reader", {
      fps: 30,
      qrbox: 250,
      disableFlip: false,
      rememberLastUsedCamera: true,
    });

    scanner.render(
      (decodedText) => {
        setScannedData(decodedText);
        stopScanner();
        handleVerify();
      },
      (error) => {
        console.warn("QR Scan Error:", error);
      }
    );

    scannerRef.current = scanner;
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current
        .clear()
        .then(() => {
          setIsScanning(false);
          scannerRef.current = null;
        })
        .catch((err) => console.warn("Error stopping scanner:", err));
    }
  };



  useEffect(() => {
    handleVerify();
  }, [scannedData]);


    return(
            <div className="page pass-page">
                    <Header/>
                    <div className="pass-card-cont">
                        <div className="pass-page-title">
                                <div className="pass-page-title-left">
                                <h2 className="text-subhead">Pass Verfier</h2>
                                <p className="text-normal">Secured way to verifiy the pass</p>
                                </div>
                                <Link to="/admin/terms"><Info className="terms" /></Link>
                        </div>
                        <div className="pass-verified-details">
                        {/* Scanned Data */}
                        {/* {scannedData && (
                                <div className="pass-scanned">
                                  <QrCode2 className="pass-scanned-icon"/>
                                  <h3 className="pass-scanned-text">Scanned Successfull</h3>
                                </div>
                              )} */}
                        </div>
                        <div className="pass-verified-details">
                        {/* Scanned Data */}
                        {passVerifed && (
                                <div className="pass-ticket-verified">
                                    <Verified className="pass-ticket-verified-status-icon"/>
                                  <div className="pass-ticket-verified-cont">
                                <p className="pass-ticket-verified-text">Name :<b>{decryptedData.name}</b></p>
                                <p className="pass-ticket-verified-text">Pass Plan: <b>{decryptedData.selectedPass}Pass</b></p>
                                <p className="pass-ticket-verified-text">Valid From: <b>{decryptedData.date}</b></p>
                                <p className="pass-ticket-verified-text">Valid To: <b>{decryptedData.validTo}</b></p>
                                </div>
                            </div>
                              )}
                        </div>

                        {/* Live Camera Preview */}
                        <div id="qr-reader" style={{ width: "100%", maxWidth: "400px", margin: "auto" }}></div>

                         {/* Scanner Start/Stop */}
                        <div className="pass-proceed-btn">
                            {isScanning ? (
                                <AppPrimaryBtn funcact={stopScanner}  btntext="⛔ Stop Scanner"/>) :
                                (<AppPrimaryBtn funcact={startScanner} btntext="📷 Start Scanning"/>
                            )}
                        </div>
                    </div>
                    <BottomNav 
                                    navPaths={["/admin/home", "/admin/passverify","/admin/terms", "/admin/profile", ]}
                                    navLabels={["Home", "Verify","Terms", "Profile"]}
                                    navIcons = {[<Dashboard/>, <Verified/>,<Gavel/>, <Person/>]}
                                />
    
            </div>
        )
}