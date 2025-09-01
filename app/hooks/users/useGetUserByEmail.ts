export default async function useGetUserByEmail(email: string) {
  const data = await fetch(`https://api.jeb-incubator.com/users/email/${email}`);

  return data;
}
