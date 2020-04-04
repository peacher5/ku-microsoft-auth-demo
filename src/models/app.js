import firebase from '../services/firebase'
import axios from 'axios'

export const AUTH_STATE = {
  CHECKING: 'CHECKING',
  NOT_SIGNED_IN: 'NOT_SIGNED_IN',
  SIGNED_IN: 'SIGNED_IN'
}

export default {
  state: {
    user: null,
    authState: AUTH_STATE.CHECKING
  },
  reducers: {
    setUser(state, user = null) {
      return {
        ...state,
        user,
        authState: user ? AUTH_STATE.SIGNED_IN : AUTH_STATE.NOT_SIGNED_IN
      }
    }
  },
  effects: {
    async initAuth() {
      try {
        const { user, additionalUserInfo, credential } = await firebase.auth().getRedirectResult()

        if (user) {
          let photo
          try {
            photo = await this.getProfilePhoto(credential.accessToken)
          } catch (e) {
            photo = null
          }

          const { profile } = additionalUserInfo

          const userInfo = {
            name: user.displayName,
            email: user.email,
            role: profile.jobTitle,
            nontriUsername: profile.officeLocation,
            credential,
            photo
          }

          localStorage.setItem('user', JSON.stringify(userInfo))
          this.setUser(userInfo)
        } else {
          const unsubscribe = firebase.auth().onAuthStateChanged(async _ => {
            unsubscribe()

            const userInfoJson = localStorage.getItem('user')
            if (userInfoJson) {
              try {
                const userInfo = JSON.parse(userInfoJson)
                this.setUser(userInfo)
              } catch (e) {
                this.signOut()
              }
            } else {
              this.signOut()
            }
          })
        }
      } catch (e) {
        console.error(e)
        this.setUser()
        throw e
      }
    },
    async redirectToSignInPage() {
      const provider = new firebase.auth.OAuthProvider('microsoft.com')
      provider.setCustomParameters({
        domain_hint: 'live.ku.th',
        tenant: '8c1832ea-a96d-413e-bf7d-9fe4d608e00b'
      })
      firebase.auth().signInWithRedirect(provider)
    },
    async signOut() {
      await firebase.auth().signOut()
      this.setUser()
      localStorage.setItem('user', null)
    },
    async getProfilePhoto(accessToken) {
      const response = await axios.get('https://graph.microsoft.com/v1.0/me/photos/64x64/$value', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        responseType: 'arraybuffer'
      })

      const encodedPhoto = Buffer.from(response.data, 'binary').toString('base64')

      return `data:image/jpeg;base64, ${encodedPhoto}`
    }
  }
}
