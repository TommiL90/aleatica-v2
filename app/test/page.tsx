import React from "react"
import fetcher from "@/services/fetcher"

const page = async () => {
  const test = await fetcher(
    `${process.env.API_URL}/PerformanceCatalog/GetBySpecialtyAndTask?specialityId=${28}`
  )
  console.log(test)
  return <div>page</div>
}

export default page
