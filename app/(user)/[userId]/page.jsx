"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleUser } from "@/components/utils/Elements";

const UserProfile=(props)=> {
  const params = use(props.params);
  console.log("params:", params);
  const { userId } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ["singleUser", userId],
    queryFn: () => fetchSingleUser(userId),
    enabled: !!userId, 
  });
  console.log("single user data:", data);

  if (isLoading) return <p className="text-center">Loading user...</p>;
  if (error) return <p className="text-center text-red-500">User not found ❌</p>;

  return (
    <div className="p-6 w-[25rem]">
      <h1 className="text-center text-indigo-600 text-2xl font-bold mb-4">
        User Profile
      </h1>
      <div className="bg-gray-100 p-4 rounded-md shadow-md">
        <p><strong>ID:</strong> {data.id}</p>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Email:</strong> {data.email}</p>
        <p><strong>Phone:</strong> {data.phone}</p>
      </div>
    </div>
  );
}

export default UserProfile;
