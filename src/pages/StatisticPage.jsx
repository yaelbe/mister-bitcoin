import React, { Component } from 'react'
import { Chart } from '../components/Chart'
import { bitcoinService } from '../services/bitcoin.service'

export class StatisticPage extends Component {
	state = {
		marketPrice: null,
		transactions: null,
	}

	componentDidMount() {
		this.loadMarketPrice()
		this.loadTransactions()
	}

	loadMarketPrice = async () => {
		try {
			const marketPrice = await bitcoinService.getMarketPrice()
			this.setState({ marketPrice })
		} catch (error) {
			console.log('error:', error)
		}
	}
	loadTransactions = async () => {
		try {
			const transactions = await bitcoinService.getConfirmedTransactions()
			this.setState({ transactions })
		} catch (error) {
			console.log('error:', error)
		}
	}

	render() {
		const { marketPrice, transactions } = this.state
		if (!marketPrice || !transactions) return <div>Loading...</div>
		const marketPriceData = {
			xdata: marketPrice.map((item) => item.x),
			data: marketPrice.map((item) => item.y),
			color: 'green',
		}
		const transactionsData = {
			xdata: transactions.map((item) => item.x),
			data: transactions.map((item) => item.y),
			color: 'blue',
		}

		return (
			<section>
				<h1>Market Price (USD)</h1>
				<Chart
					data={marketPriceData.data}
					xdata={marketPriceData.xdata}
					color={marketPriceData.color}
				></Chart>
				<h1>Confirmed transactions per day (USD)</h1>
				<Chart
					data={transactionsData.data}
					xdata={transactionsData.xdata}
					color={transactionsData.color}
				></Chart>
			</section>
		)
	}
}
