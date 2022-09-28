import Navbar from '../components/navbar';
import Repos from './repos';
import { useState } from 'react';

const HomePage = () => {
    
    const [search, setSearch] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    return (
        <div>
            <Navbar setIsSubmitted={setIsSubmitted} search={search} setSearch={setSearch} />
            <Repos setIsSubmitted={setIsSubmitted} isSubmitted={isSubmitted} username={search} />
        </div>
    );
}
 
export default HomePage;