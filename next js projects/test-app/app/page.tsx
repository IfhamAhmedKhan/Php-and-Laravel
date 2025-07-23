import Image from "next/image";
import Hello from "./components/hello";

export default function Home() {
  return (
    <>
    <Hello/>
    <h1 className="text-3xl">Hello World!</h1>
    </>
  );
}
