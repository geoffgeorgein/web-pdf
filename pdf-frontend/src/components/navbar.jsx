import { Link } from "react-router-dom";
import "./navbar.scss";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Navbar = () => {
  const { setUserInfo, userInfo } = useContext(UserContext);


  function logout() {
    
    localStorage.clear();

    setUserInfo(null);
  }

  const myObj = JSON.parse(localStorage.getItem("Profile"));
  console.log("profilename", myObj);

  const username = userInfo?.username || myObj?.userInfo?.username;
 
  return (
    <div className="navbar noprint" id="navbar">
      <div className="Navcontainer">
        <Link to={"/"}>
          {" "}
          <h1>Web pdf</h1>
        </Link>
        <div className="rightContainer">
          <ul>
            {
              username &&
              <>
                <h2>{username}</h2>
                <button onClick={logout}>Log Out</button>
              </>
            }

            {!username && (
              <>
                <li>
                  <Link to={"/login"}>
                   
                    <button>Log in</button>
                  </Link>
                </li>
                <li>
                  <Link to={"/signup"}>
                    
                    <button>Sign up</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
