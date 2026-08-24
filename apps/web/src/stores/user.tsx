'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import { createStore, useStore } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
  id: number
  firstName: string
  lastName: string
  email: string
  createdAt: string
}

interface UserState {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

type UserStore = ReturnType<typeof createUserStore>

const createUserStore = () => {
  return createStore<UserState>()(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
        clearUser: () => set({ user: null }),
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
      }
    )
  )
}

export const UserStoreContext = createContext<UserStore | null>(null)

export function UserStoreProvider({ children }: { children: ReactNode }) {
  const [store] = useState(() => createUserStore())

  useEffect(() => {
    store.persist.rehydrate()
  }, [store])

  return <UserStoreContext value={store}>{children}</UserStoreContext>
}

export function useUserStore<T>(selector: (state: UserState) => T): T {
  const store = useContext(UserStoreContext)
  if (!store) {
    throw new Error('useUserStore must be used within UserStoreProvider')
  }
  return useStore(store, selector)
}
