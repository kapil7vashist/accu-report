import sunrisePic from "../icons/others/sunrise.png";
import sunsetPic from "../icons/others/sunset.png";
import moonrisePic from "../icons/others/moonrise.png";
import moonsetPic from "../icons/others/moonset.png";
import uv from "../icons/others/uv.png";
import umbrella from "../icons/others/umbrella.png";
import windPic from "../icons/others/windmill.png";

const DayDetails = ({ longphrase, shortphrase, min, max, moonrise, moonset, sunset, sunrise, wind, rainProb, uvIndex, uvValue }) => {
    return (<div className="day-details">
        <h1>Day Details</h1>
        <div className="cards">
            <div className="card-description">
                <h3>Day</h3>
                <p>{longphrase}. The High will be {max}&deg;</p>
                <h3>Night</h3>
                <p>{shortphrase}. The Low will be {min}&deg;</p>
            </div>
            <div className="sun-time">
                <h3>Sunrise</h3>
                <span><img src={sunrisePic} alt="Sunrise" /><p>{sunrise} </p></span>
                <h3>Sunset</h3>
                <span><img src={sunsetPic} alt="Sunset" /><p>{sunset} </p></span>
            </div>
            <div className="moon-time">
                <h3>Moonset</h3>
                <span><img src={moonsetPic} alt="Moonset" /><p>{moonset}</p></span>
                <h3>Moonrise</h3>
                <span><img src={moonrisePic} alt="Moonrise" /><p>{moonrise}</p></span>
            </div>
            <div className="others">
                <h3>UV Index</h3>
                <span><img src={uv} alt="UV Index" /><p>{uvValue} {uvIndex} </p></span>
                <h3>Precipitation</h3>
                <span><img src={umbrella} alt="Precipitation" /><p>{rainProb}%</p></span>
                <h3>Wind Speed</h3>
                <span><img src={windPic} alt="Wind Speed" /><p>{wind.Direction.English} {wind.Direction.Degrees}&deg;</p><p>{wind.Speed.Value} Km/h</p></span>
            </div>
        </div>
    </div>)
}

export default DayDetails;