import {Consumer} from "./Context.js";
import Header from "./Components/Header.js";
import Footer from "./Components/Footer.js";


function App() {
  return (
    <Provider>
    <div className="App">
      <Header/>
      <Footer/>
    </div>
    </Provider>
  );
}

export default App;
