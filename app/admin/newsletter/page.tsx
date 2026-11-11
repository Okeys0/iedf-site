import { RecordList } from "@/components/admin/RecordList";

export default function NewsletterPage() {
  return (
    <RecordList
      title="Newsletter"
      description="Email addresses collected from the newsletter form."
      type="newsletter"
    />
  );
}
