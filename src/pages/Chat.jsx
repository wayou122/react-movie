import { Row, Col, Container } from "react-bootstrap"
import Menu from "../layouts/Menu"
function Chat() {

  return (
    <>
      <Menu />
      <Container>
        <h2 className="text-center mb-4">聊聊電影</h2>
        <Row className='d-flex justify-content-center align-items-stretch'>
          <Col xs={11} sm={7} md={5} lg={4} >
            <div className="chat-room card h-100">
              <img src="https://storage.googleapis.com/tghff_outland/image/recommended/1920_800/r_e11b2d7a49a7be56d410ec362ada281d.png"
                className="chat-room card-img-top" alt="..." />
              <div className="chat-room card-body">
                <h5 className="chat-room card-title">聊聊 / 金馬62</h5>
                <p className="chat-room card-text">第62屆金馬獎在2024年11月22日(六)舉行，大家觀看頒獎典禮的同時也可以在此聊聊對電影的想法，或是頒獎典禮的即時心得～</p>
                <a href="/chat/chatRoom/GoldenHorse62" className="btn btn-primary">進入聊天室</a>
              </div>
            </div>
          </Col>
          <Col xs={11} sm={7} md={5} lg={4} >
            <div className="chat-room card h-100">
              <img src="https://annenberg.usc.edu/sites/default/files/styles/article_full_content_1240x600/public/shutterstock_2119939280_ext.jpg?itok=QA079mik"
                className="chat-room card-img-top" alt="..." />
              <div className="chat-room card-body">
                <h5 className="chat-room card-title">聊聊 / 奧斯卡97</h5>
                <p className="chat-room card-text">第97屆奧斯卡金像獎在2025年3月2日(日)舉行，全球電影最高榮譽，頒獎典禮眾星雲集，邊看邊聊吧！</p>
                <a href="/chat/chatRoom/Oscar97" className="btn btn-primary">進入聊天室</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Chat