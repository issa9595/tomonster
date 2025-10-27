'use client'

import { useEffect, useRef } from 'react'
import { MonsterTraits } from '@/types/monster'

type MonsterState = 'happy' | 'sad' | 'hungry' | 'sleepy' | 'angry'
type MonsterAction = 'feed' | 'comfort' | 'cuddle' | 'wake'

interface AnimatedMonsterProps {
  state: MonsterState
  traits: MonsterTraits
  level: number
  activeAnimation: MonsterAction | null
}

export function AnimatedMonster ({
  state,
  traits,
  level,
  activeAnimation
}: AnimatedMonsterProps): React.ReactNode {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const animationStartRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return

    const ctx = canvas.getContext('2d')
    if (ctx === null) return

    canvas.width = 160
    canvas.height = 160

    let animationId: number

    const animate = (): void => {
      frameRef.current += 1

      // Réinitialiser le compteur d'animation si une nouvelle animation commence
      if (activeAnimation !== null) {
        animationStartRef.current = frameRef.current
      }

      drawAnimatedMonster(ctx, state, frameRef.current, traits, level, activeAnimation, animationStartRef.current)
      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId !== undefined) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [state, traits, level, activeAnimation])

  return (
    <canvas
      ref={canvasRef}
      className='pixel-art w-full h-full mx-auto'
      style={{ imageRendering: 'pixelated' }}
    />
  )
}

function drawAnimatedMonster (
  ctx: CanvasRenderingContext2D,
  state: MonsterState,
  frame: number,
  traits: MonsterTraits,
  level: number,
  activeAnimation: MonsterAction | null,
  animationStart: number
): void {
  const pixelSize = 6
  const baseBounce = Math.sin(frame * 0.05) * 3

  ctx.clearRect(0, 0, 160, 160)

  // Calculer les effets d'animation spécifiques
  const animationFrame = frame - animationStart
  let extraBounce = 0
  let colorModifier = 0
  let scaleModifier = 1
  let rotationModifier = 0

  if (activeAnimation !== null) {
    switch (activeAnimation) {
      case 'feed':
        extraBounce = Math.sin(animationFrame * 0.3) * 8
        colorModifier = 15
        scaleModifier = 1 + Math.sin(animationFrame * 0.2) * 0.1
        break
      case 'comfort':
        extraBounce = Math.sin(animationFrame * 0.15) * 4
        colorModifier = 10
        scaleModifier = 1 + Math.sin(animationFrame * 0.1) * 0.05
        break
      case 'cuddle':
        extraBounce = Math.sin(animationFrame * 0.25) * 6
        colorModifier = 20
        scaleModifier = 1 + Math.sin(animationFrame * 0.15) * 0.08
        rotationModifier = Math.sin(animationFrame * 0.1) * 0.1
        break
      case 'wake':
        extraBounce = Math.sin(animationFrame * 0.4) * 10
        colorModifier = 25
        scaleModifier = 1 + Math.sin(animationFrame * 0.3) * 0.12
        break
    }
  }

  // Appliquer les transformations
  ctx.save()
  ctx.translate(80, 80)
  ctx.scale(scaleModifier, scaleModifier)
  ctx.rotate(rotationModifier)
  ctx.translate(-80, -80)

  const bodyY = 55 + baseBounce + extraBounce

  // Ajuster les couleurs selon l'animation
  let bodyColor = traits.bodyColor
  let accentColor = traits.accentColor

  if (state === 'sad') {
    bodyColor = adjustColorBrightness(traits.bodyColor, -20)
    accentColor = adjustColorBrightness(traits.accentColor, -20)
  }
  if (state === 'hungry') {
    bodyColor = adjustColorBrightness(traits.bodyColor, 10)
    accentColor = adjustColorBrightness(traits.accentColor, 10)
  }
  if (state === 'sleepy') {
    bodyColor = adjustColorBrightness(traits.bodyColor, -10)
    accentColor = adjustColorBrightness(traits.accentColor, -10)
  }
  if (state === 'angry') {
    bodyColor = adjustColorBrightness(traits.bodyColor, 15)
    accentColor = adjustColorBrightness(traits.accentColor, 15)
  }

  // Appliquer les modifications de couleur pour les animations
  if (activeAnimation !== null) {
    bodyColor = adjustColorBrightness(bodyColor, colorModifier)
    accentColor = adjustColorBrightness(accentColor, colorModifier)
  }

  // Dessiner le monstre avec les animations
  drawBody(ctx, traits.bodyStyle, bodyColor, accentColor, bodyY, pixelSize)
  drawEyes(ctx, traits.eyeStyle, traits.eyeColor, state, bodyY, pixelSize, frame, activeAnimation, animationFrame)
  drawMouth(ctx, state, traits.eyeColor, traits.cheekColor, bodyY, pixelSize, frame, activeAnimation, animationFrame)

  // Bras avec animation améliorée
  const armWave = Math.sin(frame * 0.1) * 5
  let extraArmWave = 0
  if (activeAnimation === 'cuddle') {
    extraArmWave = Math.sin(animationFrame * 0.2) * 8
  }

  ctx.fillStyle = bodyColor
  ctx.fillRect(33, bodyY + 30 + armWave + extraArmWave, pixelSize, pixelSize * 3)
  ctx.fillRect(27, bodyY + 33 + armWave + extraArmWave, pixelSize, pixelSize * 2)

  ctx.fillRect(123, bodyY + 30 - armWave - extraArmWave, pixelSize, pixelSize * 3)
  ctx.fillRect(129, bodyY + 33 - armWave - extraArmWave, pixelSize, pixelSize * 2)

  ctx.fillRect(57, bodyY + 54, pixelSize * 3, pixelSize * 2)
  ctx.fillRect(105, bodyY + 54, pixelSize * 3, pixelSize * 2)

  drawAntenna(ctx, traits.antennaStyle, traits.antennaColor, traits.bobbleColor, bodyY, pixelSize, frame, activeAnimation, animationFrame)
  drawAccessory(ctx, traits.accessory, traits.accentColor, bodyY, pixelSize, frame, activeAnimation, animationFrame)
  drawStateEffects(ctx, state, bodyY, pixelSize, frame, activeAnimation, animationFrame)

  ctx.restore()
}

