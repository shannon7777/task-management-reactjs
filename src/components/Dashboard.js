import React from "react";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const {
    auth: { user },
  } = useAuth();
  
  return (
    <section>
      <article>Dashboard</article>
    </section>
  );
};

export default Dashboard;