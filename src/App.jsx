import { useEffect, useMemo, useState } from 'react'

import './App.css'
import Rank from './components/Rank'
import Attribute from './components/Attribute'
import powersets from './data/powersets.json'
import heronames from './data/heronames.json'
import genders from './data/genders.json'
import ranks from './data/ranks.json'
import { FaDiceD20 } from "react-icons/fa";

const abilities = ['Melee', 'Agility', 'Resilience', 'Vigilance', 'Ego', 'Logic'];
const defaultStats = {
  Melee: 0,
  Agility: 0,
  Resilience: 0,
  Vigilance: 0,
  Ego: 0,
  Logic: 0,
};

function App() {
  // generator for MARVEL RPG character stats
  const [rank, setRank] = useState(null);
  const [heroName, setHeroName] = useState('');
  const [gender, setGender] = useState('');
  const [powerset, setPowerset] = useState([]);
  const [stats, setStats] = useState(defaultStats);
  const { Melee, Agility, Resilience, Vigilance, Ego, Logic } = stats;
  

  const generateName = () => {
    const randomName = heronames[Math.floor(Math.random() * heronames.length)];
    setHeroName(randomName);
  }

  const randomAbilitySelection = () => {
    return abilities[Math.floor(Math.random() * abilities.length)];
  }

  const generateStatsForRank = (rankToUse) => {
    if (!rankToUse) return defaultStats;

    const pointsToSpend = rankToUse.points;
    const newStats = {
      Melee: 0,
      Agility: 0,
      Resilience: 0,
      Vigilance: 0,
      Ego: 0,
      Logic: 0,
    };

    let pointsSpent = 0;
    while (pointsSpent < pointsToSpend) {
      const ability = randomAbilitySelection();
      if (newStats[ability] < rankToUse.cap) {
        newStats[ability]++;
        pointsSpent++;
      }
    }

    return newStats;
  }

  const applyRankAndStats = (selectedRank) => {
    setRank(selectedRank);
    setStats(generateStatsForRank(selectedRank));
  }

  const handleGenerate = () => {
    const randomName = heronames[Math.floor(Math.random() * heronames.length)];
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];

    setHeroName(randomName);
    applyRankAndStats(randomRank);
  }

  useEffect(() => {
    console.log(`Hero name changed to: ${heroName}`);
  },[heroName])

  const totalPoints = Object.values(stats).reduce((sum, value) => sum + value, 0);
  const pointsLeft = rank ? rank.points - totalPoints : 0;

  const highestAttributes = useMemo(() => {
    const attributes = Object.entries(stats).map(([name, value]) => ({ name, value }));
    const sortedAttributes = [...attributes].sort((a, b) => b.value - a.value);
    const highConditions = new Set([
      sortedAttributes[0]?.value,
      sortedAttributes[1]?.value,
    ]);

    return attributes.filter((attr) => attr.value !== 0 && highConditions.has(attr.value));
  }, [stats]);


  return (
    <>
      <section className="container">
        <h1 className="app-title">Marvel RPG Character Generator</h1>
        <article className="general-info">
          <div className="app-subtitle">
            <span>General</span>
          </div>
          <div className="hero-name stat">
            <div className="hero-name-input">
              <span className="stat-label">Name:</span>
              <input type="text" placeholder="Character Name" value={heroName} onChange={(e) => setHeroName(e.target.value)} />
            </div>
            <button className="name-generate-button" onClick={generateName}><FaDiceD20 /></button>
          </div>
          <div className="gender stat">
            <span className="stat-label">Gender:</span>
            <select className="gender-select" value={gender} onChange={(e) => setGender(e.target.value)}  >
              <option value="">Select Gender</option>
              {genders.map((genderOption) => (
                <option key={genderOption} value={genderOption}>
                  {genderOption}
                </option>
              ))}
            </select>
          </div>
          <Rank rank={rank} onRankChange={applyRankAndStats} />
        </article>

        
        <article className='attribute-container'>
          <div className="app-subtitle">
            <span className="">Attributes</span>
            <div className="separator"></div>
            <span>Points Left: {pointsLeft}</span>
          </div>
          <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Melee" value={Melee} onChange={(value) => setStats((prev) => ({ ...prev, Melee: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Melee')} />
          <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Agility" value={Agility} onChange={(value) => setStats((prev) => ({ ...prev, Agility: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Agility')} />
          <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Resilience" value={Resilience} onChange={(value) => setStats((prev) => ({ ...prev, Resilience: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Resilience')} />
          <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Vigilance" value={Vigilance} onChange={(value) => setStats((prev) => ({ ...prev, Vigilance: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Vigilance')} />
          <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Ego" value={Ego} onChange={(value) => setStats((prev) => ({ ...prev, Ego: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Ego')} />
          <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Logic" value={Logic} onChange={(value) => setStats((prev) => ({ ...prev, Logic: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Logic')} />
        </article>

      </section>
      
      <button className="generate-button" onClick={handleGenerate}><FaDiceD20 /></button>

    </>
  )
}

export default App
