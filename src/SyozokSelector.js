import './SyozokSelector.scss';
import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';
@connect(state => state)
class SyozokSelector extends React.Component
{
	render()
	{
		const { buka, syozok } = this.props;
		this.buka = buka;
		return (
			<div className="syozok-selector">
				<Select
					options={this.toOptions(buka)}
					value={this.toValue(syozok)}
					onChange={this.onChange}
					formatOptionLabel={this.formatOptionLabel}
				/>
			</div>
		);
	}
	toOptions = buka =>
	{
		return buka.map(({ syozok, bukm }) => ({
			value: syozok, 
			label: bukm, 
		}));
	}
	toValue = syozok =>
	{
		const find = this.buka.find(b => b.syozok === syozok) || {};
		return { value: syozok, label: find.bukm };

	}
	onChange = value =>
	{
		this.props.dispatch({ type: 'SYOZOK', payload: value.value });
	}
	formatOptionLabel = ({ value, label }, { context, inputValue, selectValue }) =>
	{
		return context === 'menu' ? (
			<div className="option">
				<span className="value-badge">{value}</span>
				<span className="label">{label}</span>
			</div>
		) : (context ==='value' ? (
			<div className="value tooltip" data-tooltip={value}>
				{label}
			</div>
		) : 
		null);
	}
};
export default SyozokSelector;