import React, { useEffect, useState } from "react";
import SummaryApi from "../common";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.AllUser.url, {
      method: SummaryApi.AllUser.method,
      credentials: "include",
    });

    const dataResponse = await fetchData.json();

    console.log(dataResponse);
  };
  useEffect(() => {
    fetchAllUsers();
  }, []);

  return <div>AllUsers</div>;
};

export default AllUsers;
