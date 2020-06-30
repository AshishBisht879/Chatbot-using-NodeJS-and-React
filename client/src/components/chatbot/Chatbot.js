//Class Component   of React
//states

//Updated version on 30-06-20

import React, { Component } from "react"; //react is default export and Component in Named export (In a module we can have one default export and many named export )
import axios from "axios/index"; //axios to send request to backend
import Message from "./Message";

import Cookies from "universal-cookie"; //set id to cookie
import { v4 as uuid } from "uuid"; //generate unique id in ReactFrontend for sessions in visitors v4 for random id generation

import Card from "./Card";
import "./style.css";        //for responsive form
import Card1 from "./Card1";
import Card2 from "./Card2";
import College from "./About_college";

const cookies = new Cookies(); //creating cookie object

class Chatbot extends Component {
    //syntax to make a class component

    form = {
        name: "",
        password: "",
        semester: "",
    };
    messagesEnd;
    constructor(props) {
        //Constructor for initial state the starting state(no messages)  props-> properties
        super(props);
        //binding to handle input key press  for callback after key is pressed
        this._handleInputKeyPress = this._handleInputKeyPress.bind(this); //It will bind that method to works as callback
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            messages: [], //An array of empty messages
            showBot: true,
        };

        if (cookies.get("userID") === undefined) {
            //if cookie is already not present before then generate new cookie
            cookies.set("userID", uuid(), { path: "/" }); //  '/' means that the cookie will be accessible for all pages i.e unique session for all pages
        }
    }

    async df_text_query(queryText) {
        let says = {
            speaks: "user",
            msg: {
                text: {
                    text: queryText,
                },
            },
        };

        this.setState({ messages: [...this.state.messages, says] }); // Adding the new messages with the old ones to the state, ... -> spread operator to concatenate more values in array   setState method to change State
        try {
            const res = await axios.post("/api/df_text_query", {
                text: queryText,
                userID: cookies.get("userID"),
            }); //sending queryText and the cookie(unique id ) to backend for unique session

            for (let msg of res.data.fulfillmentMessages) {
                says = {
                    speaks: "bot",
                    msg: msg,
                };

                this.setState({ messages: [...this.state.messages, says] });
            }
        } catch (error) {
            let says = {
                speaks: "bot",
                msg: {
                    text: {
                        text:
                            "Some Connection issue is there, I should take a break then. ",
                    },
                },
            };
            this.setState({ messages: [...this.state.messages, says] });
            let close_bot = this;
            setTimeout(function () {
                close_bot.setState({ showBot: false });
            }, 2000);
        }
    }

    async df_event_query(event) {
        try {
            const res = await axios.post("/api/df_event_query", {
                event: event,
                userID: cookies.get("userID"),
            });
            for (let msg of res.data.fulfillmentMessages) {
                let says = {
                    speaks: "bot",
                    msg: msg,
                };

                this.setState({ messages: [...this.state.messages, says] });
            }
        } catch (error) {
            let says = {
                speaks: "bot",
                msg: {
                    text: {
                        text:
                            "Some Connection issue is there, I should take a break then. ",
                    },
                },
            };
            this.setState({ messages: [...this.state.messages, says] });
            let close_bot = this;
            setTimeout(function () {
                close_bot.setState({ showBot: false });
            }, 2000);
        }
    }

    componentDidMount() {
        //This method is invoke when chatbot component is mount or render in HTML dom(that means it will invoke first)
        this.df_event_query("Welcome");
    }

    componentDidUpdate() {
        //This will invoke when any thing gets update in the component (This is use for making the scroll at the bottom)
        this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
    }

    show(event) {
        event.preventDefault(); //prevent default behavior (i.e onclick reload page ) now it will not reload page
        event.stopPropagation();
        this.setState({ showBot: true });
    }

    hide(event) {
        event.preventDefault(); //prevent default behavior (i.e onclick reload page) now it will not reload page
        event.stopPropagation();
        this.setState({ showBot: false });
    }

    handleSubmit(event) {                 //This method is triggered when Result login form is submitted
        event.preventDefault();             //prevent the event on submitted i.e. reload of page
        event.stopPropagation();

        //on click "Loading.." tag shows
        Array.from(document.getElementsByClassName("loading")).forEach(
            function (element, index) {
                element.innerHTML = "Loading...";
            }
        );

        const user = {
            name: this.form.name,
            password: this.form.password,
            semester: this.form.semester,
        };
        axios.post("/api/result", { user }).then((res) => {           //sending the form data to URL
            let says;

            Array.from(document.getElementsByClassName("loading")).forEach(                    //Removing the Loading tag
                function (element, index) {
                    element.innerHTML = "";
                }
            );

            try {
                if (typeof res.data === "string") {                         //checking if the response is String i.e "No record for the Semester" or "Wrong ID or Password"
                    says = {                                                  //then simply send that response as msg
                        msg: {
                            text: {
                                text: res.data,
                            },
                        },
                    };
                } else {                                                   //when response is result then send that object to msg
                    says = {
                        speaks: "bot",
                        msg: res.data.cards,
                    };
                }
            } catch (error) {
                says = {
                    speaks: "bot",
                    msg: {
                        text: {
                            text:
                                "Some Connection issue is there, I should take a break then. ",
                        },
                    },
                };
                let close_bot = this;
                setTimeout(function () {
                    close_bot.setState({ showBot: false });
                }, 2000);
            }

            this.setState({ messages: [...this.state.messages, says] });
        });

    }

    handleChange1 = (event) => {                                               //this method is triggered when User ID input field is filled
        this.form.name = event.target.value;
        // this.setState({name: event.target.value});
    };

    handleChange2 = (event) => {                                               //this method is triggered when Password input field is filled
        this.form.password = event.target.value;
        // this.setState({ password: event.target.value});
    };

    handleChange3 = (event) => {                                               //this method is triggered when Semester input field is filled
        this.form.semester = event.target.value;
        // this.setState({ semester: event.target.value});
    };

    renderCard(p) {
         if(p[0])                                 //for result returned in form for array of objects from server
        {
            return <Card payload={p[0]} />;
        }  
        else if(p.text&&p.text.text[0] === "college")
        {   
            return <College/>
        }                                 
       else if(p.payload && p.payload.fields.syllabus_card)                          //for syllabus 
        {
            return p.payload.fields.syllabus_card.listValue.values.map((card, i) => (
                        <Card1 key={i} payload={card.structValue} />
                    ));
        }
        else if(p.payload&&p.payload.fields.notice)                               //for notice
        {
            return p.payload.fields.notice.listValue.values.map((card, i) => (
                         <Card2 key={i} payload={card.structValue} />
                   ));
        }
    }

    renderMessages(stateMessages) {

        if (stateMessages) {
            return stateMessages.map((message, i) => {
                if (                                                             //checking for the response "result_login"  that comes from dialogflow when some wants to see result through server 
                    message.msg &&
                    message.msg.text &&
                    message.msg.text.text[0] === "result_login"
                ) {
                    return (                                                      //then in return send the login form
                        <div className="form1"
                            style={{ marginLeft: "8%", border: "2px solid", padding: "30px",boxShadow: "5px 5px 5px rgba(0,0,0,0.7)" }}
                        >


                            <form
                                onSubmit={this.handleSubmit}                                  //on submit call handleSubmit method
                                style={{ width: "93%", margin: "15px" }}
                            >
                                <div>
                                    <div
                                        style={{
                                            paddingLeft: "5px",
                                            height: "60px",
                                            marginBottom: "5px",
                                            backgroundColor: "#ff9800",
                                            width: "100%",
                                        }}
                                    >
                                        {" "}
                                        <h1>LogIn</h1>
                                    </div>
                                    <div>
                                        <span>
                                            <b>
                                                {" "}
                                                <h5>User ID: </h5>
                                            </b>{" "}
                                        </span>
                                        <input
                                            style={{
                                                border: "1px solid",
                                                paddingLeft: "10px",
                                                height: "35px",
                                                borderRadius: "8px",
                                                width: "94%",
                                            }}
                                            type="text"
                                            placeholder="User ID"
                                            name="name"
                                            required
                                            onChange={this.handleChange1}
                                        />

                                        <span>
                                            <b>
                                                {" "}
                                                <h5>Password: </h5>
                                            </b>{" "}
                                        </span>
                                        <input
                                            style={{
                                                border: "1px solid",
                                                paddingLeft: "10px",
                                                height: "35px",
                                                width: "94%",
                                                borderRadius: "8px",
                                            }}
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            required
                                            onChange={this.handleChange2}
                                        />
                                        <span>
                                            <b>
                                                <h5>Semester: </h5>
                                            </b>
                                        </span>
                                        <input
                                            style={{
                                                border: "1px solid",
                                                paddingLeft: "10px",
                                                height: "35px",
                                                borderRadius: "8px",
                                                width: "94%",
                                            }}
                                            type="number"
                                            placeholder="Semester"
                                            name="semester"
                                            required
                                            onChange={this.handleChange3}
                                        />
                                        <button
                                            style={{
                                                borderRadius: "8px",
                                                backgroundColor: "#ff9800",
                                                border: "0px",
                                                height: "40px",
                                                width: "80px",
                                            }}
                                            type="submit"
                                        >
                                            Submit
                    </button>
                                    </div>
                                </div>
                                <div><h4 className="loading" style={{ height: "40px" }}> </h4></div>     {/*  here Loading is for "Loading Tag" i have use class instead of id because with class all the login result dialog boxes can be access previous one as well as latest one*/}
                            </form>
                        </div>
                    );
                } 
                
                else if (message.msg && message.msg.text && message.msg.text.text&& message.msg.text.text[0]!=="college") {
                    //Checking if text messages are there in response then show text messages    except if the response is "college"  because for that card need to show up  rather than simple text
                    return (
                        <Message
                            key={i}
                            speaks={message.speaks}
                            text={message.msg.text.text}
                        />
                    );
                } else if (                                                      //checking for all type of cards  message.msg[0] returned from server after searching the result of student
                    (message.msg &&                                             //message.msg.text.text is the returned text from dialogflow when someone search about College
                    message.msg.payload &&                                      // message.msg.payload.fields is the custom payload card from fulfillment
                    message.msg.payload.fields &&
                    message.msg.payload.fields)||message.msg[0]||message.msg.text.text[0] === "college"
                ) {
                    return (
                        <div>
                            <div className="card-panel grey lighten-5 z-depth-1 ">
                                <div style={{ overflow: "hidden"}}>
                                    <div className="col s2">
                                        <button className="waves-effect orange waves-light btn">
                                            {message.speaks}
                                        </button>
                                    </div>

                                    <div style={{ overflow: "auto" }}>
                                        <div style={{ width: "100%" }}>
                                            {this.renderCard(message.msg)}
                                            {/* Card1 is just a string to tell that  card for syllabus need to be use   */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                } 
            });
        } else {
            return null;
        }
    }

    _handleInputKeyPress(event) {
        //this will invoke when Enter  Key is pressed
        if (event.key === "Enter") {
            this.df_text_query(event.target.value); //send the the text query
            event.target.value = ""; //after send to bot it doesn't have to be in input field
        }
    }

    render() {
        if (this.state.showBot) {
            return (
                <div style={{ width: "100%", marginTop: 12 }}>
                    <nav style={{ marginBottom: 12, backgroundColor: "#696969" }}>
                        <div className="nav-wrapper">
                            <span style={{ marginLeft: 15 }} className="brand-logo">
                                Chatbot
              </span>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li>
                                    <a href="/" onClick={this.hide}>
                                        Close
                  </a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div
                        id="chatbot"
                        style={{ maxHeight: 488, width: "100%", overflow: "auto",borderRadius:"10px" }}
                    >
                        {this.renderMessages(this.state.messages)}
                        <div
                            ref={(el) => {
                                this.messagesEnd = el;
                            }}
                            style={{ float: "left" }}
                        >
                            {" "}
                        </div>{" "}
                        {
                            //providing reference using ref to messagesEnd
                        }
                    </div>
                    <div className="col s12">
                        <input
                            style={{
                                margin: 0,
                                border: "2px solid",
                                borderRadius: 10,
                                paddingLeft: 10,
                                width: "99%",
                            }}
                            type="text"
                            placeholder="Enter your Query .."
                            onKeyPress={this._handleInputKeyPress}
                        />
                    </div>
                </div>
            );
        } else {
            return (
                <div style={{ width: "100%", marginTop: 12 }}>
                    <nav>
                        <div className="nav-wrapper">
                            <span style={{ marginLeft: 15 }} className="brand-logo">
                                Chatbot
              </span>
                            <ul id="nav-mobile" className="right hide-on-med-and-down">
                                <li>
                                    <a href="/" onClick={this.show}>
                                        Show
                  </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div
                        ref={(el) => {
                            this.messagesEnd = el;
                        }}
                        style={{ float: "left" }}
                    >
                        {" "}
                    </div>{" "}
                    {
                        //providing reference using ref to messagesEnd
                    }
                </div>
            );
        }
    }
}

export default Chatbot;
