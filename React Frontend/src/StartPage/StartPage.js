import "../StartPage/StartPageStyle.css";
import "./StartPageStyle.css"
import { Link } from "react-router-dom";
import backgroundImage from '../storage/clujStartPageBackground.jpeg';

function StartPage() {
  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', height: '100vh' }}>

      <div className={"startPageComponents"}>
        <div className={"titleText"}>CLUJ EXPLORE</div>
          <div className="buttonDistance">
        <Link to={"/Events"}>
          <button  className={"button"}>Explore</button>
        </Link>
        <Link to={"/planevent"}>
          <button  className={"button"}>Plan Trip</button>
        </Link>
          </div>
      </div>
    </div>
  );
}

export default StartPage;
