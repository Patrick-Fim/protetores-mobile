import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';

export default function Modal({ isOpen, onClose, title, children }) {
  const botaoFecharRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      botaoFecharRef.current?.focus();
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Portal para document.body evita que o contain: layout do IonPage prenda o modal ou deixe a TabBar por cima.
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Clique na camada externa fecha o modal. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-fadeIn"
      />

      <div className="relative max-h-[90vh] w-full overflow-y-auto rounded-t-3xl border border-border bg-card pb-[env(safe-area-inset-bottom)] shadow-2xl animate-scaleUp sm:max-w-lg sm:rounded-2xl sm:pb-0">
        <div className="flex items-start justify-between gap-4 border-b border-border px-6 py-5">
          <h2 id="modal-title" className="text-xl font-bold leading-snug text-foreground">
            {title}
          </h2>
          <button
            ref={botaoFecharRef}
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg text-foreground-muted transition-colors hover:bg-foreground/5 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <FaXmark aria-hidden="true" />
          </button>
        </div>

        <div className="px-6 py-5 text-foreground">{children}</div>
      </div>
    </div>,
    document.body
  );
}