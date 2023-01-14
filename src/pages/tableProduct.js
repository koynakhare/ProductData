
import Classes from './table.module.css'
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import {useState,useEffect}from 'react'
import Swal from 'sweetalert2';

import AlertDialogSlide from '../component/EditProduct/update';

import * as React from 'react';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BasicRating from './rating';

const TableProductData=(props)=>{
  
  const[loading,setloading]=useState(false)
  
   const deleteproduct=async(id)=>{
   
    confirmAlert({
     
      message: 'Confirm to Delete',
     
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            props.deleteproduct(true)
      axios.delete(`https://dummy.restapiexample.com/api/v1/delete/${id}`)
    .then(res => { 
       setloading(false)
       props.deleteproduct(false)
      Swal.fire({ html: 'Product Deleted Successfully' })})
    .catch(error => {
      console.log(error)
    })
      
          }
        },
        {
          label: 'No',
         
        }
      ]
    });
}
    return (
     <>
            {
        props.filteredProduct&&props.filteredProduct.length>0? 
         props.filteredProduct
         .slice(props.filteredProduct.length<=props.page?props.page-props.filteredProduct.length*props.rowsPerPage:props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
         .map((productobject) => {
          console.log("fjk")
          return (
            <>
           
            <tr className={Classes.tablerow2}>
              <td className={Classes.tabledata}>{productobject.title}</td>
              <td className={Classes.tabledata}>{productobject.brand}</td>
              <td className={Classes.tabledata}><BasicRating value={productobject.rating}/></td>
              <td>
              {<AlertDialogSlide productId={productobject.id}/>}
              </td>
              <td className={Classes.tabledata}><DeleteOutlineIcon className={Classes.deleteIcon} onClick={()=>{deleteproduct(productobject.id)}}/></td>
            </tr>
           </>
          );
        }):null}
     </>
    )
}
export default TableProductData