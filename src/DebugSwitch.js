import React from 'react';
import Toggle from 'react-toggle';
import 'react-toggle/style.css'
import './DebugSwitch.scss';
import DraggableHOC from './DraggableHOC';
import { connect } from 'react-redux';
@DraggableHOC
@connect(state => state)
class DebugSwitch extends React.Component 
{
	static defaultProps = {
		debug: false, 
	};
	constructor(props)
	{
		super(props);
	}
	render()
	{
		const { debug, style } = this.props;
		return (
			<div
				className="debug-switch box content is-small"
				style={style}
			>
				<Toggle
					className="toggle"
					checked={debug}
					onChange={this.onChange}
				/>
				<label className="toggle-label handle">
					{debug ? 'Debug' : 'Product'}
				</label>
			</div>
		);
	}
	onChange = e =>
	{
		this.props.dispatch({ type: 'DEBUG', payload: e.target.checked });
	}
};
export default DebugSwitch;