function drawBody (
  ctx: CanvasRenderingContext2D,
  style: string,
  bodyColor: string,
  accentColor: string,
  bodyY: number,
  pixelSize: number
): void {
  ctx.fillStyle = accentColor

  switch (style) {
    case 'round':
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 11; x++) {
          if (
            (y === 0 && x >= 3 && x <= 7) ||
            (y === 1 && x >= 2 && x <= 8) ||
            (y >= 2 && y <= 7 && x >= 1 && x <= 9) ||
            (y === 8 && x >= 2 && x <= 8)
          ) {
            ctx.fillRect(45 + x * pixelSize, bodyY + y * pixelSize, pixelSize, pixelSize)
          }
        }
      }
      ctx.fillStyle = bodyColor
      for (let y = 1; y < 8; y++) {
        for (let x = 2; x < 9; x++) {
          if (y >= 2 && y <= 6) {
            ctx.fillRect(45 + x * pixelSize, bodyY + y * pixelSize, pixelSize, pixelSize)
          } else if (y === 1 && x >= 3 && x <= 7) {
            ctx.fillRect(45 + x * pixelSize, bodyY + y * pixelSize, pixelSize, pixelSize)
          } else if (y === 7 && x >= 3 && x <= 7) {
            ctx.fillRect(45 + x * pixelSize, bodyY + y * pixelSize, pixelSize, pixelSize)
          }
        }
      }
      break

    case 'square':
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 11; x++) {
          if (x >= 1 && x <= 9) {
            ctx.fillRect(45 + x * pixelSize, bodyY + y * pixelSize, pixelSize, pixelSize)
          }
        }
      }
      ctx.fillStyle = bodyColor
      for (let y = 1; y < 8; y++) {
        for (let x = 2; x < 9; x++) {
          ctx.fillRect(45 + x * pixelSize, bodyY + y * pixelSize, pixelSize, pixelSize)
        }
      }
      break

    case 'tall':
      for (let y = 0; y < 11; y++) {
        for (let x = 0; x < 9; x++) {
          if (
            (y === 0 && x >= 2 && x <= 6) ||
            (y === 1 && x >= 1 && x <= 7) ||
            (y >= 2 && y <= 9 && x >= 1 && x <= 7) ||
            (y === 10 && x >= 2 && x <= 6)
          ) {
            ctx.fillRect(51 + x * pixelSize, bodyY - 12 + y * pixelSize, pixelSize, pixelSize)
          }
        }
      }
      ctx.fillStyle = bodyColor
      for (let y = 1; y < 10; y++) {
        for (let x = 2; x < 7; x++) {
          if (y >= 2 && y <= 8) {
            ctx.fillRect(51 + x * pixelSize, bodyY - 12 + y * pixelSize, pixelSize, pixelSize)
          } else if (y === 1 && x >= 3 && x <= 5) {
            ctx.fillRect(51 + x * pixelSize, bodyY - 12 + y * pixelSize, pixelSize, pixelSize)
          } else if (y === 9 && x >= 3 && x <= 5) {
            ctx.fillRect(51 + x * pixelSize, bodyY - 12 + y * pixelSize, pixelSize, pixelSize)
          }
        }
      }
      break

    case 'wide':
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 13; x++) {
          if (
            (y === 0 && x >= 3 && x <= 9) ||
            (y === 1 && x >= 2 && x <= 10) ||
            (y >= 2 && y <= 5 && x >= 1 && x <= 11) ||
            (y === 6 && x >= 2 && x <= 10)
          ) {
            ctx.fillRect(39 + x * pixelSize, bodyY + 6 + y * pixelSize, pixelSize, pixelSize)
          }
        }
      }
      ctx.fillStyle = bodyColor
      for (let y = 1; y < 6; y++) {
        for (let x = 2; x < 11; x++) {
          if (y >= 2 && y <= 4) {
            ctx.fillRect(39 + x * pixelSize, bodyY + 6 + y * pixelSize, pixelSize, pixelSize)
          } else if (y === 1 && x >= 3 && x <= 9) {
            ctx.fillRect(39 + x * pixelSize, bodyY + 6 + y * pixelSize, pixelSize, pixelSize)
          } else if (y === 5 && x >= 3 && x <= 9) {
            ctx.fillRect(39 + x * pixelSize, bodyY + 6 + y * pixelSize, pixelSize, pixelSize)
          }
        }
      }
      break
  }
}

