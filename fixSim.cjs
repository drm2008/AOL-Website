const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove the activeModule.simulators bottom render starting from `{activeModule.simulators && activeModule.simulators.length > 0 && (` to its closing brace.
const startSimBlock = '{activeModule.simulators && activeModule.simulators.length > 0 && (';
const endSimBlock = ')}';
const startIdx = code.indexOf(startSimBlock);

if (startIdx !== -1) {
    let bracketCount = 1;
    let i = startIdx + startSimBlock.length;
    for (; i < code.length; i++) {
        if (code.slice(i, i + 2) === ')}' && bracketCount === 1) {
            i += 2;
            break;
        } else if (code[i] === '(') {
            bracketCount++;
        } else if (code[i] === ')') {
            bracketCount--;
        }
    }
    // We can just use a regex replace because the block signature is well known:
}

code = code.replace(
    /\{activeModule\.simulators && activeModule\.simulators\.length > 0 && \([\s\S]*?\n\s+\)\}/m,
    ''
);

const originalGridRegex = /<div className="grid grid-cols-1 md:grid-cols-2 gap-6">\s*\{\[\s*\{\s*title:\s*"The Infographic"[\s\S]*?\}\)\}\s*<\/div>/;

const newGridCode = `<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                </div>`;

code = code.replace(originalGridRegex, newGridCode);

const originalMainViewRegex = /\{activeTopic && \([\s\S]*?\}\s*\) : \(/;

const newMainView = `{showSimulators ? (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="flex items-center justify-between mb-8">
                     <h2 className="text-2xl font-black text-white tracking-tight">Simulators</h2>
                     <button onClick={() => setShowSimulators(false)} className="px-4 py-2 text-sm font-semibold border-2 border-eml-silver/20 text-eml-silver hover:text-white hover:border-white rounded-full transition-all">
                       ← Back
                     </button>
                   </div>
                   {activeModule.simulators && activeModule.simulators.length > 0 ? (
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                       {activeModule.simulators.map(sim => (
                         <div 
                           key={sim.title}
                           className="group bg-gradient-to-br from-indigo-900/50 to-slate-900 border border-indigo-500/30 p-8 flex flex-col justify-between hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1 transition-all duration-500 cursor-pointer rounded-[2rem] h-full md:min-h-[250px]"
                           onClick={() => window.open(sim.url, "_blank")}
                         >
                           <div>
                             <div className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 mb-2">Interactive Tool</div>
                             <h3 className="text-xl font-bold tracking-tight mb-3 text-white group-hover:text-indigo-300 transition-colors duration-300">
                               {sim.title}
                             </h3>
                             <p className="text-sm text-slate-300 leading-relaxed mb-6 font-light">
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
                     <div className="text-center p-12 bg-eml-dark/50 border border-eml-silver/10 rounded-2xl text-eml-silver">
                       No simulators available for this module yet.
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
                    ${newGridCode}
                  </>
                )}
              </div>
            ) : (`;

code = code.replace(/\{activeTopic && \([\s\S]*?\}\s*\) : \(/, newMainView);

fs.writeFileSync('src/App.tsx', code);
console.log('Done');
