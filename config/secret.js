module.exports = {

  database: process.env.DATABASE || 'mongodb://root:test1234@ds125211.mlab.com:25211/fiverrclone',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'fiverclone2222'
}
