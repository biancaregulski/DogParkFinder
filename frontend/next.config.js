/** @type {import('next').NextConfig} */

// use referrer exception
const nextConfig = {
    env: {
        REACT_APP_FLASK_API_URL: 'http://127.0.0.1:5000',
        REACT_APP_GOOGLE_MAPS_API_KEY: 'AIzaSyCaNEF7UUxR5E6B_Fs6fGlYcm-6qOAx8pE'
    },
    reactStrictMode: false,

}

module.exports = nextConfig
