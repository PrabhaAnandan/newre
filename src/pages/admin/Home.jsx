import React, { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebaseApp } from "../../config/firebase";
import Header from "../../components/Header";
import { Link } from "react-router-dom";
import { Dashboard, Info, Person, Verified, Gavel } from "@mui/icons-material";
import BottomNav from "../../components/BottomNav";
import { useSelector } from "react-redux";

const Home = () => {

     const firestoreDb = getFirestore(firebaseApp);
     const getNewreUser = useSelector((state) => state.newreUserData);
    const userId = getNewreUser?.uid;

  const [fileCount, setFileCount] = useState(0);
  const[conFileCount,setConFileCount] = useState(0);
  
  const fetchFileCount = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestoreDb, "User"));
      setFileCount(querySnapshot.size); // 'size' gives the number of documents
    } catch (error) {
      console.error("Error fetching file count:", error);
    }
  };

  const fetchConFileCount = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestoreDb, "Conductor"));
      setConFileCount(querySnapshot.size); // 'size' gives the number of documents
    } catch (error) {
      console.error("Error fetching file count:", error);
    }
  };

  useEffect(() => {

    fetchFileCount();
    fetchConFileCount();
  }, [fileCount,conFileCount]);

  return(
    <div className="page pass-page">
            <Header/>
            <div className="pass-card-cont">
                <div className="pass-page-title">
                        <div className="pass-page-title-left">
                        <h2 className="text-subhead">Hi,{getNewreUser.userName}</h2>
                        <p className="text-normal">Welcome to the Newre App</p>
                        </div>
                        <Link to="/admin/terms"><Info className="terms" /></Link>
                </div>
                <div className="pass-card">
                <p className="pass-card-icon">Total Number of Newre User</p>
                <h2 className="pass-con-card-title">
                    {fileCount}
                </h2>
                </div>
                <div className="pass-card">
                <p className="pass-card-icon">Total Number of Newre Conductor</p>
                <h2 className="pass-con-card-title">
                    {conFileCount}
                </h2>
                </div>

            </div>
            <BottomNav 
                navPaths={["/admin/home", "/admin/passverify","/admin/terms", "/admin/profile", ]}
                navLabels={["Home", "Verify","Terms", "Profile"]}
                navIcons = {[<Dashboard/>, <Verified/>,<Gavel/>, <Person/>]}
            />

    </div>
)
};

export default Home;
