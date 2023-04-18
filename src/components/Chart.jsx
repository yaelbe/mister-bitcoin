import React from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

export function Chart({ data, xdata, color }) {
	return (
		<div>
			<Sparklines data={data} xdata={xdata}>
				<SparklinesLine color={color} />
			</Sparklines>
		</div>
	)
}
