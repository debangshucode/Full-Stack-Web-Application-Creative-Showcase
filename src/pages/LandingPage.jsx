import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import HeroSection from '../components/HeroSection';
import { ImageGrid } from '../components/ImageGrid';
import { FullScreenViewer } from '../components/FullScreenViewer';
import { Sparkles, TrendingUp, Users } from 'lucide-react';

export const LandingPage = () => {
  const [images, setImages] = useState([]);
  const [popularArtists, setPopularArtists] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
    fetchPopularArtists();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase
        .from('images')
        .select('*, profiles(*)')
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularArtists = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*, images(count)')
        .order('created_at', { ascending: false })
        .limit(6);

      if (error) throw error;
      setPopularArtists(data || []);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  const handleImageClick = async (image) => {
    setSelectedImage(image);
    await supabase
      .from('images')
      .update({ views: (image.views || 0) + 1 })
      .eq('id', image.id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <HeroSection />

      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Join Creative Showcase?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A platform built by artists, for artists. Everything you need to share and grow your creative journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-light-primary dark:bg-dark-secondary rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Showcase Your Work
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Upload unlimited artwork and build a stunning portfolio that reflects your unique style.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-light-secondary dark:bg-dark-accent rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Connect with Artists
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Follow your favorite creators, discover new artists, and be part of a supportive community.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-light-accent dark:bg-dark-highlight rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Grow Your Audience
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get discovered by art enthusiasts and grow your following with our trending algorithm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {popularArtists.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Popular Artists
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover talented creators in our community
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {popularArtists.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/profile/${artist.username}`}
                  className="text-center group"
                >
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-secondary dark:to-dark-highlight flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {artist.username?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-light-primary dark:group-hover:text-dark-highlight transition-colors">
                    {artist.full_name || artist.username}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    @{artist.username}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Recent Artwork
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore the latest creations from our talented community
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-light-primary dark:border-dark-secondary border-t-transparent"></div>
            </div>
          ) : (
            <ImageGrid images={images} onImageClick={handleImageClick} />
          )}
        </div>
      </section>

      {selectedImage && (
        <FullScreenViewer
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};
