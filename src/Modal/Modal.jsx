import { useEffect, useRef } from 'react';
import './Modal.css';
import { IconButton } from '../IconButton/IconButton.jsx';

/**
 * 네이티브 <dialog> 기반 공유 모달. open이 true가 되면 showModal()을 걸고,
 * false로 바뀌면 close()가 정리된다(ESC·배경 클릭 등 어떤 경로로 닫혀도 동일).
 * 컴포넌트가 open=false로 선마운트돼 있어도 동작한다 — effect가 open 전환에 반응한다.
 * title 없으면 헤더(제목+닫기 버튼)를 생략한다 — 소비 화면이 자체 헤더(브레드크럼·액션 등)를
 * 그리고 싶을 때 children에 직접 넣을 수 있도록.
 * @param {{open: boolean, onClose: () => void, title?: string, children?: any, footer?: any}} props
 */
export function Modal({ open, onClose, title, children, footer }) {
  const ref = useRef(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    // deps 없는 1회 effect였을 때 open=false 선마운트 인스턴스는 dialog ref 없이 조기 종료해
    // 이후 open=true가 돼도 showModal이 영영 안 불렸다 — open 전환마다 재실행해야 한다.
    if (!open) return;
    const dialog = ref.current;
    if (!dialog) return;
    // ESC(native cancel→close) 등 어떤 경로로 닫혀도 React 상태를 맞춘다.
    const handleClose = () => onCloseRef.current();
    dialog.addEventListener('close', handleClose);
    dialog.showModal();
    return () => {
      // 리스너를 먼저 떼고 close() — 언마운트 시 close 이벤트가 onClose를 재호출하는 것 방지.
      dialog.removeEventListener('close', handleClose);
      dialog.close();
    };
  }, [open]);

  function handleBackdropClick(e) {
    // 클릭 대상이 dialog 자신이면(자식이 아니면) 배경(::backdrop) 클릭으로 간주.
    if (e.target === ref.current) onClose();
  }

  if (!open) return null;

  return (
    <dialog ref={ref} className="i7-modal" onClick={handleBackdropClick}>
      {title && (
        <header className="i7-modal__header">
          <h2 className="i7-modal__title">{title}</h2>
          <IconButton icon="xMark" label="닫기" onClick={onClose} />
        </header>
      )}
      <div className="i7-modal__content">{children}</div>
      {footer && <footer className="i7-modal__footer">{footer}</footer>}
    </dialog>
  );
}
