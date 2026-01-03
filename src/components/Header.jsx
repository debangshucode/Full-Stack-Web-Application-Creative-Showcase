import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Moon, Sun, Palette, User, LogOut, Upload } from 'lucide-react';

export const Header = () => {
  const { user, profile, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Palette className="w-8 h-8 text-light-primary dark:text-dark-highlight transition-transform group-hover:rotate-12" />
            <span className="font-script text-3xl font-bold bg-gradient-to-r from-light-primary to-light-secondary dark:from-dark-secondary dark:to-dark-highlight bg-clip-text text-transparent">
              Creative Showcase
            </span>
          </Link>

          <div className="flex items-center space-x-4 lg:w-[20%] md:w-[30%] w-[100%]">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-dark-highlight" />
              ) : (
                <Moon className="w-5 h-5 text-light-primary" />
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-light-primary dark:bg-dark-secondary text-white hover:bg-light-secondary dark:hover:bg-dark-primary transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Link>
                <Link
                  to={`/profile/${profile?.username}`}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Profile"
                >
                  <User className="w-5 h-5 text-light-primary dark:text-dark-highlight" />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                  aria-label="Sign out"
                >
                  <LogOut className="w-5 h-5 text-red-600 dark:text-red-400" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-light-primary dark:text-dark-highlight hover:text-light-secondary dark:hover:text-dark-accent transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-2 py-2 rounded-lg bg-light-primary dark:bg-dark-secondary text-white hover:bg-light-secondary dark:hover:bg-dark-primary transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
