import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Loader2, Mail, Home, Building, Globe, Plus } from "lucide-react";
import React, { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-menubar";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";

const Profile = () => {
  const { user, updateProfile } = useUserStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [profileData, setProfileData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    address: user?.address || "",
    city: user?.city || "",
    country: user?.country || "",
    profilePicture: user?.profilePicture || "",
  });

  const imageRef = useRef<HTMLInputElement | null>(null);

  const [selectedProfilePicture, setSelectedProfilePicture] = useState<string>(
    profileData.profilePicture || ""
  );

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfilePicture(result);
        setProfileData((prevData) => ({
          ...prevData,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const updateProfileHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(profileData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={updateProfileHandler} className="max-w-7xl my-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
            <AvatarImage src={selectedProfilePicture} />
            <AvatarFallback>NG</AvatarFallback>
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={fileChangeHandler}
            />
            <div
              onClick={() => imageRef.current?.click()}
              className="absolute inset-0 flex items-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
            >
              <Plus className="text-white w-8 h-8" />
            </div>
          </Avatar>
          <Input
            type="text"
            name="fullname"
            value={profileData.fullname}
            onChange={changeHandler}
            placeholder="Full Name"
            className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3 md:gap-2 my-10">
        {/* Email */}
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              disabled
              type="email"
              name="email"
              value={profileData.email}
              onChange={changeHandler}
              placeholder="Enter your email"
              className="w-full text-gray-600 bg-transparent focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Home className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={changeHandler}
              placeholder="Enter your address"
              className="w-full text-gray-600 bg-transparent focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>

        {/* City */}
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Building className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              type="text"
              name="city"
              value={profileData.city}
              onChange={changeHandler}
              placeholder="Enter your city"
              className="w-full text-gray-600 bg-transparent focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>

        {/* Country */}
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Globe className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              type="text"
              name="country"
              value={profileData.country}
              onChange={changeHandler}
              placeholder="Enter your country"
              className="w-full text-gray-600 bg-transparent focus-visible:border-transparent outline-none border-none"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        {loading ? (
          <Button disabled className="bg-red-500 hover:bg-red-600">
            <Loader2 className="mr-2 animate-spin h-4 w-4" />
            Updating...
          </Button>
        ) : (
          <Button type="submit" className="bg-red-500 hover:bg-red-600">
            Update
          </Button>
        )}
      </div>
    </form>
  );
};

export default Profile;
