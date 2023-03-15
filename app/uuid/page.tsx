"use client";

import { useEffect, useState } from "react";
import { cryp } from "../../lib/crypto";

export default () => {
  // generate a random uuid on page load or on a button click
  const [uuid, setUuid] = useState<string>();

  useEffect(() => {
    if (!window) return;

    setUuid(cryp.randomUUID());
  }, []);

  return (
    <div className="h-full w-full">
      <div className="p-2">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">UUID Generator</div>
            <div className="text-xl font-bold">{uuid}</div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setUuid(cryp.randomUUID())}
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};
