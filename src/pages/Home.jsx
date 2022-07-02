import React from 'react'
import UsersResult from '../components/users/UsersResult'
import UserSearch from '../components/users/UserSearch'

function Home() {
  return (
    <>
    {/*SEARCH COMPONENT*/}
        <UsersResult/>
      <UserSearch/>
    </>
  )
}

export default Home