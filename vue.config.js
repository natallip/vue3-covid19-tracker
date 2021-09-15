module.exports = {
  publicPath: '/vue3-covid19-tracker/',
  pwa: {
    name: 'covid-tracker',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
  },
};
