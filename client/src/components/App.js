//importing react
import React from 'react';

//importing components
import Navbar from './Navbar';
import Search from './Search';
import AddQuestion from './AddQuestion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//importing req. files
import '../assets/css/App.css'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            questions:[]
        }
    }

    //this function is used to change the page of the app
    changePage = (page) => {
        this.setState({
            page
        })
    }

    //this function is used to show notification
    notify = (type, message) => {
        switch (type) {
            case 'error': {
                toast.error(message);
                break;
            }
            case 'success': {
                toast.success(message);
                break;
            }
            case 'warn': {
                toast.warn(message);
                break;
            }
            default: {

            }
        }
    };

    //this function gets all the questions from the db 
    getQuestions = async() =>{
        let questionList = await fetch('/questions/get',{
            method:'post',
            headers:{
                'content-type':'application/json'
            }
        })
        let questionRes = await questionList.json();
        this.setState({
            questions:questionRes.data
        })
    }

    //getting some work done when the app beings (component mounts)
    componentDidMount(){
        this.getQuestions();
    }

    //rendering my App here
    render() {
        return (
            <div className="app">
                <Navbar page={this.state.page} changePage={this.changePage} />
                {this.state.page === 1 && <Search />}
                {this.state.page === 2 && <AddQuestion getQuestions = {this.getQuestions} questions={this.state.questions} notify={this.notify} />}
                <ToastContainer position="bottom-left" />
            </div>
        )
    }
}

export default App;