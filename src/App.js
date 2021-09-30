import React,{useState,useEffect} from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Modal from './components/Modal/Modal';
import ModalForm from './components/ModalForm/ModalForm';
import './App.css';
import jwt_decode from "jwt-decode";

const particlesOptions = {
  //customize this to your liking
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  isProfileOpen:false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet:'',
    age:''
  }
}

const   App = ()=> {


 const [data,setData] =  useState(initialState)



  useEffect(()=>{

    console.log("effect is triggred")
    const token =window.sessionStorage.getItem('token')
    let expired = false
    if(token)
    {
      const {exp} = jwt_decode(token)
      if(Date.now() >= exp *1000){
        expired = true
      }
       if(!expired){

      
             const signInAndGetProfile =async ()=>{

               try{
                         const signInRes =  await    fetch('http://localhost:3000/signin',{
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                  }
                })
         const {id} = await signInRes.json()

         const    profileRes =  await fetch(`http://localhost:3000/profile/${id}`,{
          'headers':{
            'Content-Type': 'application/json',
            'Authorization': token
          }
          })

         const data = await profileRes.json()

          loadUser(data)
          onRouteChange('home')

               }
               catch(err){
                 console.log(err)
               }
 
         }

         signInAndGetProfile()

       }
       else {
          window.sessionStorage.removeItem('token')
          onRouteChange('signin')
       }
    }

  },[setData])


  const loadUser = (dataArg) => {

    setData((prevState)=>({...prevState,user: {
      id: dataArg.id,
      name: dataArg.name,
      email: dataArg.email,
      entries: dataArg.entries,
      joined: dataArg.joined
    }}))
  }
  const calculateFaceLocation = (data) => {

    if(data && data.outputs){
      const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
      const image = document.getElementById('inputimage');
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }

    }
    return

  }

  const displayFaceBox = (box={}) => {
    setData((prevState)=>({...prevState,box: box}));
    // setData({...data,box:box})
  }

 const  onInputChange = (event) => {
    setData((prevState)=>({...prevState,input: event.target.value}));
  }






  const onButtonSubmit = async () => {
    setData((prevState)=>({...prevState,imageUrl: prevState.input}));
    try{
      const imgUrlRes = await   fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': window.sessionStorage.getItem('token')

      },
        body: JSON.stringify({
          input: data.input
        })
      })
const  imgUrlResdata   = await imgUrlRes.json()
 if (imgUrlResdata) {
   const imgRes = await  fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {
              'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
          },
            body: JSON.stringify({
              id: data.user.id
            })
          })
    const count = await imgRes.json()
    console.log(count,"Now count is")
    
    setData((prevState)=>({...prevState, user:{...prevState.user,entries:count}}))
       
   

      }
    displayFaceBox(calculateFaceLocation(imgUrlResdata))


    }
    catch(err){

      console.log(err)
    }
}











 const onRouteChange = (route) => {
    if (route === 'signout') {
      window.sessionStorage.removeItem('token')
     return  setData(initialState)
    } else if (route === 'home') {
      setData((prevState)=>({...prevState,isSignedIn:true}))
    }
 
    setData((prevState)=>({...prevState,route: route}));

  }



const handleProfile=()=>{
setData((prevState)=>({...prevState,isProfileOpen:!prevState.isProfileOpen}))
}
    
    const { isSignedIn, imageUrl, route, box } = data;
    const {name,entries} = data.user;

    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation  handleProfile={handleProfile} isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={name}
                entries={entries}
              />
              <ImageLinkForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />

              {
                data.isProfileOpen?
                <Modal>
                 <ModalForm  data={data.user} loadUser={loadUser}  handleProfile={handleProfile}/>
                 </Modal>
                 :null

              }
        
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={loadUser} onRouteChange={onRouteChange}/>
             : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
            )
        }
      </div>
    );
  }


export default App;
