
import Classes from './search.module.css'

import * as React from 'react';
import Box from '@mui/material/Box';

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    // color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      
    },
  }));
const SearchProduct=(props)=>{
    const handleChangeSearch=(event)=>{
   
    var filterdata=props.product.products
       .filter((val)=>{
        if(event.target.value===""){
        
          return val
        }else if(val.title.toLowerCase().includes(event.target.value.toLowerCase())){
        
        
          return val
        } 
       })
        console.log('filter')
      console.log(filterdata)
    // console.log(typeof props.setsort)
      if(event.target.value==="") props.handleChangeSearch(props.product.products)
  
       else props.handleChangeSearch(filterdata)
      
      
      } 
  
    return (
        <>
        <div className={Classes.TableSearchRow}>
    
    <Box sx={{ flexGrow: 1 }} className={Classes.box}>
       {/* <AppBar position="static" > */}
       <Toolbar  className={Classes.Toolbar}>
 
     <Search>
     <SearchIconWrapper>
       <SearchIcon />
     </SearchIconWrapper>
     <StyledInputBase
       placeholder="Search Product…"
       inputProps={{ 'aria-label': 'search' }}
       onChange={handleChangeSearch} 
       className={Classes.searchbar}
     />
   </Search>
   </Toolbar>
   {/* </AppBar> */}
   </Box>
  {/* <hr style={{color:'lightgrey'}}></hr> */}
     </div>
        </>
    )
}
export default SearchProduct