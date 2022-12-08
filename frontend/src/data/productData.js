import style from '../styles/List.module.css';

export const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'productName', headerName: 'Product Name', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    { field: 'price', headerName: 'Price', width: 200 },
    { field: 'countInstock', headerName: 'Count Instock', width: 200 },
    {
      field: 'description',
      headerName: 'Description',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 200,
      renderCell: (params) =>{
        return(
          <div className={style.product_image}>
              <img src={params.row.img} alt="avator" />
              {/* <p>{params.row.firstName} {params.row.productName}</p> */}
          </div>
        )   
      }
        
    }
  ];
  
  export const rows = [
    { id: 1, productName: 'Snow', Category: 'Jon', price: 10, countInstock: 29, img: '/images/oil_art_1.jpg', description: 'jonb@gmail.com'},
    { id: 2, productName: 'Lannister', Category: 'Cersei', price: 10, countInstock: 29, img: '/images/bag_1.webp', description: 'jonb@gmail.com'},
    { id: 3, productName: 'Lannister', Category: 'Jaime', price: 10, countInstock: 29, img: '/images/bag_1.webp', description: 'jonb@gmail.com'},
    { id: 4, productName: 'Stark', Category: 'Arya', price: 10, countInstock: 29, img: '/images/bag_1.webp', description: 'jonb@gmail.com'},
    { id: 5, productName: 'Targaryen', Category: 'Daenerys', price: 10, countInstock: 29, img: '/images/bag_1.webp', description: 'jonb@gmail.com'},
    { id: 6, productName: 'Melisandre', Category: null, price: 10, countInstock: 29, img: '/images/bag_1.webp', description: 'jonb@gmail.com'},
    { id: 7, productName: 'Clifford', Category: 'Ferrara', price: 10, countInstock: 29, img: '/images/bag_1.webp', description: 'jonb@gmail.com'},
    { id: 8, productName: 'Frances', Category: 'Rossini', price: 10, countInstock: 29, img: '/images/bag_1.webp', description: 'jonb@gmail.com'},
    { id: 9, productName: 'Roxie', Category: 'Harvey', price: 10, countInstock: 29, img: '/images/bag_1.webp', description: 'jonb@gmail.com'},
  ];