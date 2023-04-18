import React from 'react'

export default function MovesList({ showTo, title, moveList }) {
	const options = {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
	}
	return (
		<section className="moves">
			<h1>{moveList.length ? title : 'No moves yet'}</h1>
			<ul>
				{moveList.map((move, idx) => (
					<li key={idx}>
						{showTo && <p>To: {move.to}</p>}
						<p>At: {new Date(move.at).toLocaleDateString('en', options)}</p>
						<p>Amount: {move.amount} coins</p>
					</li>
				))}
			</ul>
		</section>
	)
}
