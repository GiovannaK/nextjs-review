import React from 'react'
import axios from 'axios';
import {useRouter} from 'next/router'
import { User } from '../../../api/User';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

export interface UserProps {
  user: User
}

const Profile = ({user}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

export const getStaticProps: GetStaticProps<UserProps> = async (context) => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/users', {
    params: {id: context.params.id}
  })

  const user = await res.data[0]
  return {
    props: {user, revalidate: 10}
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
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
