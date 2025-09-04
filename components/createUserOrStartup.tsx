import { sectorFilters, TStartups, Sector, projectStatusFilters, needsFilters, maturityFilters } from "@/app/types/startup";
import { useEffect, useState } from "react";
import {
  TUser,
  UserRole,
  userRoleFilters,
  userRoleId,
} from "@/app/types/users";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { FiltersComboBoxResponsive } from "./filter";
import { Button } from "./ui/button";
import getFounders from "@/app/hooks/users/getFounders";
import { getInvestors } from "@/app/hooks/investors/getInvestors";
import { addStartup } from "@/app/hooks/startups/addStartup";
import { getStartups } from "@/app/hooks/startups/getStartups";
import { addFounder } from "@/app/hooks/founders/addFounder";
import { addUser } from "@/app/hooks/users/addUser";
import { updateUserWithFounderId } from "@/app/hooks/users/updateUserWithFounderId";
import { updateUserWithInvestorId } from "@/app/hooks/users/updateUserWithInvestorId";
import { TInvestor } from "@/app/types/investor";
import { addInvestor } from "@/app/hooks/investors/addInvestor";

interface CreateUserOrStartupProps {
  isOpen: boolean;
  onClose: () => void;
  isStartup?: boolean;
  onDataChanged?: () => void;
}

export default function CreateUserOrStartup({
  isOpen,
  onClose,
  isStartup,
  onDataChanged
}: CreateUserOrStartupProps) {
  const [userData, setUserData] = useState<TUser>({
    id: 0,
    email: "",
    name: "",
    role: "-",
    founder_id: undefined,
    investor_id: undefined,
    legacy_id: undefined,
    password: undefined,
  });

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
    founder: 0,
    news: 0,
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

  const [startupsList, setStartupsList] = useState<{ value: number; label: string }[]>([{ value: 0, label: "-" }]);
  const [foundersList, setFoundersList] = useState<{ value: number; label: string }[]>([{ value: 0, label: "-" }]);
  const [investorsList, setInvestorsList] = useState<{ value: number; label: string }[]>([{ value: 0, label: "-" }]);

  const handleSubmitStartup = () => {
    if (startupData.name === "" ||
      startupData.legal_status === "" ||
      startupData.address === "" ||
      startupData.email === "" ||
      startupData.phone === "" ||
      startupData.sector === "" ||
      startupData.maturity === "" ||
      startupData.project_status === "" ||
      startupData.needs === "" ||
      startupData.description === "" ||
      startupData.founder === 0
    ) {
      return;
    }
    addStartup(startupData);
    if (onDataChanged) onDataChanged();
    onClose();
  }

  const handleSubmitUser = async () => {
    if (userData.name === "" ||
      userData.role === "-" ||
      userData.email === ""
    ) {
      return;
    }
    if (userData.role === "founder") {
      const newUser: TUser | null = await addUser({
        name: userData.name,
        email: userData.email ?? null,
        role: userData.role ?? null
      });
      if (newUser && newUser.id) {
        const founder = await addFounder({
          name: newUser.name ?? ""
        });
        console.log("New founder created:", founder);
        await updateUserWithFounderId(newUser.id, newUser, founder?.id ?? 0);
      } else {
        console.log("Failed to create user or retrieve user ID." + newUser);
        return;
      }
      if (onDataChanged) onDataChanged();
      onClose();
    }
    if (userData.role === "investor") {
      const newUser: TUser | null = await addUser({
        name: userData.name,
        email: userData.email ?? null,
        role: userData.role ?? null
      });
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
        console.log("New investor created:", investor);
        await updateUserWithInvestorId(newUser.id, newUser, investor?.id ?? 0);
      } else {
        console.log("Failed to create user or retrieve user ID." + newUser);
        return;
      }
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
    const fetchFounders = async () => {
      const founders = await getFounders();
      setFoundersList([{ value: 0, label: "-" }]);
      setFoundersList((prev) => [...prev, ...founders.map(f => ({ value: f.id, label: f.name }))]);
    }

    const fetchInvestors = async () => {
      const investors = await getInvestors();
      setInvestorsList([{ value: 0, label: "-" }]);
      setInvestorsList((prev) => [...prev, ...investors.map(i => ({ value: i.id, label: i.name }))]);
    }
    fetchStartups();
    fetchInvestors();
    fetchFounders();
  }, []);

  useEffect(() => {
    console.log("User data changed:", userData);
    if (userData.founder_id && userData.role !== "founder") {
      setUserData({ ...userData, founder_id: undefined });
    }
    if (userData.investor_id && userData.role !== "investor") {
      setUserData({ ...userData, investor_id: undefined });
    }
  }, [userData.role]);

  return isStartup ? (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Create startup</DialogTitle>
        <DialogContent>
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
            filtersList={sectorFilters.filter(s => s.value !== '-')}
            placeHolder={sectorFilters[0]}
            onSelection={(value: Sector) => {
              setStartupData({ ...startupData!, sector: value });
            }}
          />
          <FiltersComboBoxResponsive
            filtersList={projectStatusFilters.filter(p => p.value !== '-')}
            placeHolder={projectStatusFilters[0]}
            onSelection={(value: any) => {
              setStartupData({ ...startupData!, project_status: value });
            }}
          />
          <FiltersComboBoxResponsive
            filtersList={needsFilters.filter(n => n.value !== '-')}
            placeHolder={needsFilters[0]}
            onSelection={(value: any) => {
              setStartupData({ ...startupData!, needs: value });
            }}
          />
          <FiltersComboBoxResponsive
            filtersList={maturityFilters.filter(m => m.value !== '-')}
            placeHolder={maturityFilters[0]}
            onSelection={(value: any) => {
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
          {foundersList.length > 0 && (
            <FiltersComboBoxResponsive
              filtersList={foundersList.filter(f => f.value !== 0)}
              placeHolder={foundersList[0]}
              onSelection={(value: any) => {
                setStartupData({ ...startupData!, founder: value });
              }}
            />
          )}
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
      </DialogContent>
    </Dialog>
  ) : (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Update User</DialogTitle>
        <DialogContent>
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
                  onSelection={(value: any) => {
                    setUserData({ ...userData!, founder_id: value });
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
      </DialogContent>
    </Dialog>
  );
}

