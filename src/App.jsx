import { useEffect, useState } from 'react'

import './App.css'
import Rank from './components/Rank'
import Attribute from './components/Attribute'
import powersets from './data/powersets.json'
import heronames from './data/heronames.json'
import ranks from './data/ranks.json'
import { FaDiceD20 } from "react-icons/fa";

const abilities = new Array('Melee', 'Agility', 'Resilience', 'Vigilance', 'Ego', 'Logic');

function App() {
  // generator for MARVEL RPG character stats
  const [rank, setRank] = useState(null);
  const [heroName, setHeroName] = useState('');
  const [powerset, setPowerset] = useState([]);
  
  const [pointsLeft, setPointsLeft] = useState(0);
  
  const [melee, setMelee] = useState(0);
  const [agility, setAgility] = useState(0);
  const [resilience, setResilience] = useState(0);
  const [vigilance, setVigilance] = useState(0);
  const [ego, setEgo] = useState(0);
  const [logic, setLogic] = useState(0);
  

  const generateName = () => {
    // Placeholder for generate name functionality
    const randomName = heronames[Math.floor(Math.random() * heronames.length)];
    setHeroName(randomName);
  }

  const generateRank = () => {
      const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
      setRank(randomRank);
  }

  const generatePowerSet = () => {
    const numberOfPowersets = rank.powerpicks;
    console.log(`Generating ${numberOfPowersets} powersets for rank ${rank.name}`);
  }

  const handleGenerate = () => {
    generateName();
    generateRank();
  }
  
  const randomAbilitySelection = () => {
    const randomAbility = abilities[Math.floor(Math.random() * abilities.length)];
    return randomAbility;
  }
    
  useEffect(() => {
    if(!rank) return;

    const pointsToSpend = rank.points;
    const newStats = {
      Melee: 0,
      Agility: 0,
      Resilience: 0,
      Vigilance: 0,
      Ego: 0,
      Logic: 0
    };

    let pointsSpent = 0;

    while (pointsSpent < pointsToSpend) {
      const ability = randomAbilitySelection();
      if (newStats[ability] < rank.cap) {
        newStats[ability]++;
        pointsSpent++;
      }
    }

    setMelee(newStats.Melee);
    setAgility(newStats.Agility);
    setResilience(newStats.Resilience);
    setVigilance(newStats.Vigilance);
    setEgo(newStats.Ego);
    setLogic(newStats.Logic);
  }, [rank])

  useEffect(() => {
    console.log(`Hero name changed to: ${heroName}`);
  },[heroName])

  useEffect(() => {
    const totalPoints = melee + agility + resilience + vigilance + ego + logic;
    setPointsLeft(rank ? rank.points - totalPoints : 0);
  },[melee, agility, resilience, vigilance, ego, logic])


  return (
    <>
      <h1>Marvel 616 Character Generator</h1>
      <section className="container">
        <article className="hero-name stat">
          <div className="hero-name-input">
            <span className="stat-label">Name:</span>
            <input type="text" placeholder="Character Name" value={heroName} onChange={(e) => setHeroName(e.target.value)} />
          </div>
          <button className="name-generate-button" onClick={generateName}><FaDiceD20 /></button>
        </article>
        <Rank rank={rank} onRankChange={setRank} />

        <div className='points-left'><span>Points Left: {pointsLeft}</span></div>
        <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Melee" value={melee} onChange={setMelee} />
        <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Agility" value={agility} onChange={setAgility} />
        <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Resilience" value={resilience} onChange={setResilience} />
        <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Vigilance" value={vigilance} onChange={setVigilance} />
        <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Ego" value={ego} onChange={setEgo} />
        <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Logic" value={logic} onChange={setLogic} />

        <button className="generate-button" onClick={handleGenerate}>Generate</button>
      </section>
    </>
  )
}

export default App
