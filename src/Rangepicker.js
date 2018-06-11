import React from 'react';
import Datepicker from './Datepicker';
import { connect } from 'react-redux';
@connect(state => state)
class Rangepicker extends React.Component
{
	static defaultProps = {
		target: 'date', 
	};
	constructor(props)
	{
		super(props);
		this.processProps(props);
	}
	componentWillReceiveProps(nextProps)
	{
		this.processProps(nextProps);
	}
	processProps(nextProps)
	{
		const { [this.props.target]: target } = nextProps;
		if (!target) return;
		if (target.since)
		{
			this.since.select(target.since);
		}
		if (target.until)
		{
			this.until.select(target.until);
		}
	}
	render()
	{
		return (
			<div className="rangepicker flex">

				<Datepicker
					onMount={this.sinceOnMount}
					onChange={this.sinceOnChange}
				/>

				<div className="splitter" style={{ padding: '0 1em' }}>～</div>

				<Datepicker
					onMount={this.untilOnMount}
					onChange={this.untilOnChange}
				/>

			</div>
		);
	}
	sinceOnMount = context =>
	{
		this.since = context;
	}
	sinceOnChange = (day, context) =>
	{
		this.props.dispatch({ type: this.props.target.toUpperCase(), payload: { since: day } });
	}
	untilOnMount = context =>
	{
		this.until = context;
	}
	untilOnChange = (day, context) =>
	{
		this.props.dispatch({ type: this.props.target.toUpperCase(), payload: { until: day } });
	}
};
export default Rangepicker;