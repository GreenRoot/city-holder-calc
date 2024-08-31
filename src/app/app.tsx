import { useState } from 'react'
import { api } from '../entities/objects'
import style from './app.module.scss'

export const App = () => {
  const [selectedType, setSelectedType] = useState('') // Выбранный тип
  const [levels, setLevels] = useState({}) // Хранение уровня для каждой карточки
  const gameObjects = api().flat() // Объединяем все группы в один массив

  // Получение уникальных типов (категорий) для отображения табов
  const types = Array.from(new Set(gameObjects.map((item) => item.type)))

  // Фильтрация данных по level и выбранному type
  const filteredObjects = gameObjects.filter(
    (object) =>
      object.level === (levels[object.id] || 1) &&
      (selectedType === '' || object.type === selectedType),
  )

  // Получение максимального уровня для каждого объекта
  const maxLevels = gameObjects.reduce((acc, object) => {
    if (!acc[object.id] || object.level > acc[object.id]) {
      acc[object.id] = object.level
    }
    return acc
  }, {})

  // Обработка изменения уровня
  const handleLevelChange = (id, change) => {
    setLevels((prevLevels) => {
      const newLevel = (prevLevels[id] || 1) + change
      return {
        ...prevLevels,
        [id]: Math.max(1, Math.min(newLevel, maxLevels[id])), // Ограничение по диапазону
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
          <div key={object.id} className={style.object}>
            <h3>{object.name_ru}</h3>
            <img
              src={`https://cdn.city-holder.com/${object.object_image}`}
              alt={object.name_en}
              width={300}
            />
            <p>{object.description_ru}</p>
            <p>Уровень: {levels[object.id] || 1}</p>
            <div className={style.controls}>
              <button onClick={() => handleLevelChange(object.id, -1)}>
                -
              </button>
              <button onClick={() => handleLevelChange(object.id, 1)}>+</button>
            </div>
            <p>Цена: {object.cost}</p>
            <p>Популяция: {object.population}</p>
            <p>Доход: {object.income_per_hour}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
// <img src="https://cdn.city-holder.com/objects/obj_cit_002_02_Q3QHWxO.webp" />
