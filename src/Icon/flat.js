// Phosphor Duotone body에서 옅은 배경층(<path ... opacity="0.2"/>)을 제거해 단색(flat)으로 만든다.
// 원형 배지 안에서 옅은 배경이 비쳐 보이는 문제를 해소한다. 이미 단색인 아이콘(배경층 없음)은 그대로.
export function stripBackdrop(body) {
  return body.replace(/<path\b[^>]*\bopacity="0\.2"[^>]*\/>/g, '');
}
