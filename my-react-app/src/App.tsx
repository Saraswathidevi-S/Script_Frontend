import { useState } from "react";
import ScriptManager from "./pages/ScriptManager";
import ScriptDetails from "./pages/ScriptDetails";
import type { ScriptItem } from "./data/scripts";

export default function App() {
  const [selectedScript, setSelectedScript] = useState<ScriptItem | null>(null);

  if (selectedScript) {
    return (
      <ScriptDetails
        script={selectedScript}
        onBack={() => setSelectedScript(null)}
        onUpdate={(updated) => setSelectedScript(updated)}
      />
    );
  }

  return <ScriptManager onOpenDetails={(s) => setSelectedScript(s)} />;
}
