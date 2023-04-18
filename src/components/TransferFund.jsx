import React from 'react'

export function TransferFund({ contact, maxCoins, onTransferCoins }) {
	function transferCoins(ev) {
		ev.preventDefault()
		const elAmount = ev.target.elements.namedItem('amount')
		onTransferCoins(elAmount.value)
		elAmount.value = ''
	}

	return (
		<section className="transfer-fund">
			{maxCoins < 1 && <h1>No Founds to transfer</h1>}
			{maxCoins > 0 && (
				<form className="simple-form" onSubmit={transferCoins}>
					<h1>Transfer coins to {contact.name}</h1>
					<section className="transfer-amount">
						<label htmlFor="amount">Amount</label>
						<input
							type="number"
							min="1"
							max={maxCoins}
							name="amount"
							placeholder="Found transfer"
							required
						></input>
						<div className="btn-container">
							<button className="button-play">{/* <i className="fa-solid fa-check"></i> */}</button>
						</div>
					</section>
				</form>
			)}
		</section>
	)
}
