import React from 'react'
import { Component, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import MovesList from '../components/MovesList'
import { TransferFund } from '../components/TransferFund'

import { contactService } from '../services/contact.service'
import { userService } from '../services/user.services'

import { loadContacts, setFilterBy } from '../store/actions/contact.actions'
import { loadUser, transferCoins } from '../store/actions/user.actions'

export function ContactDetailsPage(props) {
	const user = useSelector((storeState) => storeState.userModule.loggedInUser)
	const [contact, setContact] = useState(null)
	const params = useParams()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		loadContact()
		dispatch(loadUser())
	}, [params.id])

	async function loadContact() {
		try {
			const contact = await contactService.getContactById(params.id)
			setContact(contact)
		} catch (error) {
			console.log('error:', error)
		}
	}

	function onBack() {
		navigate(-1)
	}

	async function onTransferCoins(amount) {
		dispatch(transferCoins(amount, contact))
	}

	function moves() {
		return user.moves.filter((move) => move.toId === contact._id)
	}

	if (!contact || !user) return <div>Loading...</div>
	return (
		<section className="contact-details">
			<div>
				<img src={`https://robohash.org/set_set5/${contact._id}/size=100x100`} />
				<section>
					<h3>Name: {contact.name}</h3>
				</section>
				<section>
					<h3>Phone:{contact.phone}</h3>
				</section>
				<section>
					<h3>Email: {contact.email}</h3>
				</section>
			</div>
			<TransferFund
				contact={contact}
				maxCoins={user.coins}
				onTransferCoins={onTransferCoins}
			></TransferFund>
			<MovesList title="Your moves" moveList={moves()} showTo={false}></MovesList>
			<Link className="round right" to={`/contact/edit/${contact._id}`}>
				<i className="fa-solid fa-pen"></i>
			</Link>
			<div className="button-container">
				<button className="round" onClick={onBack}>
					<i className="fa-solid fa-arrow-left-long" />
				</button>
			</div>
		</section>
	)
}
