import { useState } from "react";
import Button from "./components/button";
import FormAddFriend from "./components/formAddFriend";
import FormSplitBill from "./components/formSplitBill";
import FriendsList from "./components/friendsList";
import { initialFriends } from "./lib/constants/initialFriends";


function App() { 

  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend(){
    setShowAddFriend(show => !show);
  }

  function handleAddFriend(friend){
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelectFriend(friend){
    setSelectedFriend(current => current?.id === friend.id ? null : friend);  
    setShowAddFriend(false); 
  }

  function handleSplitBill(value){
    setFriends(friends => friends.map(friend => 
      friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend));
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} selectedFriend={selectedFriend} onSelection={handleSelectFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>{showAddFriend ? "Close" : "Add friend"}</Button>
        </div>
      {selectedFriend && <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} key={selectedFriend.id}/>}
    </div>
  );
}

export default App;
