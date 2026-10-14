import {
  createRootRoute,
  Outlet,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { ConvexClientProvider } from '../convex'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'My Love 💕',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Poppins:wght@400;500&display=swap',
      },
    ],
  }),

  component: () => (
    <RootDocument>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </RootDocument>
  ),
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
        <Scripts />
      </body>
    </html>
  )
}
