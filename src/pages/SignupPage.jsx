import React, { Component } from 'react'
import bitcoin from '../assets/imgs/bitcoin.png'
import { signup } from '../store/actions/user.actions'
import { userService } from '../services/user.services'
import { NavLink, useNavigate, withRouter } from 'react-router-dom'
import { connect, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

export function SignupPage() {
	const user = useSelector((storeState) => storeState.userModule.loggedInUser)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		console.log(user)
		if (user) navigate('/')
	}, [user])

	function onSignup(ev) {
		ev.preventDefault()
		const name = ev.target.elements.namedItem('user-name').value
		dispatch(signup(name))
		navigate('/')
	}

	return (
		<section className="signup-container">
			<form onSubmit={onSignup} className="simple-form">
				<img src={bitcoin}></img>
				<label htmlFor="name">Please enter your name:</label>
				<input type="text" placeholder="Your name here" id="name" name="user-name"></input>
				<button>Sign up</button>
			</form>
		</section>
	)
}
