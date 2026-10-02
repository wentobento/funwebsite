import React, { useState } from 'react';
import { artistConfig } from '../data/artistConfig';
import { ShoppingBag, ExternalLink, Disc, Tag, ShieldCheck, Truck } from 'lucide-react';

export default function Store() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const merchItems = artistConfig.merch;

  const categories = ['All', 'Music & Vinyl', 'Apparel', 'Art Prints', 'Digital / Producers'];

  const filteredItems = selectedCategory === 'All'
    ? merchItems
    : merchItems.filter(item => item.category.includes(selectedCategory) || (selectedCategory === 'Music & Vinyl' && item.category.includes('Music')));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      {/* Header */}
      <div className="border-b-2 border-pop-border pb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 bg-pop-blue text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
            Official Merch
          </span>
          <span className="px-3 py-1 bg-pop-yellow text-pop-black font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-pop-black shadow-pop-solid">
            Direct Bandcamp Store
          </span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-pop-white">
          The <span className="text-pop-red">edoken Store</span>
        </h1>
        <p className="font-mono text-gray-300 mt-2 max-w-2xl text-sm sm:text-base">
          Limited edition heavyweight vinyl, silkscreened tour apparel, direct analog cassettes, and modular preset packs. Direct checkout processed via Bandcamp and Shopify.
        </p>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-pop-red text-white shadow-pop-solid border-2 border-pop-black -translate-y-0.5'
                : 'bg-pop-surface text-gray-400 hover:text-white border border-pop-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Merch Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-pop-surface border-2 border-pop-border rounded-2xl overflow-hidden shadow-pop-solid hover:border-pop-blue transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden bg-pop-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-pop-black/85 font-mono text-[10px] text-pop-yellow font-bold uppercase rounded border border-pop-border">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 bg-pop-red font-mono text-xs text-white font-bold rounded border border-pop-black shadow-pop-solid">
                    {item.price}
                  </span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 space-y-2">
                <h3 className="font-display font-bold text-xl text-pop-white group-hover:text-pop-yellow transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-pop-blue font-semibold">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{item.status}</span>
                </div>
              </div>
            </div>

            {/* Direct Checkout Link Button */}
            <div className="p-6 pt-0">
              <a
                href={item.directUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-pop-blue hover:bg-pop-blue-glow text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl border-2 border-pop-black shadow-pop-solid hover:-translate-y-0.5 hover:shadow-pop-yellow transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy on Bandcamp</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/70" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Merch Assurances Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-pop-border">
        <div className="p-4 bg-pop-surface rounded-xl border border-pop-border flex items-center gap-3 font-mono text-xs text-gray-300">
          <Truck className="w-5 h-5 text-pop-yellow flex-shrink-0" />
          <span>Worldwide tracked carbon-neutral shipping on all vinyl and apparel orders.</span>
        </div>
        <div className="p-4 bg-pop-surface rounded-xl border border-pop-border flex items-center gap-3 font-mono text-xs text-gray-300">
          <ShieldCheck className="w-5 h-5 text-pop-blue flex-shrink-0" />
          <span>Secure checkout handled directly by Bandcamp and official partners.</span>
        </div>
      </div>
    </div>
  );
}
