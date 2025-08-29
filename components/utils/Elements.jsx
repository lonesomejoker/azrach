export const fetchUsers = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const fetchSingleUser = async (userId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!res.ok) {
    throw new Error(<p className=" text-center text-red-500 mt-[5rem]">User Not Found</p>);
  }
  return res.json();
};