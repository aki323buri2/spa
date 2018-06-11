import React from 'react';
import './App.scss';
import DebugSwitch from './DebugSwitch';
import Appbar from './Appbar';
import SyozokSelector from './SyozokSelector';
import Rangepicker from './Rangepicker';
import BunruiSelect from './BunruiSelect';
const App = ({
}) => (
	<div className="app">
		
		<DebugSwitch/>

		<Appbar/>

		<div className="container">
			<div className="box">

				<div className="field">
					<div className="field-title">所属CD : </div>
					<div className="field-body">

						<div style={{ width: 200 }}>
							<SyozokSelector/>
						</div>

					</div>
				</div>
				
				<div className="field">
					<div className="field-title">計上日 : </div>
					<div className="field-body">
						
						<Rangepicker target='kjob'/>

					</div>
				</div>

				<div className="field">
					<div className="field-title">分類CD : </div>
					<div className="field-body">

						<div style={{ width: '100%' }}>
							<BunruiSelect/>
						</div>

					</div>
				</div>

			</div>
		</div>
	</div>
);
export default App;