function drawEyes (
  ctx: CanvasRenderingContext2D,
  style: string,
  eyeColor: string,
  state: MonsterState,
  bodyY: number,
  pixelSize: number,
  frame: number,
  activeAnimation: MonsterAction | null,
  animationFrame: number
): void {
  ctx.fillStyle = eyeColor

  if (state === 'sleepy' && activeAnimation !== 'wake') {
    ctx.fillRect(63, bodyY + 24, pixelSize * 2, pixelSize)
    ctx.fillRect(93, bodyY + 24, pixelSize * 2, pixelSize)
    return
  }

  const eyeBlink = Math.floor(frame / 80) % 12 === 0

  if (eyeBlink && activeAnimation !== 'wake') {
    ctx.fillRect(63, bodyY + 24, pixelSize * 2, pixelSize)
    ctx.fillRect(93, bodyY + 24, pixelSize * 2, pixelSize)
    return
  }

  // Animation spéciale pour le réveil
  if (activeAnimation === 'wake') {
    const eyeOpenness = Math.min(1, animationFrame / 30)
    const eyeHeight = Math.floor(pixelSize * 2 * eyeOpenness)
    ctx.fillRect(63, bodyY + 24 - (pixelSize * 2 - eyeHeight), pixelSize * 2, eyeHeight)
    ctx.fillRect(93, bodyY + 24 - (pixelSize * 2 - eyeHeight), pixelSize * 2, eyeHeight)

    if (eyeOpenness > 0.5) {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(66, bodyY + 21, pixelSize, pixelSize)
      ctx.fillRect(96, bodyY + 21, pixelSize, pixelSize)
    }
    return
  }

  switch (style) {
    case 'big':
      ctx.fillRect(63, bodyY + 21, pixelSize * 2, pixelSize * 2)
      ctx.fillRect(93, bodyY + 21, pixelSize * 2, pixelSize * 2)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(66, bodyY + 21, pixelSize, pixelSize)
      ctx.fillRect(96, bodyY + 21, pixelSize, pixelSize)
      ctx.fillRect(69, bodyY + 24, pixelSize / 2, pixelSize / 2)
      ctx.fillRect(99, bodyY + 24, pixelSize / 2, pixelSize / 2)
      break

    case 'small':
      ctx.fillRect(66, bodyY + 24, pixelSize, pixelSize)
      ctx.fillRect(96, bodyY + 24, pixelSize, pixelSize)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(66, bodyY + 24, pixelSize / 2, pixelSize / 2)
      ctx.fillRect(96, bodyY + 24, pixelSize / 2, pixelSize / 2)
      break

    case 'star':
      ctx.fillRect(66, bodyY + 21, pixelSize, pixelSize * 2)
      ctx.fillRect(63, bodyY + 24, pixelSize * 2, pixelSize)
      ctx.fillRect(96, bodyY + 21, pixelSize, pixelSize * 2)
      ctx.fillRect(93, bodyY + 24, pixelSize * 2, pixelSize)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(66, bodyY + 24, pixelSize / 2, pixelSize / 2)
      ctx.fillRect(96, bodyY + 24, pixelSize / 2, pixelSize / 2)
      break

    case 'sleepy':
      ctx.fillRect(63, bodyY + 24, pixelSize * 2, pixelSize)
      ctx.fillRect(93, bodyY + 24, pixelSize * 2, pixelSize)
      ctx.fillRect(63, bodyY + 21, pixelSize * 2, pixelSize / 2)
      ctx.fillRect(93, bodyY + 21, pixelSize * 2, pixelSize / 2)
      break
  }
}

