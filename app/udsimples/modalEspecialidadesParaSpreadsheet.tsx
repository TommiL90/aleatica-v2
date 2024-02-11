
'use client'
import { AnimatePresence, motion } from "framer-motion"


interface Props {
    title: string;
    isModalOpen: boolean;
    especialidad: number;
    options: any[];
    
    // subespecialidaddes: any[];
    onClose: Function;
    onChange: Function;
  }

export default function ModalEspecialidadesParaSpreadsheet (props: Props){
    
    return(
        <AnimatePresence>
        {
            props.isModalOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
            <div id="staticModal" tabIndex={-1} aria-hidden="true" className="fixed mx-auto flex w-[700px] top-0 left-0 right-0 z-50 items-center p-4 overflow-x-hidden overflow-y-auto md:inset-0">
                <div className="relative w-[700px] mx-auto max-w-7xlxl max-h-full">
                    
                    <div className="relative bg-white  shadow dark:bg-gray-700">
                        
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {props.title}
                            </h3>
                            <button type="button" onClick={()=>props.onClose()} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900  text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        
                        <div className="p-6 space-y-6">
                            {/* <SubEspecialidades 
                                onChange={(value: any) => props.onChange(value)} 
                                nodeSelected={{label: "", value: 0}}
                                subEspecialidadesList={
                                    props.options.filter((item: any) => item.especialityId === Number(props.especialidad) )} 
                                  especialidad={props.especialidad}
                            /> */}
                        </div>
                    </div>
                </div>
            </div>
            <div modal-backdrop="" className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40"></div>
    
            </motion.div>
        )
      }
    </AnimatePresence>
  
    );
  }
