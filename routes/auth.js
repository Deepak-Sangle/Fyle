const express = require('express');
const router = express.Router();

const baseURL = "https://api.github.com/users/";
const repoURL = "https://api.github.com/repos/";
const PER_PAGE = 6;

router.get('/user/:usr', async (req,res)=> {
    const user = req.params.usr;
    const response = await fetch(baseURL+user);
    const data = await response.json();
    const {name, html_url, location, bio, twitter_username, avatar_url, public_repos} = data;
    if(data.message==undefined){
        res.send({failure : false, name, url : html_url, location, bio, twitter_username, avatar_url, public_repos});
    }
    else{
        res.send({failure : true})
    }
});

router.get('/:usr/:page', async (req,res)=> {
    const page_num = req.params.page;
    const user = req.params.usr;
    const response = await fetch(baseURL+user+"/repos?per_page=" + PER_PAGE + "&page="+page_num);
    const data = await response.json();
    if(!response.ok){
        res.status(404).send({failure : true});
    }
    else{
        const myData = [];
        data.map((repo)=> {
            const {name, description, html_url, topics} = repo;
            myData.push({name, description, url : html_url, topics});
        })
        res.send(myData);
    }
});

module.exports = router;