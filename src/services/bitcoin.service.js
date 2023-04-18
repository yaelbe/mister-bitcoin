import axios from 'axios'
import { storageService } from './storage.service'

export const bitcoinService = {
	getRate,
	getMarketPrice,
	getConfirmedTransactions,
}
const KEY_RATE = 'key_rate'
const KEY_MARKET_PRICE = 'key_price'
const KEY_MARKET_TRANSACTIONS = 'key_transactions'

async function getRate(coins) {
	let currRate = storageService.load(KEY_RATE)
	if (!currRate) {
		try {
			const res = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
			currRate = res.data
			storageService.store(KEY_RATE, currRate)
		} catch (err) {
			console.log('error getting rate', err)
		}
	}
	return currRate
}

async function getMarketPrice() {
	let marketPrice = storageService.load(KEY_MARKET_PRICE)
	if (!marketPrice) {
		try {
			const res = await axios.get(
				'https://api.blockchain.info/charts/market-price?timespan=5week&format=json&cors=true'
			)
			marketPrice = res.data.values
			storageService.store(KEY_MARKET_PRICE, marketPrice)
		} catch (err) {
			console.log('error getting market price', err)
		}
	}
	return marketPrice
}
async function getConfirmedTransactions() {
	let confirmedTransaction = storageService.load(KEY_MARKET_TRANSACTIONS)
	if (!confirmedTransaction) {
		try {
			const res = await axios.get(
				`https://api.blockchain.info/charts/transactions-per-second?timespan=1week&format=json&cors=true`
			)
			confirmedTransaction = res.data.values
			storageService.store(KEY_MARKET_TRANSACTIONS, confirmedTransaction)
		} catch (err) {
			console.log('error getting confirmed transactions', err)
		}
	}
	return confirmedTransaction
}
