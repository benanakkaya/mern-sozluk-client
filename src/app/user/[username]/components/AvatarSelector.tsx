"use client";
import store, { RootState } from "@/redux/store";
import { fetchUserProfile, LoggedUser } from "@/redux/User/UserSlice";
import { User } from "@/types/UserType";
import axios from "axios";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface PropTypes {
  user: User;
}

const AvatarSelector: React.FC<PropTypes> = ({ user }) => {
  type AppDispatch = typeof store.dispatch;

  const dispatch = useDispatch<AppDispatch>();

  const [avatarStatus, setAvatarStatus] = useState<string>("idle");

  const avatarRef = useRef<any>(null);

  const { loginned, loggedUser } : {loginned:boolean, loggedUser: LoggedUser}= useSelector((state: RootState) => state.user);

  const handleClick = () => {
    if (loginned && loggedUser?.id === user?._id) {
      avatarRef.current.click();
    }
  };

  const handleChange = (image: File) => {
    if (
      confirm("Seçtiğiniz resmi avatarınız olarak güncellemek istiyor musunuz?")
    ) {
      updateUserAvatar(image);
    }
  };

  const uploadCloudinary = async (avatar: File) => {
    let image = avatar;
    const formData = new FormData();
    try {
      formData.append("file", image);
      formData.append("upload_preset", "lhdtso3x");
      const res = await axios
        .post(
          "https://api.cloudinary.com/v1_1/dmsj8hghq/image/upload",
          formData
        )
        .then((res: any) => {
          image = res.data.secure_url;
        });
    } catch (error) {
      toast.error("Avatarınız şu anda güncellenemiyor!");
      setAvatarStatus("idle");
    }
    return image;
  };

  const updateDatabase = async (avatar: any) => {
    const res = await axios
      .post("https://mern-sozluk-backend.onrender.com/user/set-avatar", {
        avatar,
        user: user?._id,
      })
      .then((res) => {
        dispatch(fetchUserProfile(loggedUser?.username));
        toast.success(res.data.message);
        setAvatarStatus("idle");
      });
  };

  const updateUserAvatar = async (avatar: File) => {
    setAvatarStatus("pending");

    //resmi cloudinary'e yüklüyoruz;
    uploadCloudinary(avatar).then((avatarLink) => {
      //image'i hata almadan cloudinary'i linki ile değiştiğimiz durumda veritabanında avatarı güncelliyoruz
      if (avatarLink) {
        updateDatabase(avatarLink);
      }
    });
  };

  return (
    <>
      {avatarStatus === "idle" ? (
        <Image
          onClick={handleClick}
          className={`${
            loginned &&
            loggedUser?.id === user?._id &&
            "cursor-pointer hover:opacity-60"
          } w-28 h-28 rounded-full`}
          src={
            user?.avatar
              ? user?.avatar
              : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/340px-Default_pfp.svg.png?20220226140232"
          }
          width={200}
          height={200}
          alt="profile picture"
        />
      ) : (
        <div className="w-28 h-28 rounded-full flex items-center justify-center">
          <AiOutlineLoading3Quarters className="text-2xl animate-spin text-primary" />
        </div>
      )}
      <input
        onChange={(e: any) => handleChange(e.target.files[0])}
        accept=".jpg, .jpeg, .png"
        className="hidden"
        type="file"
        ref={avatarRef}
      />
    </>
  );
};

export default AvatarSelector;
