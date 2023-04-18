import { Component, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { updateContact, removeContact } from '../store/actions/contact.actions'

import { contactService } from '../services/contact.service'

export function ContactEdit() {
	const params = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const [contact, setContact] = useState(null)

	useEffect(() => {
		console.log('1')
		loadContact()
	}, [])

	async function loadContact() {
		const contactId = params.id
		if (contactId) {
			try {
				const contact = await contactService.getContactById(contactId)
				setContact(contact)
			} catch (error) {
				console.log('error:', error)
			}
		} else {
			const contact = contactService.getEmptyContact()
			setContact(contact)
		}
	}

	async function onSaveContact(ev) {
		ev.preventDefault()
		try {
			dispatch(updateContact(contact))
			navigate('/contact/')
		} catch (error) {
			console.log('error:', error)
		}
	}

	function handleChange({ target }) {
		const field = target.name
		let value = target.value

		switch (target.type) {
			case 'number':
			case 'range':
				value = +value
				break
			case 'checkbox':
				value = target.checked
				break
		}
		setContact({ ...contact, [field]: value })
		// this.setState(({ contact }) => ({ contact: { ...contact, [field]: value } }))
	}

	function onBack() {
		navigate(-1)
	}

	async function onRemoveContact() {
		try {
			// await contactService.deleteContact(this.state.contact._id)
			dispatch(removeContact(contact._id))
			navigate('/contact')
		} catch (error) {
			console.log('error:', error)
		}
	}
	if (!contact) return <div>Loading...</div>
	return (
		<section className="contact-edit">
			<form onSubmit={onSaveContact}>
				<img src={`https://robohash.org/set_set5/${contact._id}/size=100x100`} />
				<section>
					<h3>
						Name:
						<input type="text" value={contact.name} onChange={handleChange} name="name"></input>
					</h3>
				</section>
				<section>
					<h3>
						Phone:
						<input type="phone" value={contact.phone} onChange={handleChange} name="phone"></input>
					</h3>
				</section>
				<section>
					<h3>
						Email:
						<input type="email" value={contact.email} onChange={handleChange} name="email"></input>
					</h3>
				</section>

				<button type="submit">
					<i className="fa-solid fa-floppy-disk"></i>
					{contact._id ? 'Save' : 'Add'}
				</button>
			</form>

			<button className="round" onClick={onBack}>
				<i className="fa-solid fa-arrow-left-long" />
			</button>
			{contact._id && (
				<button className="round right" onClick={onRemoveContact}>
					<i className="fa-solid fa-trash"></i>
				</button>
			)}
		</section>
	)
}
