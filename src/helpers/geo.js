export const geo = async (lat, lon) => {
	const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=1c3251b59381478b805072400188713d`
  );

	const data = await response.json()

	return data.results[0].formatted;
}