import { useEffect, useState } from "react";
import { TUser, UserRole, userRoleFilters } from "@/app/types/users";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import { setUserById } from "@/app/hooks/users/setUserById";
import { userRoleId } from "@/app/types/users";
import { deleteUser } from "@/app/hooks/users/deleteUser"
import { PulseLoader } from "react-spinners";

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
  onDataChanged
}: UpdateUserProps) {
  const [userData, setUserData] = useState<TUser | null>(null);

  useEffect(() => {
    setUserData(data);
  }, [data]);

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>);
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
  }

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
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>
        <Input value={userData!.id} disabled />
        <Input value={userData!.name} onChange={(e) => { setUserData({ ...userData!, name: e.target.value }) }} />
        <Input value={userData!.email ?? ""} onChange={(e) => { setUserData({ ...userData!, name: e.target.value }) }} />
        <FiltersComboBoxResponsive
          filtersList={userRoleFilters}
          placeHolder={userRoleFilters[userRoleId[userData?.role ?? '-']]}
          onSelection={(value: UserRole) => { setUserData({ ...userData!, role: value }) }}
        />
        <Input value={userData!.founder_id ?? "-"} disabled />
        <Input value={userData!.investor_id ?? "-"} disabled />
        <Button className="bg-red-400 hover:bg-red-500 cursor-pointer" onClick={handleDeleteUser}>Delete user</Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="bg-green-400 hover:bg-green-500 cursor-pointer" onClick={handleUpdateUser}>Apply</Button>
          <Button className="bg-blue-400 hover:bg-blue-500 cursor-pointer" onClick={onClose}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
