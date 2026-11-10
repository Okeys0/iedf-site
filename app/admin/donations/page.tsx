import { RecordList } from "@/components/admin/RecordList";

export default function DonationsPage() {
  return (
    <RecordList
      title="Donations"
      description="Gifts verified through Paystack."
      type="donations"
    />
  );
}