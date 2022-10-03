import { useEffect, useState } from "react";
import Loading from "../components/loading";
import NotFound from "../components/not-found";
import "../styles/repos.css"
import {FaLink, FaLocationArrow, FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa';

const Repos = ({isSubmitted,setIsSubmitted, username}) => {

    const [user, setUser] = useState();
    const [repositories, setRepositories] = useState([]);
    const [isNotFound, setIsNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [repoLoading, setRepoLoading] = useState(false);
    const [maxPages, setMaxPages] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(0);

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
            setMaxPages(Math.ceil((data.public_repos)/6));
        }
        console.log(data);
        setPage(1);
        setCurrentSlide(0);
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
        if(username!==""){
            getRepos();
        }
    }, [page, isSubmitted])

    const Repository = ({repo})=> {
        return(
            <div className="eachRepo flexClass"> 
                <div className="name">
                    <a id="repoUrl" href={repo.url}>{repo.name}</a>
                </div>
                <div className="description">
                    {(repo.description)!=="" && repo.description}
                    {(repo.description)==="" && <div> 
                        No Bio present
                    </div>}
                </div>
                <div className="tags">
                    {repo.topics.map((topic, i)=> {
                        if(i>3) return ;
                        return (
                            <div className="topic" key={topic}>
                                {  topic  }
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    const changePage = (index)=> {
        if(index != page){
            setPage(index);
        }
    }

    const increasePage = ()=> {
        if(page<maxPages){
            if(page%10 == 0){
                setCurrentSlide(currentSlide+1);
            }
            setPage(page+1);
        }
    }

    const decreasePage = ()=> {
        if(page>1){
            if(page%10 == 1){
                setCurrentSlide(currentSlide-1);
            }
            setPage(page-1);
        }
    }

    return (
        <div className="mainBody">
            {isNotFound && <NotFound/> }
            {loading && <Loading/>}
            {user!==undefined && !isNotFound && !loading && <div>
            
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
                            <div className="locItem">
                                <FaLocationArrow />
                            </div>
                            <div className="locItem">
                                {user.location}
                            </div>
                        </div>
                        <div className="info twitter">
                            {user.twitter_username}
                        </div>
                        <div className="info acc">
                            <div className="locItem">
                                <FaLink />
                            </div>
                            <div className="locItem">
                                {user.url}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="repos flexClass">
                    {!repoLoading && <div className="repoLists flexClass">
                        {repositories.map((repo, i)=> {
                            if(i%2) return ;
                            else return(
                                <div key={i} className="repoGroup">
                                    <Repository repo={repositories[i]} />
                                    {(repositories.length > i+1) && <Repository repo={repositories[i+1]} />}
                                </div>
                            )
                        })}
                    </div>}
                    {repoLoading && <div className="repoLists flexClass">
                        <Loading />
                    </div>}
                    {maxPages>0 && <div className="repoNums">
                        <div className="numval">
                            <a onClick={decreasePage} id="leftArrow" className={page===1 ? "index blured" : "index"}>
                                <FaAngleDoubleLeft />
                            </a>
                            {[...Array(10).keys()].map((i)=> {
                                const num = i+1+(currentSlide*10);
                                if(num>maxPages) return ;
                                else return(
                                    <div onClick={() => changePage(num)} id={num==page ? "currIndex" : ""} className= "index" key={i}>
                                        <a>{String(num).padStart(2, '0')}</a>
                                    </div>
                                )
                            })}
                            <a onClick={increasePage} id="rightArrow" className={page===maxPages ? "index blured" : "index"}>
                                <FaAngleDoubleRight />
                            </a>
                        </div>
                    </div>}
                </div>
            </div>}            

        </div>
    );
}
 
export default Repos;