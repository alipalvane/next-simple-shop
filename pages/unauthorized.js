import React from 'react'
import Layout from '../components/Layout'

const unauthorized = () => {
  return (
    <Layout title='Access Denied'>
        <h2 className='text-xl'>Access Denied</h2>
    </Layout>
  )
}

export default unauthorized