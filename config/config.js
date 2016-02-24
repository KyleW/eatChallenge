module.exports = {
  port: process.env.OPENSHIFT_NODEJS_PORT || 3000,
  ipAddress: process.env.OPENSHIFT_NODEJS_IP || '192.168.1.5' || '127.0.0.1'
};