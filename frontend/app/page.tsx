"use client";

import { useState} from "react";
import Link from "next/link";

export default function Home() {
  const [name , setName] = useState("")
  return (
    <div>
      <h1>Home</h1>
      <input type="text" onChange={(event)=>{
        setName(event.target.value)
      }}/>
      <Link href={"/chat/"+name}>
        Join
      </Link>
    </div>
  );
}
