import React from "react";

const Footer = () => {
  return (
    <div className="h-[35px] w-full bg-black text-cyan-300">
      <div className="container mx-auto py-2">
        <div className="flex items-center justify-center text-xs">
          <div className="flex items-center pl-2">
            <p>Copyright © 2022 </p>
            <a
              href="https://github.com/av-erencelik"
              className="pl-1 underline hover:opacity-70"
            >
              av-erencelik
            </a>
            .
          </div>
          <p className="pl-1">
            Created with{" "}
            <a
              href="https://www.wordnik.com"
              className=" underline hover:text-gray-400"
              target="_blank"
            >
              Wordnik
            </a>{" "}
            API
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
