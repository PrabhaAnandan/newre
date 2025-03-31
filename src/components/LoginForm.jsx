import { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../config/firebase";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginForm(props){

    const auth = getAuth(firebaseApp);
    const firestoreDb = getFirestore(firebaseApp);

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();


    const dispatchNewreUserData = useDispatch();
    const navigate = useNavigate();

    const fetchNewreUserData = async (uid) =>{
        try {
            const dbdocname = `${props.role}`;
            const newreUserDetails = await getDoc(doc(firestoreDb,dbdocname,uid));
            const newreUserDetailsData = newreUserDetails.data();
            const newreUserFetchedData = {
                "userName":newreUserDetailsData.userName,
                "uid": newreUserDetailsData.uid,
                "email": newreUserDetailsData.email,
                "phoneNo":newreUserDetailsData.phoneNo,

            }

            //dispatch the data to the store
            dispatchNewreUserData(
            {
                type:"newreUser",
                data: {
                    "userName":`${newreUserFetchedData.userName}`,
                    "email":`${newreUserFetchedData.email}`,
                    "uid":`${newreUserFetchedData.uid}`,
                    "phoneNo":`${newreUserFetchedData.phoneNo}`,
                }
            }
        )
        if(props.role === "User"){
            navigate('/home');
        }else{
            console.log('/'+props.role+'/home')
            navigate('/'+props.role+'/home')
        }          
            // navigate('/home')

            console.log("The fetched Data", newreUserFetchedData);

        } catch (err) {
            console.error("Error from fetchNewUserData(): ", err)
        }
    }

    const loginNewreUser = async(event)=>{
        event.preventDefault();
        try {
            const newreUser = await signInWithEmailAndPassword(auth,email,password);
            console.log("logged user:",newreUser.user.uid);
            fetchNewreUserData(newreUser.user.uid);
        } catch (err) {
            console.error("Error from loginNewreUser(): ",err)
        }
    }

    
    return(       
        <form className="form-cont">
            <label className="form-title">{props.role} Login</label>
            <input className="form-input" type="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)}/>
            <input className="form-input" type="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
            <div className="form-btns"> 
            <PrimaryBtn funcact={loginNewreUser} btntext="Login"/>
            </div>
        </form>
    )
}