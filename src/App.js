import React from "react";
import Web3Provider from "web3-react";
import InjectedConnector from "./InjectedConnector";
import NetworkOnlyConnector from "./NetworkOnlyConnector";
import "./App.css";
import MyComponent from "./components/MyComponent";
import { MuiThemeProvider } from "@material-ui/core";

import ConnectBtn from "./components/ConnectBtn";

// const dotenv = require('dotenv');
// const env = dotenv.config().parsed

// const { InjectedConnector, NetworkOnlyConnector } = Connectors;
const Infura = new NetworkOnlyConnector({
  providerURL: process.env.REACT_APP_NETWORK_URL
});
const MetaMask = new InjectedConnector({ supportedNetworks: [1, 3, 4] });
const connectors = { MetaMask, Infura };

// `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`

function App() {
  return (
    <Web3Provider connectors={connectors} libraryName={"ethers.js"}>
      <div className="App">
        <MuiThemeProvider>
          <ConnectBtn />
          <MyComponent />
        </MuiThemeProvider>
      </div>
    </Web3Provider>
  );
}

export default App;
