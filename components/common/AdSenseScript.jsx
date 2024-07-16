import Script from 'next/script';

const AdSenseScript = () => (
  <Script
    strategy="beforeInteractive"
    async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2093401447368343"
    crossorigin="anonymous"
  />
)

export default AdSenseScript