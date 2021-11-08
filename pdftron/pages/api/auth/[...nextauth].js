import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
    })
  ],
  callbacks: {
    async signIn(user, account, profile) {
      if (account.provider === 'google' &&
          profile.verified_email === true &&
          profile.email.endsWith('@pdftron.com')) {
        return true
      } else {
        return false
      }
    },
  }
})