module.exports = type => {
  return type + Math.floor(Math.random()*(999-100+1)+100).toString()
}