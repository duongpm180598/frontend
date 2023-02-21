import { useState } from "react";
import { getLoggedInUser } from "../../Services/auth.service";

const useProfile = () => {
  const userProfileSession = getLoggedInUser();
  const [loading] = useState(userProfileSession ? false : true);
  const [userProfile] = useState(
    userProfileSession ? userProfileSession : null
  );
  return { userProfile, loading };
};

export { useProfile };
