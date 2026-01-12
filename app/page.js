'use client'

import Image from "next/image"
import Index from "./components/index"
import Photostrip from "./components/photostrip"
import Booth from "./components/booth"
import Printer from "./components/printer"

export default function Home() {
  return (
    <>
      <Index />
      <Photostrip />
      <Booth />
      <Printer />
    </>
  )
}