import { connectMongooseToDatabase } from '@/db'
import Monster from '@/db/models/monster.model'
import GalleryCard from '@/components/gallery/gallery-card'
import GalleryFilters from '@/components/gallery/gallery-filters'
import type { DBMonster } from '@/types/monster'
import { Suspense } from 'react'

export const revalidate = 30

interface GalleryPageProps {
  searchParams: Promise<{ state?: string; level?: string; page?: string }>
}

export default async function GalleryPage ({ searchParams }: GalleryPageProps): Promise<React.ReactNode> {
  const params = await searchParams
  await connectMongooseToDatabase()

  const query: Record<string, unknown> = { isPublic: true }
  if (params.state) query.state = params.state
  if (params.level) query.level = parseInt(params.level)

  const page = parseInt(params.page ?? '1')
  const limit = 12
  const skip = (page - 1) * limit

  const monsters = await Monster.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .exec()

  const total = await Monster.countDocuments(query)
  const totalPages = Math.ceil(total / limit)

  const serialized = JSON.parse(JSON.stringify(monsters)) as DBMonster[]

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'>
      <div className='max-w-6xl mx-auto px-4 py-8'>
        <div className='mb-8'>
          <h1 className='text-4xl font-black text-gray-800 mb-2'>🖼️ Galerie Communautaire</h1>
          <p className='text-gray-600'>Découvrez les monstres partagés par la communauté</p>
        </div>

        <Suspense fallback={null}>
          <GalleryFilters />
        </Suspense>

        {serialized.length === 0 ? (
          <div className='text-center py-20'>
            <div className='text-8xl mb-4'>👾</div>
            <h2 className='text-2xl font-black text-gray-600 mb-2'>Aucun monstre public</h2>
            <p className='text-gray-400'>Sois le premier à partager ton monstre !</p>
          </div>
        ) : (
          <>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
              {serialized.map(monster => (
                <GalleryCard key={monster._id} monster={monster} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className='flex justify-center gap-2 mt-8'>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <a
                    key={p}
                    href={`/app/gallery?page=${p}${params.state ? `&state=${params.state}` : ''}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-all ${
                      p === page ? 'bg-purple-500 text-white' : 'bg-white border border-purple-200 hover:border-purple-400'
                    }`}
                  >
                    {p}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
