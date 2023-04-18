import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'

export function AppHeader({ links }) {
	return (
		<header className="app-header">
			<section className="container">
				<h1>Mister Bitcoin</h1>
				<nav>
					{links.map((link, idx) => (
						<NavLink key={idx} to={link.to}>
							{link.displayName}
						</NavLink>

						// <button name={link} key={idx} onClick={() => handleRouteChange(link)}>
						// 	{link}
						// </button>
					))}
				</nav>
			</section>
		</header>
	)
}
