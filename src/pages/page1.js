import React from 'react'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`


const Page1 = () => {
  return (
    <div>
      <Title>Page 1</Title>
    </div>
  )
}

export default Page1
