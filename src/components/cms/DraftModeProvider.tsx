import { draftMode } from "next/headers";
import { VisualEditingWrapper } from "./VisualEditingWrapper";

export async function DraftModeProvider() {
  let isEnabled = false;

  try {
    const draft = await draftMode();
    isEnabled = draft.isEnabled;
  } catch {
    isEnabled = false;
  }

  if (!isEnabled) {
    return null;
  }

  return <VisualEditingWrapper />;
}
