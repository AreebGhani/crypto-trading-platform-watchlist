import { Html, Head, Main, NextScript } from "next/document";
import { THEME_KEY } from "@/stores/dashboard";

const defaultTheme = process.env.NEXT_PUBLIC_DEFAULT_THEME || "system";
const darkmodeInitScript = `(function () {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const setting = localStorage.getItem('${THEME_KEY}') || '${defaultTheme}'
  if (setting === 'dark' || (prefersDark && setting !== 'light')) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})()`;

export default function Document() {
  return (
    <Html className="no-js" lang="en" suppressHydrationWarning={true}>
      <Head>
        <link rel="icon" href="/assetz/img/favicon.png" type="image/png" />

        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <script
          dangerouslySetInnerHTML={{ __html: darkmodeInitScript }}
        ></script>
      </Head>
      <body className="home-01" onContextMenu={() => false}>
        <Main />
        <NextScript />
        <div id="portal-root"></div>
      </body>
    </Html>
  );
}
