import { TStartups } from "@/app/types/startup";
import { useEffect, useState } from "react";
import { TUser, UserRole, userRoleFilters } from "@/app/types/users";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import { setUserById } from "@/app/hooks/users/setUserById";
import { setStartupById } from "@/app/hooks/startups/setStartupById";
import { userRoleId } from "@/app/types/users";
import { deleteUser } from "@/app/hooks/users/deleteUser"
import { deleteStartup } from "@/app/hooks/startups/deleteStartup"

interface UpdateProfileProps {
  data: TUser | TStartups;
  isOpen: boolean;
  onClose: () => void;
  isStartup?: boolean;
  onDataChanged?: () => void;
}

export default function UpdateProfile({
  data,
  isOpen,
  onClose,
  isStartup,
  onDataChanged
}: UpdateProfileProps) {
  const [startupData, setStartupData] = useState<TStartups | null>(null);
  const [userData, setUserData] = useState<TUser | null>(null);

  useEffect(() => {
    if (isStartup) {
      setStartupData(data as TStartups);
    } else {
      setUserData(data as TUser);
    }
  }, [data, isStartup]);

  if (isStartup && !startupData) {
    return <div>Loading startup data...</div>;
  }

  if (!isStartup && !userData) {
    return <div>Loading user data...</div>;
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

  const handleUpdateStartup = async () => {
    if (!startupData) return;
    try {
      await setStartupById(startupData.id, startupData);
      onDataChanged?.();
      onClose();
    } catch (e) {
      console.error("Failed to update startup", e);
    }
  }

  const handleDeleteStartup = async () => {
    if (startupData === null || startupData.id == null) {
      return;
    }
    try {
      deleteStartup(startupData.id);
      onDataChanged && onDataChanged();
      onClose();
    } catch (e) {
      console.error("Failed to delete startup", e);
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

  return isStartup ? (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogTitle>Update Startup</DialogTitle>
        <DialogContent>
          <Input value={startupData!.id} disabled />
          <Input value={startupData!.name} onChange={(e) => { setStartupData({ ...startupData!, name: e.target.value }) }} />
          <Input value={startupData!.legal_status ?? ""} onChange={(e) => { setStartupData({ ...startupData!, legal_status: e.target.value }) }} />
          <Input value={startupData!.address ?? ""} onChange={(e) => { setStartupData({ ...startupData!, address: e.target.value }) }} />
          <Button className="bg-red-400 hover:bg-red-500 cursor-pointer" onClick={handleDeleteStartup}>Delete profile</Button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-green-400 hover:bg-green-500 cursor-pointer" onClick={handleUpdateStartup}>Apply</Button>
            <Button className="bg-blue-400 hover:bg-blue-500 cursor-pointer" onClick={onClose}>Cancel</Button>
          </div>
        </DialogContent>
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
          <Input value={userData!.id} disabled />
          <Input value={userData!.name} onChange={(e) => { setUserData({ ...userData!, name: e.target.value }) }} />
          <Input value={userData!.email} onChange={(e) => { setUserData({ ...userData!, email: e.target.value }) }} />
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
      </DialogContent>
    </Dialog>
  );
}
