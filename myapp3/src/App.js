import Js1 from './components/js1'

export default function App() {



const cred = ()=>{
document.body.style.backgroundColor = "red"

setTimeout(() => {
  document.body.style.backgroundColor = ""
},5000);
}

const cred2 = ()=>{
  document.body.style.backgroundColor = "green"
  
  setTimeout(() => {
    document.body.style.backgroundColor = ""
  },5000);
  }

  
  const cred3 = ()=>{
    document.body.style.backgroundColor = "yellow"
    
    setTimeout(() => {
      document.body.style.backgroundColor = ""
    },5000);
    }

  return (
    <div>
      <Js1 cred = {cred} cred2 = {cred2} cred3 = {cred3}/>
    </div>
  )
}
