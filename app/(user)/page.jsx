"use client";

import { FaSpinner } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { IoList, IoGridOutline } from "react-icons/io5";
import { Table } from "fomantic-ui-react";
import { FiSearch } from "react-icons/fi";
import CardLayout from "@/components/CardLayout";
import { useEffect, useState } from "react";
import { fetchUsers } from "@/components/utils/Elements";
import Link from "next/link";

const USERS_PER_PAGE = 5;

const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  console.log("user list:", data);

  const [selectedLayout, setSelectedLayout] = useState("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const layout = localStorage.getItem("userLayout");
    if (layout) setSelectedLayout(layout);
  }, [selectedLayout]);

  const handleActiveLayout = (layout) => {
    setSelectedLayout(layout);
    localStorage.setItem("userLayout", layout);
  };

  const filteredUsers =
    data?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) ?? [];

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading)
    return (
      <FaSpinner className="text-neutral-800 text-center mx-auto mt-[5rem] text-[4rem] animate-spin" />
    );
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="consistent w-full my-[1.5rem] sm:my-[2rem]">
      <div className=" flex gap-[18px] items-center justify-end mb-[2.5rem] ">
        <IoList
          className={`cursor-pointer text-[2rem] ${
            selectedLayout === "list" ? "text-indigo-500" : "text-gray-600"
          }`}
          onClick={() => handleActiveLayout("list")}
        />
        <IoGridOutline
          className={`cursor-pointer text-[1.8rem] ${
            selectedLayout === "grid" ? "text-indigo-500" : "text-gray-600"
          }`}
          onClick={() => handleActiveLayout("grid")}
        />
        <div className=" relative w-[20rem] ">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className=" rounded-md px-3 py-3.5 w-full relative focus:outline-none focus:border-indigo-500  pr-4 border-2 border-gray-300"
            placeholder="Search here..."
          />
          <FiSearch className="absolute top-[11px] right-2.5 text-[1.5rem] text-gray-400" />
        </div>
      </div>
      <section>
        {selectedLayout === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {paginatedUsers.map((user) => (
              <CardLayout key={user.id} data={user} />
            ))}
          </div>
        ) : (
          <Table celled striped="true">
            <Table.Header className=" bg-gray-200">
              <Table.Row>
                <Table.HeaderCell>ID</Table.HeaderCell>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>Company</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {paginatedUsers.map((user, idx) => (
                <Table.Row key={user.id}>
                  <Table.Cell>{user.id}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    <Link
                      href={`/${user.id}`}
                      className="text-indigo-600 font-semibold hover:underline"
                    >
                      {user.name}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.company.name}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </section>
      <section className="mt-8 flex justify-center">
        <div className="ui pagination menu ">
          <a
            className={`icon item ${currentPage === 1 ? "disabled" : ""}`}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <i className="left chevron icon"></i>
          </a>

          {Array.from({ length: totalPages }, (_, idx) => (
            <a
              key={idx + 1}
              className={`item ${currentPage === idx + 1 ? "active" : ""}`}
              onClick={() => handlePageChange(idx + 1)}
            >
              {idx + 1}
            </a>
          ))}

          <a
            className={`icon item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <i className="right chevron icon"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
