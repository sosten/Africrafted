import style from '../styles/List.module.css';

export const columns = [
    { field: '_id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      renderCell: (params) =>{
        return(
          <div className={style.user_image}>
              <img src={params.row.img} alt="avator" />
              <p>{params.row.firstName} {params.row.lastName}</p>
          </div>
        )   
      }
        
    },
  ];
  
  export const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', img: '/images/oil_art_1.jpg', email: 'jonb@gmail.com'},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', img: '/images/bag_1.webp', email: 'jonb@gmail.com'},
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', img: '/images/bag_1.webp', email: 'jonb@gmail.com'},
    { id: 4, lastName: 'Stark', firstName: 'Arya', img: '/images/bag_1.webp', email: 'jonb@gmail.com'},
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', img: '/images/bag_1.webp', email: 'jonb@gmail.com'},
    { id: 6, lastName: 'Melisandre', firstName: null, img: '/images/bag_1.webp', email: 'jonb@gmail.com'},
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', img: '/images/bag_1.webp', email: 'jonb@gmail.com'},
    { id: 8, lastName: 'Frances', firstName: 'Rossini', img: '/images/bag_1.webp', email: 'jonb@gmail.com'},
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', img: '/images/bag_1.webp', email: 'jonb@gmail.com'},
  ];