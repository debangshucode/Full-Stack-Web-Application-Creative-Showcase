import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ImageGrid } from '../components/ImageGrid';
import { FullScreenViewer } from '../components/FullScreenViewer';
import { User, Calendar, Image as ImageIcon } from 'lucide-react';

export const PublicProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (username) {
      fetchProfileAndImages();
    }
  }, [username]);

  const fetchProfileAndImages = async () => {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('username', username)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profileData) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      setProfile(profileData);

      const { data: imagesData, error: imagesError } = await supabase
        .from('images')
        .select('*, profiles(*)')
        .eq('user_id', profileData.id)
        .order('created_at', { ascending: false });

      if (imagesError) throw imagesError;
      setImages(imagesData || []);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleImageClick = async (image) => {
    setSelectedImage(image);
    await supabase
      .from('images')
      .update({ views: (image.views || 0) + 1 })
      .eq('id', image.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-light-primary dark:border-dark-secondary border-t-transparent"></div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            User Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The profile you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-gradient-to-br from-light-primary via-light-secondary to-light-accent dark:from-dark-primary dark:via-dark-secondary dark:to-dark-accent py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white dark:bg-gray-900 shadow-xl flex items-center justify-center">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-4xl font-bold text-light-primary dark:text-dark-highlight">
                  {profile.username?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold text-white mb-2">
              {profile.full_name || profile.username}
            </h1>
            <p className="text-white/80 text-lg mb-4">@{profile.username}</p>

            {profile.bio && (
              <p className="text-white/90 max-w-2xl mx-auto mb-6">{profile.bio}</p>
            )}

            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5" />
                <span>{images.length} Artworks</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Artwork Gallery
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explore {profile.full_name || profile.username}'s creative collection
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No artwork uploaded yet
            </p>
          </div>
        ) : (
          <ImageGrid images={images} onImageClick={handleImageClick} />
        )}
      </div>

      {selectedImage && (
        <FullScreenViewer
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};
