module.exports = {
  port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
  ipAddress: process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
}