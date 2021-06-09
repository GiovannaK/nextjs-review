import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Link from 'next/link';

const test = ({users}) => {
  /* const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const data = await response.data
    setUsers(data);
  }

  useEffect(() => {
    fetchUsers();
  }, [])

  console.log(users);*/

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

export default test
