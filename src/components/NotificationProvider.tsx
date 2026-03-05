"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import Notification from "./Notification"

interface NotificationContextType {
  showNotification: (type: "success" | "error" | "info", message: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info"
    message: string
  } | null>(null)

  const showNotification = (type: "success" | "error" | "info", message: string) => {
    setNotification({ type, message })
  }

  const closeNotification = () => {
    setNotification(null)
  }

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification type={notification.type} message={notification.message} onClose={closeNotification} />
      )}
    </NotificationContext.Provider>
  )
}
