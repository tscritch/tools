"use client";

import { useState } from "react";

export default () => {
  const [width, setWidth] = useState<number | undefined>(1920);
  const [height, setHeight] = useState<number | undefined>(1080);
  const [size, setSize] = useState(50);

  return (
    <div className="h-full w-full">
      <div className="p-2">
        <div className="flex flex-col items-center justify-center gap-y-8 w-full max-w-xl mx-auto">
          <div className="flex items-center justify-center gap-x-2">
            <label className="label">
              <span className="label-text">Width</span>
            </label>
            <input
              type="number"
              placeholder="width"
              className="input input-bordered w-full max-w-[96px]"
              value={width}
              onChange={(e) =>
                setWidth(e.target.value ? Number(e.target.value) : undefined)
              }
            />
            <label className="label">
              <span className="label-text">Height</span>
            </label>
            <input
              type="number"
              placeholder="height"
              className="input input-bordered w-full max-w-[96px]"
              value={height}
              onChange={(e) =>
                setHeight(e.target.value ? Number(e.target.value) : undefined)
              }
            />
          </div>
          <div className="max-w-lg w-full">
            <input
              type="range"
              min="0"
              max="250"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="range"
            />
            <label className="label">
              <span className="label-text">Size</span>
            </label>
            <input
              type="number"
              max={250}
              min={0}
              placeholder="size"
              className="input input-bordered w-full max-w-[48px] input-xs"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
            />
          </div>

          <div className="stats shadow">
            <div className="stat w-36">
              <div className="stat-title">Width</div>
              <div className="stat-value">
                {width ? Math.round(width * (size / 100)) : "-"}
              </div>
            </div>
            <div className="stat w-36">
              <div className="stat-title">Height</div>
              <div className="stat-value">
                {height ? Math.round(height * (size / 100)) : "-"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
