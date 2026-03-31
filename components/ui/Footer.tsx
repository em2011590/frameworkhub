import Link from "next/link";
import { Code2, Globe, MessageCircle, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-dark/50 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple flex items-center justify-center">
                <Code2 size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold gradient-text">FrameworkHub</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              The ultimate knowledge platform for web developers. Explore, compare, and master every framework — from React to Rust.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ["Frameworks", "/frameworks"],
                ["Compare", "/compare"],
                ["Roadmap", "/roadmap"],
                ["Playground", "/playground"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">Categories</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Frontend", "Backend", "Fullstack", "Mobile", "Testing"].map((cat) => (
                <li key={cat}>
                  <Link href={`/frameworks?category=${cat.toLowerCase()}`} className="hover:text-white transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-surface-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Built with <Heart size={12} className="text-accent-pink mx-1 fill-accent-pink" /> for developers
          </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <Globe size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
