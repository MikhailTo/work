const Home = { template: '<Index />'}
const Speed = { template: '<Speed />'}
const Order = { template: '<Order />'}

export default {
	
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Router:
  router: {
	prefetchLinks: false,
	base: '',
	routes: [
		{
		  name: 'index',
		  path: '/',
		  component: Home
		},
		{
		  name: 'speed',
		  path: '/tools/speed',
		  component: Speed
		},
		{
		  name: 'order',
		  path: '/tools/order',
		  component: Order
		}
	  ]
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'work',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
  ],
  bootstrapVue: {
    
    icons: true
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