function drawMouth (
  ctx: CanvasRenderingContext2D,
  state: MonsterState,
  eyeColor: string,
  cheekColor: string,
  bodyY: number,
  pixelSize: number,
  frame: number,
  activeAnimation: MonsterAction | null,
  animationFrame: number
): void {
  ctx.fillStyle = eyeColor

  // Animation spéciale pour la nourriture
  if (activeAnimation === 'feed') {
    const mouthOpenness = Math.sin(animationFrame * 0.3) * 0.5 + 0.5
    const mouthHeight = Math.floor(pixelSize * mouthOpenness)
    ctx.fillRect(75, bodyY + 42, pixelSize * 3, mouthHeight)

    // Ajouter des dents
    if (mouthOpenness > 0.7) {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(78, bodyY + 42, pixelSize, pixelSize / 2)
      ctx.fillRect(84, bodyY + 42, pixelSize, pixelSize / 2)
    }
    return
  }

  if (state === 'happy' || activeAnimation !== null) {
    ctx.fillRect(75, bodyY + 42, pixelSize * 3, pixelSize)
    ctx.fillRect(69, bodyY + 39, pixelSize, pixelSize)
    ctx.fillRect(105, bodyY + 39, pixelSize, pixelSize)

    ctx.fillStyle = cheekColor
    ctx.fillRect(57, bodyY + 36, pixelSize * 2, pixelSize)
    ctx.fillRect(111, bodyY + 36, pixelSize * 2, pixelSize)
  } else if (state === 'sad') {
    ctx.fillRect(75, bodyY + 39, pixelSize * 3, pixelSize)
    ctx.fillRect(69, bodyY + 42, pixelSize, pixelSize)
    ctx.fillRect(105, bodyY + 42, pixelSize, pixelSize)
  } else if (state === 'hungry') {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 4; x++) {
        if ((y === 0 && x >= 1 && x <= 2) || y === 1 || (y === 2 && x >= 1 && x <= 2)) {
          ctx.fillRect(75 + x * pixelSize, bodyY + 36 + y * pixelSize, pixelSize, pixelSize)
        }
      }
    }
  } else if (state === 'sleepy') {
    ctx.fillRect(78, bodyY + 42, pixelSize * 2, pixelSize)
  } else if (state === 'angry') {
    ctx.fillRect(72, bodyY + 42, pixelSize * 4, pixelSize)
  }
}

