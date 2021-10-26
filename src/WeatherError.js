import Warning from "./icons/warning.png";
import { Consumer } from "./Context";

const WeatherError = () => {
    function reloadPage() {
        document.location.reload();
    }

    return (
        <Consumer>
            {
                value => {

                    const { weatherMessage } = value;

                    return (
                        <div className="error">
                            <img src={Warning} alt="Error" />
                            <p className="error-message">{weatherMessage}</p>
                            <button id="error-back" onClick={reloadPage}>Refresh</button>
                        </div>
                    )
                }
            }
        </Consumer >
    )
};

export default WeatherError;