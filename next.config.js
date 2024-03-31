/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  output: 'standalone',
  env: {
    USER_FLOW: process.env.AZURE_AD_B2C_PRIMARY_USER_FLOW,
    TENANT_ID: process.env.AZURE_AD_B2C_TENANT_ID,
    TENANT_NAME: process.env.AZURE_AD_B2C_TENANT_NAME,
    AUTH_URL: process.env.NEXTAUTH_URL,
    BASE_URL: process.env.BASE_URL,
  }
}

module.exports = nextConfig
