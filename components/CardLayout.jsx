import React from "react";
import Image from "next/image";
import Link from "next/link";

const CardLayout = ({ data }) => (
  <div className=" px-6 py-5 border-2 transition-all duration-500 border-gray-100 hover:border-gray-200 rounded-xl shadow-md shadow-gray-200 hover:shadow-xl">
    <Image
      className=" size-[8rem] mx-auto object-contain mb-[1.5rem]"
      width={40}
      height={40}
      quality={90}
      alt="profile"
      src="/assets/user_icon.avif"
    />

    <div>
      <Link
        href={`/${data.id}`}
        className="text-indigo-600 font-semibold hover:underline"
      >
        <h3>{data.name}</h3>
      </Link>

      <p>{data.email}</p>
      <p className=" caption">Company: {data.company.name}</p>
    </div>
  </div>
);

export default CardLayout;
