import React from "react";

import styles from "./account.module.css";

import authService from "../../services/auth.service";
import axios from "axios";

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

interface State{
  users: Array<Object>
}

const datagridSx = {
  borderRadius: 2,
  "& .MuiDataGrid-main": { 
    borderRadius: 0,
    backgroundColor: "rgb(240, 240, 240)"
  },
  "& .MuiDataGrid-virtualScrollerRenderZone": {
    "& .MuiDataGrid-row": {
      "&:nth-child(2n)": { backgroundColor: "rgb(200, 200, 200)" }
    }
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "rgb(90,90,255)",
    color: "rgb(255,255,255)",
    fontSize: 16
  },
  "& .MuiDataGrid-footerContainer": {
    backgroundColor: "rgb(90,90,255)",
    color: "rgb(255,255,255)",
    fontSize: 16
  }
};

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', flex: 0.30 },
  { field: 'username', headerName: 'Username', flex: 0.10 },
  { field: 'hash', headerName: 'Hash', flex: 0.40 },
  {
    field: 'joinDate',
    headerName: 'Join Date',
    type: 'number', // TODO: Add valueGetter to transform this to a Date.
    width: 90,
    flex: 0.20
  }
];

class Userlist extends React.Component<{}, State> {
  constructor(props: any){
    super(props);
    
    this.state = {
      users: []
    }
  }

  componentDidMount(): void {
    axios.get("http://localhost:3333/users", {  // TODO Set up ENV variable with backend server address.
      headers: {
        "Authorization": authService.getCurrentUser().token || ""
    }}).then((res) => {
        this.setState({users: res.data.users})
    })
  }

  render() {
    return (
      <DataGrid
        getRowId={(row) => row._id}
        sx={datagridSx}
        rows={this.state.users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
      />
    )
  }
}
  
export default Userlist