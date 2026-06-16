export interface ImageStyle {
  id: string;
  name: string;
  description: string;
  filter: string;
  canvasFilter?: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => void;
}

export const imageStyles: ImageStyle[] = [
  {
    id: 'original',
    name: '원본',
    description: '필터 없음',
    filter: 'none'
  },
  {
    id: 'vintage',
    name: '빈티지',
    description: '따뜻하고 오래된 느낌',
    filter: 'sepia(0.5) contrast(1.2) brightness(0.9)'
  },
  {
    id: 'blackwhite',
    name: '흑백',
    description: '클래식한 흑백 사진',
    filter: 'grayscale(1) contrast(1.2)'
  },
  {
    id: 'sepia',
    name: '세피아',
    description: '갈색톤의 따뜻한 느낌',
    filter: 'sepia(1)'
  },
  {
    id: 'cold',
    name: '차가운 톤',
    description: '시원하고 차가운 느낌',
    filter: 'hue-rotate(180deg) saturate(0.8)'
  },
  {
    id: 'warm',
    name: '따뜻한 톤',
    description: '따뜻하고 포근한 느낌',
    filter: 'hue-rotate(30deg) saturate(1.2) brightness(1.1)'
  },
  {
    id: 'highcontrast',
    name: '고대비',
    description: '선명하고 강렬한 느낌',
    filter: 'contrast(2) brightness(1.1)'
  },
  {
    id: 'dramatic',
    name: '드라마틱',
    description: '영화같은 분위기',
    filter: 'contrast(1.4) brightness(0.9) saturate(1.3)'
  },
  {
    id: 'fade',
    name: '페이드',
    description: '부드럽고 몽환적인 느낌',
    filter: 'contrast(0.8) brightness(1.2) blur(0.5px)'
  },
  {
    id: 'vivid',
    name: '선명함',
    description: '생생하고 화려한 색감',
    filter: 'saturate(1.5) contrast(1.1)'
  },
  {
    id: 'noir',
    name: '느와르',
    description: '어둡고 신비로운 분위기',
    filter: 'grayscale(1) contrast(1.5) brightness(0.7)',
    canvasFilter: (ctx, canvas) => {
      // 비네팅 효과 추가
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  },
  {
    id: 'retro',
    name: '레트로',
    description: '80년대 감성',
    filter: 'sepia(0.3) saturate(1.8) hue-rotate(20deg) contrast(1.2)',
    canvasFilter: (ctx, canvas) => {
      // 노이즈 효과 추가
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 20;
        data[i] += noise;     // Red
        data[i + 1] += noise; // Green
        data[i + 2] += noise; // Blue
      }
      
      ctx.putImageData(imageData, 0, 0);
    }
  }
];

export async function applyStyleToImage(
  imageUrl: string,
  style: ImageStyle
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Canvas context not available'));
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      
      // CSS 필터 적용
      if (style.filter !== 'none') {
        ctx.filter = style.filter;
      }
      
      // 이미지 그리기
      ctx.drawImage(img, 0, 0);
      
      // 추가 캔버스 필터 적용
      if (style.canvasFilter) {
        ctx.filter = 'none'; // CSS 필터 리셋
        style.canvasFilter(ctx, canvas);
      }
      
      // 결과를 blob URL로 변환
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          resolve(url);
        } else {
          reject(new Error('Failed to create blob'));
        }
      }, 'image/jpeg', 0.95);
    };
    
    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };
    
    img.src = imageUrl;
  });
}

export function downloadImage(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}