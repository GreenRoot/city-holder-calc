import React from 'react'
import { Coin } from '@/shared/icons/coin'
import { Population } from '@/shared/icons/population'
import { GameObject } from '@/entities/objects'
import styles from './building-card.module.scss'

interface BuildingCardProps {
  building: GameObject
  level: number
  onLevelChange: (id: string, change: number) => void
}

export const BuildingCard: React.FC<BuildingCardProps> = ({ building, level, onLevelChange }) => {
  return (
    <div className={styles.buildingCard}>
      <p className={styles.buildingLevel}>{level}</p>
      <div className={styles.buildingInfo}>
        <h3 className={styles.buildingTitle}>{building.name_ru}</h3>
        <p><Population /> {building.population.toLocaleString('ru-RU')}</p>
        <p><Coin /> {building.income_per_hour.toLocaleString('ru-RU')}</p>
        <p><Coin /> {building.cost.toLocaleString('ru-RU')}</p>
        <div className={styles.levelControls}>
          <button onClick={() => onLevelChange(building.id, -1)}>-</button>
          <button onClick={() => onLevelChange(building.id, 1)}>+</button>
        </div>
      </div>
      <div className={styles.buildingImage}>
        <img src={`https://cdn.city-holder.com/${building.object_image}`} alt={building.name_ru} />
      </div>
    </div>
  )
}