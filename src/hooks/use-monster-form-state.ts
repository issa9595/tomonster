import { useState } from 'react'
import type { MonsterTraits, MonsterState } from '@/types/monster'
import type { CreateMonsterFormDraft, CreateMonsterFormErrors } from '@/components/forms/create-monster-form.validation'
import { DEFAULT_MONSTER_STATE } from '@/types/monster'

/**
 * Interface de retour du hook useMonsterFormState
 */
export interface MonsterFormState {
  /** État du formulaire (draft) */
  formState: CreateMonsterFormDraft
  /** Erreurs de validation */
  errors: CreateMonsterFormErrors
  /** Traits visuels du monstre ou null si non générés */
  traits: MonsterTraits | null
  /** État d'humeur actuel pour la prévisualisation */
  previewState: MonsterState
  /** Met à jour l'état du formulaire */
  setFormState: React.Dispatch<React.SetStateAction<CreateMonsterFormDraft>>
  /** Met à jour les erreurs de validation */
  setErrors: React.Dispatch<React.SetStateAction<CreateMonsterFormErrors>>
  /** Met à jour les traits du monstre */
  setTraits: React.Dispatch<React.SetStateAction<MonsterTraits | null>>
  /** Met à jour l'état de prévisualisation */
  setPreviewState: React.Dispatch<React.SetStateAction<MonsterState>>
  /** Réinitialise tout l'état du formulaire */
  resetForm: () => void
}

/**
 * Hook personnalisé pour gérer l'état complet du formulaire de création de monstre
 *
 * Centralise la gestion de :
 * - L'état du formulaire (nom, etc.)
 * - Les erreurs de validation
 * - Les traits visuels générés
 * - L'état de prévisualisation
 *
 * @param initialFormState - État initial du formulaire
 * @returns Objet contenant l'état et les setters
 *
 * @example
 * const formStateManager = useMonsterFormState(createInitialFormState())
 * formStateManager.setFormState(prev => ({ ...prev, name: 'Pikachu' }))
 */
export function useMonsterFormState (initialFormState: CreateMonsterFormDraft): MonsterFormState {
  const [formState, setFormState] = useState<CreateMonsterFormDraft>(initialFormState)
  const [errors, setErrors] = useState<CreateMonsterFormErrors>({})
  const [traits, setTraits] = useState<MonsterTraits | null>(null)
  const [previewState, setPreviewState] = useState<MonsterState>(DEFAULT_MONSTER_STATE)

  /**
   * Réinitialise complètement l'état du formulaire
   */
  const resetForm = (): void => {
    setFormState(initialFormState)
    setTraits(null)
    setPreviewState(DEFAULT_MONSTER_STATE)
    setErrors({})
  }

  return {
    formState,
    errors,
    traits,
    previewState,
    setFormState,
    setErrors,
    setTraits,
    setPreviewState,
    resetForm
  }
}
