import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import HeroSection from "../components/HeroSection";
import { ImageGrid } from "../components/ImageGrid";
import { FullScreenViewer } from "../components/FullScreenViewer";
import { Sparkles, TrendingUp, Users } from "lucide-react";

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
        .from("images")
        .select("*, profiles(*)")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setImages(data || []);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularArtists = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*, images(count)")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) throw error;
      setPopularArtists(data || []);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const handleImageClick = async (image) => {
    setSelectedImage(image);
    await supabase
      .from("images")
      .update({ views: (image.views || 0) + 1 })
      .eq("id", image.id);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <HeroSection />

      <section className="py-10 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-medium text-gray-900 dark:text-white mb-4">
              Why Join Creative Showcase?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              A platform built by artists, for artists. Everything you need to
              share and grow your creative journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
            <div className="group relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 dark:from-blue-600 dark:to-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-200 dark:bg-blue-800 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <Sparkles className="w-7 h-7 text-white animate-pulse" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  Showcase Your Work
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Upload unlimited artwork and build a stunning portfolio that
                  reflects your unique style.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

          
            <div className="group relative bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-950 dark:to-fuchsia-950 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-fuchsia-400 dark:from-violet-600 dark:to-fuchsia-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-200 dark:bg-violet-800 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <Users className="w-7 h-7 text-white animate-pulse" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300">
                  Connect with Artists
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Follow your favorite creators, discover new artists, and be
                  part of a supportive community.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>

           
            <div className="group relative bg-gradient-to-br from-orange-50 to-rose-50 dark:from-orange-950 dark:to-rose-950 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-rose-400 dark:from-orange-600 dark:to-rose-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-200 dark:bg-orange-800 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>

              <div className="relative z-10">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-rose-500 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <TrendingUp className="w-7 h-7 text-white animate-pulse" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  Grow Your Audience
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Get discovered by art enthusiasts and grow your following with
                  our trending algorithm.
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </div>
          </div>
        </div>
      </section>

      {popularArtists.length > 0 && (
        <section className="py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl font-medium text-gray-900 dark:text-white mb-4">
                Popular Artists
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Discover talented creators in our community
              </p>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-6 min-w-max px-2 pt-2">
                {popularArtists.map((artist) => (
                  <Link
                    key={artist.id}
                    to={`/profile/${artist.username}`}
                    className="flex-shrink-0 w-32 text-center group"
                  >
                    <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-gradient-to-br from-light-primary to-light-accent dark:from-dark-secondary dark:to-dark-highlight flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                      <span className="font-script text-2xl font-bold text-white">
                        {artist.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>

                    <h3 className="font-script font-semibold text-gray-900 dark:text-white group-hover:text-light-primary dark:group-hover:text-dark-highlight transition-colors truncate">
                      {artist.full_name || artist.username}
                    </h3>

                    <p className="font-script text-sm text-gray-500 dark:text-gray-400 truncate">
                      @{artist.username}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-10 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl font-medium text-gray-900 dark:text-white mb-4">
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
