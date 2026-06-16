import { imageStyles, type ImageStyle } from '~/utils/imageProcessing';

interface StyleSelectorProps {
  selectedStyle: ImageStyle;
  onStyleSelect: (style: ImageStyle) => void;
  previewImage?: string;
}

export function StyleSelector({ selectedStyle, onStyleSelect, previewImage }: StyleSelectorProps) {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">스타일 선택</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {imageStyles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleSelect(style)}
            className={`group relative rounded-lg overflow-hidden transition-all duration-300 ${
              selectedStyle.id === style.id
                ? 'ring-4 ring-blue-500 transform scale-105'
                : 'hover:ring-2 hover:ring-gray-300 hover:transform hover:scale-105'
            }`}
          >
            <div className="aspect-square bg-gray-200 relative overflow-hidden">
              {previewImage && (
                <img
                  src={previewImage}
                  alt={style.name}
                  className="w-full h-full object-cover"
                  style={{ filter: style.filter }}
                />
              )}
              {!previewImage && (
                <div className="w-full h-full flex items-center justify-center">
                  <div 
                    className="w-20 h-20 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
                      filter: style.filter
                    }}
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-2">
              <h3 className="text-sm font-semibold text-gray-800">{style.name}</h3>
              <p className="text-xs text-gray-600 mt-0.5">{style.description}</p>
            </div>
            {selectedStyle.id === style.id && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}