function drawAntenna (
  ctx: CanvasRenderingContext2D,
  style: string,
  antennaColor: string,
  bobbleColor: string,
  bodyY: number,
  pixelSize: number,
  frame: number,
  activeAnimation: MonsterAction | null,
  animationFrame: number
): void {
  let bobbleY = bodyY - 18 + Math.sin(frame * 0.08) * 3

  // Animation spéciale pour les antennes
  if (activeAnimation === 'cuddle') {
    bobbleY += Math.sin(animationFrame * 0.4) * 5
  }

  switch (style) {
    case 'single':
      ctx.fillStyle = antennaColor
      ctx.fillRect(75, bodyY - 6, pixelSize, pixelSize * 3)
      ctx.fillStyle = bobbleColor
      ctx.fillRect(72, bobbleY, pixelSize * 3, pixelSize * 3)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(75, bobbleY + 3, pixelSize, pixelSize)
      break

    case 'double':
      ctx.fillStyle = antennaColor
      ctx.fillRect(63, bodyY - 6, pixelSize, pixelSize * 3)
      ctx.fillRect(87, bodyY - 12, pixelSize, pixelSize * 3)
      ctx.fillStyle = bobbleColor
      ctx.fillRect(63, bobbleY, pixelSize * 3, pixelSize * 3)
      ctx.fillRect(81, bobbleY, pixelSize * 3, pixelSize * 3)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(66, bobbleY + 3, pixelSize, pixelSize)
      ctx.fillRect(84, bobbleY + 3, pixelSize, pixelSize)
      break

    case 'curly': {
      ctx.fillStyle = antennaColor
      const curvePoints = [
        { x: 78, y: bodyY - 12 },
        { x: 84, y: bodyY - 15 },
        { x: 84, y: bodyY - 21 },
        { x: 78, y: bodyY - 24 }
      ]
      curvePoints.forEach((point) => {
        ctx.fillRect(point.x, point.y, pixelSize, pixelSize)
      })
      ctx.fillStyle = bobbleColor
      ctx.fillRect(72, bobbleY, pixelSize * 3, pixelSize * 3)
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(75, bobbleY + 3, pixelSize, pixelSize)
      break
    }

    case 'none':
      break
  }
}

function drawAccessory (
  ctx: CanvasRenderingContext2D,
  accessory: string,
  accentColor: string,
  bodyY: number,
  pixelSize: number,
  frame: number,
  activeAnimation: MonsterAction | null,
  animationFrame: number
): void {
  ctx.fillStyle = accentColor

  switch (accessory) {
    case 'horns':
      ctx.fillRect(51, bodyY - 6, pixelSize, pixelSize * 2)
      ctx.fillRect(45, bodyY - 12, pixelSize, pixelSize * 2)
      ctx.fillRect(105, bodyY - 6, pixelSize, pixelSize * 2)
      ctx.fillRect(111, bodyY - 12, pixelSize, pixelSize * 2)
      break

    case 'ears':
      ctx.fillRect(51, bodyY, pixelSize * 2, pixelSize)
      ctx.fillRect(51, bodyY - 6, pixelSize, pixelSize * 2)
      ctx.fillRect(105, bodyY, pixelSize * 2, pixelSize)
      ctx.fillRect(111, bodyY - 6, pixelSize, pixelSize * 2)
      break

    case 'tail': {
      let tailWag = Math.sin(frame * 0.12) * 4
      if (activeAnimation === 'cuddle') {
        tailWag += Math.sin(animationFrame * 0.3) * 6
      }
      ctx.fillRect(126, bodyY + 42 + tailWag, pixelSize, pixelSize * 3)
      ctx.fillRect(132, bodyY + 48 + tailWag, pixelSize, pixelSize * 2)
      break
    }

    case 'none':
      break
  }
}

