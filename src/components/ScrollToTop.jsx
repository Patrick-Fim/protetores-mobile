import { useState, useEffect, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa6';

// Encontra o <IonContent> ativo na tela caso uma ref explícita não seja passada.
function obterIonContentAtivo(contentRef) {
  if (contentRef?.current) return contentRef.current;
  return (
    document.querySelector('ion-router-outlet > .ion-page:not(.ion-page-hidden) ion-content') ||
    document.querySelector('ion-content')
  );
}

export default function ScrollToTop({ contentRef }) {
  const [visivel, setVisivel] = useState(false);
  const ionContentRef = useRef(null);

  useEffect(() => {
    let scrollEl = null;
    let ativo = true;

    const aoRolar = () => {
      const top = scrollEl ? scrollEl.scrollTop : window.scrollY;
      setVisivel(top > 300);
    };

    const vincular = async () => {
      const ionContent = obterIonContentAtivo(contentRef);
      ionContentRef.current = ionContent;

      if (ionContent?.getScrollElement) {
        scrollEl = await ionContent.getScrollElement();
        if (!ativo) return;
        aoRolar();
        scrollEl.addEventListener('scroll', aoRolar, { passive: true });
      } else {
        aoRolar();
        window.addEventListener('scroll', aoRolar, { passive: true });
      }
    };

    vincular();

    return () => {
      ativo = false;
      if (scrollEl) {
        scrollEl.removeEventListener('scroll', aoRolar);
      } else {
        window.removeEventListener('scroll', aoRolar);
      }
    };
  }, [contentRef]);

  const subir = () => {
    const ionContent = ionContentRef.current || obterIonContentAtivo(contentRef);
    if (ionContent?.scrollToTop) {
      ionContent.scrollToTop(400);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={subir}
      title="Voltar ao topo"
      aria-label="Voltar ao topo"
      tabIndex={visivel ? 0 : -1}
      className={`fixed bottom-24 right-5 z-40 sm:right-7 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-primary-dark text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-slate-950 ${
        visivel
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <FaArrowUp aria-hidden="true" />
    </button>
  );
}