const fs = require('fs');

let code = `import { useEffect, useState } from "react";
import { BookOpen, Award, Layout, CheckCircle, RefreshCcw, ArrowLeft, PlayCircle, Trophy, Clock, GraduationCap } from "lucide-react";
import { Module, Progress } from "./types";
import { MOCK_MODULES } from "./data/modules";

export default function App() {
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<Progress>({ completedModules: [], totalScore: 0 });
  const [activeTab, setActiveTab] = useState<"home" | "engineering_science" | "business_management">("home");
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [showSimulators, setShowSimulators] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load modules locally
    setModules(MOCK_MODULES);
    
    // Load progress from localStorage
    const savedProgress = localStorage.getItem("app_progress");
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (err) {
        console.error("Failed to parse progress", err);
      }
    }
    
    setLoading(false);
  }, []);

  // Save progress to localStorage whenever it changes
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

  const progressPercent = modules.length === 0 ? 0 : Math.round((progress.completedModules.length / modules.length) * 100);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <RefreshCcw className="w-8 h-8 text-eml-gold animate-spin" />
      </div>
    );
  }

  // -- Interactive Module View --
  if (activeModule) {
    const isCompleted = progress.completedModules.includes(activeModule.id);
    return (
      <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-3xl">
          <button
            onClick={() => { setActiveModule(null); setActiveTopic(null); setShowSimulators(false); }}
            className="flex items-center text-eml-silver hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {activeTab === "home" ? "Home" : "Modules"}
          </button>
          
          <div className="bg-eml-dark-card border border-eml-silver/10 p-10 sm:p-16 rounded-[2.5rem] shadow-2xl">
            <span className="inline-block px-4 py-2 rounded-full bg-eml-gold/10 text-eml-gold font-bold text-[10px] uppercase tracking-widest mb-6 border border-eml-gold/20">
              {activeModule.subject}
            </span>
            
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
              {activeModule.title}
            </h1>
            
            <p className="text-lg text-eml-silver/90 mb-10 leading-relaxed max-w-3xl font-light">
              {activeModule.description}
            </p>
            
            {activeModule.subject === "Business & Management" && !activeTopic ? (
               <div className="mb-10 fade-in">
                 <h2 className="text-2xl font-bold text-white mb-6">Table of Contents</h2>
                 <div className="flex flex-col space-y-8">
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
                       <h3 className="text-lg font-semibold text-eml-gold tracking-wide uppercase">{section.part}</h3>
                       <div className="grid grid-cols-1 gap-3">
                         {section.topics.map(topic => (
                           <div 
                              key={topic}
                              onClick={() => setActiveTopic(topic)}
                              className="group bg-eml-dark-card border border-eml-silver/10 p-5 flex flex-row items-center justify-between hover:border-eml-gold/40 hover:shadow-lg hover:shadow-eml-gold/5 transition-all duration-300 cursor-pointer rounded-2xl"
                           >
                              <h4 className="text-base font-medium text-white group-hover:text-eml-gold transition-colors">{topic}</h4>
                              <span className="text-eml-silver group-hover:text-eml-gold transition-colors font-bold">→</span>
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
                   <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <div className="flex items-center justify-between mb-8">
                       <h2 className="text-2xl font-black text-white tracking-tight">Simulators</h2>
                       <button onClick={() => setShowSimulators(false)} className="px-4 py-2 text-sm font-semibold border-2 border-eml-silver/20 text-eml-silver hover:text-white hover:border-white rounded-full transition-all flex items-center">
                         <ArrowLeft className="w-4 h-4 mr-2" /> Back
                       </button>
                     </div>
                     {activeModule.simulators && activeModule.simulators.length > 0 ? (
                       <div className="grid grid-cols-1 gap-6">
                         {activeModule.simulators.map(sim => (
                           <div 
                             key={sim.title}
                             className="group bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 p-8 flex flex-col justify-between hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-500 cursor-pointer rounded-[2rem] min-h-[200px]"
                             onClick={() => window.open(sim.url, "_blank")}
                           >
                             <div>
                               <div className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 mb-2">Interactive Tool</div>
                               <h3 className="text-2xl font-bold tracking-tight mb-3 text-white group-hover:text-indigo-300 transition-colors duration-300">
                                 {sim.title}
                               </h3>
                               <p className="text-base text-slate-300 leading-relaxed mb-6 font-light">
                                 {sim.desc}
                               </p>
                             </div>
                             <div className="flex items-end justify-start mt-auto">
                               <button 
                                 className="px-6 py-3 flex items-center justify-center border border-indigo-500/50 rounded-full transition-all duration-300 text-indigo-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-400"
                               >
                                 <span className="font-semibold text-sm mr-2">Launch Simulator</span>
                                 <span className="font-bold">→</span>
                               </button>
                             </div>
                           </div>
                         ))}
                       </div>
                     ) : (
                       <div className="text-center p-12 bg-eml-dark border border-eml-silver/10 rounded-2xl text-eml-silver mt-8">
                         <h3 className="text-xl font-bold text-white mb-2">No simulators available yet.</h3>
                         <p className="text-sm font-light">Check back later for hands-on interactive tools.</p>
                       </div>
                     )}
                   </div>
                ) : (
                  <>
                    {activeTopic && (
                       <div className="flex items-center justify-between mb-6">
                         <h2 className="text-xl font-bold text-eml-gold">{activeTopic}</h2>
                         <button onClick={() => setActiveTopic(null)} className="text-sm text-eml-silver hover:text-white flex items-center transition-colors">
                           <ArrowLeft className="w-4 h-4 mr-1" /> Back to TOC
                         </button>
                       </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { title: "The Infographic", desc: "Visual representation of the concepts." },
                        { title: "The Static Dashboard", desc: "Key metrics and data points at a glance." },
                        { title: "The Interactive Dashboard", desc: "Explore data sets dynamically." },
                        { title: "Explore Simulators", desc: "Hands-on simulation environments.", action: "EXPLORE" }
                      ].map(subMod => (
                      <div 
                        key={subMod.title}
                        className="group bg-eml-dark-card border border-eml-silver/10 p-8 flex flex-col justify-between hover:border-eml-gold/40 hover:shadow-2xl hover:shadow-eml-gold/10 hover:-translate-y-1 transition-all duration-500 cursor-pointer rounded-[2rem] h-full md:min-h-[250px]"
                        onClick={() => {
                            if (subMod.action === "EXPLORE") {
                              setShowSimulators(true);
                            } else {
                              alert("Coming soon!");
                            }
                        }}
                      >
                        <div>
                          <h3 className="text-xl font-bold tracking-tight mb-3 text-white group-hover:text-eml-gold transition-colors duration-300">
                            {subMod.title}
                          </h3>
                          <p className="text-sm text-eml-silver/80 leading-relaxed mb-6 font-light">
                            {subMod.desc}
                          </p>
                        </div>
                        <div className="flex items-end justify-start mt-auto">
                          <button 
                            className="w-14 h-14 flex flex-shrink-0 items-center justify-center border-2 rounded-full transition-all duration-300 border-eml-silver/20 text-eml-silver group-hover:bg-eml-gold/10 group-hover:text-eml-gold group-hover:border-eml-gold/30"
                          >
                            <span className="font-semibold text-lg">→</span>
                          </button>
                        </div>
                      </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="bg-eml-dark/50 p-6 sm:p-8 rounded-2xl border border-eml-silver/5 mb-10">
                <h2 className="text-2xl font-bold text-white mb-4">Under Development</h2>
                <p className="text-eml-silver/80">Check back later for updates to this module.</p>
              </div>
            )}
            
            <div className="mt-12 pt-8 border-t border-eml-silver/10 flex flex-col sm:flex-row justify-between items-center sm:items-start space-y-4 sm:space-y-0">
              <div className="text-center sm:text-left">
                <span className="block text-xs font-bold text-eml-silver/50 uppercase tracking-widest mb-1">Time to Complete</span>
                <span className="flex items-center justify-center sm:justify-start text-sm text-eml-silver font-medium">
                  <Clock className="w-4 h-4 mr-2 text-eml-gold" /> {activeModule.duration} mins
                </span>
              </div>
              <button 
                onClick={() => completeModule(activeModule.id)}
                className={\`flex items-center px-8 py-4 rounded-full font-bold transition-all duration-300 shadow-xl \${isCompleted ? 'bg-emerald-500 hover:bg-emerald-400 text-white shadow-emerald-500/20' : 'bg-eml-gold hover:bg-white text-eml-dark shadow-eml-gold/20'}\`}
              >
                {isCompleted ? (
                  <>
                    <CheckCircle className="w-5 h-5 mr-3" /> Completed
                  </>
                ) : (
                  <>
                    Mark as Complete <ArrowLeft className="w-5 h-5 ml-3 rotate-180" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -- Main Library View --
  return (
    <div className="min-h-screen flex flex-col bg-eml-dark">
      {/* Header */}
      <header className="px-6 sm:px-10 py-6 sm:py-8 flex flex-col sm:flex-row justify-between items-center bg-eml-dark border-b border-eml-silver/5 sticky top-0 z-50 backdrop-blur-md bg-eml-dark/90">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
           <div className="w-10 h-10 bg-eml-gold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)]">
             <BookOpen className="text-eml-dark w-5 h-5" />
           </div>
           <div>
             <h1 className="text-2xl font-black tracking-tight text-white m-0 leading-none">AOL Research <span className="text-eml-gold">Library</span></h1>
             <p className="text-[10px] uppercase font-bold text-eml-silver/50 tracking-widest mt-1">Applied Organizational Leadership</p>
           </div>
        </div>
        
        <div className="flex items-center space-x-6 bg-eml-dark-card py-2 px-6 rounded-full border border-eml-silver/10 shadow-lg">
          <div className="flex items-center space-x-3 border-r border-eml-silver/20 pr-6">
            <Trophy className="w-5 h-5 text-eml-gold" />
            <div className="flex flex-col text-right">
              <span className="text-xl font-black text-white leading-none">{progress.totalScore}</span>
              <span className="text-[9px] uppercase tracking-widest text-eml-gold/80 font-bold">Score</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
             <div className="w-32 bg-eml-dark rounded-full h-2.5 shadow-inner border border-eml-silver/5 overflow-hidden">
               <div 
                 className="bg-eml-gold h-2.5 rounded-full transition-all duration-1000 ease-out" 
                 style={{ width: \`\${progressPercent}%\` }}
               ></div>
             </div>
             <span className="text-sm font-bold text-eml-silver min-w-[3ch]">{progressPercent}%</span>
          </div>
        </div>
      </header>
      
      {/* Search / Nav */}
      <nav className="px-6 sm:px-10 py-6 overflow-x-auto border-b border-eml-silver/5 bg-eml-dark-card/50">
         <div className="flex space-x-2 sm:space-x-4 max-w-7xl mx-auto">
            <button 
              onClick={() => setActiveTab("home")}
              className={\`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center \${activeTab === "home" ? 'bg-white text-eml-dark shadow-md' : 'text-eml-silver hover:bg-white/5 border border-eml-silver/10'}\`}
            >
              <Layout className="w-4 h-4 mr-2" />
              Welcome Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("engineering_science")}
              className={\`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center \${activeTab === "engineering_science" ? 'bg-white text-eml-dark shadow-md' : 'text-eml-silver hover:bg-white/5 border border-eml-silver/10'}\`}
            >
              <Award className="w-4 h-4 mr-2" />
              Engineering & Science
            </button>
            <button 
              onClick={() => setActiveTab("business_management")}
              className={\`px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap flex items-center \${activeTab === "business_management" ? 'bg-white text-eml-dark shadow-md' : 'text-eml-silver hover:bg-white/5 border border-eml-silver/10'}\`}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Business & Management
            </button>
         </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow px-6 sm:px-10 py-12 max-w-7xl mx-auto w-full">
        {activeTab === "home" && (
          <div className="fade-in max-w-4xl">
            <div className="bg-eml-dark-card border border-eml-silver/10 p-10 sm:p-14 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity duration-700">
                <GraduationCap className="w-64 h-64 text-white rotate-12" />
              </div>
              <div className="relative z-10">
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
                  Welcome to <span className="text-eml-gold">AOL</span>
                </h1>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
                  Applied Organizational Leadership
                </h2>
                <p className="text-base sm:text-lg font-light text-eml-silver/90 leading-relaxed max-w-prose">
                  By engaging with AOL, you don't just study complex concepts&mdash;you master them. Our interactive tools bridge the gap between theory and execution, equipping you with the data-driven clarity, strategic intuition, and systemic thinking needed to solve real-world problems.
                </p>
              </div>
            </div>
          </div>
        )}

        {(activeTab === "engineering_science" || activeTab === "business_management") && (
          <div className="fade-in">
            <div className="mb-10">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">Interactive <span className="text-eml-gold">Lab</span></h1>
              <p className="text-base text-eml-silver/70 max-w-2xl font-light">Select an interactive module to continue your research. Experience concepts through hands-on simulations.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules
                .filter(mod => 
                  (activeTab === "engineering_science" && mod.subject === "Engineering & Science") ||
                  (activeTab === "business_management" && mod.subject === "Business & Management")
                )
                .map((mod) => {
                const isCompleted = progress.completedModules.includes(mod.id);
                return (
                  <div 
                    key={mod.id} 
                    className={\`group bg-eml-dark-card border border-eml-silver/10 p-8 flex flex-col justify-between hover:border-eml-gold/40 hover:shadow-2xl hover:shadow-eml-gold/10 hover:-translate-y-1 transition-all duration-500 cursor-pointer rounded-[2rem] h-full\`}
                    onClick={() => { setActiveModule(mod); setShowSimulators(false); }}
                  >
                    <div>
                      <h3 className="text-xl font-bold tracking-tight mb-3 text-white group-hover:text-eml-gold transition-colors duration-300">
                        {mod.title}
                      </h3>
                      <p className="text-sm text-eml-silver/80 leading-relaxed mb-6 font-light">
                        {mod.description}
                      </p>
                    </div>
                    
                    <div className="flex items-end justify-start mt-auto">
                      <button 
                        className={\`w-14 h-14 flex flex-shrink-0 items-center justify-center border-2 rounded-full transition-all duration-300 \${isCompleted ? 'border-eml-gold bg-eml-gold text-eml-dark shadow-[0_0_15px_rgba(212,175,55,0.4)]' : 'border-eml-silver/20 text-eml-silver group-hover:bg-eml-gold/10 group-hover:text-eml-gold group-hover:border-eml-gold/30'}\`}
                      >
                        <span className="font-semibold text-lg">→</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="px-6 sm:px-10 py-6 flex items-center justify-between text-xs font-medium border-t border-eml-silver/5 text-eml-silver/50">
        <div>&copy; {new Date().getFullYear()} AOL | ANALYZE &middot; OPTIMIZE &middot; LEAD</div>
      </footer>
    </div>
  );
}
`;

fs.writeFileSync('src/App.tsx', code);
console.log('Fixed');
