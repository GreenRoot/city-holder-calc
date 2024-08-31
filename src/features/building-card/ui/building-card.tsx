import React from 'react'
import { Coin } from '../../../shared/coin'
import { Population } from '../../../shared/population'
import { GameObject } from '../types/'
import styles from './building-card.module.scss'

interface BuildingCardProps {
  building: GameObject
  level: number
  onLevelChange: (id: string, change: number) => void
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building, level, onLevelChange }) => {
  return (
    <div className={styles.buildingCard}>
      <div className={styles.buildingImage}>
        <img src={`https://cdn.city-holder.com/${building.object_image}`} alt={building.name_ru} />
      </div>
      <div className={styles.buildingInfo}>
        <h3>{building.name_ru}</h3>
        <p>Уровень: {level}</p>
        <p><Population /> {building.population.toLocaleString('ru-RU')}</p>
        <p><Coin /> {building.income_per_hour.toLocaleString('ru-RU')}</p>
        <p><Coin /> {building.cost.toLocaleString('ru-RU')}</p>
        <div className={styles.levelControls}>
          <button onClick={() => onLevelChange(building.id, -1)}>-</button>
          <button onClick={() => onLevelChange(building.id, 1)}>+</button>
        </div>
      </div>
    </div>
  )
}