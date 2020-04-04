import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Button, Heading, Pane, toaster, Spinner } from 'evergreen-ui'

import { AUTH_STATE } from './models/app'
import Profile from './components/Profile'

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  background-color: #234361;
  justify-content: center;
  align-items: center;
`

const DemoPane = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;
  height: 320px;
  background-color: white;
  margin-bottom: 80px;
  padding: 30px;
  box-sizing: border-box;

  @media only screen and (max-width: 380px) {
    width: 100%;
    height: 100vh;
    margin: 0;
  }
`

const Line = styled.div`
  width: 100%;
  border: 0.5px solid #e3e8ed;
  margin-top: 12px;
`

const App = () => {
  const [isSignInButtonClicked, setSignInButtonClicked] = useState(false)

  const { user, authState } = useSelector(({ app }) => app)

  const {
    app: { initAuth, redirectToSignInPage, signOut }
  } = useDispatch()

  useEffect(() => {
    const init = async () => {
      try {
        await initAuth()
      } catch (e) {
        toaster.danger(`Sign-in error: ${e.code}`)
      }
    }

    init()
  }, [initAuth])

  const onSignInButtonClick = () => {
    setSignInButtonClicked(true)
    redirectToSignInPage()
  }

  const onSignOutButtonClick = () => {
    signOut()
    toaster.success('Sign out successfully.')
  }

  let content
  if (authState === AUTH_STATE.SIGNED_IN) {
    content = (
      <>
        <Profile user={user} width="100%" maxWidth={290} marginX="auto" />
        <Button iconBefore="log-out" marginTop={40} onClick={onSignOutButtonClick}>
          Sign out
        </Button>
      </>
    )
  } else if (authState === AUTH_STATE.NOT_SIGNED_IN) {
    content = (
      <Button
        iconBefore="log-in"
        disabled={isSignInButtonClicked}
        onClick={onSignInButtonClick}
        marginTop={48}
      >
        {isSignInButtonClicked ? 'Redirecting...' : 'Sign in with Microsoft'}
      </Button>
    )
  } else {
    content = <Spinner marginTop={48} />
  }

  return (
    <Wrapper>
      <DemoPane>
        <Heading size={600} textAlign="center">
          KU Microsoft Sign-In
        </Heading>
        <Heading size={100} textAlign="center" marginTop={4}>
          Demo
        </Heading>
        <Line />
        <Pane display="flex" flexDirection="column" alignItems="center" marginTop={30}>
          {content}
        </Pane>
      </DemoPane>
    </Wrapper>
  )
}

export default App
