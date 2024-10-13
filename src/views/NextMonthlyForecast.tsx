import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

export function NextMonthlyForecast() {
  const arrow = ">>";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-gray-500 text-xs">View more {arrow}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Product Demand</DialogTitle>
            <Table>
              <TableHeader>
                  {/* <TableRow className="">
                      <TableHead colSpan={3} className="">Next Monthly Forecast</TableHead>
                  </TableRow> */}
                  <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                  <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
              </TableBody>
          </Table>
          </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
