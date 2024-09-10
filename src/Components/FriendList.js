import React from 'react'

const FriendList = ({fr,handleselected}) => {
  return (
    <>

 

       
        <li> <img  src={fr.image} alt={fr.name}   />
        <h3> {fr.name} </h3>   <button className='button' onClick={()=>handleselected(fr.id)}  > Select </button>


        
        {
            fr.balance<0 && (
                <p className='red'>  you owe {fr.name} {Math.abs(fr.balance)}  </p>
            )
        }

{
            fr.balance>0 && (
                <p className='green'>  you friend owes you {Math.abs(fr.balance)}  </p>
            )
        }

{
            fr.balance===0 && (
                <p >  you are equal   </p>
            )
        }
           
        </li>



    </>
  )
}

export default FriendList
