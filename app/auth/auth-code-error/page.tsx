
import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
import { THEME } from '@/types'

export default function AuthCodeError() {
    return (
        <div
            className="min-h-screen flex items-center justify-center p-4"
            style={{ backgroundColor: THEME.bg, color: THEME.text }}
        >
            <div className="max-w-md w-full text-center space-y-6">
                <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-red-100 text-red-600">
                        <AlertTriangle size={48} />
                    </div>
                </div>
                <h1 className="text-2xl font-bold">Authentication Error</h1>
                <p style={{ color: THEME.textLight }}>
                    There was a problem signing you in. The verification link may have expired or is invalid.
                </p>
                <div className="pt-6">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl font-bold text-white transition-opacity hover:opacity-90 inline-block"
                        style={{ backgroundColor: THEME.accent }}
                    >
                        Return to Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
