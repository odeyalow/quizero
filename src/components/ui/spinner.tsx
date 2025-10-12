import React from "react";

const Spinner = () => {
  const divs = Array.from({ length: 10 });

  return (
    <div className="max-w-full flex justify-center py-[20rem]">
        <div className="absolute w-[9px] h-[9px]">
        <style>
          {`
            @keyframes spinner-fzua35 {
              0%,10%,20%,30%,50%,60%,70%,80%,90%,100% {
                transform: rotate(var(--rotation)) translate(0, var(--translation));
              }
              50% {
                transform: rotate(var(--rotation)) translate(0, calc(var(--translation) * 1.5));
              }
            }
          `}
        </style>

        {divs.map((_, i) => {
          const delay = (i + 1) * 0.1;
          const rotation = (i + 1) * 36;
          const translation = 150;

          return (
            <div
              key={i}
              className="absolute w-1/2 h-[150%] bg-yellow-1"
              style={{
                "--delay": `${delay}s`,
                "--rotation": `${rotation}deg`,
                "--translation": `${translation}%`,
                animation: `spinner-fzua35 1s var(--delay) infinite ease`,
                transform: `rotate(var(--rotation)) translate(0, var(--translation))`,
              } as React.CSSProperties}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Spinner;
