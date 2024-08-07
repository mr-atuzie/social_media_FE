import { useState } from "react";

const MobileMenu = () => {
  const [menu, setMenu] = useState(false);

  return (
    <div className=" flex items-center md:hidden">
      <button onClick={() => setMenu((prev) => !prev)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      {menu && <div className=" absolute left-0 top-24 bg-white"></div>}
    </div>
  );
};

export default MobileMenu;
