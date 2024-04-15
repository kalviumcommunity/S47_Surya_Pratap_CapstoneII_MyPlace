import { FaHouseDamage } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <header className="bg-slate-200 shadow-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <Link to='/'>
                    <div className="flex items-center text-sm sm:text-xl flex-wrap">
                        <FaHouseDamage size={25} />
                        <span>MyHood</span>
                    </div>
                </Link>
                <form className="bg-slate-100 flex p-3 rounded-lg items-centerk">
                    <input type="text" placeholder="Search a place" className="bg-transparent focus:outline-none w-24 sm:w-64" />
                    <FaSearch className="text-slate-600" />
                </form>
                <ul className="flex gap-4">
                    <Link to='/home'> <li className="hidden sm:inline hover:underline">Home</li> </Link>
                    <Link to='/about'><li className="hidden sm:inline hover:underline">About</li></Link>
                    <Link to='/sign-in'> <li className="sm:inline hover:underline">Sign In</li> </Link>
                    <Link to='/sign-up'> <li className="sm:inline hover:underline">Sign Up</li> </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header
