import './Datepicker.scss';
import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment'; 
import classnames from 'classnames'; 
const weekdays = [
	'日', '月', '火', '水', '木', '金', '土'
];
const today = moment();
const Datepicker = class extends React.Component
{
	static defaultProps = {
		onMount: context => {}, 
		onChange: (day, context) => {}, 
	};
	constructor(props)
	{
		super(props);
		this.state = {
			value: '', 
			valid: false, 
			start: moment().startOf('month'), 
			selected: null, 
			active: false, 
		};
		this.format = 'YYYY-MM-DD';
		this.parseFormats = [
			'YYYY-M-D', 
			'YYYY.M.D', 
			'YYYY/M/D', 
			'YY-M-D', 
			'YY.M.D', 
			'YY/M/D', 
			'M-D', 
			'M.D', 
			'M/D', 
			'YYYYMMDD', 
			'YYMMDD', 
			'MMDD', 
		];
	}
	dom()
	{
		return findDOMNode(this);
	}
	componentDidMount()
	{
		this.input = this.dom().querySelector('.datepicker-input .input');
		this.props.onMount(this);
	}
	render()
	{
		const { value, valid } = this.state;
		const { start, selected } = this.state;
		const { active } = this.state;
		const year = start.year();
		const month = start.month() + 1;
		const daysFirst = start.clone().day('sunday');
		const daysLast  = start.clone().endOf('month').day('saturday');
		const days = Array(daysLast.diff(daysFirst, 'days') + 1).fill(0).map((v, i) =>
		{
			const day = daysFirst.clone().add(i, 'days');
			day.today = day.isSame(today, 'days');
			day.disabled = !day.isSame(start, 'month');
			day.selected = day.isSame(selected, 'days');
			return day;
		});

		return (
			<div className="datepicker">
				<div className="datepicker-input">
					<p className="control has-icons-left">
						<input type="text"
							className={classnames([
								'input', 
							], {
								'is-invalid': !valid, 
							})}
							value={value}
							onChange={this.onChange}
							onBlur={this.onBlur}
						/>
						<span 
							className="icon is-small is-left clickable"
							onClick={this.inputClick}
						>
							<i className="fas fa-calendar-alt"></i>
						</span>
						<span 
							className="icon is-small clickable prev-day"
							onClick={this.prevDayClick}
						>
							<i className="fas fa-play fa-rotate-180"></i>
						</span>
						<span 
							className="icon is-small clickable next-day"
							onClick={this.nextDayClick}
						>
							<i className="fas fa-play"></i>
						</span>
						
					</p>
				</div>

				<div className={classnames('calendar', { active })}>

					<div className="calendar-month">
						<div className="prev clickable">&lt;</div>
						<div className="month">{year}年{month}月</div>
						<div className="next clickable">&gt;</div>
					</div>
					<div className="calendar-weekdays">
					{weekdays.map((weekday, i) => 
						<div key={i} className={classnames('weekday', `w${i}`)}>
							{weekday}
						</div>
					)}	
					</div>
					<div className="calendar-days">
					{days.map((day, i) =>
						<div key={i} 
							className={classnames([
								'day', 
								'clickable', 
								`w${day.day()}`, 
							], {
								'is-today': day.today, 
								'is-disabled': day.disabled, 
								'is-selected': day.selected, 
							})}
							onClick={e => this.dayClick(day)}
						>
							{day.date()}
						</div>
					)}
					</div>

					<div className="overlay"
						onClick={this.overlayClick}
					></div>

				</div>
			</div>
		);
	}
	tryParse(value)
	{
		return moment(value, this.parseFormats, true);
	}
	setValue(value)
	{
		const parse = this.tryParse(value);
		const valid = parse.isValid();
		this.setState({ value, valid });
		return parse;
	}
	select(day)
	{
		this.setState({
			value: day.format(this.format), 
			selected: day, 
			start: day.clone().startOf('month'), 
			valid: true, 
		});
	}
	inputClick = e =>
	{
		this.showCalendar();
	}
	onChange = e =>
	{
		const day = this.setValue(e.target.value);
		if (day.isValid())
		{
			this.select(day);
		}
	}
	onBlur = e =>
	{
		const day = this.tryParse(e.target.value);
		if (day.isValid())
		{
			this.select(day);
		}
		this.props.onChange(day, this); // fire redux
	}
	dayClick = day =>
	{
		this.select(day);

		setTimeout(() =>
		{
			this.hideCalendar();
			this.input.focus();
		}, 50);

		this.props.onChange(day, this); // fire redux
	}
	prevDayClick = e =>
	{
		this.dayAdd(-1);
	}
	nextDayClick = e =>
	{
		this.dayAdd(1);
	}
	dayAdd(add)
	{
		let { selected: day } = this.state;
		day.add(add, 'days');
		this.select(day);
		this.props.onChange(day, this); // fire redux
	}

	overlayClick = e =>
	{
		this.hideCalendar();
	}
	showCalendar()
	{
		this.setState({ active: true });
	}
	hideCalendar()
	{
		this.setState({ active: false });
	}
}; 
export default Datepicker;