import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { UsersIcon } from "lucide-react"

function Home() {
  const [countA, setCountA] = useState(0)
  const [port, setPort] = useState(null)

  async function connectSerial() {
    try {
      const selectedPort = await navigator.serial.requestPort()
      await selectedPort.open({ baudRate: 9600 })
      setPort(selectedPort)

      const decoder = new TextDecoderStream()
      selectedPort.readable.pipeTo(decoder.writable)
      const reader = decoder.readable.getReader()

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        if (value) {
          const line = value.trim()
          console.log("Arduino:", line)

          if (line === "YES") {
            setCountA((prev) => prev + 1)
          }
        }
      }
    } catch (err) {
      console.error("Serial error:", err)
    }
  }

  return (
    <div className="w-full p-6 flex justify-center">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl md:mt-20">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">STOP A</CardTitle>
            
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-semibold">{countA}</div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">
              {port ? "Connected to Arduino" : "Not connected"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">STOP B</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-semibold">2</div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">Last Updated 5 minutes ago</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">STOP C</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-semibold">5</div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">Last Updated 5 minutes ago</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">STOP D</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <UsersIcon className="h-4 w-4 text-muted-foreground" />
              <div className="text-2xl font-semibold">13</div>
            </div>
            <div className="text-sm text-muted-foreground mt-2">Last Updated 5 minutes ago</div>
          </CardContent>
        </Card>

        <button
              onClick={connectSerial}
              className="px-3 py-1 bg-blue-500 text-white rounded-lg text-sm mt-100"
            >
              Connect
            </button>

      </div>
    </div>
    
  )
}

export default Home
