import React from 'react'
import { Avatar, Pane, Text, Strong } from 'evergreen-ui'

const Profile = ({ user, ...props }) => {
  return (
    <Pane
      display="flex"
      alignItems="center"
      backgroundColor="#f9fafa"
      elevation={1}
      borderRadius={4}
      paddingX={16}
      paddingY={12}
      {...props}
    >
      <Avatar src={user.photo} name={user.name} size={32} />
      <Pane marginLeft={16}>
        <Pane>
          <Text size={300} color="muted">
            Name:
          </Text>
          <Strong size={300} marginLeft={4}>
            {user.name}
          </Strong>
        </Pane>
        <Pane marginTop={4}>
          <Text size={300} color="muted">
            Email:
          </Text>
          <Strong size={300} marginLeft={4}>
            {user.email}
          </Strong>
        </Pane>
        <Pane marginTop={4}>
          <Text size={300} color="muted">
            Nontri Username:
          </Text>
          <Strong size={300} marginLeft={4}>
            {user.nontriUsername}
          </Strong>
        </Pane>
        <Pane marginTop={4}>
          <Text size={300} color="muted">
            Role:
          </Text>
          <Strong size={300} marginLeft={4}>
            {user.role}
          </Strong>
        </Pane>
      </Pane>
    </Pane>
  )
}

export default Profile
