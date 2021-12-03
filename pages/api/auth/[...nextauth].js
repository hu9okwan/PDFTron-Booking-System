import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    })
  ],
  secret: '67ZkpzVi9U00cujv9q8DNe52+JJJay8g5OvnjdLWMC0='
})