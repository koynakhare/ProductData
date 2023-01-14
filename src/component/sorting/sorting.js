
import {useState,useEffect}from 'react'

import * as React from 'react';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TableProductData from '../../pages/tableProduct';

const Sorting=(props)=>{
    const [sortingActive,setsortingActive]=useState(false)
   const[sortedProduct,setSortedProduct]=useState(props.filteredProduct)
    
    const sortfunction=(sortingType)=>{
   
         var  sortproduct= props.filteredProduct.sort( (a, b) =>{
           if(sortingType==='asc'){
            setsortingActive(true)
           if(props.sortKey==='brand'){
            
          return a.brand.toLowerCase() > b.brand.toLowerCase()  ? 1 : -1}
          else if (props.sortKey==='title'){
          
          return  a.title.toLowerCase() > b.title.toLowerCase()  ? 1 : -1}
          else {
           
           return a.rating > b.rating  ? 1 : -1
          }
         
           } else {
            setsortingActive(false)
             if(props.sortKey==='brand'){
            
            
               return a.brand.toLowerCase() < b.brand.toLowerCase()  ? 1 : -1}
               else if (props.sortKey==='title'){
               
               return a.title.toLowerCase() < b.title.toLowerCase()  ? 1 : -1}
               else{
                 
                 return a.rating < b.rating ? 1 : -1
               }
               
           }}
           )
          
            props.sortfunction(sortproduct)
         
         } 
    
    
    
return (
    <>
   {!sortingActive?<ArrowUpwardIcon style={{color:'grey',marginLeft:'10px'}} onClick={()=>sortfunction('asc')} />:<ArrowDownwardIcon style={{color:'grey',marginLeft:'10px'}} onClick={()=>sortfunction('dsc')} />} 
               
                               
                            
    </>
)
}
export default Sorting