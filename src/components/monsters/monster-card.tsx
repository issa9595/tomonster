import { PixelMonster } from '@/components/monsters'
import type { DBMonster } from '@/types/monster'
import Link from 'next/link'
import { parseMonsterTraits, normalizeMonsterState, formatMonsterAdoptionDate } from '@/utils/monster-parsers'
import { MONSTER_STATE_LABELS, MONSTER_STATE_EMOJI, STATE_BADGE_CLASSES, buildFeatureSummary } from '@/utils/monster-labels'

/**
 * Props du composant MonsterCard
 */
interface MonsterCardProps {
  /** Données complètes du monstre */
  monster: DBMonster
}

/**
 * Carte d'affichage d'un monstre individuel
 *
 * Responsabilités :
 * - Afficher le rendu visuel du monstre
 * - Présenter les informations essentielles (nom, niveau, état)
 * - Fournir un lien vers la page détaillée
 * - Maintenir un design attractif avec effets hover
 *
 * @example
 * <MonsterCard monster={dbMonster} />
 */
function MonsterCard ({ monster }: MonsterCardProps): React.ReactNode {
  const traits = parseMonsterTraits(monster.traits)
  const state = normalizeMonsterState(monster.state)
  const adoptionDate = formatMonsterAdoptionDate(monster.createdAt?.toString() ?? monster.updatedAt?.toString())
  const cardKey = monster._id ?? monster.name
  const levelLabel = monster.level ?? 1

  return (
    <Link key={cardKey} href={`/creature/${cardKey}`}>
      <article
        className='group relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-white/90 via-white to-lochinvar-50/70 p-6 shadow-[0_20px_54px_rgba(15,23,42,0.14)] ring-1 ring-white/70 backdrop-blur transition-transform duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(15,23,42,0.18)]'
      >
        {/* Effets de fond décoratifs */}
        <div className='pointer-events-none absolute -right-16 top-20 h-40 w-40 rounded-full bg-fuchsia-blue-100/40 blur-3xl transition-opacity duration-500 group-hover:opacity-60' aria-hidden='true' />
        <div className='pointer-events-none absolute -left-20 -top-16 h-48 w-48 rounded-full bg-lochinvar-100/40 blur-3xl transition-opacity duration-500 group-hover:opacity-60' aria-hidden='true' />

        <div className='relative flex flex-col gap-5'>
          {/* Zone de prévisualisation du monstre */}
          <div className='relative flex items-center justify-center overflow-hidden rounded-3xl bg-slate-50/70 p-4 ring-1 ring-white/70'>
            {traits !== null && (
              <PixelMonster traits={traits} state={state} level={levelLabel} />
            )}
            {/* Badge d'état */}
            <span className={`absolute right-4 top-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${STATE_BADGE_CLASSES[state]}`}>
              <span aria-hidden='true'>{MONSTER_STATE_EMOJI[state]}</span>
              {MONSTER_STATE_LABELS[state]}
            </span>
          </div>

          {/* Informations du monstre */}
          <div className='flex flex-1 flex-col gap-4'>
            {/* En-tête : nom et niveau */}
            <div className='flex items-start justify-between gap-3'>
              <div className='space-y-1'>
                <h3 className='text-lg font-semibold text-slate-900 sm:text-xl'>{monster.name}</h3>
                {adoptionDate !== null && (
                  <p className='text-xs text-slate-500'>Arrivé le {adoptionDate}</p>
                )}
              </div>
              <span className='inline-flex items-center gap-1 rounded-full bg-moccaccino-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-moccaccino-600 shadow-inner'>
                <span aria-hidden='true'>⭐</span>
                Niveau {levelLabel}
              </span>
            </div>

            {/* Tags d'information rapide */}
            <div className='flex flex-wrap gap-2 text-xs text-slate-600'>
              <span className='inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 font-medium ring-1 ring-inset ring-slate-200'>
                <span aria-hidden='true'>🎨</span>
                Pixel art dynamique
              </span>
              <span className='inline-flex items-center gap-1 rounded-full bg-white/70 px-3 py-1 font-medium ring-1 ring-inset ring-slate-200'>
                <span aria-hidden='true'>{MONSTER_STATE_EMOJI[state]}</span>
                {MONSTER_STATE_LABELS[state]}
              </span>
            </div>

            {/* Signature / caractéristiques principales */}
            {traits !== null && (
              <div className='rounded-2xl bg-white/80 p-3 text-sm text-slate-600 shadow-inner'>
                <p className='font-medium text-slate-800'>Signature</p>
                <p className='mt-1 leading-snug'>{buildFeatureSummary(traits)}</p>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  )
}

export default MonsterCard
