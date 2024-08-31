import { useState } from 'react'
import { BuildingCard, GameObject } from '@/features/building-card'
import { api } from '@/entities/objects'
import style from './app.module.scss'

export const App = () => {
  const [selectedType, setSelectedType] = useState<string>('')
  const [levels, setLevels] = useState<Record<string, number>>({})
  const gameObjects: GameObject[] = api().flat()

  // Получение уникальных типов (категорий) для отображения табов
  const types = Array.from(new Set(gameObjects.map((item) => item.type)))

  // Фильтрация данных по level и выбранному type
  const filteredObjects = gameObjects.filter(
    (object) =>
      object.level === (levels[object.id] || 1) &&
      (selectedType === '' || object.type === selectedType),
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
      {/* Табы для фильтрации по типу */}
      <div className={style.tabs}>
        <button
          className={selectedType === '' ? style.activeTab : ''}
          onClick={() => setSelectedType('')}
        >
          Все
        </button>
        {types.map((type) => (
          <button
            key={type}
            className={selectedType === type ? style.activeTab : ''}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </button>
        ))}
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
