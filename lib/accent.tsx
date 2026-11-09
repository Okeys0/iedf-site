/**
 * AccentLine — renders a translated heading with one highlighted keyword
 * in the italic-gold editorial treatment (SectionHeading/<em> pattern).
 *
 * Used wherever a title comes from messages/*.json so the gold accent
 * stays inside the translation itself (accent key must be a substring of
 * the text key; matching is case-insensitive and case is preserved).
 *
 * Server component: plain function, no hooks — safe in any render pass.
 */
export function AccentLine({ text, accent }: { text: string; accent: string }) {
  const needle = accent.trim();
  const idx =
    needle.length > 0 ? text.toLowerCase().indexOf(needle.toLowerCase()) : -1;

  if (idx === -1) return <>{text}</>;

  // Slice from the original text so the em keeps the translated casing.
  const shown = text.slice(idx, idx + needle.length);

  return (
    <>
      {text.slice(0, idx)}
      <em className="italic text-gold-grad">{shown}</em>
      {text.slice(idx + needle.length)}
    </>
  );
}
