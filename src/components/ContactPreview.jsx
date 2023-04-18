import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export function ContactPreview({ contact }) {
	return (
		<li className="contact-preview">
			<Link to={`/contact/${contact._id}`}>
				<img src={`https://robohash.org/set_set5/${contact._id}/size=100x100`} />
				<h2>{contact.name}</h2>
			</Link>
		</li>
	)
}
