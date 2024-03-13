import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar"
import Menu from "../components/Menu"

function Home() {
const {user} = useContext(AuthContext)

  return (
    <div style={{ backgroundColor: '#fff6ea' }}>

    <div className="left-container">
          <Navbar />
          <Menu />
    </div>

    <div className="restaurant-container">


    </div>

    </div>
  );
}

export default Home;