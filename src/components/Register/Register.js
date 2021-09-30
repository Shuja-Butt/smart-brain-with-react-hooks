import React,{useState} from 'react';

const  Register =(props)=> {

const [userData,setData] = useState({
      email: '',
      password: '',
      name: ''
    }
  )


  const onNameChange = (event) => {
    setData({...userData,name: event.target.value})
  }

  const onEmailChange = (event) => {
    setData({...userData,email: event.target.value})
  }

  const onPasswordChange = (event) => {
    setData({...userData,password: event.target.value})
  }

  const storeSessionToken =(token)=>{
    window.sessionStorage.setItem("token",token)
  }











  const onSubmitSignIn = () => {
    console.log(userData,"data sent to fettch")
    fetch('http://localhost:3000/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
        name: userData.name
      })
    })
      .then(response => response.json())
      .then(info => {
        if (info.id && info.message==="success") {
          storeSessionToken(info.token)
          fetch(`http://localhost:3000/profile/${info.id}`,{'headers':{'Content-Type': 'application/json', 'Authorization': window.sessionStorage.getItem('token')
          }})
          .then(res=>res.json())
          .then(data=>
          {
            props.loadUser(data)
            props.onRouteChange('home')
          }
          ).catch(console.log)
        }
      })
  }

 
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={onEmailChange}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onPasswordChange}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }

export default Register;