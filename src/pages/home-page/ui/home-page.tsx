import { useState } from 'react'
import { BuildingTypeMenu } from '@/features/building-type-menu'
import { BuildingCard } from '@/features/building-card'
import { api, GameObject } from '@/entities/objects'
import { Link } from 'react-router-dom'
import style from './home-page.module.scss'

const BUILDING_TYPES = ['RESIDENT', 'COMMERCIAL', 'INDUSTRIAL', 'CITY', 'SPECIAL'] as const
type BuildingType = typeof BUILDING_TYPES[number]

export const HomePage = () => {
  const [selectedType, setSelectedType] = useState<BuildingType>('COMMERCIAL')
  const [levels, setLevels] = useState<Record<string, number>>({})
  const gameObjects: GameObject[] = api().flat()

  // Фильтрация данных по level и выбранному type
  const filteredObjects = gameObjects.filter(
    (object) =>
      object.level === (levels[object.id] || 1) &&
      object.type === selectedType
  )

  // Получение максимального уровня для каждого объекта
  const maxLevels = gameObjects.reduce<Record<string, number>>((acc, object) => {
    if (!acc[object.id] || object.level > acc[object.id]) {
      acc[object.id] = object.level
    }
    return acc
  }, {})

  // Обработка изменения уровня
  const handleLevelChange = (id: string, change: number) => {
    setLevels((prevLevels) => {
      const newLevel = (prevLevels[id] || 1) + change
      return {
        ...prevLevels,
        [id]: Math.max(1, Math.min(newLevel, maxLevels[id] || 1)), // Ограничение по диапазону
      }
    })
  }

  return (
    <div>
      <BuildingTypeMenu selectedType={selectedType} onTypeSelect={setSelectedType} />
      <div className={style.tableLink}>
        <Link to="/table">Перейти к таблице</Link>
      </div>

      {/* Отображение отфильтрованных данных */}
      <div className={style.objects}>
        {filteredObjects.map((object) => (
          <BuildingCard
            key={object.id}
            building={object}
            level={levels[object.id] || 1}
            onLevelChange={handleLevelChange}
          />
        ))}
      </div>
    </div>
  )
}
