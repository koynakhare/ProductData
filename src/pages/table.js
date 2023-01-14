
import Classes from './table.module.css'
import axios from 'axios';
import {useState,useEffect}from 'react'
import TablePagination from '@mui/material/TablePagination'
import AlertDialogSlideform from '../component/AddProduct/addProduct';
import CircularColor from '../component/Loading/loading';
import * as React from 'react';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import SideBar from '../component/sideBar/sidebar';
import Sorting from '../component/sorting/sorting';
import TableProductData from './tableProduct';
import SearchProduct from '../component/search/search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Table=(props)=>{

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filteredProduct,setfilteredProduct]=useState([])
  const [loading,setloading]=useState(false)
  const [product,setproduct]=useState([])
  const [sortingActive,setsortingActive]=useState(false)
   const handleChangePage = (event, newPage) => {
      setfilteredProduct(product.products)
     setPage(newPage);
     console.log(filteredProduct)
   };
 
   const handleChangeRowsPerPage = (event) => {
     setRowsPerPage(event.target.value);
     setPage(0);
     setfilteredProduct(product.products)
   };

   
  
  // get product
   const getdata=()=>{
     setloading(true)
      axios.get("https://dummyjson.com/products")
     .then(res => {
      if(res){
        
        setproduct(res.data)
        setloading(false)
        setfilteredProduct(res.data.products)
      }
      }
     )
     .catch(error => {
       console.log(error)
     })
   
    }
 
   useEffect(() => {
   
      getdata()
    
   },[]);

   const searchFunction=(searchProduct)=>{
    setfilteredProduct(searchProduct)
    console.log(searchProduct)
  }

  const setsort=(sortproduct)=>{
    
   setfilteredProduct(sortproduct)
    console.log(filteredProduct)
 
  }
 const Loader=(value)=>{
  setloading(value)
 }



 //sorting
//  const sortfunction=(sortingType,sortKey)=>{
   
//   var  sortproduct= filteredProduct.sort( (a, b) =>{
//     if(sortingType==='asc'){
//      setsortingActive(true)
//     if(sortKey==='brand'){
     
//    return a.brand.toLowerCase() > b.brand.toLowerCase()  ? 1 : -1}
//    else if (sortKey==='title'){
   
//    return  a.title.toLowerCase() > b.title.toLowerCase()  ? 1 : -1}
//    else {
    
//     return a.rating > b.rating  ? 1 : -1
//    }
  
//     } else {
//      setsortingActive(false)
//       if(sortKey==='brand'){
     
     
//         return a.brand.toLowerCase() < b.brand.toLowerCase()  ? 1 : -1}
//         else if (sortKey==='title'){
        
//         return a.title.toLowerCase() < b.title.toLowerCase()  ? 1 : -1}
//         else{
          
//           return a.rating < b.rating ? 1 : -1
//         }
        
//     }}
//     )
   
   
  
  // } 

  return (
       <>

  {loading? <CircularColor />:
       <>
     
     <div className={Classes.tableclass}>
     
     <div className={Classes.searchDiv}>
      <SideBar/>
     <span className={Classes.ProductDataText}>Product Data</span>
     {/* Add button */}
      <AlertDialogSlideform/>
    </div>
    
  <SearchProduct product={product} handleChangeSearch={searchFunction}/>
   <table >
        <tr  className={Classes.tablerow1}>
         <th  className={Classes.tablehead1} style={{paddingLeft:"20px"}}>Title <Sorting filteredProduct={filteredProduct} sortfunction={()=>setsort(filteredProduct)} sortKey={'title'}/> </th>
        <th  className={Classes.tablehead1} style={{padding:"20px"}}>Brand<Sorting filteredProduct={filteredProduct} sortfunction={setsort} sortKey={'brand'}/> </th>
        <th  className={Classes.tablehead1} style={{padding:"20px"}}>Rating <Sorting filteredProduct={filteredProduct} sortfunction={setsort} sortKey={'rating'}/> </th>
        {/* <th  className={Classes.tablehead1} style={{paddingLeft:"20px",}}>Title  {!sortingActive?<ArrowUpwardIcon style={{color:'grey',marginLeft:'10px'}} onClick={()=>sortfunction('asc','title')} />:<ArrowDownwardIcon style={{color:'grey',marginLeft:'10px'}} onClick={()=>sortfunction('dsc','title')} />}  </th>
        <th  className={Classes.tablehead1} style={{padding:"20px"}}>Brand {!sortingActive?<ArrowUpwardIcon style={{color:'grey',marginLeft:'10px'}} onClick={()=>sortfunction('asc','brand')} />:<ArrowDownwardIcon style={{color:'grey',marginLeft:'10px'}} onClick={()=>sortfunction('dsc','brand')} />}  </th>
        <th  className={Classes.tablehead1} style={{padding:"20px"}}>Rating  {!sortingActive?<ArrowUpwardIcon style={{color:'grey',marginLeft:'10px'}} onClick={()=>sortfunction('asc','rating')} />:<ArrowDownwardIcon style={{color:'grey',marginLeft:'10px'}} onClick={()=>sortfunction('dsc','rating')} />}  </th> */}
        <th  className={Classes.tablehead1}>Edit</th>
        <th  className={Classes.tablehead1}>Delete</th>
        </tr>
        
        <TableProductData filteredProduct={filteredProduct} page={page} rowsPerPage={rowsPerPage} deleteproduct={Loader}/>
       </table>
       <hr></hr>
       
      {product.products&&product.products.length>0?
          <TablePagination
        rowsPerPageOptions={[5,15,30]}
        component="div"
        count={product.products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className={Classes.TablePagination}
      />
      :null}
   </div>

         </>
      }
      </>   
    )
}
export default Table