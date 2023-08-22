import React from "react"
import Activity from '../../component/Mypage/Activity'
import Settings from '../../component/Mypage/Settings'
import { useState } from "react"
import { Section } from './Mypage.styled'


export default function Mypage() {
  // const [isLogin, setIsLogin] = useState(false);
  const [addClass, setAddClass] = useState(true);

  const LogoutClick = () => {
    sessionStorage.clear();
    // setIsLogin(false);
    document.location.href = '/'
  }

  return (
    <Section>
      <div className="profile">
        <article className="profile_img">
          <span>
            <img
                src={sessionStorage.getItem('profilePic')}/>
            </span>
        </article>
        <div className="profile_info">
          <h2 className="profile_user_name">{sessionStorage.getItem('username')}</h2>
          <div className="profile_user_state">
            <button onClick={LogoutClick} className="logout-btn">Logout</button>
          </div>
        </div>
      </div>
      <div className="mypage_status">
        <div className="status_button">
          <button onClick={() => setAddClass(true)} className={addClass ? "active" : ""}>Activity</button>
          <button onClick={() => setAddClass(false)} className={addClass ? "" : "active"}>Settings</button>
        </div>
        <div className="state_main_wrap">
          { addClass ? <Activity /> : <Settings />}
        </div>
      </div>
    </Section>
  )
}