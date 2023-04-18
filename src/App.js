import './assets/scss/App.scss'
import { HomePage } from './pages/HomePage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { ContactEdit } from './pages/ContactEdit.jsx'
import { ContactDetailsPage } from './pages/ContactDetailsPage'
import { AppHeader } from './components/AppHeader'
import { StatisticPage } from './pages/StatisticPage'
import { SignupPage } from './pages/SignupPage'
import { Route, HashRouter as Router, Routes, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { loadUser } from './store/actions/user.actions'

import { useState, useEffect, useRef } from 'react'

function App() {
	const links = [
		{ displayName: 'Home', to: '/' },
		{ displayName: 'Contacts', to: '/contact/' },
		{ displayName: 'Charts', to: '/chart/' },
	]

	return (
		<Router>
			<section className="main-app">
				<AppHeader links={links} />
				<main className="container">
					<Routes>
						<Route path="/contact/edit/:id?" element={<ContactEdit />} />
						<Route path="/contact/:id" element={<ContactDetailsPage />} />
						<Route path="/chart" element={<StatisticPage />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/" element={<HomePage />} />
					</Routes>
				</main>
				<footer>
					<section className="container">Contacts 2023 &copy;</section>
				</footer>
			</section>
		</Router>
	)
}

export default App
