'use client'

import type { DBMonster } from '@/types/monster'
import { parseMonsterTraits, normalizeMonsterState, formatMonsterDate } from '@/utils/monster-parsers'
import {
  getMonsterStateLabel,
  getMonsterStateEmoji,
  BODY_STYLE_LABELS,
  EYE_STYLE_LABELS,
  ANTENNA_STYLE_LABELS,
  ACCESSORY_LABELS
} from '@/utils/monster-labels'

/**
 * Props du composant MonsterInfo
 */
interface MonsterInfoProps {
  /** Données complètes du monstre */
  monster: DBMonster
}

/**
 * Composant d'affichage détaillé des informations d'un monstre
 *
 * Responsabilités :
 * - Afficher toutes les caractéristiques du monstre (apparence, couleurs, historique)
 * - Présenter les informations de manière organisée et visuelle
 * - Formater les dates et les labels en français
 *
 * @example
 * <MonsterInfo monster={dbMonster} />
 */
export function MonsterInfo ({ monster }: MonsterInfoProps): React.ReactNode {
  const traits = parseMonsterTraits(monster.traits)
  const state = normalizeMonsterState(monster.state)

  // Si les traits ne peuvent pas être parsés, on affiche un message d'erreur
  if (traits === null) {
    return (
      <div className='bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-moccaccino-200 shadow-2xl p-8 max-w-2xl mx-auto'>
        <p className='text-center text-moccaccino-600'>Impossible d&apos;afficher les informations de ce monstre.</p>
      </div>
    )
  }

  return (
    <div className='bg-white/95 backdrop-blur-sm rounded-3xl border-4 border-moccaccino-200 shadow-2xl p-8 max-w-2xl mx-auto'>
      {/* En-tête avec nom et niveau */}
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-moccaccino-800 mb-2'>
          {monster.name}
        </h1>
        <div className='flex items-center justify-center gap-4 mb-4'>
          <div className='bg-gradient-to-r from-moccaccino-500 to-fuchsia-blue-500 text-white px-4 py-2 rounded-full font-semibold'>
            Niveau {monster.level}
          </div>
          <div className='flex items-center gap-2 bg-lochinvar-100 px-4 py-2 rounded-full'>
            <span className='text-2xl'>{getMonsterStateEmoji(state)}</span>
            <span className='text-lochinvar-800 font-medium'>
              {getMonsterStateLabel(state)}
            </span>
          </div>
        </div>
      </div>

      {/* Informations principales */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
        {/* Caractéristiques physiques */}
        <div className='bg-gradient-to-br from-moccaccino-50 to-fuchsia-blue-50 rounded-2xl p-6'>
          <h3 className='text-xl font-bold text-moccaccino-800 mb-4 flex items-center gap-2'>
            <span className='text-2xl'>🎨</span>
            Apparence
          </h3>
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='text-moccaccino-700 font-medium'>Forme</span>
              <div className='flex items-center gap-2'>
                <span className='text-moccaccino-600'>{BODY_STYLE_LABELS[traits.bodyStyle]}</span>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-moccaccino-700 font-medium'>Yeux</span>
              <div className='flex items-center gap-2'>
                <span className='text-moccaccino-600'>{EYE_STYLE_LABELS[traits.eyeStyle]}</span>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-moccaccino-700 font-medium'>Antenne</span>
              <div className='flex items-center gap-2'>
                <span className='text-moccaccino-600'>{ANTENNA_STYLE_LABELS[traits.antennaStyle]}</span>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-moccaccino-700 font-medium'>Accessoire</span>
              <div className='flex items-center gap-2'>
                <span className='text-moccaccino-600'>{ACCESSORY_LABELS[traits.accessory]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Couleurs */}
        <div className='bg-gradient-to-br from-lochinvar-50 to-fuchsia-blue-50 rounded-2xl p-6'>
          <h3 className='text-xl font-bold text-lochinvar-800 mb-4 flex items-center gap-2'>
            <span className='text-2xl'>🌈</span>
            Couleurs
          </h3>
          <div className='space-y-3'>
            <div className='flex justify-between items-center'>
              <span className='text-lochinvar-700 font-medium'>Corps</span>
              <div className='flex items-center gap-2'>
                <div
                  className='w-6 h-6 rounded-full border-2 border-white shadow-sm'
                  style={{ backgroundColor: traits.bodyColor }}
                />
                <span className='text-lochinvar-600 text-sm font-mono'>{traits.bodyColor}</span>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-lochinvar-700 font-medium'>Accent</span>
              <div className='flex items-center gap-2'>
                <div
                  className='w-6 h-6 rounded-full border-2 border-white shadow-sm'
                  style={{ backgroundColor: traits.accentColor }}
                />
                <span className='text-lochinvar-600 text-sm font-mono'>{traits.accentColor}</span>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-lochinvar-700 font-medium'>Yeux</span>
              <div className='flex items-center gap-2'>
                <div
                  className='w-6 h-6 rounded-full border-2 border-white shadow-sm'
                  style={{ backgroundColor: traits.eyeColor }}
                />
                <span className='text-lochinvar-600 text-sm font-mono'>{traits.eyeColor}</span>
              </div>
            </div>
            <div className='flex justify-between items-center'>
              <span className='text-lochinvar-700 font-medium'>Antenne</span>
              <div className='flex items-center gap-2'>
                <div
                  className='w-6 h-6 rounded-full border-2 border-white shadow-sm'
                  style={{ backgroundColor: traits.antennaColor }}
                />
                <span className='text-lochinvar-600 text-sm font-mono'>{traits.antennaColor}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informations temporelles */}
      <div className='bg-gradient-to-r from-fuchsia-blue-50 to-moccaccino-50 rounded-2xl p-6'>
        <h3 className='text-xl font-bold text-fuchsia-blue-800 mb-4 flex items-center gap-2'>
          <span className='text-2xl'>📅</span>
          Historique
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <span className='text-fuchsia-blue-700 font-medium block mb-1'>Créé le :</span>
            <span className='text-fuchsia-blue-600'>{formatMonsterDate(monster.createdAt)}</span>
          </div>
          <div>
            <span className='text-fuchsia-blue-700 font-medium block mb-1'>Dernière mise à jour :</span>
            <span className='text-fuchsia-blue-600'>{formatMonsterDate(monster.updatedAt)}</span>
          </div>
        </div>
      </div>

      {/* Message d'encouragement */}
      <div className='mt-6 text-center'>
        <p className='text-moccaccino-600 italic'>
          🐾 Votre petit monstre vous attend ! Prenez soin de lui pour qu'il grandisse et soit heureux.
        </p>
      </div>
    </div>
  )
}
