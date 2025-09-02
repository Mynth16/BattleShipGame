import React from "react";

interface HUDProps {
  ammo: number;
  shipsLeft: number;
  turns: number;
}

const HUD: React.FC<HUDProps> = ({ ammo, shipsLeft, turns }) => {
  return (
    <div className="hud">
      <p>Ammo: {ammo}</p>
      <p>Ships left: {shipsLeft}</p>
      <p>Turns: {turns}</p>
    </div>
  );
};

export default HUD;
