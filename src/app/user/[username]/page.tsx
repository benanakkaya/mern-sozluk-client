"use client";
import store, { RootState } from "@/redux/store";
import { fetchUserProfile } from "@/redux/User/UserSlice";
import { User } from "@/types/UserType";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./components/Profile";

interface PropTypes {
  params: { username: string };
}

const UserPage: React.FC<PropTypes> = ({ params }) => {

  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();
  
  React.useEffect(() => {
    const fetchProfile = async () => {
      await dispatch(fetchUserProfile(params.username));
    };
    fetchProfile();
  }, [params]);

  const { shownUser }: { shownUser: User } = useSelector((state:RootState) => state.user)

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-5">
      <Profile user={shownUser} />
    </div>
  );
};

export default UserPage;
