'use client'
import React from 'react';
import { IoMdArrowDropright } from 'react-icons/io';

import useSWR from 'swr';
import { cn } from '@/lib/utils';
import fetcher from '@/services/fetcher';
import TreeView, { flattenTree } from 'react-accessible-treeview';

const ArrowIcon = ({ isOpen, className }: any) => {
  const baseClass = "arrow";
  const classes = cn(
    baseClass,
    { [`${baseClass}--closed`]: !isOpen },
    { [`${baseClass}--open`]: isOpen },
    className
  );
  return <IoMdArrowDropright className={classes} />;
};

interface Props {
  especialidad: number;
  nodoSelected: string;
  onChange: Function;
}
export default function SubespecialidadesNiveles(props: Props) {
  const { data, isLoading, mutate} = useSWR(props.especialidad !== null ? `${process.env.API_URL}/MtSubspeciality/GetHierarchy/${props.especialidad}` : null, fetcher)
  
  // console.log(data.result.mtSubspecialities)

  const generateTree = (data: any) => {

    return data.map((sub: any) => (
      {
        id: crypto.randomUUID(),
        name: `${sub.name} - ${sub.code}`,
        metadata: {
          id: sub.id,
          name: sub.name,
          code: sub.code
        },
        children: sub.childrens.length > 0 ? generateTree(sub.childrens) : []
      }
    ))
  }
    return(
      <div className='h-full overflow-hidden overflow-y-auto bg-gray-100 p-4'>
        {
          isLoading ?
          <p>Cargando ...</p>
          :(
            <TreeView
              data={flattenTree(
                {
                  name: "",
                  children: data !== undefined ? generateTree(data.result.mtSubspecialities) : []
                }
              )}
              className="text-gray-800"
              aria-label="basic example tree"
              
            
              nodeRenderer={({
                element,
                isBranch,
                isExpanded,
                isSelected,
                isHalfSelected,
                getNodeProps,
                level,
                handleSelect,
                handleExpand
              }) => {
                return (
                  <div
                    {...getNodeProps({ onClick: handleExpand })}
                    className='m-2 flex'
                    style={{ marginLeft: 40 * (level - 1) }}
                    
                  >
                    {isBranch && <ArrowIcon isOpen={isExpanded} className={undefined} />}
                                
                    <span 
                      className={cn("cursor-pointer", isBranch ? "text-gray-800": "text-gray-600")}
                      style={{
                        position: 'relative',
                        top: -3,
                        marginLeft: 4
                      }}  
                      onClick={()=>props.onChange('metadata' in element && element !== undefined ? {label: element.metadata?.name, value: element.metadata?.id} : {label: element.name,value: element.id})}
                    >
                      {element.name}
                    </span>
                  </div>
                );
              }}
          />

          )
        }
        
    </div>
  );
}