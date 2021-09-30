import React,{useState} from 'react';

import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';




const Avatar =(props)=>{



    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
    const signOutUser=()=>{
      fetch('http://localhost:3000/signout',{
        method:'POST',
        headers:{'Content-Type':'application/json',
        'Authorization':window.sessionStorage.getItem('token')
      }
      })
      .then(res=>{
        console.log(res,"resp")
        if(res.status===200){
        props.onRouteChange('signout')
        }
        else{
          throw new Error("Maybe the res.status doesnot match")
        }
      })
      .catch(err=>console.log(err))
    }
    return (
     <>
    <ButtonDropdown  style={{padding: '10px'}}  isOpen={dropdownOpen} toggle={toggle}>
    <DropdownToggle
        tag="span"
        aria-expanded={dropdownOpen}
      >
    <img
        src="http://tachyons.io/img/logo.jpg"
        className="br-100 ba h3 w3 dib" alt="avatar"/>
      </DropdownToggle>
      <DropdownMenu  right>
        <DropdownItem onClick={props.handleProfile} >Profile</DropdownItem>
        <DropdownItem onClick={signOutUser} >Sign Out</DropdownItem>
      </DropdownMenu>
    </ButtonDropdown>
    </>
    )
}


export default Avatar