import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
function Nav() {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  //처음 랜더링이 될때 NavscrollY의 값이 변경되면 'show' 상태를 변경하는 이벤트 핸들러를 등록,  unmount 되면 초기화
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setShow(window.scrollY > 50 ? true : false);
    });
    //clean up
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleChange = e => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };
  return (
    //Scroll이 아래로 내려 갈 때, top 부분에 검은색 바가 생성된다.
    <nav className={`nav ${show && "nav__black"}`}>
      <img
        alt="Neflex logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/220px-Netflix_2015_logo.svg.png"
        className="nav__logo"
        onClick={() => window.location.reload()}
      />

      <input
        value={searchValue}
        onChange={handleChange}
        className="nav__input"
        type="text"
        placeholder="검색어를 입력해주세요."
      />
      <img
        alt="User Logged"
        src="https://occ-0-4796-988.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
        className="nav__avatar"
      />
    </nav>
  );
}

export default Nav;
