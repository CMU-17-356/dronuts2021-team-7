import { DataGrid } from '@material-ui/data-grid'
import * as React from 'react'

export default function EmployeeDashboard() {
  const columns = [
    { field: 'order_id', headerName: 'Order ID' },
    { field: 'customer_name', headerName: 'Customer Name' },
  ]

  const rows = [
    { id: 1, customer_name: 'Jack Smith'},
    { id: 2, customer_name: 'Michael Hope' },
  ]

  return (
    <div style ={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  )
}
