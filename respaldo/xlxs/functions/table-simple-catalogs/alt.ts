export const ALt = async (
  url: string,
  {
    arg,
  }: {
    arg: {
      simpleUdName: string
      description: string
      mtSpecialtyActionId: number
      accountantConcept: string
      sapId: string
      status: number
      mtSubspecialities: number[]
    }
  }
) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json())
}
