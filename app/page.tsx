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

      <div className="flex bg-neutral-800 py-5">
        <button onClick={() => setCurrentPage(<LightControl/>)} className="text-white">Light Control</button>
        <button onClick={() => setCurrentPage(<FanControl/>)} className="text-white">Fan Control</button>
      </div>

      <div>
        {currentPage}
      </div>
    </main>
  );
}
