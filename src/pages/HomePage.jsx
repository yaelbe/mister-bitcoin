import React, { Component } from 'react'
import { bitcoinService } from '../services/bitcoin.service'
import { userService } from '../services/user.services'
import { loadUser } from '../store/actions/user.actions'
import MovesList from '../components/MovesList'

import bitcoin from '../assets/imgs/bitcoin.png'
import coins from '../assets/imgs/coins.png'
import { useState, useEffect, useRef } from 'react'
import { NavLink, useNavigate, withRouter } from 'react-router-dom'
import { connect, useSelector, useDispatch } from 'react-redux'

export function HomePage(props) {
	const user = useSelector((storeState) => storeState.userModule.loggedInUser)
	const [rate, setRate] = useState(0)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		load()
		getRate()
	}, [])

	function load() {
		dispatch(loadUser())
		if (!user) navigate('/signup')
	}

	// async function loadUser() {
	// 	try {
	// 		let user = await userService.getUser()
	// 		console.log('user', user)
	// 		if (!user) {
	// 			console.log('user')
	// 			this.props.history.push('/signup')
	// 		} else {
	// 			this.setState({ user })
	// 		}
	// 	} catch (error) {
	// 		console.log('error:', error)
	// 	}
	// }

	async function getRate() {
		try {
			const rate = await bitcoinService.getRate()
			setRate(rate)
		} catch (error) {
			console.log('error:', error)
		}
	}

	if (!user || !rate) return <div>Loading...</div>

	return (
		<section className="home-container">
			<h3>
				Hello, <span className="bold">{user.name}</span>
			</h3>
			<div className="user-data">
				<img src={bitcoin} />
				<p>Coins: {user.coins}</p>
			</div>
			<div className="user-data">
				<img src={coins} />
				<p>Rate: {rate}</p>
			</div>
			<MovesList
				title="Your last 3 moves"
				moveList={user.moves?.slice(0, 3) || []}
				showTo={true}
			></MovesList>
		</section>
	)
}
