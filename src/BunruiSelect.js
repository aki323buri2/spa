import './Selector.scss';
import React from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import { connect } from 'react-redux';
@connect(state => state)
class HinsyuSelect extends React.Component
{
	render()
	{
		const { bunrui } = this.props;
		return (
			<div className="bunrui-select selector">
				<CreatableSelect
					isMulti
					options={this.toOptions(bunrui)}
					formatOptionLabel={this.formatOptionLabel}
					closeMenuOnSelect={false}
				/>
			</div>
		);
	}
	toOptions(bunrui)
	{
		return bunrui.map(({ middle_code, middle_name }) =>
		{
			return { value: middle_code, label: middle_name };
		});
	}
	formatOptionLabel = ({ value, label }, {context, inputValue, selectValue}) =>
	{
		return context === 'menu' ?
		(
			<div className="option">
				<span className="value-badge">{value}</span>
				<div className="label">{label}</div>
			</div>
		)
		: (context === 'value' ?
		(
			<div className="value tooltip" data-tooltip={value}>
				{label}
			</div>
		)
		: null);
	}
};
export default HinsyuSelect;