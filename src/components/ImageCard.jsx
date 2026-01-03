import { Eye, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ImageCard = ({ image, onClick }) => {
  return (
    <div
      onClick={() => onClick(image)}
      className="group relative overflow-hidden rounded-lg cursor-pointer bg-gray-200 dark:bg-gray-800 transition-transform hover:scale-105"
    >
      <img
        src={image.image_url}
        alt={image.title || 'Artwork'}
        className="w-full h-auto object-cover"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          {image.title && (
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{image.title}</h3>
          )}

          <div className="flex items-center justify-between text-sm">
            <Link
              to={`/profile/${image.profiles?.username}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center space-x-2 hover:text-light-highlight dark:hover:text-dark-highlight transition-colors"
            >
              <User className="w-4 h-4" />
              <span className='font-script'>{image.profiles?.username || 'Anonymous'}</span>
            </Link>

            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{image.views || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
