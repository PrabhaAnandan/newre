import { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import SecondaryBtn from "./SecondaryBtn";
import { firebaseApp } from "../config/firebase";
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import {getFirestore, setDoc, doc} from 'firebase/firestore';

export default function RegForm(props){

    const auth = getAuth(firebaseApp);
    const firestoreDb = getFirestore(firebaseApp)

    const [userName,setUserName] = useState('guest');
    const [dob,setDob] = useState('');
    const [gender,setGender] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');


    const navigate = useNavigate();

    const createUser = async(event) =>{
        event.preventDefault();
        if (password === retypePassword){
            console.log("password is", password)
            try {

                    /*creating the user*/
                    const createNewUser = await createUserWithEmailAndPassword(auth,email,password);
                    const newreUser = createNewUser.user;
                    /*user is created*/
                    const newreUserData = {
                        uid: newreUser.uid,
                        userName:userName,
                        dob:dob,
                        gender:gender,
                        phoneNo: phoneNo,
                        email:email,
                        password:password,
                    }

                    console.log("User is created", newreUser.uid);
                    /* storing in the firestore*/
                    const dbdocname = `${props.role}`;
                    await setDoc(doc(firestoreDb,dbdocname,newreUser.uid),newreUserData);
                    
                    console.log("Newly created user", newreUserData)

                    if(props.role === "User"){
                        navigate('/login');
                    }else{
                        console.log('/'+props.role+'/login')
                        navigate('/'+props.role+'/login')
                    }            
            } catch (err) {
                if(err === "FirebaseError: Firebase: Error (auth/email-already-in-use)."){
                    alert("This email has already registered")
                }
                console.error(err);
            }
        }else{
            alert("please enter the correct password")
        }
    }

    const goToLogin = () =>{
        if(props.role === "User"){
            navigate('/login');
        }else{
            console.log('/'+props.role+'/login')
            navigate('/'+props.role+'/login')
        }      
    }

     return(       
            <form className="form-cont">
                <label className="form-title">{props.role} Registration</label>
                <input className="form-input" type="text" required  placeholder="Enter your name" onChange={(e)=>setUserName(e.target.value)}/>
                <div className="form-flex">
                    <input className="form-date" type="date" required  placeholder="Select your Date of Birth" onChange={(e)=>setDob(e.target.value)}/>
                    <div className="form-select-wrapper">
                        <select className="form-select" required  id="gender" name="gender" onChange={(e)=>setGender(e.target.value)}>
                            <option className="form-option" value="nil">Gender</option>
                            <option className="form-option" value="male">Male</option>
                            <option className="form-option" value="female">Female</option>
                        </select>
                    </div>
                </div>
                <input className="form-phoneno" type="tel" name="mobile" required pattern="[0-9]{10}" placeholder="Enter your Phone Number" onChange={(e)=>setPhoneNo(e.target.value)}/>
                <input className="form-input" type="email" name="email" required placeholder="Enter your eamil" onChange={(e)=>setEmail(e.target.value)}/>
                <input className="form-input" type="password" name="password" required minlength="8" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)}/>
                <input className="form-input" type="password" name="retypepassword" required minlength="8" placeholder="Retype your password" onChange={(e)=>setRetypePassword(e.target.value)}/>
                <div className="form-btns"> 
                <PrimaryBtn funcact={createUser} btntext="Submit"/>
                <SecondaryBtn funcact={goToLogin} btntext="Cancel"/>
                </div>
            </form>
        ) 
}