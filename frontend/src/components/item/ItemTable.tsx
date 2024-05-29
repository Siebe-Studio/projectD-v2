"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";

import Link from "next/link";

export type Item = {
  id: string;
  productId: number;
  product: {
    id: number;
    name: string;
  };
  history: {
    title: string;
    description: string;
    date: string;
  }[];
};

export const itemColumns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "product.name",
    header: "Product",
    cell: ({ row }) => <div className="capitalize">{row.getValue("product.name")}</div>,
  },
  {
    accessorKey: "history",
    header: "History",
    cell: ({ row }) => (
      <div className="flex items-center">
        <span className="mr-2">Laatste:</span>
        {row.getValue("history").length > 0 ? (
          <span className="text-blue-500">{row.getValue("history")[0].title}</span>
        ) : (
          <span className="text-gray-400">Geen geschiedenis</span>
        )}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenu>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              Kopieer item ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/items/${item.id}`}>
                Bekijk item details
              </Link>
            </DropdownMenuItem>
          </DropdownMenu>
        </DropdownMenu>
      );
    },
  },
];

export function ItemTable({ data }: { data: Item[] }) {
  const [sorting, setSorting] = React.useState<SortingState<Item>[]>([]);
  const tableInstance = useReactTable<Item>({
    columns: itemColumns,
    data,
    initialState: { sorting },
  });

  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    canSort,
    cannotSort,
    getHeaderRowProps,
  } = tableInstance.getTableProps();

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...getHeaderRowProps(headerGroup)}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    key={column.id}
                    className={`text-left ${
                      canSort(column) ? "sortable" : ""
                    } ${cannotSort(column) ? "not-sortable" : ""}`}
                  >
                    {column.renderHeader()}
                    {canSort(column) && (
                      <span className="sort-indicator">
                        {sorting.some((s) => s.id === column.id) ? (
                          <ArrowUpDown size="16" />
                        ) : (
                          <ChevronDown size="16" />
                        )}
                      </span>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell key={cell.id}>{cell.render("Cell")}</TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
