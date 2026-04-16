const fs = require('fs');

const p = 'C:/Users/Bao/Documents/GitHub/-MTIEN-SOLUTION/src/app/dich-vu/marketing-design/page.tsx';
let c = fs.readFileSync(p, 'utf-8');

// Replace Avatars
c = c.replace(
  /<div className="w-10 h-10 rounded-full border-2 border-\[#FAFAFC\] bg-blue-100 z-30" \/>/g,
  '<img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FAFAFC] object-cover z-30" />'
);
c = c.replace(
  /<div className="w-10 h-10 rounded-full border-2 border-\[#FAFAFC\] bg-indigo-100 z-20" \/>/g,
  '<img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FAFAFC] object-cover z-20" />'
);
c = c.replace(
  /<div className="w-10 h-10 rounded-full border-2 border-\[#FAFAFC\] bg-purple-100 z-10" \/>/g,
  '<img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="User" className="w-10 h-10 rounded-full border-2 border-[#FAFAFC] object-cover z-10" />'
);

// Replace Hero Right Side Mockups
c = c.replace(
  /<div className="w-full h-full bg-neutral-100 p-8 text-neutral-300 flex items-center justify-center font-medium">Web Interface Mockup<\/div>/g,
  '<img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80" alt="Web Mockup" className="w-full h-full object-cover" />'
);
c = c.replace(
  /<div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 p-6 flex flex-col gap-4">[\s\S]*?<\/div>[\s\S]*?<\/div>[\s\S]*?<\/div>/,
  '<img src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&w=400&q=80" alt="Mobile UI" className="w-full h-full object-cover" />'
);
c = c.replace(
  /<div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">[\s]*<div className="w-20 h-20 bg-white\/20 rounded-full mix-blend-overlay" \/>[\s]*<\/div>/g,
  '<img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80" alt="Branding" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />\n<div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent" />'
);

// Replace Dark Mode Dashboard
c = c.replace(
  /className="absolute inset-0 rounded-\[40px\] border border-white\/10 bg-white\/5 backdrop-blur-3xl flex items-center justify-center shadow-2xl"/,
  'className="absolute inset-0 rounded-[40px] border border-white/10 shadow-2xl overflow-hidden"'
);
c = c.replace(
  /<div className="text-white\/20 font-medium text-xl">Dashboard UI<\/div>/,
  '<img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80" alt="Dashboard" className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" />'
);

// Replace Web UX
c = c.replace(
  /<div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">[\s]*<span className="text-neutral-300 font-medium text-xl">Web Mockup<\/span>[\s]*<\/div>/,
  '<img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" alt="Web UX UI" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />\n<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />'
);

// Replace App UI
c = c.replace(
  /<div className="w-full h-full bg-neutral-800 flex items-center justify-center text-white\/30">App UI<\/div>/,
  '<img src="https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=400&q=80" alt="App Interface" className="w-full h-full object-cover" />'
);
c = c.replace(
  /className="absolute inset-0 bg-indigo-500\/10 rounded-\[40px\]"/,
  'className="absolute inset-0 w-full h-full object-cover rounded-[40px] opacity-60 group-hover:scale-105 transition-transform duration-700 blur-sm"'
);
c = c.replace(
  /<div className="absolute inset-0 w-full h-full object-cover rounded-\[40px\] opacity-60 group-hover:scale-105 transition-transform duration-700 blur-sm" \/>/,
  '<img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80" alt="Mobile App Background" className="absolute inset-0 w-full h-full object-cover rounded-[40px] opacity-60 group-hover:scale-105 transition-transform duration-700 blur-sm" />'
);

// Replace Branding UI
c = c.replace(
  /<div className="absolute inset-0 bg-purple-900\/5 flex items-center justify-center">[\s]*<span className="text-purple-900\/20 font-medium text-xl">Branding Assets<\/span>[\s]*<\/div>/,
  '<img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&q=80" alt="Brand Identity" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />\n<div className="absolute inset-0 bg-purple-900/20 group-hover:bg-transparent transition-colors duration-700" />'
);

// Replace Marketing UI
c = c.replace(
  /<div className="absolute inset-0 bg-white\/5 flex items-center justify-center">[\s]*<span className="text-white\/20 font-medium text-xl">Marketing Banners<\/span>[\s]*<\/div>/,
  '<img src="https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?auto=format&fit=crop&w=1200&q=80" alt="Marketing Assets" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />'
);

// Replace Testimonials Avatars
c = c.replace(
  /<div className="w-12 h-12 rounded-full bg-indigo-100 border-2 border-white shadow-sm flex items-center justify-center text-indigo-500 font-bold">D<\/div>/,
  '<img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" alt="David Nguyen" className="w-12 h-12 rounded-full object-cover" />'
);
c = c.replace(
  /<div className="w-12 h-12 rounded-full bg-pink-100 border-2 border-white shadow-sm flex items-center justify-center text-pink-500 font-bold">S<\/div>/,
  '<img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop" alt="Sarah Tran" className="w-12 h-12 rounded-full object-cover" />'
);


fs.writeFileSync(p, c);