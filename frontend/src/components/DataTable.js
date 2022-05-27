import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import { rows, columns } from '../data/userData';

const DataTable = () => {
  return (
    <div style={{ height: 500, width: '100%' }}>
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
    />
  </div>
  )
}

export default DataTable;