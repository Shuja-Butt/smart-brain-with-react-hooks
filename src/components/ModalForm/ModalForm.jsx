
import React,{useState} from 'react'
import './ModalForm.css'

const  ModalForm =(props)=> {


  const [userData,setData] = useState({name:props.name,pet:props.pet,age:props.age})


  const onInputChange=(event)=>{
    setData({...userData,[event.target.name]:event.target.value})

  }

 const handleSubmit=async (event)=>{
  try{
    const modalFormInput = userData

    let res = await  fetch(`http://localhost:3000/profile/${props.data.id}`,{

    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':window.sessionStorage.getItem('token')
    },
    body:JSON.stringify(modalFormInput)
    })
    let data  = await res.json()

    console.log(data,"I am data in modal form")
    if(data==='success')
    {

      props.handleProfile()
      props.loadUser({...props.data,...userData})

    }else{

      throw Error("Error Updatinf profile")
    }

  }
  catch(err){
    console.log(err)
  }

  }

    
        return(
        <div className="custom">
        <article style={{backgroundColor: '#FFFFFF',flexDirection:'column'}}className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center ">
        <span  onClick={props.handleProfile} className="cross">&Chi;</span>

        <div className="pa4" style={{paddingBottom:0}}>
            <div>
                <h2>Name</h2>
                <span>{userData.name}</span>
            </div>
            <div>
                <h2>Age</h2>
                <span>{userData.age}</span>
            </div>
            <div>
                <h2>Pet</h2>
                <span>{userData.pet}</span>
            </div>
            </div>

        <main className="pa4 black-80" style={{paddingTop:0}}>
          <div className="measure">
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onInputChange}
             
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="age">Age</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="age"
                  id="age"
                  onChange={onInputChange}
             
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Pet</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="pet"
                  id="pet"
                  onChange={onInputChange}
                />
              </div>

            <div className="buttons_container">
            <div className="Update">
              <input
                className="b ph3 pv2 input-reset ba  grow pointer f6 dib"
                type="submit"
                value="Update"
                onClick={handleSubmit}
              />
            </div>
            
            <div className="Cancel">
              <input
                className="b ph3 pv2 input-reset ba   grow pointer f6 dib"
                type="submit"
                value="Cancel"
                onClick={props.handleProfile}
              />
            </div>
            </div>
          </div>
        </main>
      </article>
      </div>
        )
    }





export default ModalForm




















