// Icons
import ClearDay from "../icons/weather/clear-day.png";
import ClearNight from "../icons/weather/clear-night.png";
import CloudyDay from "../icons/weather/cloudy-day.png";
import CloudyNight from "../icons/weather/cloudy-night.png";
import Overcast from "../icons/weather/overcast.png";
import Thunderstorm from "../icons/weather/storm.png"
import Rain from "../icons/weather/rain.png";
import Snow from "../icons/weather/snow.png";




const Daily = ({ dailyData }) => {
    let day, currentDate;
    function date(epoch) {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const date = new Date(epoch * 1000);
        day = days[date.getDay()];
        currentDate = date.getDate();
    }


    return (
        <div className="daily">
            <h2>Daily</h2>
            <div className="daily-cards">
                {
                    dailyData.map((element, index) => {
                        if (index !== 0) {
                            const todayDate = element.EpochDate;
                            date(todayDate);
                            const maxTemp = Math.floor(element.Temperature.Maximum.Value);
                            const minTemp = Math.floor(element.Temperature.Minimum.Value);


                            let weatherIcon;

                            const dateNow = new Date();
                            const hour = dateNow.getHours();
                            let Icon, WeatherDesc;
                            if (hour >= 18 || hour <= 6) {
                                Icon = element.Night.Icon;
                                WeatherDesc = element.Night.IconPhrase;
                            } else {
                                Icon = element.Day.Icon;
                                WeatherDesc = element.Day.IconPhrase;
                            }


                            if ((Icon >= 1 && Icon <= 5) || (Icon >= 33 && Icon <= 37)) {

                                const date = new Date();
                                const hour = date.getHours();

                                if (hour > 18 || hour < 6) {
                                    weatherIcon = ClearNight;
                                } else {
                                    weatherIcon = ClearDay;
                                }
                            } else if ((Icon >= 12 && Icon <= 14) || (Icon === 25) || (Icon === 40)) {
                                weatherIcon = Rain;
                            } else if (Icon === 6 || Icon === 7 || Icon === 16 || Icon === 17 || Icon === 38 || Icon === 39 || Icon === 20 || Icon === 21) {
                                const date = new Date();
                                const hour = date.getHours();

                                if (hour >= 18 || hour <= 6) {
                                    weatherIcon = CloudyNight;
                                } else {
                                    weatherIcon = CloudyDay;
                                }

                            } else if ((Icon >= 22 && Icon <= 24) || Icon === 29 || Icon === 44) {
                                weatherIcon = Snow;
                            } else if (Icon === 42 || Icon === 15) {
                                weatherIcon = Thunderstorm;
                            } else {
                                weatherIcon = null;
                            }



                            return (
                                <div key={index} className="card">
                                    <h3 className="date">{day} {currentDate}</h3>
                                    <img src={weatherIcon} alt={WeatherDesc} />
                                    <div className="icondiv-card">
                                        <p className="max">{maxTemp}&deg;</p><p className="min">{minTemp}&deg;</p></div>
                                    <h4 className="climate-card">{WeatherDesc}</h4>
                                </div>
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default Daily;