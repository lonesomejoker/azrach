"use client";

import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSingleUser } from "@/components/utils/Elements";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { IoEarthOutline } from "react-icons/io5";
import { RiHomeOfficeLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

const UserProfile = (props) => {
  const params = use(props.params);
  console.log("params:", params);
  const { userId } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ["singleUser", userId],
    queryFn: () => fetchSingleUser(userId),
    enabled: !!userId,
  });
  console.log("single user data:", data);

  const router = useRouter();

  if (isLoading) return <p className="text-center">Loading user...</p>;
  if (error)
    return <p className="text-center text-red-500">User not found ❌</p>;

  const stats = [
    { label: "Email", value: data?.email, icon: <MdOutlineEmail /> },
    { label: "Phone", value: data?.phone, icon: <LuPhone /> },
    { label: "Company", value: data?.company.name, icon: <RiHomeOfficeLine /> },
    { label: "Website", value: data?.website, icon: <IoEarthOutline /> },
    {
      label: "Location",
      value: (
        <span>
          {data?.address.suite}, {data?.address.street}, {data?.address.city}
        </span>
      ),
      icon: <GrLocation />,
    },
  ];
  return (
    <section className=" flex justify-center items-center h-screen">
      <div className=" consistent  ">
        <button
          className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg border  hover:border-gray-500 transition-all duration-300 transform hover:scale-105"
          onClick={() => router.back()}
        >
          Go Back
        </button>
        <h1 className="text-center text-indigo-600 text-2xl font-bold  ">
          User Profile
        </h1>
        <section className=" flex flex-col lg:flex-row gap-8 items-start mt-[2.5rem]">
          <div className=" rounded-xl p-8 bg-gray-100 w-full lg:w-[26%]">
            <div className="size-[6rem] font-[600] text-[2.5rem] mx-auto tracking-[0.7px] rounded-full bg-emerald-400 text-white flex items-center justify-center">
              {`${data.name.split(" ")[0].charAt(0).toUpperCase()}${data.name
                .split(" ")[1]
                .charAt(0)
                .toUpperCase()}`}
            </div>
            <div className=" mt-5 ">
              <h3 className=" font-[600] text-center ">{data.name}</h3>
              <p className=" text-center">Customer</p>
            </div>
            <div className=" mt-[1.5rem] flex flex-col gap-4">
              <button className=" bg-indigo-600 text-white w-full  py-3 font-500 rounded-lg">
                Follow
              </button>
              <button className=" bg-transparent text-pneutral-800 w-full  py-3 font-500 rounded-lg border-2 border-neutral-700">
                Message
              </button>
            </div>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:w-auto lg:flex-1">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`w-full ${
                  stats.length === idx + 1 && "col-span-1 sm:col-span-2"
                } flex items-center gap-5 px-5 py-4 rounded-xl bg-white border-2 border-gray-300  text-neutral-800 `}
              >
                <div className="p-3 text-[1.5rem] rounded-lg w-fit bg-gray-200">
                  {stat.icon}
                </div>
                <div>
                  <h6 className="mb-2">{stat.label}</h6>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default UserProfile;
