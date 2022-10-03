import '../styles/navbar.css'

const Navbar = ({setIsSubmitted, search, setSearch}) => {

    const handleSearch = (e)=> {
        e.preventDefault();
        if(search !== ""){
            setIsSubmitted(true);
        }
    }

    const keyDown = (e) => { 
        var e = window.event || e;
        var key = e.keyCode;
        if (key === 32) { //space
            e.preventDefault();
        }
    }

    return (
        <div>
            <div className='topNav'>
                <div className="rightLogo">
                    <img src="/favicon.jpg" className='img' alt="" />
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
                                onKeyDown={(e)=> keyDown(e)}
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