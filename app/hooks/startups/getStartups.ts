export async function getStartups() {
  try {
    const res = await fetch("api/startups", {
      method: "GET"
    })

    const data = res.json()
    return data
  } catch (error) {
    console.error("Error fetching startups: ", error)
  }
}
