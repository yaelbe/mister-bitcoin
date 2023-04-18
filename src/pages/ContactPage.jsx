import React from 'react'
import { Component, useCallback, useEffect, useMemo, useState } from 'react'

import { Link } from 'react-router-dom'

import { ContactList } from '../components/ContactList'
import { contactService } from '../services/contact.service'
import { ContactDetailsPage } from './ContactDetailsPage'
import { loadContacts, setFilterBy } from '../store/actions/contact.actions'
import { useSelector, useDispatch } from 'react-redux'

export function ContactPage(props) {
	const contacts = useSelector((storeState) => storeState.contactModule.contacts)
	const filterBy = useSelector((storeState) => storeState.contactModule.filterBy)
	const [selectedContactId, setSelectedContactId] = useState(null)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(loadContacts())
	}, [])

	// async componentDidMount() {
	// 	this.loadContacts()
	// }

	// loadContacts = async () => {
	// 	try {
	// 		const contacts = await contactService.getContacts(this.state.filterBy)
	// 		this.setState({ contacts })
	// 	} catch (error) {
	// 		console.log('error:', error)
	// 	}
	// }

	function onSelectContactId(contactId) {
		setSelectedContactId(contactId)
	}

	function onChangeFilter({ target }) {
		console.log(target.value)
		let value = target.value
		const updateFilterBy = { ...filterBy, term: value }
		dispatch(setFilterBy(updateFilterBy))
		dispatch(loadContacts())
		// this.setState(({ filterBy }) => ({ filterBy: { ...filterBy, term: value } }), this.loadContacts)
	}

	// if (selectedContactId) return <ContactDetailsPage contactId={selectedContactId}></ContactDetailsPage>

	return (
		<section className="contact-page">
			<section>
				<input type="search" placeholder="Search" name="search" onChange={onChangeFilter}></input>
				<Link to="/contact/edit" className="round">
					<i className="fa-solid fa-plus"></i>
				</Link>
			</section>
			<ContactList contacts={contacts} onSelectContactId={onSelectContactId}></ContactList>
		</section>
	)
}
