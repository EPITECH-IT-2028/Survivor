import { useEffect, useState } from "react";
import { TUser, UserRole, userRoleFilters } from "@/app/types/users";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import { setUserById } from "@/app/hooks/users/setUserById";
import { userRoleId } from "@/app/types/users";
import { deleteUser } from "@/app/hooks/users/deleteUser";
import { PulseLoader } from "react-spinners";
import Image from "next/image";
import UserImage from "./UserImage";
import { Label } from "./ui/label";

interface UpdateUserProps {
  data: TUser;
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export default function UpdateUser({
  data,
  isOpen,
  onClose,
  onDataChanged,
}: UpdateUserProps) {
  const [userData, setUserData] = useState<TUser | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    setUserData(data);
    setPreview(null);
  }, [data]);

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>
    );
  }

  const handleUpdateUser = async () => {
    if (!userData) return;
    try {
      await setUserById(userData.id, userData);
      onDataChanged?.();
      onClose();
    } catch (e) {
      console.error("Failed to update user", e);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setUserData({ ...userData!, image: reader.result as string });
      };
      console.log("Image file selected:", file);
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteUser = async () => {
    if (userData === null || userData.id == null) {
      return;
    }
    try {
      deleteUser(userData.id);
      onDataChanged && onDataChanged();
      onClose();
    } catch (e) {
      console.error("Failed to delete user", e);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <Input value={userData!.id} disabled />
        <Input
          value={userData!.name}
          onChange={(e) => {
            setUserData({ ...userData!, name: e.target.value });
          }}
        />
        <Input
          value={userData!.email ?? ""}
          onChange={(e) => {
            setUserData({ ...userData!, email: e.target.value });
          }}
        />
        <FiltersComboBoxResponsive
          filtersList={userRoleFilters.filter((u) => u.value !== "-")}
          placeHolder={userRoleFilters[userRoleId[userData?.role ?? "-"]]}
          onSelection={(value: string) => {
            setUserData({ ...userData!, role: value as UserRole });
          }}
        />
        <Input value={userData!.founder_id ?? "-"} disabled />
        <Input value={userData!.investor_id ?? "-"} disabled />
        <Button
          className="bg-red-400 hover:bg-red-500 cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete user
        </Button>
        <div className="border-2 border-dashed rounded-2xl p-6 text-center items-center cursor-pointer">
          <Input
            type="file"
            accept="image/*"
            className="hidden"
            id="fileInput"
            onChange={handleFile}
          />
          <Label htmlFor="fileInput">
            {preview ? (
              <div className="flex flex-col items-center">
                <Image
                  src={preview}
                  alt="Preview"
                  width={200}
                  height={200}
                  className="mx-auto rounded-lg"
                />
                <Button
                  className="mt-2 bg-red-400 hover:bg-red-500 cursor-pointer"
                  onClick={() => {
                    setPreview(null);
                    setUserData({ ...userData!, image: null });
                  }}
                >
                  Remove Image
                </Button>
              </div>
            ) : preview === null && userData.image ? (
              <div className="flex flex-col items-center">
                <UserImage id={userData.id} />
                <Button
                  className="cursor-pointer mt-2 bg-red-400 hover:bg-red-500"
                  onClick={() => {
                    setPreview(null);
                    setUserData({ ...userData!, image: null });
                  }}
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <h1 className="text-gray-500">Click or drop an image here</h1>
            )}
          </Label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            className="cursor-pointer bg-green-400 hover:bg-green-500"
            onClick={handleUpdateUser}
          >
            Apply
          </Button>
          <Button
            className="cursor-pointer bg-blue-400 hover:bg-blue-500"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
