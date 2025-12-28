import { ImageCard } from './ImageCard';

export const ImageGrid = ({ images, onImageClick }) => {
  if (!images || images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No images to display yet
        </p>
      </div>
    );
  }

  return (
    <div className="columns-2 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
      {images.map((image) => (
        <div key={image.id} className="break-inside-avoid">
          <ImageCard image={image} onClick={onImageClick} />
        </div>
      ))}
    </div>
  );
};
