import {
  sectorFilters,
  TStartups,
  Sector,
  projectStatusFilters,
  needsFilters,
  maturityFilters,
} from "@/app/types/startup";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import { addStartup } from "@/app/hooks/startups/addStartup";
import { PulseLoader } from "react-spinners";

interface CreateStartupProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export default function CreateStartup({
  isOpen,
  onClose,
  onDataChanged,
}: CreateStartupProps) {
  const [startupData, setStartupData] = useState<TStartups>({
    id: 0,
    name: "",
    legal_status: "",
    address: "",
    email: "",
    phone: "",
    sector: "",
    created_at: "",
    website_url: "",
    social_media_url: "",
    project_status: "",
    needs: "",
    description: "",
    maturity: "",
    engagement_rate: 0,
    project_view: 0,
    legacy_id: null,
  });

  const handleSubmitStartup = async () => {
    if (
      startupData.name === "" ||
      startupData.legal_status === "" ||
      startupData.address === "" ||
      startupData.email === "" ||
      startupData.phone === "" ||
      startupData.sector === "" ||
      startupData.maturity === "" ||
      startupData.project_status === "" ||
      startupData.needs === "" ||
      startupData.description === ""
    ) {
      return;
    }
    await addStartup(startupData);
    if (onDataChanged) onDataChanged();
    onClose();
  };

  if (!startupData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Startup</DialogTitle>
        </DialogHeader>
        <Input
          value={"The id will be set in the database to avoid error."}
          disabled
        />
        <Input
          placeholder={"Name of the startup"}
          value={startupData!.name ?? ""}
          onChange={(e) => {
            setStartupData({ ...startupData!, name: e.target.value });
          }}
        />
        <Input
          placeholder={"SAS"}
          value={startupData!.legal_status ?? ""}
          onChange={(e) => {
            setStartupData({ ...startupData!, legal_status: e.target.value });
          }}
        />
        <Input
          placeholder={"1 Bite Avenue, New York"}
          value={startupData!.address ?? ""}
          onChange={(e) => {
            setStartupData({ ...startupData!, address: e.target.value });
          }}
        />
        <Input
          placeholder={"dupont@mail.com"}
          value={startupData!.email ?? ""}
          onChange={(e) => {
            setStartupData({ ...startupData!, email: e.target.value });
          }}
        />
        <Input
          placeholder={"+33 6 12 34 56 78"}
          value={startupData!.phone ?? ""}
          onChange={(e) => {
            setStartupData({ ...startupData!, phone: e.target.value });
          }}
        />

        <FiltersComboBoxResponsive
          filtersList={sectorFilters.filter((s) => s.value !== "-")}
          placeHolder={sectorFilters[0]}
          onSelection={(value: string) => {
            setStartupData({ ...startupData!, sector: value as Sector });
          }}
        />
        <FiltersComboBoxResponsive
          filtersList={projectStatusFilters.filter((p) => p.value !== "-")}
          placeHolder={projectStatusFilters[0]}
          onSelection={(value: string) => {
            setStartupData({ ...startupData!, project_status: value });
          }}
        />
        <FiltersComboBoxResponsive
          filtersList={needsFilters.filter((n) => n.value !== "-")}
          placeHolder={needsFilters[0]}
          onSelection={(value: string) => {
            setStartupData({ ...startupData!, needs: value });
          }}
        />
        <FiltersComboBoxResponsive
          filtersList={maturityFilters.filter((m) => m.value !== "-")}
          placeHolder={maturityFilters[0]}
          onSelection={(value: string) => {
            setStartupData({ ...startupData!, maturity: value });
          }}
        />
        <Input
          placeholder={"The website URL of the startup"}
          value={startupData!.website_url ?? ""}
          onChange={(e) => {
            setStartupData({ ...startupData!, website_url: e.target.value });
          }}
        />
        <Input
          placeholder={"The social media URL of the startup"}
          value={startupData!.social_media_url ?? ""}
          onChange={(e) => {
            setStartupData({
              ...startupData!,
              social_media_url: e.target.value,
            });
          }}
        />
        <Input
          placeholder={"Description of the startup"}
          value={startupData!.description ?? ""}
          onChange={(e) => {
            setStartupData({
              ...startupData!,
              description: e.target.value,
            });
          }}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            className="bg-green-400 hover:bg-green-500 cursor-pointer"
            onClick={handleSubmitStartup}
          >
            Create
          </Button>
          <Button
            className="bg-blue-400 hover:bg-blue-500 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
