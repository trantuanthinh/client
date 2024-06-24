"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import NavBar from "./NavBar";

export default function HeaderDefault() {
  const pathname = usePathname();
  return (
    <div>
      <div className="w-full flex flex-row justify-between items-center bg-background">
        <NavBar />
      </div>
    </div>
  );
}
