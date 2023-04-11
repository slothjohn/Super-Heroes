import { useState, useEffect } from 'react'
import { supabase } from './client';
import './App.css'

function App() {
    const [crewmates, setCrewmates] = useState([]); // store crewmates data
    const [newCrewmateName, setNewCrewmateName] = useState(""); // store new crewmate name
    const [newCrewmatePower, setNewCrewmatePower] = useState(""); // new crewmate power
  
    useEffect(() => {
      fetchCrewmates();
    }, [crewmates]);

  
    const fetchCrewmates = async () => {
      const {data} = await supabase
      .from('Posts')
      .select("*");

      setCrewmates(data)
    }
  
    const handleAddCrewmate = async () => {
        const { data: crewmate } = await supabase
          .from("Posts")
          .insert({ crewMate: newCrewmateName, power: newCrewmatePower}) // Insert new crewmate
        setCrewmates([...crewmates, crewmate]); // update the crewmates
      setNewCrewmateName(""); // reset crewmate name input
      setNewCrewmatePower("");
    };
  
    const handleDeleteCrewmate = async (crewmateId) => {
        await supabase.from("Posts").delete().eq("id", crewmateId); // delete crewmate
        setCrewmates(crewmates.filter((crewmate) => crewmate.id !== crewmateId)); // remove the deleted crewmate
    };
  
  
    const handleUpdateCrewmate = async (crewmateId, updatedCrewmate) => {
        await supabase
          .from("Posts")
          .update(updatedCrewmate)
          .eq("id", crewmateId); 
        fetchCrewmates();
    };
  

  return (
    <div className="App">
      <h1>Crewmates</h1>
        <div className="crewmates-container">
          {crewmates.map((crewmate, index) => (
            <div key={index} className='crewmate-card'>
              <h3>Name: </h3>
              <input
              type="text"
              value= {crewmate?.crewMate}
              onChange={(e) => {
                const updatedCrewmate = { ...crewmate, crewMate: e.target.value };
                handleUpdateCrewmate(crewmate.id, updatedCrewmate);
              }}
              />
              <p>Power: </p>
              <input
              type="text"
              value= {crewmate?.power}
              onChange={(e) => {
                const updatedCrewmate = { ...crewmate, power: e.target.value };
                handleUpdateCrewmate(crewmate.id, updatedCrewmate);
              }}
            />
              <p>Delete: </p>
              <button onClick={() => handleDeleteCrewmate(crewmate.id)}>Delete</button>
            </div>
          ))}
        </div>
      <input
        type="text"
        value={newCrewmateName}
        onChange={(e) => setNewCrewmateName(e.target.value)}
        placeholder="Crewmate Name"
      />
      <input
        type="text"
        value={newCrewmatePower}
        onChange={(e) => setNewCrewmatePower(e.target.value)}
        placeholder="Crewmate Power"
      />
      <button onClick={handleAddCrewmate}>Add Crewmate</button>
    </div>
  )
}

export default App
