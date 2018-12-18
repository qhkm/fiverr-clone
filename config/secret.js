module.exports = {

  database: process.env.DATABASE || 'mongodb://root:test1234@ds125211.mlab.com:25211/fiverrclone',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'fiverclone2222',
  algolia_appId: 'E2VG4B07BO',
  algolia_api_key: 'ba92f4161e6dcbe225486200bf6ce94a',
}
