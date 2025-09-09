import { useEffect, useState } from "react";
import {
  TUser,
  UserRole,
  userRoleFilters,
  userRoleId,
} from "@/app/types/users";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import { getStartups } from "@/app/hooks/startups/getStartups";
import { addFounder } from "@/app/hooks/founders/addFounder";
import { addUser } from "@/app/hooks/users/addUser";
import { updateUserWithFounderId } from "@/app/hooks/users/updateUserWithFounderId";
import { updateUserWithInvestorId } from "@/app/hooks/users/updateUserWithInvestorId";
import { TInvestor } from "@/app/types/investor";
import { addInvestor } from "@/app/hooks/investors/addInvestor";
import { addFounderStartup } from "@/app/hooks/founder-startup/addFounderStartup";
import { PulseLoader } from "react-spinners";

interface CreateUserProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged?: () => void;
}

export default function CreateUserOrStartup({
  isOpen,
  onClose,
  onDataChanged
}: CreateUserProps) {
  const [userData, setUserData] = useState<TUser>({
    id: 0,
    email: "",
    name: "",
    role: "-",
    founder_id: null,
    investor_id: null,
    legacy_id: null,
    password: null,
    image: null,
  });

  const [investorData, setInvestorData] = useState<TInvestor>({
    id: 0,
    name: "",
    legal_status: "",
    address: "",
    email: "",
    phone: "",
    description: "",
    investor_type: "",
    investment_focus: "",
    created_at: "",
  });

  const [startupId, setStartupId] = useState<number | undefined>(undefined)

  const [startupsList, setStartupsList] = useState<{ value: number; label: string }[]>([{ value: 0, label: "-" }]);

  const handleSubmitUser = async () => {
    if (userData.name === "" ||
      userData.role === "-" ||
      userData.email === ""
    ) {
      return;
    }
    if (userData.role === "founder") {
      const newUser: TUser | null = await addUser(userData);
      if (newUser && newUser.id) {
        const founder = await addFounder({
          name: newUser.name ?? ""
        });
        await updateUserWithFounderId(newUser.id, newUser, founder?.id ?? 0);
        if (founder && founder.id && startupId)
          await addFounderStartup(founder?.id, startupId);
      } else {
        return;
      }
      if (onDataChanged) onDataChanged();
      onClose();
    }
    if (userData.role === "investor") {
      const newUser: TUser | null = await addUser(userData);
      if (newUser && newUser.id) {
        const investor = await addInvestor({
          name: investorData.name ?? "",
          email: investorData.email ?? null,
          legal_status: investorData.legal_status ?? null,
          address: investorData.address ?? null,
          phone: investorData.phone ?? null,
          description: investorData.description ?? null,
          investor_type: investorData.investor_type ?? null,
          investment_focus: investorData.investment_focus ?? null,
        });
        await updateUserWithInvestorId(newUser.id, newUser, investor?.id ?? 0);
      } else {
        return;
      }
      if (onDataChanged) onDataChanged();
      onClose();
    }
    if (userData.role === "admin") {
      await addUser(userData);
      if (onDataChanged) onDataChanged();
      onClose();
    }
  }

  useEffect(() => {
    const fetchStartups = async () => {
      const startups = await getStartups();
      setStartupsList([{ value: 0, label: "-" }]);
      setStartupsList((prev) => [...prev, ...startups.map(s => ({ value: s.id, label: s.name }))]);
    }
    fetchStartups();
  }, []);

  useEffect(() => {
    if (startupId && userData.role !== "founder") {
      setUserData({ ...userData, founder_id: null });
    }
    if (userData.investor_id && userData.role !== "investor") {
      setUserData({ ...userData, investor_id: null });
    }
  }, [userData.role]);

  if (!userData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <PulseLoader size={30} color="#F18585" />
      </div>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Name of the user"
          value={userData!.name}
          onChange={(e) => {
            setUserData({ ...userData!, name: e.target.value });
          }}
        />
        <Input
          placeholder="Email of the user"
          value={userData!.email ?? ""}
          onChange={(e) => {
            setUserData({ ...userData!, email: e.target.value });
          }}
        />
        <FiltersComboBoxResponsive
          filtersList={userRoleFilters}
          placeHolder={userRoleFilters[userRoleId[userData.role ?? "-"]]}
          onSelection={(value: UserRole) => {
            setUserData({ ...userData!, role: value });
          }}
        />
        {userData.role === "founder" && (
          <>
            {startupsList.length > 0 && (
              <FiltersComboBoxResponsive
                filtersList={startupsList.filter(s => s.value !== 0)}
                placeHolder={startupsList[0]}
                onSelection={(value: number) => {
                  setStartupId(value);
                }}
              />
            )}
          </>
        )}
        {userData!.role === "investor" && (
          <>
            <Input
              placeholder={"Name of the investor"}
              value={investorData!.name ?? "-"}
              onChange={(e) => { setInvestorData({ ...investorData!, name: e.target.value }) }}
            />
            <Input
              placeholder="Email of the investor"
              value={investorData!.email ?? "-"}
              onChange={(e) => { setInvestorData({ ...investorData!, email: e.target.value }) }}
            />
            <Input
              placeholder="SARL, SAS, etc."
              value={investorData!.legal_status ?? "-"}
              onChange={(e) => { setInvestorData({ ...investorData!, legal_status: e.target.value }) }}
            />
            <Input
              placeholder="1 Bite Avenue, New York"
              value={investorData!.address ?? "-"}
              onChange={(e) => { setInvestorData({ ...investorData!, address: e.target.value }) }}
            />
            <Input
              placeholder="+1 234 567 890"
              value={investorData!.phone ?? "-"}
              onChange={(e) => { setInvestorData({ ...investorData!, phone: e.target.value }) }}
            />
            <Input
              placeholder="Description of the investor"
              value={investorData!.description ?? "-"}
              onChange={(e) => { setInvestorData({ ...investorData!, description: e.target.value }) }}
            />
            <Input
              placeholder="Venture Capital, Angel Investor, etc."
              value={investorData!.investor_type ?? "-"}
              onChange={(e) => { setInvestorData({ ...investorData!, investor_type: e.target.value }) }}
            />
            <Input
              placeholder="Technology, Healthcare, etc."
              value={investorData!.investment_focus ?? "-"}
              onChange={(e) => { setInvestorData({ ...investorData!, investment_focus: e.target.value }) }}
            />
          </>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            className="bg-green-400 hover:bg-green-500 cursor-pointer"
            onClick={handleSubmitUser}
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

