import fetcher from "@/services/fetcher"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import InfoProject from "./info-project"
import SubCategoryOptions from "./sub-category-options"
import { Project } from "./types"

export default async function TaskIdPage({
  params,
}: {
  params: { id: string }
}) {
  const id = params.id
  const res = await fetcher(`${process.env.API_URL}/Project/FindById/${id}`)
  const data: Project = res.result

  return (
    <section className="max-h-screen w-full lg:m-auto">
      <div className="mx-auto max-w-screen-xl px-4 pb-8 pt-8">
        <InfoProject data={data} />
        <section>
          <Tabs defaultValue="tasks" className="w-full min-w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tasks">Tareas</TabsTrigger>
              <TabsTrigger value="consults">Consultas</TabsTrigger>
            </TabsList>
            <TabsContent value="tasks" className="w-full bg-slate-200">
              <SubCategoryOptions id={id} />
            </TabsContent>
          </Tabs>
        </section>
      </div>
    </section>
  )
}
