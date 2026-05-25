import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Module, Progress } from "./types";
import { MOCK_MODULES } from "./data/modules";

export default function App() {
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<Progress>({ completedModules: [], totalScore: 0 });
  const [activeTab, setActiveTab] = useState<"home" | "engineering_science" | "business_management" | "special_topics">("home");
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [showSimulators, setShowSimulators] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setModules(MOCK_MODULES);
    const savedProgress = localStorage.getItem("app_progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (err) {}
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("app_progress", JSON.stringify(progress));
  }, [progress]);

  if (loading) return <div className="min-h-screen bg-eml-offwhite" />;

  // 1. --- MODULE DETAIL VIEW ---
  if (activeModule) {
    return (
      <div className="min-h-screen bg-eml-offwhite flex flex-col items-center py-20 px-6 sm:px-12 font-sans">
        <div className="w-full max-w-5xl bg-white rounded-3xl p-10 sm:p-20 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <button
            onClick={() => { setActiveModule(null); setActiveTopic(null); setShowSimulators(false); }}
            className="flex items-center text-eml-silver hover:text-eml-navy transition-colors mb-16 text-sm font-medium tracking-wide"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO CATEGORIES
          </button>

          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-eml-gold font-semibold text-xs uppercase tracking-[0.2em] mb-4">
              {activeModule.subject}
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-serif text-eml-navy mb-8 leading-tight">
              {activeModule.title}
            </h1>
            
            <p className="text-lg text-eml-navy/70 mb-16 font-light leading-relaxed">
              {activeModule.description}
            </p>

            {/* If Business & Management, show TOC or topic */}
            {activeModule.subject === "Business & Management" && !activeTopic ? (
               <div className="mb-10 fade-in">
                 <h2 className="text-2xl font-serif text-eml-navy mb-10 border-b border-eml-light-silver pb-4">Table of Contents</h2>
                 <div className="flex flex-col space-y-12">
                   {(activeModule.title === "Introduction to Business" ? [
                     {
                       part: "Part 1. The Environment of Business",
                       topics: [
                         "Topic 1. Exploring the World of Business and Economics",
                         "Topic 2. Ethics and Social Responsibility in Business",
                         "Topic 3. Global Business"
                       ]
                     },
                     {
                       part: "Part 2. Business Ownership and Entrepreneurship",
                       topics: [
                         "Topic 4. Choosing a Form of Business Ownership",
                         "Topic 5. Small Business, Entrepreneurship, and Franchises"
                       ]
                     },
                     {
                       part: "Part 3. Management and Organization",
                       topics: [
                         "Topic 6. Understanding the Management Process",
                         "Topic 7. Creating a Flexible Organization",
                         "Topic 8. Producing Quality Goods and Services"
                       ]
                     },
                     {
                       part: "Part 4. Human Resources",
                       topics: [
                         "Topic 9. Attracting and Retaining the Best Employees",
                         "Topic 10. Motivating and Satisfying Employees"
                       ]
                     },
                     {
                       part: "Part 5. Marketing",
                       topics: [
                         "Topic 11. Building Customer Relationships Through Effective Marketing",
                         "Topic 12. Creating and Pricing Products That Satisfy Customers",
                         "Topic 13. Distributing and Promoting Products"
                       ]
                     },
                     {
                       part: "Part 6. Information, Accounting, and Finance",
                       topics: [
                         "Topic 14. Exploring Social Media and e-Business",
                         "Topic 15. Using Management and Accounting Information",
                         "Topic 16. Mastering Financial Management"
                       ]
                     }
                   ] : activeModule.title === "Organizational Behavior" ? [
                     {
                       part: "Part 1. Contexts of Organizational Behavior",
                       topics: [
                         "Topic 1. Introduction to Organizational Behavior",
                         "Topic 2. The Cultural Context",
                         "Topic 3. The Organizational Context"
                       ]
                     },
                     {
                       part: "Part 2. Cognitive Processes of Organizational Behavior",
                       topics: [
                         "Topic 4. Perception and Attribution",
                         "Topic 5. Personality and Attitudes",
                         "Topic 6. Motivational Needs and Processes"
                       ]
                     }
                   ] : [
                     {
                       part: "Part 1. Core Principles",
                       topics: [
                         "Topic 1. Introduction and Overview",
                         "Topic 2. Key Frameworks",
                         "Topic 3. Strategic Context"
                       ]
                     },
                     {
                       part: "Part 2. Applications",
                       topics: [
                         "Topic 4. Real-world Implementation",
                         "Topic 5. Case Studies",
                         "Topic 6. Future Trends"
                       ]
                     }
                   ]).map(section => (
                     <div key={section.part} className="space-y-4">
                       <h3 className="text-xs font-bold tracking-[0.15em] text-eml-silver uppercase">{section.part}</h3>
                       <div className="grid grid-cols-1 gap-1">
                         {section.topics.map(topic => (
                           <div 
                              key={topic}
                              onClick={() => setActiveTopic(topic)}
                              className="group flex items-center justify-between py-4 border-b border-eml-light-silver/50 hover:border-eml-gold transition-colors cursor-pointer"
                           >
                              <span className="text-base text-eml-navy/80 hover:text-eml-navy font-light transition-colors">{topic}</span>
                              <span className="text-eml-gold opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all duration-300">→</span>
                           </div>
                         ))}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            ) : activeModule.subject !== "Business & Management" || (activeModule.subject === "Business & Management" && activeTopic) ? (
              <div className="mb-10 fade-in">
                {showSimulators ? (
                 <div>
                   <div className="flex items-center justify-between mb-12 border-b border-eml-light-silver pb-4">
                     <h2 className="text-2xl font-serif text-eml-navy">Simulators</h2>
                     <button onClick={() => setShowSimulators(false)} className="text-xs tracking-wider text-eml-silver hover:text-eml-navy uppercase transition-colors font-medium">
                       Back
                     </button>
                   </div>
                   {activeModule.simulators && activeModule.simulators.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       {activeModule.simulators.map(sim => (
                         <div 
                           key={sim.title}
                           className="group flex flex-col justify-between p-8 rounded-2xl bg-eml-offwhite hover:bg-white transition-all duration-500 shadow-sm hover:shadow-[0_10px_40px_rgba(10,25,47,0.08)] border border-transparent hover:border-eml-light-silver min-h-[220px]"
                         >
                           <div>
                             <h3 className="text-lg font-serif text-eml-navy mb-3 transition-colors duration-300">
                               {sim.title}
                             </h3>
                             <p className="text-sm text-eml-navy/60 leading-relaxed font-light transition-colors duration-300">
                               {sim.desc}
                             </p>
                           </div>
                           <div className="flex justify-start mt-8">
                             <a 
                               href={sim.url}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="text-eml-gold font-semibold text-sm tracking-widest uppercase flex items-center gap-2 group-hover:gap-4 transition-all duration-300"
                             >
                               Launch <span className="text-lg leading-none">→</span>
                             </a>
                           </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <p className="text-eml-navy/50 py-12 font-light italic">No simulators available for this module yet.</p>
                   )}
                 </div>
                ) : (
                  <>
                    {activeTopic && (
                       <div className="mb-12">
                         <button onClick={() => setActiveTopic(null)} className="text-xs text-eml-silver hover:text-eml-navy uppercase tracking-wider transition-colors mb-6 font-medium">
                           Back to Table of Contents
                         </button>
                         <h2 className="text-3xl font-serif text-eml-navy">{activeTopic}</h2>
                       </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
                      {[
                        { title: "Interactive Dashboards", desc: "Explore data sets and visual trends dynamically." },
                        { title: "Simulations", desc: "Access hands-on computational models and environments.", action: "EXPLORE" }
                      ].map(subMod => (
                      <div 
                        key={subMod.title}
                        className="group flex flex-col justify-between pt-8 pb-10 border-t border-eml-light-silver hover:border-eml-gold transition-colors duration-500"
                      >
                        <div>
                          <h3 className="text-xl font-serif text-eml-navy mb-4 transition-colors duration-300">
                            {subMod.title}
                          </h3>
                          <p className="text-sm text-eml-navy/60 leading-relaxed font-light transition-colors duration-300 pr-4">
                            {subMod.desc}
                          </p>
                        </div>
                        <div className="flex justify-start mt-8">
                          <button 
                            onClick={() => {
                                if (subMod.action === "EXPLORE") {
                                  setShowSimulators(true);
                                } else {
                                  alert("Dashboard feature coming soon.");
                                }
                            }}
                            className="text-eml-navy text-sm font-semibold tracking-[0.2em] uppercase flex items-center gap-2 group-hover:text-eml-gold group-hover:gap-4 transition-all duration-300"
                          >
                            Explore <span className="text-lg leading-none">→</span>
                          </button>
                        </div>
                      </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : null}

          </div>
        </div>
      </div>
    );
  }

  // 2. --- MAIN LIBRARY VIEW ---
  return (
    <div className="min-h-screen flex flex-col bg-eml-offwhite font-sans">
      <header className="px-8 md:px-16 lg:px-24 py-12 flex flex-col md:flex-row items-center justify-between border-b border-eml-light-silver bg-white">
        <div className="mb-8 md:mb-0 w-full md:w-auto text-center md:text-left">
          <h1 className="flex items-center justify-center md:justify-start tracking-tighter m-0 font-serif">
            <span className="text-5xl text-eml-silver">A</span>
            <span className="text-5xl text-eml-gold mx-[2px]">O</span>
            <span className="text-5xl text-eml-navy">L</span>
          </h1>
        </div>
        <nav className="flex space-x-6 sm:space-x-10 items-center overflow-x-auto w-full md:w-auto justify-center md:justify-end">
            {[
              { id: "home", label: "Overview" },
              { id: "engineering_science", label: "Engineering & Science" },
              { id: "business_management", label: "Business & Management" },
              { id: "special_topics", label: "Special Topics" }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-1 text-sm tracking-wider uppercase font-medium whitespace-nowrap transition-all duration-300 border-b-2
                  ${activeTab === tab.id 
                    ? 'border-eml-gold text-eml-navy' 
                    : 'border-transparent text-eml-silver hover:text-eml-navy hover:border-eml-light-silver'
                  }`}
              >
                {tab.label}
              </button>
            ))}
        </nav>
      </header>
      
      <main className="flex-grow px-8 md:px-16 lg:px-24 py-20 mx-auto w-full max-w-[1400px]">
        {activeTab === "home" && (
          <div className="fade-in max-w-5xl mx-auto mt-10">
            <div className="text-center mb-24">
              <h1 className="text-5xl md:text-7xl font-serif text-eml-navy mb-8 leading-tight">
                Master the <br className="hidden md:block"/>
                <span className="text-eml-gold italic font-light">Big Picture</span>
              </h1>
              <p className="text-lg md:text-xl text-eml-navy/60 leading-relaxed max-w-2xl mx-auto font-light">
                A modern framework for interactive dashboards, visual analytics, and deep conceptual simulations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 text-left">
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] text-eml-silver uppercase mb-6 flex items-center">
                  <span className="w-12 h-[1px] bg-eml-gold mr-4"></span> Mission
                </h3>
                <p className="text-eml-navy/80 text-lg leading-loose font-light">
                  Our mission is to spark a new way of learning by making big-picture concepts globally accessible and deeply exciting. We turn complex systems and diverse insights into hands-on, unforgettable experiences through interactive dashboards, visual analytics, and simulations.
                </p>
              </div>
              
              <div>
                <h3 className="text-xs font-bold tracking-[0.2em] text-eml-silver uppercase mb-6 flex items-center">
                  <span className="w-12 h-[1px] bg-eml-gold mr-4"></span> What You Gain
                </h3>
                <p className="text-eml-navy/80 text-lg leading-loose font-light">
                  By engaging with AOL, you don't just learn complex concepts—you master them. Our interactive tools bridge the gap between theory and execution, equipping you with the data-driven clarity, strategic intuition, and systemic thinking needed to solve real-world problems.
                </p>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "engineering_science" || activeTab === "business_management" || activeTab === "special_topics") && (
          <div className="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules
                .filter(mod => 
                  (activeTab === "engineering_science" && mod.subject === "Engineering & Science") ||
                  (activeTab === "business_management" && mod.subject === "Business & Management") ||
                  (activeTab === "special_topics" && mod.subject === "Special Topics")
                )
                .map((mod) => (
                  <div 
                    key={mod.id} 
                    onClick={() => { setActiveModule(mod); setShowSimulators(false); }}
                    className="group flex flex-col justify-between p-8 rounded-2xl bg-white border border-eml-light-silver hover:border-eml-gold hover:-translate-y-1 shadow-sm hover:shadow-[0_12px_36px_rgba(11,19,37,0.06)] transition-all duration-500 cursor-pointer min-h-[240px]"
                  >
                    <div>
                      <h3 className="text-2xl font-serif text-eml-navy mb-4 pr-4 transition-colors group-hover:text-eml-gold">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-eml-navy/60 leading-relaxed font-light transition-colors">
                        {mod.description}
                      </p>
                    </div>
                    
                    <div className="flex items-end justify-start mt-10">
                      <div className="text-eml-navy font-semibold text-xs tracking-[0.2em] uppercase flex items-center gap-3 transition-all duration-300 group-hover:text-eml-gold">
                        Enter Module <span className="text-lg leading-none font-normal transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      <footer className="px-8 md:px-16 lg:px-24 py-12 flex justify-between items-center text-xs tracking-widest uppercase font-medium text-eml-silver/60 bg-white">
        <div>&copy; 2026 <span className="text-eml-silver">A</span><span className="text-eml-gold">O</span><span className="text-eml-navy">L</span></div>
        <div>
          <span className="text-eml-silver">Analyze</span> &middot; <span className="text-eml-gold">Optimize</span> &middot; <span className="text-eml-navy">Lead</span>
        </div>
      </footer>
    </div>
  );
}
