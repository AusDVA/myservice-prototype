module.exports = str => {
	return (str.toLowerCase()).replace(/[^a-zA-Z0-9]/g, '').replace(/ /g, "_")
}