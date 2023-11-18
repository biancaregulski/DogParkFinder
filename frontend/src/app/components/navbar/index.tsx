import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="align-middle w-full h-14 bg-emerald-800">
        <div className="mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <ul className="md:flex gap-x-6 text-white">
              <li>
                <Link href="/">
                  <p>Park Finder</p>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <p>About</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
