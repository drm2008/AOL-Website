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

  const completeModule = (moduleId: string) => {
    if (!progress.completedModules.includes(moduleId)) {
      setProgress(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        totalScore: prev.totalScore + 100
      }));
    }
    setActiveModule(null);
    setActiveTopic(null);
    setShowSimulators(false);
  };

  const resetProgress = () => {
    setProgress({ completedModules: [], totalScore: 0 });
  };

  if (loading) return <div className="min-h-screen" />;

  // 1. --- MODULE DETAIL VIEW ---
  if (activeModule) {
    return (
      <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-4xl bg-white rounded-[3rem] p-4 sm:p-8 shadow-2xl">
          <button
            onClick={() => { setActiveModule(null); setActiveTopic(null); setShowSimulators(false); }}
            className="flex items-center text-eml-dark hover:text-black transition-colors mb-8 text-sm font-medium px-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Modules
          </button>

          <div className="bg-white border-2 border-eml-dark p-10 sm:p-12 rounded-[2rem]">
            <span className="inline-block px-4 py-1.5 rounded-full border border-eml-dark text-eml-dark font-bold text-[10px] uppercase tracking-widest mb-6">
              {activeModule.subject}
            </span>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-eml-dark mb-4">
              {activeModule.title}
            </h1>
            
            <p className="text-lg text-gray-700 mb-12 font-light">
              {activeModule.description}
            </p>

            {/* If Business & Management, show TOC or topic */}
            {activeModule.subject === "Business & Management" && !activeTopic ? (
               <div className="mb-10 fade-in">
                 <h2 className="text-2xl font-bold text-eml-dark mb-6">Table of Contents</h2>
                 <div className="flex flex-col space-y-6">
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
                     <div key={section.part} className="space-y-3">
                       <h3 className="text-sm font-bold tracking-widest text-eml-dark opacity-70 uppercase">{section.part}</h3>
                       <div className="grid grid-cols-1 gap-2">
                         {section.topics.map(topic => (
                           <div 
                              key={topic}
                              onClick={() => setActiveTopic(topic)}
                              className="group flex items-center justify-between bg-white border border-eml-dark p-4 rounded-xl hover:bg-eml-dark hover:text-white transition-colors cursor-pointer"
                           >
                              <span className="text-sm text-eml-dark font-medium group-hover:text-white transition-colors">{topic}</span>
                              <span className="text-eml-dark group-hover:text-white font-bold ml-4">→</span>
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
                   <div className="flex items-center justify-between mb-8">
                     <h2 className="text-3xl font-extrabold text-eml-dark tracking-tight">Simulators</h2>
                     <button onClick={() => setShowSimulators(false)} className="text-sm text-eml-dark hover:text-black flex items-center transition-colors font-medium">
                       <ArrowLeft className="w-4 h-4 mr-2" /> Back
                     </button>
                   </div>
                   {activeModule.simulators && activeModule.simulators.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {activeModule.simulators.map(sim => (
                         <div 
                           key={sim.title}
                           className="group bg-white border-2 border-eml-dark p-8 flex flex-col justify-between hover:bg-eml-dark transition-all duration-300 rounded-[2rem] min-h-[250px]"
                         >
                           <div>
                             <h3 className="text-xl font-bold tracking-tight mb-3 text-eml-dark group-hover:text-white transition-colors duration-300">
                               {sim.title}
                             </h3>
                             <p className="text-sm text-gray-700 group-hover:text-eml-silver leading-relaxed font-light transition-colors duration-300">
                               {sim.desc}
                             </p>
                           </div>
                           <div className="flex items-end justify-start mt-8">
                             <a 
                               href={sim.url}
                               target="_blank"
                               rel="noopener noreferrer"
                               className="w-12 h-12 flex items-center justify-center border-2 border-eml-dark rounded-full text-eml-dark group-hover:border-white group-hover:text-white transition-all cursor-pointer"
                             >
                               <span className="font-bold text-lg">→</span>
                             </a>
                           </div>
                         </div>
                       ))}
                     </div>
                   ) : (
                     <p className="text-gray-700 py-12 font-medium">No simulators available yet.</p>
                   )}
                 </div>
                ) : (
                  <>
                    {activeTopic && (
                       <div className="mb-8">
                         <button onClick={() => setActiveTopic(null)} className="text-sm text-eml-dark hover:text-black flex items-center transition-colors mb-4 font-medium">
                           <ArrowLeft className="w-4 h-4 mr-2" /> Back to Table of Contents
                         </button>
                         <h2 className="text-2xl font-bold text-eml-dark">{activeTopic}</h2>
                       </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: "Infographics", desc: "Visual representation of the concepts." },
                        { title: "Interactive Dashboards", desc: "Explore data sets dynamically." },
                        { title: "Simulations", desc: "Hands-on simulation environments.", action: "EXPLORE" }
                      ].map(subMod => (
                      <div 
                        key={subMod.title}
                        className="group bg-white border-2 border-eml-dark p-8 flex flex-col justify-between hover:bg-eml-dark transition-all duration-300 rounded-[2rem] min-h-[250px]"
                      >
                        <div>
                          <h3 className="text-xl font-bold tracking-tight mb-4 text-eml-dark group-hover:text-white transition-colors duration-300">
                            {subMod.title}
                          </h3>
                          <p className="text-sm text-gray-700 group-hover:text-eml-silver leading-relaxed font-light transition-colors duration-300">
                            {subMod.desc}
                          </p>
                        </div>
                        <div className="flex items-end justify-start mt-8">
                          <button 
                            onClick={() => {
                                if (subMod.action === "EXPLORE") {
                                  setShowSimulators(true);
                                } else {
                                  alert("Coming soon!");
                                }
                            }}
                            className="w-12 h-12 flex items-center justify-center border-2 border-eml-dark rounded-full text-eml-dark group-hover:border-white group-hover:text-white transition-all"
                          >
                            <span className="font-bold text-lg">→</span>
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
    <div className="min-h-screen flex flex-col font-sans">
      <header className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between border-b border-eml-silver/5 border-b-[rgba(255,255,255,0.05)]">
        <div className="mb-4 md:mb-0 w-full md:w-auto text-center md:text-left">
          <h1 className="text-5xl font-black tracking-tighter text-eml-gold m-0">AOL</h1>
        </div>
        <nav className="flex space-x-2 sm:space-x-8 items-center overflow-x-auto w-full md:w-auto pb-2 md:pb-0 justify-center">
            <button 
              onClick={() => setActiveTab("home")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "home" ? 'bg-eml-gold text-eml-dark' : 'text-eml-silver hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setActiveTab("engineering_science")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "engineering_science" ? 'bg-eml-gold text-eml-dark' : 'text-eml-silver hover:text-white'}`}
            >
              Engineering & Science
            </button>
            <button 
              onClick={() => setActiveTab("business_management")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "business_management" ? 'bg-eml-gold text-eml-dark' : 'text-eml-silver hover:text-white'}`}
            >
              Business & Management
            </button>
            <button 
              onClick={() => setActiveTab("special_topics")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${activeTab === "special_topics" ? 'bg-eml-gold text-eml-dark' : 'text-eml-silver hover:text-white'}`}
            >
              Special Topics
            </button>
        </nav>
        <div className="hidden lg:block w-[100px]"></div>
      </header>
      
      <main className="flex-grow px-6 md:px-12 py-12 max-w-6xl mx-auto w-full bg-white rounded-t-[3rem] sm:rounded-[3rem] mt-4 mb-8 shadow-2xl">
        {activeTab === "home" && (
          <div className="fade-in max-w-4xl mx-auto mt-8 md:mt-12">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-eml-dark mb-6">
                Master the <span className="text-eml-dark bg-yellow-100 px-4 rounded-full inline-block mt-2">Big Picture</span>
              </h1>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto font-light">
                A modern framework for interactive dashboards, visual analytics, and deep conceptual simulations.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white border-2 border-eml-dark p-8 md:p-10 rounded-[2rem]">
                <h3 className="text-sm font-bold tracking-widest text-eml-dark uppercase mb-6 flex items-center">
                  <span className="w-8 h-[2px] bg-eml-dark mr-4"></span> Mission
                </h3>
                <p className="text-gray-700 leading-relaxed font-light">
                  Our mission is to spark a new way of learning by making big-picture concepts globally accessible and deeply exciting. We turn complex systems and diverse insights into hands-on, unforgettable experiences through interactive dashboards, visual analytics, and simulations.
                </p>
              </div>
              
              <div className="bg-white border-2 border-eml-dark p-8 md:p-10 rounded-[2rem]">
                <h3 className="text-sm font-bold tracking-widest text-eml-dark uppercase mb-6 flex items-center">
                  <span className="w-8 h-[2px] bg-eml-dark mr-4"></span> What You Gain
                </h3>
                <p className="text-gray-700 leading-relaxed font-light">
                  By engaging with AOL, you don't just study complex concepts—you master them. Our interactive tools bridge the gap between theory and execution, equipping you with the data-driven clarity, strategic intuition, and systemic thinking needed to solve real-world problems.
                </p>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "engineering_science" || activeTab === "business_management" || activeTab === "special_topics") && (
          <div className="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules
                .filter(mod => 
                  (activeTab === "engineering_science" && mod.subject === "Engineering & Science") ||
                  (activeTab === "business_management" && mod.subject === "Business & Management") ||
                  (activeTab === "special_topics" && mod.subject === "Special Topics")
                )
                .map((mod) => (
                  <div 
                    key={mod.id} 
                    className={`group bg-white border-2 border-eml-dark p-8 flex flex-col justify-between hover:bg-eml-dark transition-all duration-300 rounded-[2rem] min-h-[250px]`}
                  >
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-4 text-eml-dark group-hover:text-white transition-colors duration-300">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-gray-700 group-hover:text-eml-silver leading-relaxed font-light transition-colors duration-300">
                        {mod.description}
                      </p>
                    </div>
                    
                    <div className="flex items-end justify-start mt-8">
                      <button 
                        onClick={() => { setActiveModule(mod); setShowSimulators(false); }}
                        className={`w-12 h-12 flex items-center justify-center border-2 border-eml-dark rounded-full text-eml-dark group-hover:border-white group-hover:text-white transition-all`}
                      >
                        <span className="font-bold text-lg">→</span>
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>
      <footer className="px-6 md:px-12 py-6 flex items-center justify-start text-xs font-medium border-t border-eml-silver/5 border-t-[rgba(255,255,255,0.05)] text-eml-silver/50">
        <div>&copy; 2026 AOL | ANALYZE &middot; OPTIMIZE &middot; LEAD</div>
      </footer>
    </div>
  );
}
