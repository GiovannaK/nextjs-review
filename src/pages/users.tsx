import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { User } from '../../api/User';

export interface UsersProps {
  users?: User[]
}

const users = ({users}: UsersProps) => {
  return (
    <div>
      {users.map(user => (
        <div>
          <Link href="/profile/[id]" as={`/profile/${user.id}`} key={user.id}>
            {user.name}
          </Link>
          <br/>
        </div>
      ))}
    </div>
  )
}

export async function getStaticProps(context){
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  const data = await response.data
  return {
    props: {users: data},
  }
}

export default users
