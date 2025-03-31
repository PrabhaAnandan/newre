import newrelogo from '../assets/newrelogo.svg'
export default function Header(){
    return(
        <div className='header'>
        <img className="newre-logo" src={newrelogo} alt="newre logo - Brand logo of a saas product who redefining the renewing process" />
        </div>
    )
}