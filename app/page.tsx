import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Link href='/LightControl'>Light Control</Link>
      <Link href='FanControl'>Fan Control</Link>
    </main>
  );
}
