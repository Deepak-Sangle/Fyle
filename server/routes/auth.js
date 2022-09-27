const express = require('express');
const router = express.Router();

const baseURL = "https://api.github.com/users/";
const repoURL = "https://api.github.com/repos/";
const PER_PAGE = 6;

// This doesn't make sense :( we are redirecting the same call to the client again. Could be better if we just call it in client side but it was written in the assignment to make calls in server side, so here it is :)

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
    const myData = [];
    data.map((repo)=> {
        const {name, description, url, topics} = repo;
        myData.push({name, description, url, topics});
    })
    res.send(myData);
});

module.exports = router;