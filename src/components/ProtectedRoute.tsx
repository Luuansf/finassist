type Props = {
  user: any
  children: React.ReactNode
}

export default function ProtectedRoute({
  user,
  children,
}: Props) {
  if (!user) {
    return null
  }

  return <>{children}</>
}