import React, { useState, useEffect } from "react";
import axios from "axios";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";

import Footer from "./components/footer/Footer";

const url = "https://randomuser.me/api/";
// const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [userData, setUserData] = useState(null);
  const [userInfo, setuserInfo] = useState([]);
  const [addUserInfo, setAddUserInfo] = useState([]);
  const [isClicked, setisClicked] = useState(false);

  const getRandomUser = async () => {
    await axios(url)
      .then((res) => {
        setUserData(res.data.results[0]);
        console.log(res.data.results[0]);
        setuserInfo({
          title: "My name is ",
          info: `${res.data.results[0].name.first}  ${res.data.results[0].name.last}`,
        });
        setisClicked(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getRandomUser();
  }, []);

  // get info section

  const getInfo = (hover) => {
    switch (hover) {
      case "profile":
        setuserInfo({
          title: "My name is :  ",
          info: `${userData.name.first}  ${userData.name.last}`,
        });
        break;
      case "email":
        setuserInfo({
          title: "My Email is",
          info: userData.email,
        });
        break;

      case "age":
        setuserInfo({
          title: "My age is : ",
          info: userData.dob.age,
        });
        break;
      case "location":
        setuserInfo({
          title: "My location is : ",
          info: `${userData.location.city}  ${userData.location.country}`,
        });
        break;
      case "phone":
        setuserInfo({
          title: "My phone number is  : ",
          info: userData.phone,
        });
        break;
      case "password":
        setuserInfo({
          title: "My password is : ",
          info: userData.login.password,
        });
        break;
      default:
        break;
    }
  };

  //get info section done

  //add user ınfo

  const handleAddUser = (name) => {
    const newUser = {
      firstName: userData.name.first,
      email: userData.email,
      phone: userData.phone,
      age: userData.dob.age,
    };

    setAddUserInfo([...addUserInfo, newUser]);
    setisClicked(true);
  };
  //add user ınfo

  return (
    <main>
      {userData && (
        <>
          <div className="block bcg-orange">
            {/* <img src={cwSvg} alt="cw" id="cw" /> */}
          </div>
          <div className="block">
            <div className="container">
              <img
                src={userData.picture.large}
                alt="random user"
                className="user-img"
              />
              <p className="user-title">
                {userInfo !== [] ? userInfo.title : `My name is `}
              </p>
              <p className="user-value">
                {userInfo !== []
                  ? userInfo.info
                  : `${userData.name.first} ${userData.name.last}`}
              </p>
              <div className="values-list">
                <button
                  className="icon"
                  data-label="name"
                  onMouseEnter={() => getInfo("profile")}
                >
                  <img
                    src={userData.gender === "female" ? womanSvg : manSvg}
                    alt="user"
                    id="iconImg"
                  />
                </button>
                <button
                  onMouseEnter={() => getInfo("email")}
                  className="icon"
                  data-label="email"
                >
                  <img src={mailSvg} alt="mail" id="iconImg" />
                </button>
                <button
                  onMouseEnter={() => getInfo("age")}
                  className="icon"
                  data-label="age"
                >
                  <img
                    src={userData.gender === "female" ? womanAgeSvg : manAgeSvg}
                    alt="age"
                    id="iconImg"
                  />
                </button>
                <button
                  onMouseEnter={() => getInfo("location")}
                  className="icon"
                  data-label="street"
                >
                  <img src={mapSvg} alt="map" id="iconImg" />
                </button>
                <button
                  onMouseEnter={() => getInfo("phone")}
                  className="icon"
                  data-label="phone"
                >
                  <img src={phoneSvg} alt="phone" id="iconImg" />
                </button>
                <button
                  onMouseEnter={() => getInfo("password")}
                  className="icon"
                  data-label="password"
                >
                  <img src={padlockSvg} alt="lock" id="iconImg" />
                </button>
              </div>
              <div className="btn-group">
                <button
                  onClick={() => getRandomUser()}
                  className="btn"
                  type="button"
                >
                  new user
                </button>
                <button
                  onClick={() => handleAddUser(userData.name.first)}
                  className="btn"
                  type="button"
                  disabled={isClicked && "disabled"}
                >
                  add user
                </button>
              </div>

              <table className="table">
                <thead>
                  <tr className="head-tr">
                    <th className="th">Firstname</th>
                    <th className="th">Email</th>
                    <th className="th">Phone</th>
                    <th className="th">Age</th>
                  </tr>
                </thead>
                <tbody>
                  {addUserInfo === [] ? (
                    ""
                  ) : (
                    <>
                      {addUserInfo.map((item, idx) => (
                        <tr className="body-tr" key={idx}>
                          <th className="th">{item.firstName}</th>
                          <th className="th">{item.email}</th>
                          <th className="th">{item.phone}</th>
                          <th className="th">{item.age}</th>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}

export default App;
