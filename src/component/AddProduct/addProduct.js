
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Classes from './AddProduct.module.css';
import swal from 'sweetalert';
import axios from 'axios';
import CircularColor from '../Loading/loading';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CustomizedSnackbars from '../EditProduct/alert';
export default function AlertDialogSlideform(props) {
  const [open, setOpen] = React.useState(false);
  const[loading ,setloading]=React.useState(false)
  const[checkInput ,setcheckinput]=React.useState(true)
  const [product,setproduct]=React.useState({
    title:"",
    brand:"",
    rating:"",
})

  const savebuttton=()=>{
 
  if(product.title&&product.brand&&product.rating){
    setloading(true)
 axios.post('https://dummyjson.com/products/add',product)
    .then(res =>{
      if(res){
        setcheckinput(true)
        swal("Good job!", "Product Updated Successfully", "success");
        const {title,brand,rating}=res.data
        setproduct({...product,
          title:'',
        brand:'',
        rating:''
         })
        setloading(false)
        setOpen(false);
        
       }
    })
    .catch(error => {
      console.log(error)
    })}
 else {
  setcheckinput(false)
}} 
  
  const handleClickOpen = () => {
     setOpen(true);
  };

  const handleClose = () => {
    setproduct({...product,
      title:'',
    brand:'',
    rating:''
     })
   
    setcheckinput(true)
    setOpen(false);
  };
  
  
  const handlechange=(e)=>{
    const {name,value}=e.target;
   if(value!=''){
    setcheckinput(true)
    
   }
    setproduct({...product,[name]:value})}
  return (
    <div className={Classes.formMainDiv}>
    
    {loading?<CircularColor/>:<>
    <Button variant="contained" color="success"  onClick={handleClickOpen} className={Classes.AddproductButton}>
 Add Product
</Button>
      <Dialog
        open={open}
      
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        
      >
        <DialogTitle >{"Add Product"}</DialogTitle>
        <DialogContent className={Classes.addBox}>
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
          <Button onClick={savebuttton}>submit</Button>
        </DialogActions>
      </Dialog>
      </>
}
    </div>
  );
}
