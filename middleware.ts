import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Permitir acesso à página de login e recursos estáticos
    if (
        pathname === '/login' ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/static') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next()
    }

    // Verificar se há um token de autenticação no localStorage seria ideal,
    // mas no middleware não temos acesso ao localStorage
    // Por isso, vamos confiar no contexto React para gerenciar a autenticação

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
