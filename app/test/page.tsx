import fetcher from '@/services/fetcher'
import React from 'react'

const page = async () => {
  const test = await fetcher(`${process.env.API_URL}/PerformanceCatalog/GetBySpecialtyAndTask?specialityId=${28}`)
    console.log(test)
  return (
    <div>page</div>
  )
}

export default page