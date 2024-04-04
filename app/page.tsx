'use client';
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import FanControl from "./FanControl/page";
import LightControl from "./LightControl/page";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(<div className="text-[40px]">Home page</div>);
  

  
  return (
    <main className="flex flex-col">
      {/*<Link href='/LightControl'>Light Control</Link>
      <Link href='/FanControl'>Fan Control</Link>*/}

      <div className="flex bg-neutral-800 py-5 justify-between items-center">
        <p className="text-white mx-5">Tech Haven</p>
        <div>
          <button onClick={() => setCurrentPage(<LightControl/>)} className="text-white mx-1 bg-transparent px-5 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 ease-in-out">Light Control</button>
          <button onClick={() => setCurrentPage(<FanControl/>)} className="text-white mx-1 bg-transparent px-5 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-200 ease-in-out">Fan Control</button>
        </div>
      </div>

      <div>
        {currentPage}
      </div>
    </main>
  );
}
