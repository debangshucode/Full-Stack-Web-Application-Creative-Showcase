import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import LightRays from './LightRays';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] sm:h-[720px] overflow-hidden">

      <div className="absolute inset-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1.4}
          lightSpread={0.9}
          rayLength={1.4}
          fadeDistance={1.2}
          saturation={1}
          followMouse={true}
          mouseInfluence={0.12}
          noiseAmount={0.08}
          distortion={0.04}
        />
      </div>


      <div className="absolute inset-0 bg-gradient-to-br from-light-primary/80 via-light-secondary/70 to-light-accent/80 dark:from-dark-primary/85 dark:via-dark-secondary/75 dark:to-dark-accent/85" />

 
      <div className="absolute inset-0 bg-black/30" />


      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <Sparkles className="w-5 h-5" />
            <span className="font-script text-md font-medium">
              Showcase Your Creativity
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-medium mb-6">
            Where Artists Come to{' '}
            <span className="bg-gradient-to-r from-white to-light-highlight bg-clip-text text-transparent">
              Shine
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Join a vibrant community of artists and creators. Share your digital
            masterpieces, discover inspiring artwork, and connect with fellow
            creatives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 rounded-lg bg-white text-light-primary dark:text-dark-secondary font-semibold hover:scale-105 transition-transform shadow-lg"
            >
              Start Creating
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-colors border border-white/30"
            >
              Explore Gallery
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
