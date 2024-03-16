import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar"
import Menu from "../components/Menu"
import Restaurants from "../components/Restaurants"

function Home() {
const {user} = useContext(AuthContext)

  return (
    <div style={{ backgroundColor: '#fff6ea' }}>

    <div className="left-container">
          <Navbar />
          <Menu />
          <Restaurants />
    </div>

    <div className="right-container">


    </div>

    </div>
  );
}

export default Home;