import React, { useContext }  from 'react'
import { useWeb3Context } from "web3-react";

// Import Components
import ActionBtn from "./ActionBtn";
import ConnectBtn from "./ConnectBtn";
import ERC20Input from "./ERC20Input";
import Orders from "./Orders"
import MinOrders from "./MinOrders"
import TokenInputNoAmount from "./TokenInputNoAmount";
import NoOfSwaps from "./NoOfSwaps";
import TimeBetween from "./TimeBetween";
import Interval from "./TimeInterval";

import OrderContext from "../contexts/OrderContext";


// Style
import { Button, Divider, makeStyles, Card, CardContent, CardHeader, Typography } from "@material-ui/core";


const style = makeStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    card: {
      // margin: "25px"
      marginTop: "50px",
      marginBottom: "25px"
    },
    card2: {
      // margin: "25px"
      marginTop: "10px",
      marginBottom: "10px",
      width: '40%',
    },
    card3: {
      // margin: "25px"
      marginTop: "10px",
      marginBottom: "10px",
      width: '25%'
    },
    cardContent: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-around',
      marginBottom: '5px !important'
    },
    box: {
      display: 'flex',
      flexWrap: 'wrap',
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-between'
    },
    arrow: {
      marginTop: "20px"
    },
    title: {
      textAlign: "left"
    },
    inputs: {
      textAlign: "center",
      marginTop: '35px'
    },
    dividerClass: {
      marginTop: '20px',
      marginBottom: '10px'
    }
  });


function TimeOrderWrapper(props) {

    const context = useWeb3Context()
    const classes = style();
    const selectedTokenDetails = props.selectedTokenDetails
    const updateSelectedTokenDetails = props.updateSelectedTokenDetails
    const ordersContext = useContext(OrderContext);


    let ordersInStorage;
    if (localStorage.getItem(`triggered-${context.account}`) !== null) {
        ordersInStorage = []
        let returnData = JSON.parse(localStorage.getItem(`triggered-${context.account}`))
        returnData.forEach(value => {
            ordersInStorage.push(value)
        })

    } else {
        ordersInStorage = 0;
    }




    // console.log(dummy)


    // Props
    const proxyStatus = props.proxyStatus
    const updateProxyStatus = props.updateProxyStatus
    const updateActiveCoins = props.updateActiveCoins
    // const orders2 = props.orders2
    return (
        <React.Fragment>
          <ConnectBtn proxyStatus={proxyStatus} networkId={context.networkId} updateProxyStatus={updateProxyStatus} />
          <h1>GelatoDX</h1>
          <h3>Time-based order splitting on the DutchX</h3>
          <div className={classes.box}>
            <Card className={classes.card2} raised>
            {/* <h4 className={classes.title}>Title</h4> */}
              <p className={classes.inputs}>Total Sell Volume</p>
              <CardContent className={classes.cardContent}>


                <ERC20Input selectedTokenDetails={selectedTokenDetails} updateSelectedTokenDetails={updateSelectedTokenDetails} updateActiveCoins={updateActiveCoins}></ERC20Input>
                <p className={classes.inputs}>to</p>
                <TokenInputNoAmount updateActiveCoins={updateActiveCoins} selectedTokenDetails={selectedTokenDetails} updateSelectedTokenDetails={updateSelectedTokenDetails} ></TokenInputNoAmount>

              </CardContent>
            </Card>

            <Card className={classes.card3} raised>
              <p className={classes.inputs}>Split into</p>
              <CardContent className={classes.cardContent}>

                <NoOfSwaps></NoOfSwaps>
                <p className={classes.inputs}>orders</p>

              </CardContent>
            </Card>

            <Card className={classes.card3} raised>
              <p className={classes.inputs}>Interval between each order</p>
              <CardContent className={classes.cardContent}>

                <TimeBetween updateActiveCoins={updateActiveCoins}></TimeBetween>
                <p className={classes.inputs}>day(s)</p>

              </CardContent>
            </Card>

          </div>
          <h3>Resulting orders</h3>
          <MinOrders orders2={props.orders2}   ></MinOrders>
          <ActionBtn updateSelectedTokenDetails={updateSelectedTokenDetails} selectedTokenDetails={selectedTokenDetails} updateProxyStatus={updateProxyStatus}></ActionBtn>
          <Divider variant="middle" className={classes.dividerClass}/>
          <h3>Your scheduled orders</h3>
          <Button color={"secondary"} onClick={ordersContext.fetchExecutionClaims}>Fetch past Orders</Button>
          <Orders></Orders>
        </React.Fragment>
    )
}

export default TimeOrderWrapper