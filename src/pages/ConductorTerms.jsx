import { Link } from "react-router-dom";
import Header from "../components/Header";
import BottomNav from "../components/BottomNav";
import { Close, Dashboard, LocalActivity, Person, Restore, Verified } from "@mui/icons-material";

export default function ConductorTerms(){
    return (
        <div className="page pass-page">
            <Header />
            <div className="pass-page-title">
                <div className="pass-page-title-left">
                    <h2 className="text-subhead">Terms and Conditions</h2>
                    <p className="text-normal">Terms for the user clarity</p>
                </div>
                <Link to="/conductor/home"><Close className="terms" /></Link>
            </div>
            <div className="pass-history-details-cont">
        <p>
          Welcome to the <strong>NEWRE Bus Pass Renewal Portal</strong> ("Portal"). By accessing or using our software-as-a-service (SaaS) platform, you agree to the following terms and conditions ("Terms"). If you do not agree, please refrain from using our services.
        </p>
        <br />
        <h3>1. Definitions</h3>
        <p><strong>"Portal"</strong> refers to the SaaS platform provided by NEWRE for bus pass issuance, renewal, and verification.</p>
        <p><strong>"Users"</strong> include commuters, conductors, and administrative staff registered on the Portal.</p>
        <p><strong>"Pass"</strong> refers to the digital bus pass issued through the Portal.</p>
        <p><strong>"QR Code"</strong> refers to the unique identifier assigned to each pass for verification purposes.</p>
        <br />
        <h3>2. User Registration and Responsibilities</h3>
        <p>Users must provide accurate and complete information during registration.</p>
        <p>The Portal reserves the right to suspend or terminate accounts found to contain false or misleading information.</p>
        <p>Users are responsible for maintaining the security of their login credentials and preventing unauthorized access.</p>
        <br />
        <h3>3. Pass Issuance and Renewal</h3>
        <p>Passes are issued based on the details provided by users and verified by the relevant transport authority.</p>
        <p>Users must submit renewal applications before the expiration date of their current pass.</p>
        <p>The validity period of each pass is determined by the transport authority and displayed on the Portal.</p>
        <p>Passes are non-transferable and can only be used by the registered commuter.</p>
        <br />
        <h3>4. QR Code Verification and Compliance</h3>
        <p>Each pass contains a unique QR Code that must be scanned for verification by authorized conductors.</p>
        <p>Unauthorized sharing or misuse of QR codes will lead to account suspension.</p>
        <p>The Portal is not responsible for fraudulent activities arising from the misuse of QR codes.</p>
        <br />
        <h3>5. Data Privacy and Security</h3>
        <p>User data is securely stored and used solely for pass issuance, verification, and administrative purposes.</p>
        <p>The Portal does not share user data with third parties without consent, except as required by law.</p>
        <p>By using the Portal, users consent to the collection and use of their data as described in our Privacy Policy.</p>
        <br />
        <h3>6. Service Availability and Limitations</h3>
        <p>The Portal is provided "as is" without warranties of uninterrupted service.</p>
        <p>We are not liable for issues arising from incorrect user data, expired passes, or improper QR scanning.</p>
        <p>The transport authority is responsible for addressing disputes related to pass validity.</p>
        <br />
        <h3>7. Modifications to Terms</h3>
        <p>The Portal may modify these Terms at any time.</p>
        <p>Continued use of the Portal after modifications implies acceptance of the updated Terms.</p>
        <p>Users are encouraged to review the Terms periodically.</p>
        <br />
        <h3>8. Governing Law and Dispute Resolution</h3>
        <p>These Terms are governed by the laws of [Insert Jurisdiction].</p>
        <p>Any disputes shall be resolved through arbitration or legal proceedings as per the applicable laws.</p>
        <br />
        <p>
          By using the <strong>NEWRE Bus Pass Renewal Portal</strong>, you acknowledge that you have read, understood, and agreed to these Terms.
        </p>
        <p>For further inquiries, contact us at [Insert Contact Information].</p>
      </div>
      <BottomNav
                        navPaths={["/conductor/home", "/conductor/passverify", "/conductor/history", "/conductor/profile"]}
                        navLabels={["Home", "Verify", "History", "Profile"]}
                        navIcons = {[<Dashboard/>, <Verified/>,<Restore/>, <Person/>]}
                    />
        </div>
    );
}