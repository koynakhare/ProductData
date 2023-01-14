
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import EditIcon from '@mui/icons-material/Edit';
import Classes from './update.module.css';
import swal from 'sweetalert';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/system';
import CustomizedSnackbars from './alert';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
export default function AlertDialogSlide(props) {
  const [open, setOpen] = React.useState(false);
  const[loading ,setloading]=React.useState(false)
  const[checkTitleInput ,setcheckTitleInput]=React.useState(true)
  const[checkInput ,setcheckinput]=React.useState(true)
  const[checkrantinInput ,setcheckRatingInput]=React.useState(true)
  const [product,setproduct]=React.useState({
    title:"",
    brand:"",
    rating:"",
})
  const savebuttton=()=>{
 
  if(product.title&&product.brand&&product.rating){
    setloading(true)
    // setcheckInput(true)
   
    axios.put(`https://dummyjson.com/products/${props.productId}`,product)
    .then(res =>{
      if(res){
        setloading(false)
        setOpen(false);
        setcheckinput(true)
         swal("Good job!", "Product Updated Successfully", "success");
      }
    })
    .catch(error => {
      console.log(error)
    })
 
  }
 else {
 
  setcheckinput(false)
  // if(!product.title)setcheckTitleInput(false)
  // else  if(!product.brand)setcheckBrandInput(false)
  // else if (!product.rating)setcheckRatingInput(false)
 }
 
}
  
  const handleClickOpen = () => {
    console.log(props.productId)
    axios.get(`https://dummyjson.com/products/${props.productId}`).then(res=>{
if(res){
  const {title,brand,rating}=res.data
 
 setproduct({...product,
  title:title,
brand:brand,
rating:rating
 })
}
    }).catch(err=>{
      console.log(err)
    })
  
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setcheckTitleInput(true)
    // setcheckBrandInput(true)
    // setcheckRatingInput(true)
    // setcheckinput(true)
    axios.get(`https://dummyjson.com/products/${props.productId}`).then(res=>{
      if(res){
        const {title,brand,rating}=res.data
       
       setproduct({...product,
        title:title,
      brand:brand,
      rating:rating
       })
      }
          }).catch(err=>{
            console.log(err)
          })
  };
  const handlechange=(e)=>{
    const {name,value}=e.target;
    console.log(value+" "+name)
    if(value!=''){
      // setcheckTitleInput(true)
      // setcheckBrandInput(true)
      // setcheckRatingInput(true)
       setcheckinput(true)
     }
    setproduct({...product,[name]:value})
    
  
  }
  return (
    <>
    
    <div>
     
      <ModeEditOutlineOutlinedIcon variant="outlined" onClick={handleClickOpen}/>
        
      
      <Dialog
        open={open}
      
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogTitle>{"Edit Data"}</DialogTitle>
        <DialogContent className={Classes.updateBox}>
          <DialogContentText id="alert-dialog-slide-description" className={Classes.DialogContentText}>
          <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {/* <div className={Classes.InputDiv}> */}
      
      <TextField style={{width:'90%'}} id="outlined-basic" label='Title' value={product.title} name='title' variant="outlined" onChange={handlechange}/>
     
      <TextField style={{width:'90%'}}id="outlined-basic" label='Brand'  value={product.brand}name='brand' variant="outlined" onChange={handlechange} />
     
      <TextField style={{width:'90%'}}id="outlined-basic" label='Rating' value={product.rating}name='rating'variant="outlined" onChange={handlechange}/>
      {/* </div> */}
    </Box>
   {!checkInput?<CustomizedSnackbars message='error' />:null}
      

          </DialogContentText>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleClose} style={{color:'red'}}>cancel</Button>
          <Button onClick={savebuttton}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
    </>
  );
}
