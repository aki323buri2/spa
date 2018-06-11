const reducers = {};
export default reducers;
reducers.user = (state = '', action) =>
{
	if (action.type === 'USER')
	{
		return action.payload;
	}
	return state;
};
reducers.buka = (state = [], action) =>
{
	if (action.type === 'RECEIVE_BUKA')
	{
		return action.payload;
	}
	return state;
};
reducers.kjob = (state = { since: null, until: null }, action) =>
{
	if (action.type === 'KJOB')
	{
		return { ...state, ...action.payload };
	}
	return state;
};
reducers.debug = (state = false, action) =>
{
	if (action.type === 'DEBUG')
	{
		return action.payload;
	}
	return state;
}
reducers.syozok = (state = null, action) =>
{
	if (action.type === 'SYOZOK')
	{
		return action.payload;
	}
	return state;
}
reducers.bunrui = (state = [], action) =>
{
	if (action.type === 'RECEIVE_BUNRUI')
	{
		return action.payload;
	}
	return state;
}