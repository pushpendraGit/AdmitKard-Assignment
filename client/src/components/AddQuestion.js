import React from 'react';

//importing files
import '../assets/css/AddQuestions.css'

//this is the add Questions page component
class AddQuestion extends React.Component {

    addQuestion = async () => {
        
        const { notify ,getQuestions } = this.props;
        let query = document.getElementById("ques-query").value;
        let tags = document.getElementById("ques-tags").value;
        let topic = document.getElementById("ques-topic").value;
        let tagsArray = tags.split(',');

        //removing any whitespace in the tags
        document.getElementById('ques-tags').value = tags.replace(/\s+/g, '');

        let addQues = await fetch('/questions/add', {
            method: 'post',
            body: JSON.stringify({
                query,
                tags: tagsArray,
                topic
            }),
            headers: {
                'content-type': 'application/json'
            }
        });
        addQues = await addQues.json();
        if (addQues.message === 'success') {
            notify('success', 'New Question added');
            this.clearInputs();
            getQuestions();
        }
        else if (addQues.message === 'invalid') {
            notify('error', 'Invalid Params passed');
        }
        else {
            notify('error', 'Error in adding question');
        }
    }

    //this function clears the input feilds
    clearInputs = () => {
        document.getElementById("ques-query").value = "";
        document.getElementById("ques-tags").value = "";
        document.getElementById("ques-topic").value = "";
    }

    render() {
        const { questions } = this.props;
        return (
            <div className="add-question-main">
                <div className="input-div">
                    <textarea id="ques-query" style={{ fontSize: 14, margin: 2, width: 614, height: 69 }} placeholder="Enter Question here..10 or more characters" type="text"></textarea><br></br>
                    <input id="ques-tags" placeholder="Tag1,Tag2,Tag3.." type="text"></input><br></br>
                    <input id="ques-topic" placeholder="Enter Topic" type="text"></input>
                    <button onClick={() => this.addQuestion()} id="qtn-add-btn" >ADD</button>
                </div>

                <div className="question-list">
                    <h2>List of added questions :</h2>
                    <table >
                        <tr>
                            <th>#</th>
                            <th>Query</th>
                            <th>Tags</th>
                            <th>Topics</th>
                        </tr>
                        {questions.map((question,id)=>
                            <tr><td>{id+1}</td> <td>{question.query}</td><td>{question.tags}</td><td>{question.topic}</td></tr>
                        )}
                    </table>
                </div>
            </div>
        )
    }
}

export default AddQuestion;
