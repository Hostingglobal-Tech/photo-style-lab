import { useState, useEffect } from 'react';
import type { ImageStyle } from '~/utils/imageProcessing';
import { applyStyleToImage, downloadImage } from '~/utils/imageProcessing';

interface ImagePreviewProps {
  originalImage: string;
  selectedStyle: ImageStyle;
  fileName: string;
}

export function ImagePreview({ originalImage, selectedStyle, fileName }: ImagePreviewProps) {
  const [processedImage, setProcessedImage] = useState<string>(originalImage);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const processImage = async () => {
      if (selectedStyle.id === 'original') {
        setProcessedImage(originalImage);
        return;
      }

      setIsProcessing(true);
      try {
        const processed = await applyStyleToImage(originalImage, selectedStyle);
        setProcessedImage(processed);
      } catch (error) {
        console.error('Failed to process image:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    processImage();
  }, [originalImage, selectedStyle]);

  const handleDownload = () => {
    const extension = fileName.split('.').pop() || 'jpg';
    const baseName = fileName.replace(/\.[^/.]+$/, '');
    const newFileName = `${baseName}_${selectedStyle.id}.${extension}`;
    downloadImage(processedImage, newFileName);
  };

  return (
    <div className="w-full mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">미리보기</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              {showComparison ? '단일 보기' : '비교 보기'}
            </button>
            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              다운로드
            </button>
          </div>
        </div>

        <div className="relative overflow-auto max-h-[80vh]">
          {isProcessing && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-600">스타일 적용 중...</p>
              </div>
            </div>
          )}

          {showComparison ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="overflow-auto">
                <h3 className="text-sm font-semibold text-gray-600 mb-2 sticky top-0 bg-white py-1">원본</h3>
                <div className="flex justify-center">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="max-w-full h-auto rounded-lg shadow-md object-contain"
                    style={{ maxHeight: '70vh' }}
                  />
                </div>
              </div>
              <div className="overflow-auto">
                <h3 className="text-sm font-semibold text-gray-600 mb-2 sticky top-0 bg-white py-1">
                  {selectedStyle.name} 스타일 적용
                </h3>
                <div className="flex justify-center">
                  <img
                    src={processedImage}
                    alt="Processed"
                    className="max-w-full h-auto rounded-lg shadow-md object-contain"
                    style={{ maxHeight: '70vh' }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex justify-center">
              <img
                src={processedImage}
                alt="Preview"
                className="max-w-full h-auto rounded-lg shadow-md object-contain"
                style={{ maxHeight: '75vh' }}
              />
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                {selectedStyle.name}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-1">{selectedStyle.name}</h3>
          <p className="text-sm text-gray-600">{selectedStyle.description}</p>
        </div>
      </div>
    </div>
  );
}