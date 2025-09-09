import { TStartups } from "@/app/types/startup";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { setStartupById } from "@/app/hooks/startups/setStartupById";
import { deleteStartup } from "@/app/hooks/startups/deleteStartup"
import { PulseLoader } from "react-spinners";

interface UpdateStartupProps {
  data: TStartups;
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export default function UpdateStartup({
  data,
  isOpen,
  onClose,
  onDataChanged
}: UpdateStartupProps) {
  const [startupData, setStartupData] = useState<TStartups | null>(null);

  useEffect(() => {
    setStartupData(data);
  }, [data]);

  if (!startupData) {
    return <div>Loading startup data...</div>;
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

  if (!startupData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Startup</DialogTitle>
        </DialogHeader>
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
    </Dialog>
  );
}
