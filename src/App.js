import React, { useState } from 'react'
import FriendList from './Components/FriendList';
import Button from './Components/Button';
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
const App = () => {
  const [showsFreind,setshows]=useState(true)
  const [all,setall]=useState(initialFriends)
  const [selectedfriend,setselected]=useState(null)
console.log(selectedfriend);

  const onAddFriend=(fr)=>{

    setall((frs)=>[...frs,fr])
    
    

  }

 

  const handleselected=(id)=>{

    const fr=all.find(f=>f.id===id)

    console.log(fr)

    setselected(fr)

  }

  const closeopen=()=>{
    setshows((c)=>!c)
  }
  return (
    <div className='app' >
      <div className='sidebar' > 
        {
          all.map((fr)=>(
            <FriendList handleselected={handleselected}  fr={fr} key={fr.id}/>
          ))
        }
        { showsFreind && <FormAddFriend onAddFriend={onAddFriend}  />  }


        {
          showsFreind ? (<Button  closeopen={closeopen} > Close </Button>):( <Button  closeopen={closeopen} > Add </Button> )
        }

      


      </div>

      {selectedfriend && (
        <FormSplitBill
          selectedFriend={selectedfriend}
          
        />
      )}
    </div>
  )
}

export default App
function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");
const handleSumbit=(e)=>{
  e.preventDefault();

  if (!name || !image) return;
  const id = crypto.randomUUID();

  const newfriend={
    id:id,
    name:name,
    image:image,
    balance:0

  }

  onAddFriend(newfriend)
  setName("");
  setImage("https://i.pravatar.cc/48");




}
  
  return (
    <form className="form-add-friend"  onSubmit={handleSumbit} >
      <label>👫 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />

      <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e)=>setImage(e.target.value)}
      />

      <Button>Add</Button>
    </form>
  );
}



function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍‍♀️ Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>👫 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>🤑 Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}