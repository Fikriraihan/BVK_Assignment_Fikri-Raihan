const { generateKey } = require('@connectivenetwork/tokennn')
let config = require('../../config/default.json')

module.exports = (userId, tenantId) => {
  const sercretKey = config.jwt.Secret || 'connective2021#!@!'

  let params = {
    userId: userId || 'AmF5Q4iycNH4XaKyB',
    tenantId: tenantId || 'carii',
    name: 'apps',
  }

  const { token, error, message } = generateKey(params, sercretKey, 'RS256')

  if (!error) {
    //console.log(token)
    return token
  } else {
    console.log(message)
  }
  return null
}
