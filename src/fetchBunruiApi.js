import axios from 'axios';
const url = `http://${location.hostname}:4000/bunrui`;
export default async () =>
{
	const bunrui = await axios(url, {
		validateStatus: status =>
		{
			return status === 200;
		}
	})
	.then(res => res.data)
	.catch(err =>
	{
		throw err;
	});
	return bunrui;
};