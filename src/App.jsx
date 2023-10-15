import { useState,useCallback,useEffect ,useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [number, setNumbers] = useState(false)
  const [char, setChar] =useState(false)
  const [pass, setPass] = useState("")

  const passwordRef = useRef(null)


  let passwordGenerator = useCallback(() =>{
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let pas =""
    

    if(setNumbers) str+="0123456789";
    if(setChar) str+= "!@#$%^&*(){}:|";

    for (let i = 0; i <=  length; i++) {
       let chr= Math.floor(Math.random() * str.length +1);
       pas += str.charAt(chr)
      
    }

    setPass(pas)
  }, [length,number,char,setPass])

  useEffect(()=>{
    passwordGenerator()
  }, [length,number,char,passwordGenerator])


  const copyPasswordToClip = useCallback(() =>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(pass)
  },[pass])

  return (
    <>
      
      <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-9 text-orange-500 bg-gray-800">
      <h1 className=' text-white text-center py-2 uppercase'>passowrd generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
    <input type="text"
        className='outline-none w-full py-2.5 px-3' 
        placeholder='Password'
        value={pass}
        ref={passwordRef}
        readOnly/>

      <button onClick={copyPasswordToClip} 
      className='outline-none bg-blue-700 text-white px-3.5 py-0.5 shrink-0'>copy</button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input type="range"
          value={length}
          min={8} 
          max={100}
          className=" cursor-pointer"
          onChange={(e) => {setLength(e.target.value)}}
          
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          defaultChecked={number}
          id='numberInput'
          onChange={() =>{
            setNumbers((prev)=> !prev);
          }}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>

        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          defaultChecked={char}
          id='characterInput'
          onChange={() =>{
            setChar((prev)=> !prev)
          }}
          />
          <label htmlFor='characterInput'>Characters</label>
        </div>
      
      



    </div>


      </div>
    </>
  )
}

export default App
