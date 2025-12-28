import { X, User, Eye, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export const FullScreenViewer = ({ image, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!image) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="max-w-7xl w-full h-full flex flex-col lg:flex-row gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 flex items-center justify-center">
          <img
            src={image.image_url}
            alt={image.title || 'Artwork'}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </div>

        <div className="lg:w-80 bg-white dark:bg-gray-900 rounded-lg p-6 overflow-y-auto">
          {image.title && (
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {image.title}
            </h2>
          )}

          {image.description && (
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {image.description}
            </p>
          )}

          <div className="space-y-4">
            <Link
              to={`/profile/${image.profiles?.username}`}
              className="flex items-center space-x-3 p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-light-primary to-light-secondary dark:from-dark-secondary dark:to-dark-highlight flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {image.profiles?.full_name || image.profiles?.username}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{image.profiles?.username}
                </p>
              </div>
            </Link>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <Eye className="w-4 h-4" />
                <span>{image.views || 0} views</span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(image.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
