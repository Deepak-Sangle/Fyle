import { useEffect, useState } from "react";
import Loading from "../components/loading";
import NotFound from "../components/not-found";
import "../styles/repos.css"

const Repos = ({isSubmitted,setIsSubmitted, username}) => {

    const [user, setUser] = useState({
        "failure": false,
        "name": "Deepak Sangle",
        "url": "https://github.com/Deepak-Sangle",
        "location": "New York",
        "bio": "IITK'24 Sophomore CSE siuzdbgfosbdfuysbvgfo0basgshuoipvszfuv esfuoidvsgfuoidzshvbesgggggggsfyvsbhyzsvhujbgyvbonujb hud hbjsiuzdbgfosbdfuysbvgfo0basgshuoipvszfuv esfuoidvsgfuoidzshvbesgggggggsfyvsbhyzsvhujbgyvbonujb hud hbjsiuzdbgfosbdfuysbvgfo0basgshuoipvszfuv esfuoidvsgfuoidzshvbesgggggggsfyvsbhyzsvhujbgyvbonujb hud hbj",
        "twitter_username": "deepak-sangleok",
        "avatar_url": "https://avatars.githubusercontent.com/u/78836762?v=4"
    });
    const [repositories, setRepositories] = useState([]);
    const [isNotFound, setIsNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [repoLoading, setRepoLoading] = useState(false);
    const [maxPages, setMaxPages] = useState(0);

    const getData = async ()=> {
        setLoading(true);
        const res = await fetch('/user/'+username, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await res.json();
        if(data.failure){
            setIsNotFound(true);
        }
        else{
            setIsNotFound(false);
            setUser(data);
            setPage(1);
            setMaxPages((data.public_repos)/6);
        }
        setLoading(false);
    }

    const getRepos = async ()=> {
        setRepoLoading(true);
        const url = "/"+username+"/"+page;
        console.log(url);
        const res = await fetch(url, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        const data = await res.json();
        setRepositories(data);
        console.log(data);
        setRepoLoading(false);
    }

    useEffect(()=> {
        if(isSubmitted){
            getData();
            setIsSubmitted(false);
        }
    });

    useEffect(()=> {
        getRepos();
    }, [page])

    const Repository = (repo)=> {
        return(
            <div>
                <div className="name">
                    {repo.name}
                </div>
                <div className="description">
                    {repo.description}
                </div>
                <div className="tags">
                    {repo.topics.map((topic)=> {
                        return (
                            <div key={topic}>
                                {topic}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    return (
        <div className="mainBody">
            {isNotFound && <NotFound/> }
            {loading && <Loading/>}
            {!isNotFound && !loading && <div>
            
                <div className="TopInfo">

                    <div className="photo">
                        <img src={user.avatar_url} alt="" className="dp"/>
                    </div>
                    <div className="basicInfo">
                        <div className="info name">
                            {user.name}
                        </div>
                        <div className="info bio">
                            {user.bio}
                        </div>
                        <div className="info location">
                            {user.location}
                        </div>
                        <div className="info twitter">
                            {user.twitter_username}
                        </div>
                        <div className="info acc">
                            {user.url}
                        </div>
                    </div>

                </div>

                <div className="repos">
                    
                </div>
            </div>}            

        </div>
    );
}
 
export default Repos;