import React from 'react'
import axios from 'axios';
import {useRouter} from 'next/router'

const Profile = ({user}) => {
  const router = useRouter()
  if(router.isFallback){
    return <h1>Loading....</h1>
  }
  return (
    <div>
      <h3>{user.id}</h3>
      <h3>{user.name}</h3>
      <h3>{user.username}</h3>
    </div>
  )
}

export async function getStaticProps(context){
  const res = await axios.get('https://jsonplaceholder.typicode.com/users', {
    params: {id: context.params.id}
  })

  const user = await res.data[0]
  await new Promise(res => setTimeout(res, 4000))
  return {
    props: {user}
  }
}

export async function getStaticPaths() {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users')

  const users = await res.data.slice(0, 5)

  const paths = users.map(user => {
    return {params: {id: String(user.id)}}
  })
  return {
    paths,
    fallback: true
  };
}

export default Profile
