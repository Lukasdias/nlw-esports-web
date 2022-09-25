import { Ad } from "api/types";
import { atom, useAtom } from "jotai";
import { useCallback } from "react";

interface GameAdsProps {
  ads: Ad[];
}

export function GameAds({ ads }: GameAdsProps) {
  return (
    <div className="w-full h-96 bg-gray-200 rounded-md">
      {ads.map((ad) => (
        <div key={ad.id} className="w-full h-24 bg-gray-300 rounded-md">
          <span>{ad.name}</span>
        </div>
      ))}
    </div>
  );
}
