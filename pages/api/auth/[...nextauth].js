/* import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions = {
  session:{
    strategy: 'jwt'
  },
   
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req){
        const {email, password} =credentials
        return email}
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)*/