import { useState } from "react";
import sun from "../icons/weather/sun.png";
import Main from "./Main";
import { Consumer } from "../Context";

const Header = () => {

    const [main, setMain] = useState(true);

    const changeMain = () => {
        setMain(!main);
    }

    return (
        <Consumer>
            {
                value => {
                    const { name } = value;
                    if (value == null) {
                        return <h1>Nothing to Render</h1>
                    } else {
                        return (
                            <>
                                <div className="top">
                                    <div className="header">
                                        <a href="/" className="logo">
                                            <img src={sun} alt="Logo AccuReport" title="AccuReport" />
                                            <h1>AccuReport</h1>
                                        </a>
                                        <div className="toggle-btn">
                                            <button onClick={changeMain} id="toggle-btn">{main ? <i className="fas fa-newspaper"></i> : <i className="fas fa-cloud"></i>} {main ? "News" : "Weather"}</button>
                                        </div>
                                    </div>
                                </div>
                                <Main main={main} />
                            </>
                        )
                    }
                }
            }
        </Consumer>
    )
};

export default Header;