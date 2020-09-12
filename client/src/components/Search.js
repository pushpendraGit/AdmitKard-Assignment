import React from 'react';


//importing files
import '../assets/css/Search.css'
import searchlogo from '../assets/images/admitkardlogo.png'


//this is the Search component that takes in the search query
class Search extends React.Component {

    //this function calls the search API on keyup and then calls fillResult() to show data on the screen
    handleKeyUp = async () => {
        let input = document.getElementById('search-input');
        let outputDiv = document.getElementById('api-results');
        let resUL = document.getElementById('api-res-ul');

        //search only if input length is >=3
        if (input.value.length === 0) {
            resUL.innerHTML = "";
            return;
        }
        else if (input.value.length < 3) {
            outputDiv.style.display="none";
            return;
        }
        else {
            let res = await fetch('/search', {
                method: 'post',
                body: JSON.stringify({
                    query: input.value
                }),
                headers: {
                    'content-type': 'application/json'
                }
            });
            let resJson = await (res.json());
            this.fillResults(resJson.data);
            outputDiv.style.display="block";
        }

    }

    //this function fills the result divs
    fillResults = (resJson) => {
        let resUL = document.getElementById('api-res-ul');
        resUL.innerHTML = "";
        resJson.forEach(element => {
            console.log(element.query);
            let newLI = document.createElement('li');
            newLI.innerHTML = '<a>' + element.query + '</a>'
            newLI.addEventListener('click',()=>{
                console.log('clicked');
                this.showQuestion(element);
            })
            resUL.append(newLI);
        });
    }

    //this function shows the question div
    showQuestion = (question)=>{
        let questionDiv = document.getElementById('show-question');
        let queryText = document.getElementById('query-text');
        let tags = document.getElementById('query-tags');
        let topic = document.getElementById('query-topic');

        questionDiv.style.display = "flex";
        queryText.innerText = question.query
        tags.innerText = question.tags
        topic.innerText = question.topic
    }
    
    //this function closes the open-question div
    closeQuestionDiv = () =>{
        document.getElementById('show-question').style.display="none";
    }

    render() {
        return (
            <div className="search">
                <img
                    className="searchlogo"
                    src={searchlogo}
                    alt="logo"
                />
                <input onKeyUp={() => this.handleKeyUp()} id="search-input" type="text" placeholder="Enter 3 or more characters"></input>
                <div id="api-results">
                    <ul id="api-res-ul">
                    </ul>
                </div>
                <div id="show-question" className="show-question">
                    <center><h2>Question details</h2></center>
                    <span onClick={()=>this.closeQuestionDiv()} id="close-question"><img alt="close btn" width="15px" height="15px" src ="https://www.flaticon.com/svg/static/icons/svg/753/753345.svg"></img></span>
                    <span className="smallText">Question</span>
                    <span className="query-text" id ="query-text"></span><br></br>
                    <span className="smallText">Tags:</span>
                    <span className="query-text" id ="query-tags"></span><br></br>
                    <span className="smallText">Topics</span>
                    <span className="query-text" id ="query-topic"></span>
                </div>
            </div>
        )
    }
}

export default Search;