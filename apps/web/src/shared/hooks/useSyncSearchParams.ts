'use client'
import { useEffect, useEffectEvent, useRef, type DependencyList } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'

export const useSyncSearchParams = (
  updater: (params: URLSearchParams) => void,
  deps: DependencyList
) => {
  const isMounted = useRef(false)
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleUpdate = useEffectEvent(() => {
    const params = new URLSearchParams(searchParams.toString())

    updater(params)

    router.replace(`${pathname}?${params.toString()}`)
  })

  useEffect(() => {
    if (isMounted.current) {
      handleUpdate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    isMounted.current = true
  }, [])
}
