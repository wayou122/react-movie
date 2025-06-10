import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from '../contexts/UserContext';
import Menu from "../layouts/Menu";
import LoadingSpinner from "../components/LoadingSpinner";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

function Chat() {
  const { user } = useContext(UserContext)
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('')
  const stompClient = useRef(null) //保存stompClient實體

  useEffect(() => {

    getHistory()

    //建立連線
    const socket = new SockJS('http://localhost:8085/chat-websocket')
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      debug: (str) => { console.log(str) },
      onConnect: () => {
        setConnected(true)
        stompClient.current.subscribe('/topic/messages/goldenhorse60',
          (message) => {
            const msgBody = JSON.parse(message.body)
            setMessages((prev => [...prev, msgBody]))
          })
      },
      onDisconnect: () => { setConnected(false) }
    })
    stompClient.current.activate()

    return () => {
      if (stompClient.current) {
        stompClient.current.deactivate()
      }
    }
  }, [])


  async function getHistory() {
    try {
      const res = await fetch('http://localhost:8085/chat/goldenhorse60')
      const resData = await res.json()
      setMessages(resData.data.reverse())
    } catch (err) {
      alert(err.message)
    }
  }

  function sendMessage() {
    const userId = user.userId
    if (stompClient.current && connected) {
      const msg = { userId, content, chatRoomName: 'goldenhorse60' }
      stompClient.current.publish({
        destination: '/app/chatRoom/goldenhorse60',
        body: JSON.stringify(msg)
      })
      setContent('')
    }
  }

  if (!connected) {
    return (<>
      <Menu />
      <p className="text-center">正在連線...</p>
      <LoadingSpinner />
    </>)
  }

  return (
    <>
      <Menu />
      <div className="chat-room-container">
        <div className="chat-messages">
          {messages.length > 0 ? messages.map((msg) => (
            <Message
              key={msg.chatMessageId}
              imgSrc={`http://localhost:8085/${msg.userImagePath}`}
              username={msg.username}
              time={msg.createdDate}
              content={msg.content}
              isMyMessage={0}
            />
          )) : ''}
        </div>
        <div className="chat-input-area">
          <input type="text" placeholder={user ? "輸入訊息..." : '請先登入才可傳送訊息'}
            className="chat-input"
            value={content}
            onChange={(e) => setContent(e.target.value)} />
          <button className={`send-button btn btn-lg btn-primary ${!connected || !user || !content ? 'disabled' : ''}`}
            onClick={sendMessage}
            disabled={!connected || !user || !content}
          >發送</button>
        </div>
      </div>
    </>
  )
}
export default Chat

function Message({ imgSrc, username, time, content }) {
  return (
    <div className={`message-container ${false ? 'my-message' : 'other-message'}`}>
      {console.log(imgSrc)}
      <img src={imgSrc} alt={`${username}'s avatar`} className="message-avatar" />
      <div className="message-content-wrapper">
        <div className="message-header">
          <span className="message-name">{username}</span>
          <span className="message-time">{time}</span>
        </div>
        <div className="message-bubble">
          <p className="message-text">{content}</p>
        </div>
      </div>
    </div>
  );
}
