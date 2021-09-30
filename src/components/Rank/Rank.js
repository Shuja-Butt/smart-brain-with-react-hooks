import React,{useState,useEffect} from 'react';



const  Rank  =(props)=>{



 const [emoji,setEmoji] = useState({emoji:''})


  useEffect(()=>{

    getEmoji(props.entries)

  },[props.entries,props.name])


  const getEmoji=(rank)=>{

    fetch(`http://localhost:3000/rankly/${rank}`, {headers: {
              'Content-Type': 'application/json',
            'Authorization': window.sessionStorage.getItem('token')
          }})
    .then(res=>res.json())
    .then(data=>{
      setEmoji({emoji:data.input})
    })
    .catch(console.log)
  }





    return (
      <div>
        <div className='white f3'>
          {`${props.name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {props.entries}
        </div>
        <div className='white f1'>
          {`Rank Badge: ${emoji.emoji}`}
        </div>
      </div>
    );
  

  

}
  
export default Rank;