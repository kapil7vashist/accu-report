import { Consumer } from "../Context";
import DayDetails from "./DayDetails";
import Daily from "./Daily";
import Spinner from "../Spinner";
import WeatherError from "../WeatherError";

// Importing the Icons 
import ClearDay from "../icons/weather/clear-day.png";
import ClearNight from "../icons/weather/clear-night.png";
import CloudyDay from "../icons/weather/cloudy-day.png";
import CloudyNight from "../icons/weather/cloudy-night.png";
import Overcast from "../icons/weather/overcast.png";
import Thunderstorm from "../icons/weather/storm.png"
import Rain from "../icons/weather/rain.png";
import Snow from "../icons/weather/snow.png";

const MainWeather = ({ Thunder }) => {
    return (
        <>
            <Consumer>
                {value => {
                    let { weatherData } = value;

                    const { changeLocationKey, apikey, changeLocationData, changeWeatherData, changeWeatherError, weatherError, changeWeatherMessage, weatherMessage } = value;
                    const { cityName, countryName } = value.locationData;
                    function getCityName() {
                        let inputCity = document.getElementById("input-city");
                        const inputValue = inputCity.value;
                        inputCity.value = "";
                        fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apikey}&q=${inputValue}`).then(data => data.json()).then(res => {
                            let newLocKey = res[0].Key;
                            changeLocationKey(res[0].Key);

                            setTimeout(() => {
                                changeLocationData({
                                    cityName: res[0].LocalizedName,
                                    countryName: res[0].Country.EnglishName
                                });
                            }, 1000);
                            fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${newLocKey}?apikey=${apikey}&metric=true&details=true`).then(data => data.json()).then(res => {
                                changeWeatherData({});
                                setTimeout(() => {
                                    changeWeatherData(res);
                                }, 1000);
                            }).catch(err => changeWeatherError(true));
                        }).catch(err => {
                            changeWeatherError(true);
                            changeWeatherMessage(`Couldn't Find the Location ---> ${inputValue}`);
                        });
                    }

                    if (weatherMessage) {
                        return <WeatherError />
                    }
                    else if (Object.keys(weatherData).length === 0) {
                        return <Spinner></Spinner>
                    } else {
                        const date = new Date();
                        const hour = date.getHours();
                        let Icon, IconDesc;
                        if (hour >= 18 || hour < 6) {
                            Icon = weatherData.DailyForecasts[0].Night.Icon;
                            IconDesc = weatherData.DailyForecasts[0].Night.IconPhrase;
                        } else {
                            Icon = weatherData.DailyForecasts[0].Day.Icon;
                            IconDesc = weatherData.DailyForecasts[0].Day.IconPhrase;
                        }


                        const { Text } = weatherData.Headline;
                        const { LongPhrase, PrecipitationProbability, Wind } = weatherData.DailyForecasts[0].Day;
                        const { ShortPhrase } = weatherData.DailyForecasts[0].Night;
                        const minTemp = Math.floor(weatherData.DailyForecasts[0].Temperature.Minimum.Value);
                        const maxTemp = Math.floor(weatherData.DailyForecasts[0].Temperature.Maximum.Value);
                        const uvIndex = weatherData.DailyForecasts[0].AirAndPollen[5].Category;
                        const uvIndexValue = weatherData.DailyForecasts[0].AirAndPollen[5].Value;
                        const sunrise = weatherData.DailyForecasts[0].Sun.Rise.substring(11, 16);
                        const sunset = (weatherData.DailyForecasts[0].Sun.Set.substring(11, 16));
                        const moonrise = weatherData.DailyForecasts[0].Moon.Rise.substring(11, 16);
                        const moonset = (weatherData.DailyForecasts[0].Moon.Set.substring(11, 16));

                        let weatherIcon;


                        if ((Icon >= 1 && Icon <= 5) || (Icon >= 33 && Icon <= 37)) {
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

                            if (hour > 12 || hour < 0) {
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
                            <>
                                <div className="weather">
                                    <div className="search-input">
                                        <input type="text" id="input-city" placeholder="Enter City Name" />
                                        <button id="search-btn" onClick={getCityName}><i className="fas fa-search"></i></button>
                                    </div>
                                    <div className="main-details">
                                        <h3 className="location">{cityName} , {countryName}</h3>
                                        <div className="icondiv">
                                            <img id="weather-icon" src={weatherIcon} alt={IconDesc} />
                                            <h4 className="max-temp">{maxTemp}&deg;</h4>
                                            <h4 className="min-temp">{minTemp}&deg;</h4>
                                        </div>
                                        <h3 className="climate">{IconDesc}</h3>
                                        <h4 className="warning">{Text}</h4>
                                    </div>
                                </div>
                                <Daily dailyData={value.weatherData.DailyForecasts} />
                                <DayDetails min={minTemp} max={maxTemp} longphrase={LongPhrase} wind={Wind} rainProb={PrecipitationProbability} shortphrase={ShortPhrase} uvIndex={uvIndex} uvValue={uvIndexValue} moonrise={moonrise} sunset={sunset} sunrise={sunrise} moonset={moonset} />
                            </>
                        )
                    }
                }
                }
            </Consumer >
        </>
    )
}

export default MainWeather;