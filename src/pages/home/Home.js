import React from "react";
import { isAdmin } from "../../Services/auth.service";
function Home() {
  const role = isAdmin();
  return (
    <div className="h-[600px] text-center text-xl">
      Home
      <p>{role}</p>
    </div>
  );
}

export default Home;
