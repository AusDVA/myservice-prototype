module.exports = (id, type) => {
  if (!id) {
    return type + Math.floor(Math.random()*(999-100+1)+100).toString()
  } else {
    return id
  }
}