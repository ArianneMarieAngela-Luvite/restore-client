import { Separator } from "@/components/ui/separator"
import { Insights } from "../views/Insights"

export function Separate() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-md font-normal font-lato">Forecast Insights</h4>
      </div>
      <Separator className="my-2" />
      <Insights />
    </div>
  )
}
