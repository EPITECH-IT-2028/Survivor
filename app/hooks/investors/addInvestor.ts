import { TInvestor } from "@/app/types/investor";

interface InvestorPayload {
  name: string;
  email: string | null;
  legal_status?: string | null;
  address?: string | null;
  phone?: string | null;
  description?: string | null;
  investor_type?: string | null;
  investment_focus?: string | null;
}

export async function addInvestor(investorData: InvestorPayload): Promise<TInvestor | null> {
  try {
    const payload: InvestorPayload = {
      name: investorData.name,
      email: investorData.email,
      legal_status: investorData.legal_status,
      address: investorData.address,
      phone: investorData.phone,
      description: investorData.description,
      investor_type: investorData.investor_type,
      investment_focus: investorData.investment_focus,
    };
    const res = await fetch("/api/investors", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      throw new Error(`POST /api/investors -> ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return Array.isArray(data) ? data[0] : data;
  } catch (error) {
    console.error("Error adding investor: ", error)
    return null
  }
}