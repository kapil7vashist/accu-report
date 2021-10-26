import Weather from "./Weather.js";
import News from "./News.js";

const Main = ({ main }) => {
    return (
        <div className="main">
            {main ? <Weather /> : <News />}
        </div>
    )
}

export default Main;