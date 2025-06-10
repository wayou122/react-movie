import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from '../contexts/UserContext';
import Menu from "../layouts/Menu";
import LoadingSpinner from "../components/LoadingSpinner";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useParams } from "react-router-dom";

function ChatRoom() {
  const { roomName } = useParams()
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
        stompClient.current.subscribe(`/topic/messages/${roomName}`,
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
      const res = await fetch(`http://localhost:8085/chat/${roomName}`)
      const resData = await res.json()
      setMessages(resData.data.reverse())
    } catch (err) {
      alert(err.message)
    }
  }

  function sendMessage() {
    const userId = user.userId
    if (stompClient.current && connected) {
      const msg = { userId, content, chatRoomName: roomName }
      stompClient.current.publish({
        destination: `/app/chatRoom/${roomName}`,
        body: JSON.stringify(msg)
      })
      setContent('')
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter')
      sendMessage()
  }

  if (!connected) {
    return (<>
      <Menu />
      <p className="text-center">正在連線...</p>
      <LoadingSpinner />
    </>)
  }

  const nameMap = { GoldenHorse62: '金馬 62', Oscar97: '奧斯卡 97' }
  return (
    <>
      <Menu />
      <h2 className="text-center">{nameMap[roomName]} 聊天室</h2>
      <div className="chat-room-container bg-body-secondary">
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
          <input type="text" placeholder={user ? "輸入訊息..." : '登入帳號才可傳送訊息'}
            className="chat-input"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!connected || !user || !content}
          />
          <button className={`send-button btn btn-lg btn-primary ${!connected || !user || !content ? 'disabled' : ''}`}
            onClick={sendMessage}
            disabled={!connected || !user || !content}
          >傳送</button>
        </div>
      </div>
    </>
  )
}
export default ChatRoom

function Message({ imgSrc, username, time, content }) {
  return (
    <div className={`message-container ${false ? 'my-message' : 'other-message'}`}>
      <img src={imgSrc} alt={`${username}'s avatar`} className="message-avatar" />
      <div className="message-content-wrapper">
        <div className="message-header">
          <span className="message-name">{username}</span>
          <span className="message-time">{time.slice(11, 16)}</span>
        </div>
        <div className="message-bubble bg-body-tertiary">
          <p className="message-text text-body">{content}</p>
        </div>
      </div>
    </div>
  );
}
