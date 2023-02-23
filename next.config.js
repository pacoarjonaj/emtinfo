/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	env: {
	  URL: process.env.URL,
	  MONGODB_URL: process.env.MONGODB_URL,
	  GOOGLEMAPS_KEY: process.env.GOOGLEMAPS_KEY,
	  PAYPAL_ID: process.env.PAYPAL_ID,
	},
	webpack(config) {
		config.module.rules.push({
		  test: /\.svg$/i,
		  issuer: /\.[jt]sx?$/,
		  use: ['@svgr/webpack'],
		});
	
		return config;
	  },
  }
  
  module.exports = nextConfig