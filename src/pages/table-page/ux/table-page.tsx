import { api, GameObject } from '@/entities/objects'

const calculateIncomeDifference = (gameObject: GameObject, gameObjects: GameObject[]): number => {
  if (gameObject.level <= 1) return gameObject.income_per_hour;
  
  const previousLevelObject = gameObjects.find(obj => obj.id === gameObject.id && obj.level === gameObject.level - 1);
  return previousLevelObject ? gameObject.income_per_hour - previousLevelObject.income_per_hour : gameObject.income_per_hour;
};

export const TablePage = () => {
  const gameObjects: GameObject[] = api().flat()
  console.log(gameObjects[100])

  return (
    <table style={{ fontFamily: 'monospace, sans-serif', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ padding: '5px', border: '1px solid #ddd' }}>ID</th>
          <th style={{ padding: '5px', border: '1px solid #ddd' }}>Уровень</th>
          <th style={{ padding: '5px', border: '1px solid #ddd' }}>Название</th>
          <th style={{ padding: '5px', border: '1px solid #ddd' }}>Стоимость</th>
          <th style={{ padding: '5px', border: '1px solid #ddd' }}>Население</th>
          <th style={{ padding: '5px', border: '1px solid #ddd' }}>Доход/час</th>
          <th style={{ padding: '5px', border: '1px solid #ddd' }}>Разница дохода</th>
          <th style={{ padding: '5px', border: '1px solid #ddd' }}>Окупаемость (дни)</th>
        </tr>
      </thead>
      <tbody>
        {gameObjects
          .sort((a, b) => a.id.localeCompare(b.id) || a.cost - b.cost)
          .map((gameObject) => {
            const incomeDifference = calculateIncomeDifference(gameObject, gameObjects);
            return (
              <tr key={gameObject.id + gameObject.cost}>
                <td style={{ padding: '5px', border: '1px solid #ddd' }}>{gameObject.id}</td>
                <td style={{ padding: '5px', border: '1px solid #ddd' }}>{gameObject.level}</td>
                <td style={{ padding: '5px', border: '1px solid #ddd' }}>{gameObject.name_ru}</td>
                <td style={{ padding: '5px', border: '1px solid #ddd' }}>{gameObject.cost}</td>
                <td style={{ padding: '5px', border: '1px solid #ddd' }}>{gameObject.population}</td>
                <td style={{ padding: '5px', border: '1px solid #ddd' }}>{gameObject.income_per_hour}</td>
                <td style={{ padding: '5px', border: '1px solid #ddd' }}>{incomeDifference}</td>
                <td style={{ padding: '5px', border: '1px solid #ddd' }}>
                  {(gameObject.cost / (incomeDifference * 24)).toFixed(4).replace('.', ',')}
                </td>
              </tr>
            );
          })}
      </tbody>
    </table>
  )
}