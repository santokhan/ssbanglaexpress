'use client'

// components/FacebookMessenger.js
import React, { useEffect } from 'react';

declare global {
  interface Window {
    fbAsyncInit: () => void;
  }
  const FB: { init: (options: { xfbml: boolean; version: string }) => void };
}

const FacebookMessenger = () => {
  useEffect(() => {
    // Load Facebook SDK asynchronously
    window.fbAsyncInit = function() {
      FB.init({
        xfbml: true,
        version: 'v10.0'
      });
    };

    (function(d, s, id) {
      const fjs = d.getElementsByTagName(s)[0] as HTMLScriptElement | undefined;
      if (d.getElementById(id)) return;
      const js = d.createElement(s) as HTMLScriptElement; js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div id="fb-root">
      <div className="fb-customerchat" {...({
        attribution: "setup_tool",
        page_id: "<YOUR_PAGE_ID>",
        theme_color: "#0084FF",
      } as Record<string, string>)}>
      </div>
    </div>
  );
};

export default FacebookMessenger;
