import React, { useContext } from "react";
import {
	Button,
	DialogTitle,
	Dialog,
	makeStyles,
	MenuItem
} from "@material-ui/core";

import { ethers } from "ethers";
import CoinContext from "../contexts/CoinContext";
import TimeContext from "../contexts/TimeContext";
import { getCorrectImageLink } from "../helpers";

const useStyles = makeStyles(theme => ({
	container: {
		display: "flex",
		justifyContent: "center"
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	img: {
		width: "24px",
		height: "24px",
		marginLeft: '3px'
	},
	coins: {
		display: "flex",
		justifyContent: "space-between",
		padding: '26px'
	},
	buttonPadding: {
		marginTop: '1.5px',
		width: '32px'
	}
}));

function TokenInputNoAmount(props) {

	// fetch params

	const updateActiveCoins = props.updateActiveCoins



	const updateSelectedTokenDetails = props.updateSelectedTokenDetails
  	const selectedTokenDetails = props.selectedTokenDetails


    // defaultToken => none if 'Select a Token'
    // const defaultToken = props.defaultToken
    // value for coinContext => e.g. 'triggerFrom' or 'actionTp'

	const classes = useStyles();
	const coinContext = useContext(CoinContext);
	const timeContext = useContext(TimeContext)
	const time = timeContext.time
	// State

	const [state, setState] = React.useState({
		open: false,
		coin: "",
		amount: 0,
		availableCoins: Object.values(getCorrectImageLink())
	});

	// const handleChange = name => event => {
	//   console.log(name)
	//   console.log(event)
	//   const newState = { ...state };
	//   newState[name] = event.target.value;
	//   setState({ ...state, [name]: event.target.value , open: false});
	//   coinContext.triggerFrom = event.target.value;
	//   // handleClose()
	// };

	function changeOrderDetails(coinContextCopy) {
		// Change coinContext Orders
		let newIntervalTime = time.intervalTime * 86400000
		const actionSellToken = coinContext["actionFrom"]
		const actionSellTokenSymbol = coinContext["actionFrom"]["symbol"];
		const actionBuyTokenSymbol = coinContextCopy["actionTo"]["symbol"]
		const actionSellAmount = coinContext["amountActionFrom"];
		let sellAmountPerSubOrder =  ethers.utils.bigNumberify(actionSellAmount).div(ethers.utils.bigNumberify(time.numOrders))
		let newOrders = []
		const decimals = coinContext.actionFrom.decimals
		let userfriendlyAmountPerSubOrder = ethers.utils.formatUnits(sellAmountPerSubOrder, decimals)

		for (let i = 0; i < time.numOrders; i++)
		{
		  let timestamp = coinContext['timestamp'] + (i * 86400000)
		  let date1 = new Date(timestamp);
		  let timestampString1 = `${date1.toLocaleDateString()} - ${date1.toLocaleTimeString()}`;
		  let order = {swap: `${parseFloat(userfriendlyAmountPerSubOrder).toFixed(4)} ${actionSellTokenSymbol} => ${actionBuyTokenSymbol}`, when: `${timestampString1}`}
		  newOrders.push(order)
		}

		coinContextCopy.orders = newOrders;
		updateActiveCoins(coinContextCopy)
	}

	const handleChange = coin => {
		const newState = { ...state };
		newState["coin"] = coin;
		setState({ ...state, "coin": coin, open: false });
		const coinContextCopy = {...coinContext}
		coinContextCopy['actionTo'] = coin;
		changeOrderDetails(coinContextCopy)
		// handleClose()
	};


	const handleClickOpen = async () => {
		setState({ ...state, open: true });
	};

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	const userChoice = () => {
		if (state.coin) {
			return (
				<span className={classes.coins}>
					{state.coin.symbol}
					<img
						src={state.coin.logo(state.coin.mainnet)}
						alt="coin logo"
						className={classes.img}
					/>
				</span>
			);
		} else {
			return (
					<span className={classes.coins}>
					{"GNO"}
					<img
					src={
						"https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6810e776880C02933D47DB1b9fc05908e5386b96/logo.png"
					}
					alt="coin logo"
					className={classes.img}
					/>
				  </span>
				  )

		}
	};

	// const handleAmount = name => event => {
	// 	setState({ ...state, [name]: event.target.value || "" });
	// 	coinContext[amountType] = event.target.value;
	// };

	return (
		<div className={classes.container}>
			<Button
				// color={state.coin ? "primary" : "secondary"}
				onClick={handleClickOpen}
				className={classes.buttonPadding}
			>
				{userChoice()}
			</Button>
			<Dialog
				disableBackdropClick
				disableEscapeKeyDown
				open={state.open}
				onClose={handleClose}
				value={state.coin}
				// onChange={handleChange("coin")}
			>
				<DialogTitle>Choose coin from dropdown</DialogTitle>
				{/* <Select value={state.coin} onChange={handleChange("coin")} onClick={console.log("click")} > */}
				{/* // <div value={state.coin} onChange={handleChange("coin")}> */}
				{state.availableCoins.map(coin => {
					return (
						<MenuItem
							// onChange={handleChange("coin")}
							// onClick={handleClose}
							onClick={() => {
								handleChange(coin);
							}}
							key={coin.id}
							value={coin}
							className={classes.coins}
						>
							{coin.symbol}
							<img
								className={classes.img}
								src={coin.logo(coin.mainnet)}
								alt="coin logo"
							/>
						</MenuItem>
					);
				})}
			</Dialog>
		</div>
	);
}

export default TokenInputNoAmount;
