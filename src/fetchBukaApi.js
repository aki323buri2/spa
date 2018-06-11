const url = `http://${location.hostname}:4000/buka`;
export default async () =>
{
	return await fetch(url).then(res => res.json());
};