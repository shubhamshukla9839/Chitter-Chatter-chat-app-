import React, { useState, useEffect, useRef } from "react";
import styled ,{ThemeProvider} from "styled-components";
import io from "socket.io-client";
import theme from "styled-theming";


const boxBackgroundColor =
theme('mode',{
  light: '#fff',
  dark:'#111',
})

const Box=styled.h4`

background-color:background-color:${boxBackgroundColor};

`;




const Page = styled.div`

  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  background-color: #46516e;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 400px;
  border: 1px solid lightgray;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
`;

const TextArea = styled.textarea`
  width: 98%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;




const Button = styled.button`
  background-color: white;
  width: 100%;
  border: none;
  flex-direction: column;
  justify-items:center;
  align-items:center;
  height: 50px;
  border-radius: 10px;
  color: #46516e;
  text-allign: center;
  font-size: 30px;
`;

const DeleteButton = styled.button`
  background-color: white;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: #DC143C;
  font-size: 17px;
`;

const Form = styled.form`
  width: 400px;
`;

const passForm = styled.form`
  width:400px;
  
`;
const passTextArea = styled.textarea`
  width: 98%;
  height: 150px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 1px solid lightgray;
  outline: none;
  color: lightgray;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: lightgray;
  }
`;


const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: pink;
  color: #46516e;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightgray;
  border: 1px solid lightgray;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;

const App = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");         // for our mess
  const [passw, setPass] = useState("");         

  const socketRef = useRef();

  useEffect(() => {

    socketRef.current = io.connect('/');

    socketRef.current.on("your id", id => {          // client can track who we are 
      setYourID(id);
      console.log("your id"+id);

    })
    socketRef.current.on("your password" , (passser)=>
    {
        console.log(passser);
    })

    socketRef.current.on("message",(message) => {

      console.log("here");
      receivedMessage(message);

    })
  }, []);

  function receivedMessage(message) {
  
        setMessages(oldMsgs => [...oldMsgs, message]);
    
    

  }

  

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
      
    };
   
    
    socketRef.current.emit("send message", messageObject);
    setMessage("");
  }
  function handlepassword(e){
    //console.log(e.target.value)
    setPass(e.target.value)
  }
  
  function password()
  {
    
   console.log(passw)
  }

  function handleChange(e) {    // when textarea encounter
    setMessage(e.target.value);
  }

  
  function deleteitems() {  
    // when textarea encounter
    setMessages([]);
  }
  


  return (
    <Page>
       <Box style={{color:"white"}}> CreatedBy : shubham shukla ( 18-may-2021 ) </Box>
       <Button style={{color:"black", fontFamily:"fantasy", width:"400px"}}> <marquee>WELCOME FRIENDS I HOPE YOU WILL LIKE THIS APP  --> [  "Chitter-Chatter" ]</marquee></Button>
      <Container>
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <MyRow key={index}>
                <MyMessage>
                  {message.body}
                </MyMessage>
              </MyRow>
            )
          }
          return (
            <PartnerRow key={index}>
              <PartnerMessage>
                {message.body}
              </PartnerMessage>
              
            </PartnerRow>
          )
        })}
      </Container>
      <Form onSubmit={sendMessage}>
        <TextArea value={message} onChange={handleChange} placeholder="Say something..." />
        <Button style={{color:"red", marginTop:"20px"}} > Send</Button> 
      </Form>
     
     <DeleteButton style={{width:"150px" ,margin:"20px",color:"black"}}
     onClick={deleteitems}>delete</DeleteButton> 
      
    </Page>
  );
};

export default App;