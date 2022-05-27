import React from 'react';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from '../data/userData';
import style from '../styles/DataTable.module.css';

const DataTable = () => {
  const actionColumn = [{field: 'action', headerName: 'Action', width: 300, renderCell: () =>{
    return(
      <div className={style.cell_action}>
        <div className={style.view_btn}>View</div>
        <div className={style.delete_btn}>Delete</div>
      </div>
    )
  }}]
  return (
    <div style={{ height: 500, width: '100%' }}>
      <div className={style.add_btn}>
        <Link to={'#'}>Add new user</Link>
      </div>
    <DataGrid
      rows={rows}
      columns={columns.concat(actionColumn)}
      pageSize={7}
      rowsPerPageOptions={[7]}
      checkboxSelection
    />
  </div>
  )
}

export default DataTable;