import { Link } from "react-router-dom"
function NotFoundPage(){
  return (
    <>
      <div className="d-flex mx-auto mt-5 justify-content-center">
        網址錯誤，請回到<Link to={'/'}>【鼎電影】首頁</Link>
        
      </div>
    </>
  )
}
export default NotFoundPage