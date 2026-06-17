import { useEffect, useMemo, useState } from 'react'

import './App.css'
import InputSelect from './components/InputSelect'
import Attribute from './components/Attribute'
import powersets from './data/powersets.json'
import heronames from './data/heronames.json'
import origins from './data/origins.json'
import occupations from './data/occupations.json'
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
  const [origin, setOrigin] = useState({});
  const [occupation, setOccupation] = useState({});
  const [powerset, setPowerset] = useState([]);
  const [stats, setStats] = useState(defaultStats);
  const { Melee, Agility, Resilience, Vigilance, Ego, Logic } = stats;

  const generateName = () => {
    const randomName = heronames[Math.floor(Math.random() * heronames.length)];
    setHeroName(randomName);
  }

  const generateRank = () => {
    const randomRank = ranks[Math.floor(Math.random() * ranks.length)];
    applyRankAndStats(randomRank);
  }

  const generateOrigin = () => {
    const randomOrigin = origins[Math.floor(Math.random() * origins.length)];
    setOrigin(randomOrigin);
  }

  const generateOccupation = () => {
    const randomOccupation = occupations[Math.floor(Math.random() * occupations.length)];
    setOccupation(randomOccupation);
  }

  const generateGender = () => {
    const randomGender = genders[Math.floor(Math.random() * genders.length)];
    setGender(randomGender);
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
    generateName();
    generateRank();
    generateGender();
    generateOccupation();
    generateOrigin();
  }

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
        <article className="general-info section-container">
          <div className="app-subtitle">
            <span>General</span>
          </div>
          <div className="section-content">



            <div className="hero-name stat">
              <div className="input-group hero-name-input">
                <span className="stat-label">Name:</span>
                <input className="input-text" type="text" placeholder="Character Name" value={heroName} onChange={(e) => setHeroName(e.target.value)} />
              </div>
              <button className="generate-button" onClick={generateName}><FaDiceD20 /></button>
            </div>


            <div className="gender stat">
              <div className="input-group hero-name-input">
                <span className="stat-label">Gender:</span>
                <select className="input-select gender-select" value={gender} onChange={(e) => setGender(e.target.value)}  >
                  <option value="">Select Gender</option>
                  {genders.map((genderOption, index) => (
                    <option key={index} value={genderOption}>
                      {genderOption}
                    </option>
                  ))}
                </select>
              </div>
              <button className="generate-button" onClick={generateGender}><FaDiceD20 /></button>
            </div>


            <div className="origin stat">
              <div className="input-group origin-input">
                <span className="stat-label">Origin</span>
                <select className="input-select origin-select" value={origin.id} onChange={(e) => setOrigin(e.target.value)}>
                  <option value="">Select Origin</option>
                  {origins.map((originOption) => (
                    <option key={originOption.id} value={originOption.id}>
                      {originOption.title}
                    </option>
                  ))}
                </select>
              </div>
              <button className="generate-button" onClick={generateOrigin}><FaDiceD20 /></button>
            </div>


            <div className="occupation stat">
              <div className="input-group occupation-input">
                <span className="stat-label">Occupation</span>
                <select className="input-select occupation-select" value={occupation.id} onChange={(e) => setOccupation(e.target.value)}>
                  <option value="">Select Occupation</option>
                  {occupations.map((occupationOption) => (
                    <option key={occupationOption.id} value={occupationOption.id}>
                      {occupationOption.title}
                    </option>
                  ))}
                </select>
              </div>
              <button className="generate-button" onClick={generateOccupation}><FaDiceD20 /></button>
            </div>



            <div className="rank-dropdown stat">
              <div className="input-group rank-input">
                <span className="stat-label">Rank:</span>
                <select className="input-select rank-select" value={rank?.name} name="rank" onChange={(e) => applyRankAndStats(ranks.find((r) => r.name === e.target.value))}>
                  <option value="none">None Selected...</option>
                  {ranks.map((rank, index) => (
                    <option key={rank.rankNumber} value={rank.name}>{rank.rankNumber} | {rank.name}</option>)
                  )}
                </select>
              </div>
              <button className="generate-button" onClick={generateRank}><FaDiceD20 /></button>
            </div>
          </div>
        </article>


        <article className='attribute-container section-container'>
          <div className="app-subtitle">
            <span className="">Attributes</span>
            <div className="separator"></div>
            <span>Points Left: {pointsLeft}</span>
          </div>
          <div className="section-content">
            <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Melee" value={Melee} onChange={(value) => setStats((prev) => ({ ...prev, Melee: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Melee')} />
            <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Agility" value={Agility} onChange={(value) => setStats((prev) => ({ ...prev, Agility: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Agility')} />
            <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Resilience" value={Resilience} onChange={(value) => setStats((prev) => ({ ...prev, Resilience: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Resilience')} />
            <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Vigilance" value={Vigilance} onChange={(value) => setStats((prev) => ({ ...prev, Vigilance: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Vigilance')} />
            <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Ego" value={Ego} onChange={(value) => setStats((prev) => ({ ...prev, Ego: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Ego')} />
            <Attribute rank={rank} pointsLeft={pointsLeft} attributename="Logic" value={Logic} onChange={(value) => setStats((prev) => ({ ...prev, Logic: value }))} isHighest={highestAttributes.some((attr) => attr.name === 'Logic')} />
          </div>
        </article>

      </section>

      <button className="generate-banner-button" onClick={handleGenerate}><FaDiceD20 /></button>

    </>
  )
}

export default App
