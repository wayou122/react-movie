import { Link } from "react-router-dom"
import Menu from "../layouts/Menu"
import { useRouteError } from 'react-router-dom';

function NotFoundPage() {
  const error = useRouteError();
  return (
    <>
      <Menu />
      <div className="text-center mt-5 justify-content-center">
        <p>發生錯誤，請回到<Link to={'/'}>【鼎電影】首頁</Link></p>
        <p className="small">{error?.message}</p>
      </div>
    </>
  )
}
export default NotFoundPage