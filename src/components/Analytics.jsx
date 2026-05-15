import { useEffect } from 'react';

function injectScript(id, src, onLoad) {
  if (document.getElementById(id)) {
    onLoad?.();
    return;
  }

  const script = document.createElement('script');
  script.id = id;
  script.async = true;
  script.src = src;
  if (onLoad) {
    script.onload = onLoad;
  }
  document.head.appendChild(script);
}

export default function Analytics() {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_ID;
    const metricaId = import.meta.env.VITE_YANDEX_METRICA_ID;

    if (gaId) {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      injectScript('hackpro-ga', `https://www.googletagmanager.com/gtag/js?id=${gaId}`, () => {
        window.gtag('js', new Date());
        window.gtag('config', gaId);
      });
    }

    if (metricaId) {
      window.ym =
        window.ym ||
        function ym() {
          (window.ym.a = window.ym.a || []).push(arguments);
        };
      window.ym.l = Number(new Date());
      injectScript('hackpro-yandex-metrica', 'https://mc.yandex.ru/metrika/tag.js', () => {
        window.ym(Number(metricaId), 'init', {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
        });
      });
    }
  }, []);

  return null;
}
