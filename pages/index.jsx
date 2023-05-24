import React from "react";
import dynamic from "next/dynamic";

const NightMap = dynamic(
  () => import('../components/map/NightMap'),
  {'ssr': false}
);

export default function HomePage() {
  return (
    <div>
      <NightMap/>
    </div>
  );
}
