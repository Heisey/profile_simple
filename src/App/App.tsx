
import { useBreakpoint } from "hooks/useBreakpoint"
import * as React from "react"
import { IOS } from "./UI/IOS/IOS"
import { MacOS } from "./UI/MacOS/MacOS"

export const App: React.FC = () => {

  const isTiny = useBreakpoint(310, "max")
  const isMobile = useBreakpoint(1024, "max")

  if (isTiny) return <div>puppy</div>
  
  if (isMobile) return <IOS />
  
  return <MacOS />
}
