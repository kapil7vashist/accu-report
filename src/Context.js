import { useEffect, createContext, useState } from "react";

const Context = createContext();

export const Provider = (props) => {

    const [weatherError, changeWeatherError] = useState(false);
    const [weatherMessage, changeWeatherMessage] = useState(null);


    const [weatherLoading, changeWeatherLoading] = useState(false);
    const [locationKey, changeLocationKey] = useState(null);
    const [weatherData, changeWeatherData] = useState({});
    const [locationData, changeLocationData] = useState({
        cityName: "",
        countryName: ""
    });
    const [keyStatus, changekeyStatus] = useState(false);
    const apikey = `uEJ5xASBnKLfrmghcmJfw6HXQcJexLCY`;

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const lat = pos.coords.latitude;
                const long = pos.coords.longitude;

                fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${apikey}&q=${lat},${long}&details=true`).then(res => res.json()).then(data => {
                    changeLocationKey(data.Key)
                    changekeyStatus(true);
                    changeLocationData({
                        cityName: data.LocalizedName,
                        countryName: data.Country.EnglishName
                    });
                }).catch(err => changeWeatherError(true));

                if (locationKey != null) {
                    fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${apikey}&metric=true&details=true`).then(data => data.json()).then(res => changeWeatherData(res)).catch(err => {

                        changeWeatherError(true);
                    })
                }
            })
        }
    }, [keyStatus]);


    //  News Application 
    const [articles, changeArticles] = useState([]);

    useEffect(() => {
        const choices = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
        const category = choices[Math.floor(Math.random() * 6)];
        console.log(category);
        fetch(`https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=f05371edb53247e18848957fc4d8dbdd`).then(data => data.json()).then(res => changeArticles(res.articles));
    }, [])


    return (
        <Context.Provider value={{ articles, changeArticles, apikey, weatherData, locationData, locationKey, changeWeatherData, changeLocationKey, changeLocationData, changeWeatherError, weatherError, weatherMessage, changeWeatherMessage }}>
            {props.children}
        </Context.Provider>
    )
}

export const Consumer = Context.Consumer;