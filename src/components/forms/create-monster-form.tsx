'use client'

import { useEffect } from 'react'
import Button from '../button'
import InputField from '../input'
import MonsterPreview from './monster-preview'
import MonsterStateSelector from './monster-state-selector'
import {
  createInitialFormState,
  validateCreateMonsterForm
} from './create-monster-form.validation'
import { generateRandomTraits } from '../../services/monsters/monster-generator'
import { DEFAULT_MONSTER_STATE } from '@/types/monster'
import type { CreateMonsterFormProps } from '@/types/forms/create-monster-form'
import { useMonsterFormState } from '@/hooks/use-monster-form-state'

/**
 * Formulaire de création d'un nouveau monstre
 *
 * Responsabilités :
 * - Permettre à l'utilisateur de nommer son monstre
 * - Générer aléatoirement les traits visuels du monstre
 * - Prévisualiser le monstre dans différents états d'humeur
 * - Valider les données avant soumission
 * - Gérer l'annulation et la réinitialisation
 *
 * @example
 * <CreateMonsterForm
 *   onSubmit={(values) => createMonster(values)}
 *   onCancel={() => closeModal()}
 * />
 */
function CreateMonsterForm ({ onSubmit, onCancel }: CreateMonsterFormProps): React.ReactNode {
  // Gestion centralisée de l'état du formulaire
  const {
    formState,
    errors,
    traits,
    previewState,
    setFormState,
    setErrors,
    setTraits,
    setPreviewState,
    resetForm
  } = useMonsterFormState(createInitialFormState())

  // Génération initiale des traits au montage du composant
  useEffect(() => {
    if (traits === null) {
      setTraits(generateRandomTraits())
    }
  }, [traits, setTraits])

  // Désactive le bouton de soumission s'il y a des erreurs ou pas de traits
  const hasActiveErrors = traits === null || Object.values(errors).some((value) => Boolean(value))

  /**
   * Génère de nouveaux traits aléatoires pour le monstre
   * Réinitialise l'état de prévisualisation et efface les erreurs liées au design
   */
  const handleGenerateMonster = (): void => {
    const nextTraits = generateRandomTraits()
    setTraits(nextTraits)
    setPreviewState(DEFAULT_MONSTER_STATE)
    setErrors((previous) => ({ ...previous, design: undefined }))
  }

  /**
   * Gère la soumission du formulaire
   * Valide les données et appelle le callback parent si valide
   *
   * @param event - Événement de soumission du formulaire
   */
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()

    const validationResult = validateCreateMonsterForm(formState, traits)

    if (Object.keys(validationResult.errors).length > 0 || validationResult.values === undefined) {
      setErrors(validationResult.errors)
      return
    }

    onSubmit(validationResult.values)
    resetForm()
  }

  /**
   * Gère l'annulation du formulaire
   * Réinitialise tous les champs et appelle le callback parent
   */
  const handleCancel = (): void => {
    resetForm()
    onCancel()
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      {/* Champ de saisie du nom */}
      <InputField
        label='Nom'
        name='name'
        value={formState.name}
        onChangeText={(value: string) => {
          setFormState((previous) => ({ ...previous, name: value }))
          if (errors.name !== undefined) {
            setErrors((previous) => ({ ...previous, name: undefined }))
          }
        }}
        error={errors.name}
      />

      {/* Section de prévisualisation et génération du monstre */}
      <section className='space-y-4 rounded-3xl border border-moccaccino-100 bg-white/60 p-4 shadow-inner'>
        <div className='flex items-center justify-between gap-3'>
          <h3 className='text-lg font-semibold text-gray-800'>Votre créature</h3>
          <Button onClick={handleGenerateMonster} type='button' variant='outline'>
            Générer mon monstre
          </Button>
        </div>

        {/* Prévisualisation du monstre */}
        {traits !== null && (
          <MonsterPreview traits={traits} state={previewState} level={1} />
        )}

        {/* Sélecteur d'humeur pour la prévisualisation */}
        <MonsterStateSelector
          selectedState={previewState}
          onStateChange={setPreviewState}
        />

        {/* Affichage des erreurs de design */}
        {errors.design !== undefined && (
          <span className='text-sm text-red-500'>
            {errors.design}
          </span>
        )}
      </section>

      {/* Boutons d'action */}
      <div className='flex justify-end gap-3'>
        <Button onClick={handleCancel} type='button' variant='ghost'>
          Annuler
        </Button>
        <Button disabled={hasActiveErrors} type='submit'>
          Créer
        </Button>
      </div>
    </form>
  )
}

export default CreateMonsterForm
