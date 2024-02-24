"use client";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";

export default function UserFlow() {
  const [exp, setExp] = useState<number>(1);
  const [level, setLever] = useState<number>(1);
  const [points, setPoints] = useState<number>(1);

  const [isActiveBooster, setActiveBooster] = useState<boolean>(false);
  const boostTime = useRef(30);

  if (exp >= 100) {
    setExp(0);
    setLever(level + 1);
  }

  const clickHandler = () => {
    setExp(exp + 33);

    if (exp && level) setPoints(exp ** level * 314);
  };

  const activeBoosterHandler = () => {
    setActiveBooster(true);
    boostTime.current = 30;
    setTimeout(() => {
      boostTime.current--;
    }, 1000);
  };

  return (
    <div>
      <div className={"w-52 h-52 m-10 flex flex-col gap-2"}>
        <p>Level: {level}</p>
        <p>{points}</p>

        <Progress value={exp} />
        <Button onClick={clickHandler} variant="outline">
          Button
        </Button>

        <Button
          onClick={activeBoosterHandler}
          disabled={level > 3 || level < 2 || isActiveBooster}
        >
          {isActiveBooster ? boostTime : "x5"}
        </Button>
      </div>
    </div>
  );
}
