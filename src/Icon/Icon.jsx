import { useEffect, useState } from 'react';
import { stripBackdrop } from './flat.js';

// phosphor-icons.js(~900KB)는 name= 조회 시에만 필요하므로 동적 import로 지연 로드한다.
// 모듈 레벨 프로미스로 캐시해 Icon 인스턴스가 몇 개든 fetch는 한 번만 일어난다.
let iconSvgsPromise = null;
let iconSvgsCache = null;

function loadIconSvgs() {
  if (!iconSvgsPromise) {
    iconSvgsPromise = import('./phosphor-icons.js').then((mod) => {
      iconSvgsCache = mod.ICON_SVGS;
      return iconSvgsCache;
    });
  }
  return iconSvgsPromise;
}

/**
 * Phosphor Duotone 아이콘. 색은 currentColor를 따른다.
 * svg가 있으면 맵 조회 없이 그 SVG body를 동기 렌더한다(name은 무시) — 크기 민감 소비자용.
 * svg가 없고 name만 있으면 전체 아이콘 맵을 동적 import로 로드한 뒤 렌더한다(최초 1틱 지연).
 * flat=true면 옅은 배경층을 제거해 단색으로 렌더(원형 배지 안 등) — 두 경로 모두 적용.
 * @param {{name?: string, svg?: string, size?: number, flat?: boolean, [k:string]: any}} props
 */
export function Icon({ name, svg, size = 20, flat = false, ...props }) {
  const [svgs, setSvgs] = useState(iconSvgsCache);

  useEffect(() => {
    if (svg || svgs) return;
    let cancelled = false;
    loadIconSvgs().then((loaded) => {
      if (!cancelled) setSvgs(loaded);
    });
    return () => {
      cancelled = true;
    };
  }, [svg, svgs]);

  const body = svg ?? svgs?.[name] ?? '';
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      {...props}
      dangerouslySetInnerHTML={{ __html: flat ? stripBackdrop(body) : body }}
    />
  );
}