function drawStateEffects (
  ctx: CanvasRenderingContext2D,
  state: MonsterState,
  bodyY: number,
  pixelSize: number,
  frame: number,
  activeAnimation: MonsterAction | null,
  animationFrame: number
): void {
  if (state === 'hungry' && activeAnimation !== 'feed') {
    ctx.strokeStyle = '#2C2C2C'
    ctx.lineWidth = 2
    const rumble = Math.sin(frame * 0.2) * 2
    ctx.beginPath()
    ctx.moveTo(51 + rumble, bodyY + 45)
    ctx.lineTo(39 + rumble, bodyY + 45)
    ctx.stroke()
  }

  if (state === 'sleepy' && activeAnimation !== 'wake') {
    ctx.fillStyle = '#9B8FD4'
    const zOffset = (frame * 2) % 50
    ctx.font = 'bold 20px monospace'
    ctx.fillText('z', 130, bodyY - zOffset)
    ctx.font = 'bold 24px monospace'
    ctx.fillText('Z', 138, bodyY - zOffset - 15)
  }

  if (state === 'sad' && activeAnimation !== 'comfort') {
    if (Math.floor(frame / 30) % 4 === 0) {
      ctx.fillStyle = '#7DD3FC'
      const tearY = bodyY + 30 + (frame % 30) * 2
      ctx.fillRect(66, tearY, pixelSize, pixelSize * 2)
    }
  }

  if (state === 'angry') {
    ctx.fillStyle = '#FF6B6B'
    ctx.fillRect(45, bodyY + 12, pixelSize, pixelSize)
    ctx.fillRect(111, bodyY + 15, pixelSize, pixelSize)
  }

  // Effets spéciaux pour les animations
  if (activeAnimation === 'feed') {
    // Particules de nourriture
    for (let i = 0; i < 3; i++) {
      const particleX = 60 + i * 20 + Math.sin(animationFrame * 0.1 + i) * 10
      const particleY = bodyY - 20 - (animationFrame * 0.5) % 30
      ctx.fillStyle = ['#FF6B6B', '#4ECDC4', '#45B7D1'][i]
      ctx.fillRect(particleX, particleY, pixelSize / 2, pixelSize / 2)
    }
  }

  if (activeAnimation === 'comfort') {
    // Cœurs flottants
    ctx.fillStyle = '#FF69B4'
    const heartY = bodyY - 15 - (animationFrame * 0.3) % 20
    ctx.font = 'bold 16px monospace'
    ctx.fillText('♥', 70, heartY)
    ctx.fillText('♥', 90, heartY + 5)
  }

  if (activeAnimation === 'cuddle') {
    // Étoiles scintillantes
    ctx.fillStyle = '#FFD700'
    for (let i = 0; i < 5; i++) {
      const starX = 50 + i * 15 + Math.sin(animationFrame * 0.2 + i) * 5
      const starY = bodyY - 10 - (animationFrame * 0.4) % 25
      ctx.font = 'bold 12px monospace'
      ctx.fillText('*', starX, starY)
    }
  }

  if (activeAnimation === 'wake') {
    // Rayons de soleil
    ctx.strokeStyle = '#FFD700'
    ctx.lineWidth = 2
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI * 2) / 8 + animationFrame * 0.1
      const startX = 80 + Math.cos(angle) * 30
      const startY = bodyY - 30 + Math.sin(angle) * 30
      const endX = 80 + Math.cos(angle) * 40
      const endY = bodyY - 30 + Math.sin(angle) * 40

      ctx.beginPath()
      ctx.moveTo(startX, startY)
      ctx.lineTo(endX, endY)
      ctx.stroke()
    }
  }
}

function adjustColorBrightness (hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}
