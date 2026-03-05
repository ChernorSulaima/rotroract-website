"use client"

import { useEffect } from "react"
import { X, CheckCircle, AlertCircle, Info } from "lucide-react"

interface NotificationProps {
  type: "success" | "error" | "info"
  message: string
  onClose: () => void
}

const Notification = ({ type, message, onClose }: NotificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  }

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  }

  const Icon = icons[type]

  return (
    <div className={`notification ${colors[type]} animate-fade-in-up`}>
      <div className="flex items-center space-x-3">
        <Icon size={20} />
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export default Notification
