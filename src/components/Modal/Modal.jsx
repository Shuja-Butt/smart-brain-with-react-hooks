
import React,{useState,useEffect} from 'react'
import ReactDOM from 'react-dom'



const modal= document.getElementById('modal-root')


const  Modal =(props)=> {


    // this.el=document.createElement('div') // this div wraps around the modal children   
    // const element = useRef(document.createElement('div')) 
    const [element] = useState(() => document.createElement('div'));//lazily seettig so that div is only created once

    
    // componentDidMount(){
    //     modal.appendChild(element)
    // }
    // componentWillUnmount(){
    //     modal.removeChild(element)
    // }

    useEffect(()=>{
        modal.appendChild(element)

        return ()=>{
            modal.removeChild(element)
        }
    },[])


 

       return ReactDOM.createPortal(props.children,element)//this.props.children is whatever is in this Modal
    

}

export default Modal





















