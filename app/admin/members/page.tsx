import { RecordList } from "@/components/admin/RecordList";

export default function MembersPage() {
  return (
    <RecordList
      title="Members"
      description="People who asked to join, volunteer, or register giving interest."
      type="member_signup"
    />
  );
}
