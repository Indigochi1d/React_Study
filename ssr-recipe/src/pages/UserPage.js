import { useParams } from "react-router-dom";
import UserContainer from "../containers/UserContainer";
import React from "react";

const UserPage = () => {
  const { id } = useParams();
  return <UserContainer id={id} />;
};

export default UserPage;
