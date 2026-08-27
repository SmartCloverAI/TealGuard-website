import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#072626',
        color: '#7de6dc',
        border: '4px solid #7de6dc',
        fontSize: 30,
        fontWeight: 700
      }}
    >
      T
    </div>,
    size
  );
}
