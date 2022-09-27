import '../styles/navbar.css'
import { useState } from 'react';

const Navbar = ({setIsSubmitted, search, setSearch}) => {

    const handleSearch = (e)=> {
        e.preventDefault();
        if(search!=""){
            setIsSubmitted(true);
        }
    }

    return (
        <div>
            <div className='topNav'>
                <div className="rightLogo">
                    <img src="/favicon.jpg" className='img' alt="FU" />
                </div>
                <div className="searchBar">
                    <div className="centerDiv">
                        <img 
                            src="/search.png"
                            className='searchLogo'
                            alt="S"
                        />
                        <form onSubmit={handleSearch}>
                            <input 
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="inputText"
                                placeholder='Enter the username'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Navbar;