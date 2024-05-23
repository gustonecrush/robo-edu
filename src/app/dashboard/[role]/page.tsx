import { usePathname } from 'next/navigation'
import React from 'react'

function Page() {
    const pathname = usePathname()
    const roleUser = pathname.includes('contributor') ? 'contributor' : 'student'
    return (
        <div>
            <p>{roleUser}</p>
        </div>
    )
}

export default Page
