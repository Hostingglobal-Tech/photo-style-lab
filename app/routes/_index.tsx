import { useState } from 'react';
import type { MetaFunction } from "@remix-run/node";
import { ImageUploader } from '~/components/ImageUploader';
import { StyleSelector } from '~/components/StyleSelector';
import { ImagePreview } from '~/components/ImagePreview';
import { imageStyles } from '~/utils/imageProcessing';

export const meta: MetaFunction = () => {
  return [
    { title: "Photo Style Lab" },
    { name: "description", content: "브라우저에서 사진 스타일을 빠르게 적용하고 비교하는 Remix 앱" },
  ];
};

export default function Index() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [selectedStyle, setSelectedStyle] = useState(imageStyles[0]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage(e.target?.result as string);
      setFileName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setFileName('');
    setSelectedStyle(imageStyles[0]);
  };

  return (
    <div className="min-h-screen bg-[#f6f7f4] text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-normal">Photo Style Lab</h1>
              <p className="text-sm text-gray-500">사진 스타일 프리셋 편집기</p>
            </div>
          </div>
          {uploadedImage && (
            <button
              onClick={handleReset}
              className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              새 이미지
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {!uploadedImage ? (
          <div className="grid min-h-[calc(100vh-160px)] items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
            <section>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
                Browser photo editor
              </p>
              <h2 className="mb-4 text-4xl font-bold tracking-normal text-gray-950 sm:text-5xl">
                사진을 고르고 스타일을 바로 비교하세요.
              </h2>
              <p className="mb-8 max-w-xl text-base leading-7 text-gray-600">
                여러 프리셋을 빠르게 적용하고 원본과 결과를 비교한 뒤 이미지로 저장할 수 있습니다.
              </p>
              <ImageUploader onImageUpload={handleImageUpload} />
            </section>

            <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
              <img
                src="/hero.png"
                alt="Style Lab preview"
                className="h-full min-h-[340px] w-full object-cover"
              />
            </section>
          </div>
        ) : (
          <div className="space-y-8">
            <StyleSelector
              selectedStyle={selectedStyle}
              onStyleSelect={setSelectedStyle}
              previewImage={uploadedImage}
            />

            <ImagePreview
              originalImage={uploadedImage}
              selectedStyle={selectedStyle}
              fileName={fileName}
            />
          </div>
        )}
      </main>
    </div>
  );
}
