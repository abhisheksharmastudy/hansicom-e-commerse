import { useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { Mail, Lock, User, Loader2, AlertCircle, Chrome, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { useUserAuth } from "../../context/UserAuthContext"

export default function SignUp() {
  const navigate = useNavigate()
  const location = useLocation()
  const { register, googleSignIn, isLoading: authLoading } = useUserAuth()
  
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Get redirect URL from location state
  const from = (location.state as { from?: string })?.from || "/"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    const result = await register(name, email, password)
    
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error || "Registration failed")
    }
    
    setIsLoading(false)
  }

  const handleGoogleSignUp = async () => {
    // For demo purposes, simulate Google OAuth
    setError("")
    setIsLoading(true)
    
    try {
      // Simulated Google user data
      const mockGoogleUser = {
        name: "Google User",
        email: "google.user@gmail.com",
        googleId: "google_" + Date.now()
      }
      
      const result = await googleSignIn(mockGoogleUser.name, mockGoogleUser.email, mockGoogleUser.googleId)
      
      if (result.success) {
        navigate(from, { replace: true })
      } else {
        setError(result.error || "Google sign-up failed")
      }
    } catch {
      setError("Google sign-up failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="h-12 w-12 mx-auto bg-primary rounded-xl flex items-center justify-center font-bold text-white text-xl mb-4">
              F
            </div>
          </Link>
          <h1 className="text-3xl font-heading font-bold text-white">Create Account</h1>
          <p className="text-muted-foreground mt-2">Start shopping for fire safety equipment</p>
        </div>

        {/* Card */}
        <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
          {/* Google Sign Up */}
          <Button 
            variant="outline" 
            className="w-full mb-6" 
            onClick={handleGoogleSignUp}
            disabled={isLoading}
          >
            <Chrome className="mr-2 h-5 w-5" />
            Sign up with Google
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-neutral-900/50 px-3 text-muted-foreground">or register with email</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-6 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm text-red-400">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-white/10 rounded-lg focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-white/10 rounded-lg focus:border-primary outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-white/10 rounded-lg focus:border-primary outline-none transition-colors"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-300 mb-2 block">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-neutral-800/50 border border-white/10 rounded-lg focus:border-primary outline-none transition-colors"
                />
                {confirmPassword && password === confirmPassword && (
                  <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="premium"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* Benefits */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-xs text-muted-foreground mb-3">By signing up, you get:</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                Purchase fire safety equipment
              </li>
              <li className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                Track your orders
              </li>
              <li className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="h-3 w-3 text-green-500" />
                Exclusive member discounts
              </li>
            </ul>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/signin" state={{ from }} className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          <Link to="/" className="hover:text-white transition-colors">
            ← Back to Home
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
