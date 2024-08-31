import React from 'react'
import style from './building-type-menu.module.scss'
import { CityIcon, CommercialIcon, IndustrialIcon, ResidentIcon, SpecialIcon } from '@/shared/icons'

const BUILDING_TYPES = ['CITY', 'COMMERCIAL', 'INDUSTRIAL', 'RESIDENT', 'SPECIAL'] as const

type BuildingType = typeof BUILDING_TYPES[number]

const icons: Record<BuildingType, React.ReactNode> = {
  CITY: <CityIcon />,
  COMMERCIAL: <CommercialIcon />,
  INDUSTRIAL: <IndustrialIcon />,
  RESIDENT: <ResidentIcon />,
  SPECIAL: <SpecialIcon />,
}

interface BuildingTypeMenuProps {
  selectedType: BuildingType
  onTypeSelect: (type: BuildingType) => void
}

export const BuildingTypeMenu: React.FC<BuildingTypeMenuProps> = ({ selectedType, onTypeSelect }) => {
  return (
    <div className={style.menu}>
      {BUILDING_TYPES.map((type) => (
        <div
          key={type}
          className={`${style.menuItem} ${style[type.toLowerCase()]} ${selectedType === type ? style.active : ''}`}
          onClick={() => onTypeSelect(type)}
        >
          {icons[type]}
        </div>
      ))}
    </div>
  )
}